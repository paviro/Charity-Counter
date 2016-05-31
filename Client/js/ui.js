/* Charity Counter Project
 * Client Software
 *
 * By Paul-Vincent Roll http://paulvincentroll.com
 * MIT Licensed.
 */

//Disable zooming
require('electron').webFrame.setZoomLevelLimits(1, 1);

//Variables
var totalDonations = 0
var countdownInterval = undefined

//Add OSX Menubar when on OSX
if (process.platform == "darwin") {
	var menuBar = document.createElement("div")
	menuBar.id = "menuBar"
	document.body.appendChild(menuBar);
};

$("#ip").submit(function(e){
	e.preventDefault();
	//Connect socket
	var serverIP = document.getElementById("ipField").value;
	setup(serverIP)
	return false;
 });

function setup(serverIP) {
	var socket = require('socket.io-client')('http://' + serverIP + ':8080');
	
		socket.on('connect_error', function() {
			//Get Input field
			var input = document.getElementsByClassName("input")[0];
			//Restart CSS shake animation
			input.classList.remove("connectionShake");
			input.offsetWidth = input.offsetWidth;
			input.classList.add("connectionShake");
			//Stop socket.io from trying to reconnect
			socket.io.reconnection(false);
		});
		
		socket.on('connect', function () { 
			//Fade out form
			$( "#ip" ).fadeOut( "slow")
			//Fade in clock and donation
			$( ".wrapper" ).fadeIn( "slow" );
		});
		
		socket.on("setup", function (data) {
			//Animate donation counter to new value
			animateCounter(data.donations)
			//If date is set initialize countdown
			if (data.date != null) { initializeCountdown("countdown", data.date) }
		});
		
		socket.on('update', function (donations) { 
			//Update donations
			animateCounter(donations)
			//Update totalDonations array
			totalDonations = donations
		});
		
}

function animateCounter(value) {
	var decimal_places = 2;
	var decimal_factor = decimal_places === 0 ? 1 : Math.pow(10, decimal_places);
	$('#currentDonations')
	.prop('number', totalDonations * decimal_factor)
	.animateNumber(
		{
			number: value * decimal_factor,
			numberStep: function(now, tween) {
				var floored_number = Math.floor(now) / decimal_factor,
						target = $(tween.elem);

				if (decimal_places > 0) {
					// force decimal places even if they are 0
					floored_number = floored_number.toFixed(decimal_places);

					// replace '.' separator with ','
					floored_number = floored_number.toString().replace('.', ',');
				}
				target.text(floored_number);
			}
		},
		2000
	);

}

function getTimeRemaining(endtime){
	var t = Date.parse(endtime) - Date.parse(new Date());
	var seconds = Math.floor( (t/1000) % 60 );
	var minutes = Math.floor( (t/1000/60) % 60 );
	var hours = Math.floor( (t/(1000*60*60)) % 24 );
	var days = Math.floor( t/(1000*60*60*24) );
	if (seconds < 10) { seconds = "0" + seconds.toString() }
	if (minutes < 10) { minutes = "0" + minutes.toString() }
	if (hours < 10) { hours = "0" + hours.toString() }
	if (days < 10) { days = "0" + days.toString() }
	
	return {
		'total': t,
		'days': days,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds
	};
}

function initializeCountdown(id, endtime){
	if(typeof countdownInterval !== "undefined"){
		clearTimeout(countdownInterval);
	} else {
		$("#donations").animate({"margin-top": "0%"}, 700, function () {
			$( "#countdown" ).fadeIn( "slow" );
		});
	};
	
	var showDay = getTimeRemaining(endtime).days > 0 ? true : false;
	
	countdownInterval = setInterval(function(){
		var t = getTimeRemaining(endtime);
		var days = "<div id='days'>" + t.days + "<span class='sub'>Days</span></div>"
		var hours = "<div id='hours'>" + t.hours + "<span class='sub'>Hours</span></div>" 
		var minutes = "<div id='minutes'>" + t.minutes + "<span class='sub'>Minutes</span></div>" 
		var seconds = "<div id='seconds'>" + t.seconds + "<span class='sub'>Seconds</span></div>" 
		
		if(t.total<=0){
			clearInterval(countdownInterval);
			$( "#countdown" ).fadeOut("slow", function () {
				$("#donations").animate({"margin-top": "15%"}, 700)
			});
			countdownInterval = undefined
		}
		else{
			document.getElementById(id).innerHTML = showDay ? days + hours + minutes + seconds : hours + minutes + seconds;
		}
		
	},500);
}