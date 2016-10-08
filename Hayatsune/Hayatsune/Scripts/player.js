/*
Copyright 2016 Hayatsune
*/

window.onload = function() {

	var onclick = document.getElementById("onclick");
	onclick.style.cursor = "pointer";
	onclick.onclick = function() {
		location.href="http://hayatsune.com/";
	}


	var video = document.getElementById("player");
	var volumeBar = document.getElementById("volumeBar");
	var progressbar = document.getElementById("progressbar");

    //Firefox support
    video.play();

    var slider = $('#slider');

    slider.slider({
        range: "min",
        min: 0,
        max: 100,
        step: 1,
        value: 15,

        change: function (event, ui) {
            var value = slider.slider('value');
            setVolumeImage(value);
            video.volume = (value / 100);
        },

        slide: function (event, ui) {
            var value = slider.slider('value');
            setVolumeImage(value);
            video.volume = (value / 100);
        }
    });


	video.controls = false;
	video.volume = 0.15;


	//Progress bar update
	video.addEventListener("timeupdate", updatetime);

	//Buffer bar update
	video.addEventListener("progress", updatebuffer);

	//Progress bar clickable
	progressbar.addEventListener("click", function(e) {
    if (!e) {
        e = window.event;
    }
    try {
        video.currentTime = video.duration * (e.offsetX / progressbar.clientWidth);
    }
    catch (err) {
        if (window.console && console.error("Error:" + err));
    }
}, true);

}

function togglePlayPause() {
	if (player.paused) player.play();
	else player.pause();

	$("#play-pause-button").toggleClass("fa-play").toggleClass("fa-pause");
}

function toggleMute() {
	if (player.muted) {
		player.muted = false;
	}
	else {
		player.muted = true;
	}
	$("#mute-button").toggleClass("fa-volume-off").toggleClass("fa-volume-down");
}

function setVolumeImage(value) {
        if (value == 0) {
        	if ($("#mute-button").hasClass("fa-volume-down")) {
            	$("#mute-button").toggleClass("fa-volume-off").toggleClass("fa-volume-down");
            } else if ($("#mute-button").hasClass("fa-volume-up")) {
            	$("#mute-button").toggleClass("fa-volume-off").toggleClass("fa-volume-up");
            }
        } else if (value <= 50) {
        	if ($("#mute-button").hasClass("fa-volume-off")) {
            	$("#mute-button").toggleClass("fa-volume-down").toggleClass("fa-volume-off");
            } else if ($("#mute-button").hasClass("fa-volume-up")) {
            	$("#mute-button").toggleClass("fa-volume-down").toggleClass("fa-volume-up");
            }
        } else {
        	if ($("#mute-button").hasClass("fa-volume-down")) {
            	$("#mute-button").toggleClass("fa-volume-up").toggleClass("fa-volume-down");
            } else if ($("#mute-button").hasClass("fa-volume-off")) {
            	$("#mute-button").toggleClass("fa-volume-up").toggleClass("fa-volume-off");
            }
        }
    }

function updatetime() {
	if(!isNaN(player.duration)) {
	   	var percent_complete = 100 * (player.currentTime / player.duration);
	   	document.getElementById("timeprogress").style.width=percent_complete+'%';
	}
}

function updatebuffer() {
	if (player.buffered.end(0) / player.duration * 100 != 100) {
	  	var percent_complete = 100 * (player.buffered.end(0) / player.duration);
	   	document.getElementById("bufferprogress").style.width=percent_complete+'%';
	}
}
