/*  jQuery
<audio>元素標籤的一些常用屬性：
    src：音頻文件路徑。
    autobuffer：設置是否在頁面加載時自動緩衝音頻。
    autoplay：設置音頻是否自動播放。
    loop：設置音頻是否要循環播放。
    controls：設置是否顯示播放控制面板。
*/

var active_audio="";
var diafolder = "";		
var diapath = "";
var tagName_dia= "";
var id_dia = "";
var fid_dia = "";
var fx_dia = "";
var dia_index = 0;
var playAll =false;

var obj_dia;
var posy = 0;
var scrPos = 0;
var scrVal =0;

//**************************************************************************************  
//匿名涵式
//**************************************************************************************    
jQuery(function ($) {
		$(function () {
			/*  網頁節點讀取完成後隨即執行的程式  */					
		});
		
	    var lessonAudio = !!document.createElement('audio').canPlayType;		
			
		if (lessonAudio) {  
		    active_audio="lesson";
			//*  Controller 定義															
			var obj_diaPlay = '#j'+active_audio+'_Sub'+ ' #btnPlay-Pause'; 
			var obj_diaStop = '#j'+active_audio+'_Sub'+ ' #btnStop'; 
			var obj_diaPrev = '#j'+active_audio+'_Sub'+ ' #btnPrev'; 
			var obj_diaNext = '#j'+active_audio+'_Sub'+ ' #btnNext'; 			

			diaCount = $("#lContent>div>div>span>p>a").length / 2; 	
			fid_dia = $("#lContent>div>div>span>p>a").attr('data-tid');			//句子MP3檔名	
			fx_dia =  $("#lContent>div>div>span>p>a").attr('data-fx');			//課數
			tagName_dia = $('#lContent > div > div > span > p > a').attr('id');	//句子的Tag Name		
			id_dia =  $('#lContent > div > div > span > p > a').index($('#' + tagName_dia));	
			if (id_dia < 0) {
				id_dia =0;
				tagName_dia = "NO0" + id_dia;
			}			
			diafolder="dia/" + fx_dia + "/fast/";
			diapath=MP3_Path + diafolder;

            audio_dia = $("#jaudio_"+active_audio).bind('play', function () {
                playing = true;				
				video.pause();				
//                alert('Now Playing...     曲目： ' + fid_dia);						
            }).bind('pause', function () {
                playing = false;
//                alert('Paused......     曲目： ' + fid_dia);
				diaPauseOn();
            }).bind('ended', function () {
//                alert('Paused......     曲目： ' + fid_dia);
				if (playAll == false) {
					audio_dia.pause();
					diaPauseOn();
				} else {
					id_dia++;
					if (id_dia < diaCount) {
						if (id_dia < 10)  {
							tagName_dia = "NO0" + id_dia;
						} else {
							tagName_dia = "NO" + id_dia;						
						}
						
						loadDiaTrack(tagName_dia);
						
						//
						audio_dia.play();
						diaPlayOn();					
					} else {
						playAll = false;
						id_dia = 0;
						tagName_dia = "NO0" + id_dia;
						tagName_dia = tagName_dia.replace("NO00", "NO0");
						audio_dia.pause();
						diaPauseOn();						
					}
				}
            }).get(0),
			audio_dia.onseeking = function() {
//                alert('曲目： ' + fid_dia);
			},			
			audio_dia.onloadedmetadata = function() {
//				npTitle.text('00:00 / ' + timeFormat(audio.duration));	
			},
			audio.onplaying = function() {
				diaPlayOn();
			},				
												
			loadDiaTrack = function (tagName_dia) {								
				cleanSelect();
				
				diafolder="dia/" + fx_dia + "/fast/";
				diapath=MP3_Path + diafolder;
								
				obj_diaPlay = '#j'+active_audio+'_Sub'+ ' #btnPlay-Pause';								
				
				$('#lContent #' + tagName_dia).css("color","#e63900");
				$('#lContent #' + tagName_dia).css("font-weight","bold");				
				
                dia_index = id_dia;

				//* 取得[tagName_dia]父元素的第一個<div>元素之ID名稱
				//* 範例: $('#' + tagName_dia).parents('div:first').attr('id')
				//			  $('#' + tagName_dia).parents('div:first').css('border','solid 1px Red')
				//* 取得[tagName_dia]父元素的第二個<div>元素之ID名稱
				//* 範例: $('#' + tagName_dia).parents('div:first').next().attr('id');
				
				var papa2_id = $('#' + tagName_dia).parents('div:first').next().attr('id');
				console.log('父元素 第二個<div>元素之ID名稱 ~~ '+papa2_id);
					
				//* scroll bar control
				obj_dia = $('#' + papa2_id).offset();
				posy = obj_dia.top + ($('#' + papa2_id).height());
				scrPos = $('#' + papa2_id).height()*2 //* id_dia;
				scrVal =$('#lContent').scrollTop() ;
				if (posy >= browserH ) {
					scrVal=scrVal + scrPos+$('#' + papa2_id).height();
					$('#lContent').scrollTop(scrVal);						
				 }					
				 	
				audio_dia.src = diapath + tagName_dia + '.mp3';
			},				
			dialistIni = function (name){  			
				//取的頁面中 PlayList = name 的元件				  
				var obj = $('#' +name).attr('id');
				diaCount = $("#lContent>div>div>span>p>a").length / 2; 	
				var obj_diaPlay = '#j'+active_audio+'_Sub'+ ' #btnPlay-Pause'; 
				var obj_diaStop = '#j'+active_audio+'_Sub'+ ' #btnStop'; 
				var obj_diaPrev = '#j'+active_audio+'_Sub'+ ' #btnPrev'; 
				var obj_diaNext = '#j'+active_audio+'_Sub'+ ' #btnNext'; 		
				
				playAll =false;
				
				btn_diaPlay = $(obj_diaPlay).on('click', function() {
					//Play/pause the track
					id_dia =0;					
					tagName_dia = "NO00";
					if (audio_dia.paused == false) {
						playAll =false;
						audio_dia.pause();
						diaPauseOn();						
					} else {
						playAll =true;
						diaplayTrack(tagName_dia);
					}
				});		
			
				btn_diaStop = $(obj_diaStop).on('click', function() {
					//Stop the track
					playAll=false;
					id_dia =0;
					audio_dia.pause();
					audio_dia.currentTime = 0;
					diaPauseOn();
				});				
				
				btn_diaPrev = $(obj_diaPrev).on('click', function() {
					if ((id_dia - 1) > -1) {
						id_dia--;
						loadDiaTrack(tagName_dia);
						audio_dia.play();
						diaPlayOn();
					} else {
						audio.pause();
						diaPauseOn();

						id_dia = 0;
						tagName_dia = "NO0" + id_dia;
						tagName_dia = tagName_dia.replace("NO00", "NO0");
						
						loadDiaTrack(tagName_dia);					
					}
				});
				
				btn_diaNext = $(obj_diaNext).on('click', function() {
					if ((id_dia + 1) < diaCount) {
						id_dia++;
						loadDiaTrack(tagName_dia);
						audio_dia.play();
						diaPlayOn();
					} else {
						audio_dia.pause();
						diaPauseOn();
						id_dia = 0;
						loadDiaTrack(tagName_dia);
					}
				})
			
				loadDiaTrack(tagName_dia);
			}				
			
			diaPlayOn = function() {							
  			    obj_diaPlay = '#j'+active_audio+'_Sub'+ ' #btnPlay-Pause';								
				$(obj_diaPlay).children('i').removeClass('fa-headphones');
				$(obj_diaPlay).children('i').addClass('fa-pause');							
			};
			diaPauseOn = function() {
				obj_Play = '#j'+active_audio+'_Sub'+ ' #btnPlay-Pause';
				$(obj_diaPlay).children('i').removeClass('fa-pause');
				$(obj_diaPlay).children('i').addClass('fa-headphones');		
				
				cleanSelect();
			};
			
            diaplayTrack = function (id) {				
                loadDiaTrack(id);		
                audio_dia.play();

				diaPlayOn();
            };			
			
			cleanSelect = function() {
				$('#lContent  a').css("color","");
				$('#lContent  a').css("font-weight","normal");			
			};			

	        dialistGet = function (){  			
			  //取diaList的內容
			  var obj= $('#lContent>div>div>span>p>a');
			  for(var i = 0; i < obj.length; i++) {
					alert("playlistClick ~ "+ i + " ~ " + obj[i].id + " ~ ");	//PlayList 名稱
					console.log("PlayListClick ~ "+ i + " ~ " + obj[i].id);	            //PlayList 名稱
			  }
			};						
		};				  
		  
		$(window).load(function() {			
			/*  文字、圖片都讀取完成後隨即執行的程式  */					
			diaCount = $("#lContent>div>div>span>p>a").length / 2; 	
			fid_dia = $("#lContent>div>div>span>p>a").attr('data-tid');			//句子MP3檔名	
			fx_dia =  $("#lContent>div>div>span>p>a").attr('data-fx');			//課數
			tagName_dia = $('#lContent > div > div > span > p > a').attr('id');	//句子的Tag Name		
			id_dia =  $('#lContent > div > div > span > p > a').index($('#' + tagName_dia));	
			if (id_dia < 0) {
				id_dia =0;
				tagName_dia = "NO0" + id_dia;
			}
			playAll =false;
			
			dialistIni('jaudio_lesson');
		    active_audio="lesson";
			diafolder="dia/" + fx_dia + "/fast/";
			diapath=MP3_Path + diafolder;
			
			cleanSelect();
			var obj= $('#lContent>div>div>span>p>a');
			
			//* 句子偵測動作
			$('#lContent>div>div>span>p>a').on({
				mouseenter: function(){
					//$(this).css("background-color", "lightgray");                   			
				},  
				mouseleave: function(){
					//$(this).css("background-color", "lightblue");
				}, 
				click: function(){
					playAll =false;
					//$(this).css("background-color", "yellow");   
					tagName_dia = this.id;
					fx_dia = $(this).attr('data-fx');
					fid_dia = $(this).attr('data-tid');  

					id_dia =  $('#lContent > div > div > span > p > a').index($('#' + tagName_dia));	
					
					/* Scroll bar Control*/
					obj_dia = $('#' + tagName_dia).offset();
					posy = obj_dia.top + ($(this).height()*1.2 );
					scrPos = $(this).height()*1.2 * id_dia;
					scrVal =$('#lContent').scrollTop() ;
					if (posy >= browserH ) {
						scrPos=scrPos+$(this).height()*1.2;
						if (scrVal > scrPos) {
							scrPos = scrVal + ($(this).height()*2.2);
						} 
						$('#lContent').scrollTop(scrVal+scrPos);						
					}
					
					loadDiaTrack(tagName_dia);	
					diaplayTrack(tagName_dia);					
				}  
			});					
		});			
		
});
