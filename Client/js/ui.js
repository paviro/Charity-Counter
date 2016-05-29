// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var totalDonations = 0

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
			var input = document.getElementsByClassName("input")[0];
			input.classList.remove("connectionShake");
			input.offsetWidth = input.offsetWidth;
			input.classList.add("connectionShake");
			socket.io.reconnection(false);
		});
		
		socket.on('connect', function () { 
			//Fade out form
			$( "#ip" ).fadeOut( "slow")
			$( "#footer" ).fadeOut( "slow")
			//Fade in clock and donation
			$( ".wrapper" ).fadeIn( "slow" );
		});
		
		socket.on("setup", function (data) {
			//$('#donations').text(data.donations + " €");
			animateCounter(data.donations)
			
			var date = new Date(data.date);
			var now = new Date();
			var diff = (date.getTime()/1000) - (now.getTime()/1000);

			if (data.date != null) {
				initializeCountdown("countdown", data.date);
			}
		
		});
		
		socket.on('update', function (donations) { 
			animateCounter(donations)
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

var timeinterval = undefined

function initializeCountdown(id, endtime){
	if(typeof timeinterval !== "undefined"){
		clearTimeout(timeinterval);
	} else {
		$("#donations").animate({"margin-top": "0%"}, 700, function () {
			$( "#countdown" ).fadeIn( "slow" );
		});
	}
	var clock = document.getElementById(id);
	timeinterval = setInterval(function(){
		
		var t = getTimeRemaining(endtime);
		var hours = "<div id='hours'>" + t.hours + "<span class='sub'>Hours</span></div>" 
		var minutes = "<div id='minutes'>" + t.minutes + "<span class='sub'>Minutes</span></div>" 
		var seconds = "<div id='seconds'>" + t.seconds + "<span class='sub'>Seconds</span></div>" 
		
		if(t.total<=0){
			clearInterval(timeinterval);
			$( "#countdown" ).fadeOut("slow", function () {
				$("#donations").animate({"margin-top": "15%"}, 700)
			});
			timeinterval = undefined
		}
		else{
			clock.innerHTML = hours + minutes + seconds;
		}
		
	},500);
}