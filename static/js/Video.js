/* Video 自製控制介面 */
var video;

window.onload = function () {
  // Get the video.
  video = document.getElementById("myVideo");

  // Get the buttons.
  var zoomBtn = document.getElementById("zoomBtn");
  var playBtn = document.getElementById("playBtn");
  var stopBtn = document.getElementById("stopBtn");
  var seekBar = document.getElementById("seekBar");
  var volumeControl = document.getElementById("volume");
  var muteBtn = document.getElementById("muteBtn");

  // Add an event listener for the play button.  
  playBtn.addEventListener("click", function (e) {
    // Play the video.
    //audio_dia.pause();
    if (video.paused) {
      video.play();
      OnPlay();
    } else {
      video.pause();
      OnPause();
    }
  });

  stopBtn.addEventListener("click", function (e) {
    // stop the video.
    video.pause();
    video.currentTime = 0;
    OnPause();
  });

  // Add an event listener for the seek bar.
  seekBar.addEventListener("change", function (e) {
    // Calculate the time in the video that playback 
    // should be moved to.
    var time = video.duration * (seekBar.value / 100);

    // Update the current time in the video.
    video.currentTime = time;
  });

  // Update the seek bar as the video plays.
  video.addEventListener("timeupdate", function (e) {
    // Calculate the slider value.
    var value = (100 / video.duration) * video.currentTime;
    const percent = (video.currentTime / video.duration) * 100
    // Update the slider value.
    seekBar.value = value;
    rangevalue.value = percent.toFixed(1) + "%";
  });

  video.addEventListener("pause", function (e) {
    OnPause();
  });

  video.addEventListener("stop", function (e) {
    OnPause();
  });

  // Pause playback when the user starts seeking.
  seekBar.addEventListener("mousedown", function (e) {
    video.pause();
  });

  // Continue playback when the user stops seeking.
  seekBar.addEventListener("mouseup", function (e) {
    video.play();
    OnPlay();
  });

  // Add an event listener for the volume control.
  volumeControl.addEventListener("change", function (e) {
    // Update the videos volume property.
    video.volume = volumeControl.value;
  });

  // Add an event listener for the mute button.
  muteBtn.addEventListener("click", function (e) {
    // Toggle the muted value.
    if (video.muted == true) {
      video.muted = false;
      muteBtn.textContent = "Mute";
    } else {
      video.muted = true;
      muteBtn.textContent = "Unmute";
    }
  });

  function OnPlay() {
    $(playBtn).removeClass('play');
    $(playBtn).addClass('pause');
    $(playBtn).removeClass('fa-play');
    $(playBtn).addClass('fa-pause');
  };

  function OnPause() {
    $(playBtn).removeClass('pause');
    $(playBtn).addClass('play');
    $(playBtn).removeClass('fa-pause');
    $(playBtn).addClass('fa-play');
  }
}

$(function () {

  $("#btnTermA").click(function () {
    //* 重點單字解說 -- 按鈕動作
    video.pause();
  });

  $("#btnPhraseA").click(function () {
    //* 片語解說 -- 按鈕動作		
    video.pause();
  });
})(jQuery);