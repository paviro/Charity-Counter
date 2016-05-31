/* Charity Counter Project
 * Server Software
 *
 * By Paul-Vincent Roll http://paulvincentroll.com
 * MIT Licensed.
 */

//Disable zooming
require('electron').webFrame.setZoomLevelLimits(1, 1);

var donationHistory = {donations: [], labels: []}

//For alerts
const swal = require("sweetalert2")

//Connect to server backend
var socket = require('socket.io-client')('http://localhost:8080');

//Update chart with data from backend server
socket.on("updateChart", function (data) {
	donationHistory = data
	$("#chart").get(0).__chartist__.update({series: [data.donations], labels: data.labels});
})

//Initialize the chart
const Chartist = require('chartist');
new Chartist.Line('#chart', {
	labels: [],
	series: []
}, {
	fullWidth: true,
	chartPadding: {
		right: 40
	},
	axisX: {
		scaleMinSpace: 3,
		labelInterpolationFnc: function skipLabels(value, index, labels) {
			return index % 3  === 0 ? value : null;
		}
	}
	
},
[
['screen and (min-width: 641px) and (max-width: 1024px)', {
	showPoint: false,
	axisX: {
		showLabel: false,
		showGrid: false,
	},
	axisY: {
		showGrid: true,
		showLabel: true,
		
	}
}]
]
);

//Add OSX Menubar when on OSX
if (process.platform == "darwin") {
	var menuBar = document.createElement("div")
	menuBar.id = "menuBar"
	document.body.appendChild(menuBar);
};

//Get local IP adress
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
	//Display IP in the UI
	$('#localIP').text(add);
})

//Initialize time picker
$('#timepicker').datepicker({
	language: 'en',
	timepicker: true,
	todayButton: new Date(),
	minDate: new Date(),
	onSelect: function (fd, d, picker) {
		socket.emit("setupSettings", { date: d })
	}
});

//Overwrite form submit button
$("#addDonation").submit(function(e){
	//Prevent the default actions
	e.preventDefault();
	//Get current value of the donation field
	var donation = document.getElementById("donationValue");
	//Send it to the server backend
	socket.emit("addDonation", donation.value)
	//Empty the donation field
	donation.value=""
	//return false so that the site does not get reloaded
	return false;
 });

//When window is ready
$(document).ready(function() {
	//Bind function to keyup event on the donation field
	$("#donationValue").bind("change keyup", function () {
		//If field is not empty enable button
		if ($("#donationValue").val() != "")
			$(this).closest("form").find(":submit").removeAttr("disabled");
		//If field is empty disable button
		else
			$(this).closest("form").find(":submit").attr("disabled", "disabled");
		});
});

//Conection to server backend
const backend = require('electron').ipcRenderer

backend.on('hideMenu', (event) => {
	$( "#menuBar" ).fadeOut(0)
});
backend.on('showMenu', (event) => {
	$( "#menuBar" ).fadeIn(0)
});

backend.on('quitAlert', (event) => {
	swal({
		title: 'Export Statistics',
		text: "Would you like to save the chart?",
		type: 'question',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes',
		cancelButtonText: 'No',
		confirmButtonClass: 'btn btn-success',
		cancelButtonClass: 'btn btn-danger'
	}).then(function(isConfirm) {
		if (isConfirm === true) {
			//show progress alert
			swal({
				title: 'Preparing PDF export',
				text: 'Please wait a few seconds',
				showCancelButton: false,
				showConfirmButton: false,
				allowEscapeKey: false,
				allowOutsideClick: false
			})
			//Fade out all content
			$( "#chart, #addDonation" ).fadeOut( "slow", function() {
				//Create new element for pdf chart
				var chartHolder = document.createElement("div");
				//Set id to chartHolder
				chartHolder.id = "chartHolder";
				//Add some styling
				chartHolder.style.position = "absolute";
				chartHolder.style.top = "0px";
				chartHolder.style.left = "0px";
				chartHolder.style.width = "1675px";
				chartHolder.style.height = "1182px";
				chartHolder.style.background = "#f7f7f7";
				chartHolder.style.display = "none";
				//Add chart holder to body
				document.body.appendChild(chartHolder);
				
				//Draw chart on new chart holder element
				new Chartist.Line('#chartHolder', {
					labels: donationHistory.labels,
					series: [donationHistory.donations]
				}, {
					fullWidth: true,
					chartPadding: {
						right: 40
					}
				});
				
				//Fade in chart
				$("#chartHolder").fadeIn("slow", function () {
					//Close alert
					swal.closeModal();
					//Set background color of body to chart holder color
					$("body").css("background-color","#f7f7f7");
					//Wait until alert is really gone then send pdf generating and quit command
					setTimeout(function(){ socket.emit("exportQuit") }, 500);
					
				});
				
			  });
			
		} else if (isConfirm === false) {
			//send quit command
			socket.emit("quit")
		};
	});
});