/*  jQuery
<audio>元素標籤的一些常用屬性：
    src：音頻文件路徑。
    autobuffer：設置是否在頁面加載時自動緩衝音頻。
    autoplay：設置音頻是否自動播放。
    loop：設置音頻是否要循環播放。
    controls：設置是否顯示播放控制面板。
*/
var tfolder = "";
var active_audio="";
var tpath = "";
var b = document.documentElement;
var tagName_1= "";
var typeul = "";

var obj_ul;
var posy_ul = 0;
var scrPos_ul = 0;
var scrVal_ul =0;
var ulContentH = 0;			//* ul Content 高度偵測
var ulContentW = 0;			//* ul Content 寬度偵測


//**************************************************************************************  
//匿名涵式
//**************************************************************************************    
jQuery(function ($) {
//    tpath = "https://storage.googleapis.com/tlcsrc-bucket/tlc02src/media/mp3/";
    tpath = "src/media/mp3/";
    var supportsAudio = !!document.createElement('audio').canPlayType;
	var trackCount = $("#" + typeul + " li").length; 
	
    if (supportsAudio) {       
	        var index = 0;
			var fid="";
			var listItem = "";
			var obj_Play = ""; 
			var obj_Stop = ""; 
			var obj_Prev = ""; 
			var obj_Next = ""; 
			
			if (index < 10 ) {
				listItem = $( "#NO0"+index );
			} else {
				listItem = $( "#NO"+index );				
			}
		    
			switch(typeul){
			case "jtermsul":
				active_audio="terms";
				tfolder="terms";				
			    obj_Play = '#j'+active_audio+'_Sub'+ ' #btnPlay-Pause';								
				obj_Stop = '#j'+active_audio+'_Sub'+ ' #btnStop';								
				obj_Prev = '#j'+active_audio+'_Sub'+ ' #btnPrev';								
				obj_Next = '#j'+active_audio+'_Sub'+ ' #btnNext';								
			    break;
			case "jphraseul":
				 active_audio="phrase";
				 tfolder="phrase/" + chapterID;
				 obj_Play = '#j'+active_audio+'_Sub'+ ' #btnPlay-Pause';				
 				 obj_Stop = '#j'+active_audio+'_Sub'+ ' #btnStop';												 
				 obj_Prev = '#j'+active_audio+'_Sub'+ ' #btnPrev';								
				 obj_Next = '#j'+active_audio+'_Sub'+ ' #btnNext';												 
				 break;				 
			default:
  			     active_audio ="";
				 tfolder="";
				 obj_Play = '#btnPlay-Pause';				
				 obj_Stop = '#btnStop';				
				 obj_Prev = '#btnPrev';					
				 obj_Next = '#btnNext';												 											 
				 break;							  
			}			  			  
			ulContentH = $('#uContent-' + typeul).height();			//* ul Content 高度偵測
			ulContentW = $('#uContent-' + typeul).width();         //* ul Content 寬度偵測
			  
			fid = $('#' + typeul + '>li>a').attr('data-tid');			
			
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),		
            audio = $("#jaudio_"+active_audio).bind('play', function () {
                playing = true;				
                npAction.text('Now Playing...     曲目： ' + fid);						
            }).bind('pause', function () {
                playing = false;
                npAction.text('Paused......     曲目： ' + fid);
				PauseOn();
            }).bind('ended', function () {
                npAction.text('Paused......     曲目： ' + fid);
				if ((index + 1) < trackCount) {
					index++;
					loadTrack(index);
					audio.play();
					PlayOn();
				} else {
					audio.pause();
					PauseOn();
					index = 0;
					loadTrack(index);
				}				
            }).get(0),
			audio.onseeking = function() {
                npAction.text('曲目： ' + fid);
			},			
			audio.onloadedmetadata = function() {
//				npTitle.text('00:00 / ' + timeFormat(audio.duration));	
			},
			audio.onplaying = function() {
				PlayOn();
			},						
			li = $('#' + typeul +' li > a').click(function () {				
       			alert('this.id = ' + $('#' + typeul + " li a").attr('id') + " --- typeul=" + typeul);			  
			    var listItem = $('#' + typeul + " li a").attr('id');			//$('#'+this.id);   
                var id =  $('#' + typeul +' li a').index( listItem );	
				
				playing = false;			//test
				if (id !== index) {
                    playTrack(id);
                }				
            }),								
            loadTrack = function (id) {
				$('#' + typeul +' a').css("color","");
				$('#' + typeul +' a').css("font-weight","normal");
				
				fid =$('#' + typeul +' li a').eq(id).attr('data-tid');			
				tagName_1 ="#"+ $('#' + typeul +' li a').eq(id).attr('id');
				
				obj_Play = '#j'+active_audio+'_Sub'+ ' #btnPlay-Pause';								
				
				$('#' + typeul + ' ' + tagName_1).css("color","#e63900");
			    $('#' + typeul + ' ' + tagName_1).css("font-weight","bold");				
				
				npAction.text('Paused......     曲目： ' + fid);
                index = id;
				audio.src = tpath + tfolder +"/"+ fid + '.mp3';									
				
				/* scroll */				
				obj_ul = $('#' + typeul + ' ' + tagName_1).offset();
				if (obj_ul != null) {
				   console.log('audiolist load -- tagName_1=' + tagName_1 + ' - top=' + obj_ul.top + ' -- index =' + index);
				   
				   posy_ul = obj_ul.top - $('#' + typeul).offset().top + $('#' + typeul + ' ' +  tagName_1).height();	
				   
				   switch(typeul){					
					 case "jtermsul":
	 				   scrPos_ul = $('#' + typeul + ' ' + tagName_1).height()*1.3;	
					 case "jphraseul":
					   scrPos_ul = $('#' + typeul + ' ' + tagName_1).height();						 
				   };

				   scrVal_ul =$('#uContent-' + typeul).scrollTop() ;
				   
				   console.log('audiolist load -- posy_ul =' + posy_ul + ' ; scrPos_ul=' + scrPos_ul + ' ; scrVal_ul=' + scrVal_ul);				                   
				   var n_id = $('#' + typeul + ' ' + tagName_1).parents('li').next().attr('id');
				   //console.log('父元素 第二個<li>元素之ID名稱 ~~ '+n_id);
				   if (posy_ul >= ulContentH) {			
						scrVal_ul=scrVal_ul + scrPos_ul+ $('#' + typeul + ' ' +  tagName_1).height();
				   		console.log("HAHA~~ scrVal_ul=" + scrVal_ul + " --- typeul=" + typeul);						
						$('#uContent-' + typeul).scrollTop(scrVal_ul);																	
				   };					
				   
				   if(index == 0 && scrVal_ul>0) {
					   scrVal_ul = 0;
					   $('#uContent-' + typeul).scrollTop(scrVal_ul);	
				   };				   				  
				};
            },				
			  
	        playlistIni = function (name){  			
				//取的頁面中 PlayList = name 的元件				  
				var obj = $('#' +name).attr('id');
				trackCount = $("#" + name + " li").length; 
                index = 0
				switch(name){					
					case "jtermsul":
						active_audio="terms";
						tfolder="terms";
					    obj_Play = '#j'+active_audio+'_Sub'+ ' #btnPlay-Pause';								
						obj_Stop = '#j'+active_audio+'_Sub'+ ' #btnStop';
						obj_Prev = '#j'+active_audio+'_Sub'+ ' #btnPrev';	
						obj_Next = '#j'+active_audio+'_Sub'+ ' #btnNext';								
					    break;
					case "jphraseul":
						active_audio="phrase";
						 tfolder="phrase/" + chapterID;
						 obj_Play = '#j'+active_audio+'_Sub'+ ' #btnPlay-Pause';				
						 obj_Stop = '#j'+active_audio+'_Sub'+ ' #btnStop';
						 obj_Prev = '#j'+active_audio+'_Sub'+ ' #btnPrev';	
		 				 obj_Next = '#j'+active_audio+'_Sub'+ ' #btnNext';														 
						 break;
					default:
						 active_audio ="";						 
						 tfolder="";
 					     obj_Play = '#btnPlay-Pause';	
						 obj_Stop = '#btnStop';
						 obj_Prev = '#btnPrev';	
  						 obj_Next = '#btnNext';														 
						 break;							  
				}				  
				fid = $("#" + typeul + ">li>a").attr('data-tid');
				console.log("playlistIni ~ trackCount = "+ trackCount + " tfolder=" + tfolder + " name=" + name);	       //PlayList 名稱
				console.log("playlistIni ~ -- fid = " + fid);
				  
				btn_Play = $(obj_Play).on('click', function() {
					//Play/pause the track
					if (audio.paused == false) {
						audio.pause();
						PauseOn();
					} else {
						audio.play();
						PlayOn();
					}
				});			

				btnStop = $(obj_Stop).on('click', function() {
						//Stop the track
						audio.pause();
						audio.currentTime = 0;
						PauseOn();
				});				
					
				btnPrev = $(obj_Prev).on('click', function() {
					if ((index - 1) > -1) {
						index--;
						loadTrack(index);
						audio.play();
						PlayOn();
					} else {
						audio.pause();
						PauseOn();
						index = 0;
						loadTrack(index);					
					}
				});
				btnNext = $(obj_Next).on('click', function() {
					if ((index + 1) < trackCount) {
						index++;
						loadTrack(index);
						audio.play();
						PlayOn();
					} else {
						audio.pause();
						PauseOn();
						index = 0;
						loadTrack(index);
					}
				});
				
				loadTrack(index);
			},						
	        playlistGet = function (){  			
			  //取PlayList的內容
			  var obj= $('.playlist ul');
			  for(var i = 0; i < obj.length; i++) {
				    if(typeul == obj[i].id) {
						alert("playlistClick ~ "+ i + " ~ " + obj[i].id + " ~ ");	//PlayList 名稱
						console.log("PlayListClick ~ "+ i + " ~ " + obj[i].id);	            //PlayList 名稱
					}
			  };	    
			},
			PlayOn = function() {							
  			    obj_Play = '#j'+active_audio+'_Sub'+ ' #btnPlay-Pause';				
				$(obj_Play).children('i').removeClass('fa-play');
				$(obj_Play).children('i').addClass('fa-pause');							
			},
			PauseOn = function() {
				obj_Play = '#j'+active_audio+'_Sub'+ ' #btnPlay-Pause';
				$(obj_Play).children('i').removeClass('fa-pause');
				$(obj_Play).children('i').addClass('fa-play');						
			},
            playTrack = function (id) {				
                loadTrack(id);		
                audio.play();
				PlayOn();
            };
			
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : '';		
		loadTrack(index);
    }
});