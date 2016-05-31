/* Charity Counter Project
 * Server Software
 *
 * By Paul-Vincent Roll http://paulvincentroll.com
 * MIT Licensed.
 */

const electron = require('electron');
const shell = require('electron').shell;
const path = require('path');
const fs = require("fs")
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

// Module to host socket via http server
const server = require('http').createServer();
// Module for socket server
const io = require('socket.io')(server);

//Variables
var countdownDate = null
var totalDonations = 0.0
var donationHistory = {donations: [], labels: []}

// On UI connection
io.on('connection', function(socket){
  // Client connected
  console.log('Client connected...');
  
  //Emit initial setup data (current donations and countdown end date
  socket.emit('setup', { date: countdownDate, donations: totalDonations });
  //Emmit current chart data
  socket.emit('updateChart', donationHistory);
  
  // When server backend receives settings data from server UI
  socket.on("setupSettings", function (data) {
    console.log('Received settings. Broadcasting to clients...');
    //Broadcast updated setup data to clients UI
    socket.broadcast.emit('setup', { date: data.date, donations: totalDonations });
    //Set countdownDate variable to updated date
    countdownDate = data.date
  });

  // On addDonation command from server UI
  socket.on("addDonation", function (donation) {
    console.log('Received new donation. Broadcasting to clients and server...');
    // Add new donation to total donations variable
    totalDonations += parseFloat(donation)
    
    // Get current time and store in variable
    var time = new Date();
    // Add new donation to donationHistory array
    donationHistory.donations.push(totalDonations)
    // Add time to donationHistory array
    donationHistory.labels.push(time.getHours()+":"+time.getMinutes())
    // Send updated chart to server UI
    socket.emit('updateChart', donationHistory);
    // Broadcast updated totalDonations to the client UI
    socket.broadcast.emit('update', totalDonations);
  })
  
  socket.on('quit', function () {
    app.exit(0)
  });
  
  socket.on('exportQuit', function () {    
    const options = {
      marginsType: 1,
      pageSize: "A4",
      printBackground: true,
      printSelectionOnly: false,
      landscape: true
    }
    
    mainWindow.webContents.printToPDF(options, (error, data) => {
      if (error) throw error;
      fs.writeFile(path.join(app.getPath("desktop"), 'Charity Counter.pdf'), data, (error) => {
        if (error) throw error;
        shell.openItem(path.join(app.getPath("desktop"), 'Charity Counter.pdf'));
        console.log('Write PDF successfully.');
        app.exit(0)
      });
    });
    });
  // Client disconnected, log status.
  socket.on('disconnect', function(){
    console.log('Client disconnect...');
  });

});

//Listen on port 8080 for socket connections
server.listen(8080);


//ELECTRON PART
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1100, height: 600, minWidth: 700, titleBarStyle: "hidden-inset"})

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  
  mainWindow.on('close', function(e) {
    e.preventDefault();
    mainWindow.webContents.send('quitAlert');
  });
  
  mainWindow.on('enter-full-screen', function(e) {
    mainWindow.webContents.send('hideMenu');
  });
  
  mainWindow.on('leave-full-screen', function(e) {
    mainWindow.webContents.send('showMenu');
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.