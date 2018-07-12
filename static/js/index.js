function myMap() {
    myCenter = new google.maps.LatLng(41.878114, -87.629798);
    var mapOptions = {
        center: myCenter,
        zoom: 12, scrollwheel: false, draggable: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);

    var marker = new google.maps.Marker({
        position: myCenter,
    });
    marker.setMap(map);
}

//Control Div Display
function block_Display(idName, bFlag) {
    //* Div-- 頁面顯示控制    
    if (bFlag = 'T') {
        $("#" + idName).css("display", "block");// 區塊，元素會以區塊方式呈現，除非設定 position 或 float。
    } else {
        $("#" + idName).css("display", "none");
    }
}

//
function myCourFunc(idNo) {
    var x = $("#CourseMain" + idNo).get(0);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

function videoPlay() {
    var curVideo = $("#Video1");
    curVideo.play();
}

function videoPause() {
    var curVideo = $("#Video1");
    curVideo.pause();
}

mediaPlayer = document.getElementById('media-video');
document.addEventListener("DOMContentLoaded", function () {
    initialiseMediaPlayer();
}, false);
mediaPlayer.addEventListener('timeupdate', updateProgressBar, false);

function initialiseMediaPlayer() {
    mediaPlayer.controls = false;
}

function togglePlayPause() {
    var btn = document.getElementById('play-pause-button');
    var ovr = document.getElementById('play-disp');
    var avi = document.getElementById('user-avi');
    if (mediaPlayer.paused || mediaPlayer.ended) {
        btn.title = 'pause';
        ovr.innerHTML = '<span class="fa fa-pause"></span>';
        ovr.style.textShadow = '0 0 0 #fff, 0 0.5px 1px #000';
        avi.style.transform = "scale(1)";
        mediaPlayer.play();
    } else {
        btn.title = 'play';
        ovr.innerHTML = '<span class="fa fa-play"></span>';
        avi.style.transform = "scale(0)";
        ovr.style.textShadow = 'none';
        mediaPlayer.pause();
    }
}

function updateProgressBar() {
    var progressBar = document.getElementById('play-bar');
    var percentage = Math.floor((100 / mediaPlayer.duration) *
        mediaPlayer.currentTime);
    progressBar.style.width = percentage + "%";
}