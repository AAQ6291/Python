var data_path = "src/";
var webdt_path = "src/";
//var webdt_path = "https://storage.googleapis.com/tlcsrc-bucket/tlc02src/src/";   

/* MainMenu:主畫面單元 -- index.html */
var getMainMenuJson = function () {
    var fileName = "";	//目錄檔案名
    fileName = webdt_path + 'chapterList.json';
    getJson(fileName, 'Mainmenu');	  //Get JSON File Data   
};

//*********************************************************************************//* Get Dia_LXX.json Data (EX. Dia_L01.json)
//*********************************************************************************
function getJson(JFileName, fileType) {
    $.ajax({
        url: JFileName,
        dataType: 'jsonp',
        jsonpCallback: 'callback',
        // this method is called when the request is successful
        success: function (json) {
            result = json;
            switch (fileType) {
                case 'All':
                    processAList(json.chapterlists);
                    break;
                case 'Mainmenu':
                    processMenuList(json.chapterlists);
                    break;
                default:
                    break;
            }
        },

        error: function (jqXHR, textStatus, errorThrown) {
            alert(textStatus + ' : ' + errorThrown);
        }
    });
}

//*************************************************************************
// Process the chapterlists
// param: chapterlists - an array of chapterlists
// 網址傳遞中文參數亂碼解決問題  : encodeURI(),decodeURI()
//*************************************************************************
function processMenuList(chapterlists) {
    //Main List
    var PartStr_1 = '<div class="w3-col l2 m6 w3-margin-bottom" id="Menu_P';
    var PartStr_2 = '" > ';
    var imgStr_1 = '<img src="' + w_path + 'images/mbr-1-M';
    var imgStr_2 = '.jpg" style="width:100%">';
    var PartBtn_1 = '<h5>';
    var PartBtn_2 = '</h5><p>';
    var PartBtn_3 = '</p><p><button class="w3-button w3-light-grey w3-block ">Start Learning</button></P>';

    var PartEndStr = '</div>'
    var htmlStr = "";
    var typeHtml = '';

    // API to the $.each function: http://api.jquery.com/jQuery.each/
    $.each(chapterlists, function (index, chapterlists) {
        var Unit_ID = chapterlists.UnitID;
        var row = PartStr_1 + Unit_ID + PartStr_2 + PartBtn_1 + imgStr_1 + Unit_ID + imgStr_2 + PartBtn_1 + chapterlists.UnitName + PartBtn_2 + chapterlists.UnitEng + PartBtn_3;

        htmlStr = htmlStr + row + PartEndStr;
        $('#TLC02_menu').append(htmlStr);
        htmlStr = "";
    });
};