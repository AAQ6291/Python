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

