;(function($){
	//把表单转换成json对象;
    $.fn.serializeJson=function(){  
        var serializeObj={};  
        $(this.serializeArray()).each(function(){  
            serializeObj[this.name]=this.value;  
        });  
        return serializeObj;  
    }; 
    
    $.fn.setFormValue = function(jsonValue) {  
        var obj=this;  
        $.each(jsonValue, function (name, ival) {  
            var $oinput = obj.find("input[name=" + name + "]");   
            if ($oinput.attr("type")== "radio" || $oinput.attr("type")== "checkbox"){  
                 $oinput.each(function(){  
                     if(Object.prototype.toString.apply(ival) == '[object Array]'){//是复选框，并且是数组  
                          for(var i=0;i<ival.length;i++){  
                              if($(this).val()==ival[i])  
                                 $(this).attr("checked", "checked");  
                          }  
                     }else{  
                         if($(this).val()==ival)  
                            $(this).attr("checked", "checked");  
                     }  
                 });  
            }else if($oinput.attr("type")== "textarea"){//多行文本框  
                obj.find("[name="+name+"]").html(ival);  
            }else{  
                 obj.find("[name="+name+"]").val(ival);   
            }  
       })}; 
       $.fn.setFormEmpty = function() {  
           var obj=this;  
           $.each(function (name, ival) {  
               var $oinput = obj.find("input[name=" + name + "]");   
               if ($oinput.attr("type")== "radio" || $oinput.attr("type")== "checkbox"){  
                    $oinput.each(function(){  
                    	$(this).val()=="";
                    });  
               }else if($oinput.attr("type")== "textarea"){//多行文本框  
                   obj.find("[name="+name+"]").html("");  
               }else{  
                    obj.find("[name="+name+"]").val("");   
               }  
          })}; 
})(jQuery); 


;$(function(){
	$('#common-nav .nav-title').find('li').on('click',function(){
		var titleInd=$('#common-nav .nav-title li').index(this);
		var data = $(this).attr('data');
		var ptitle = $(this).attr('ptitle');
		if(!isEmpty(data)){
			data = data.split(';');
			if(data[0].indexOf("http://")!=-1){
				window.open(data[0]);
			}else{
				if('' == data[0]){
					return;
				}
				var url = basePath +"web/"+data[0];
				var navId = data[1];
				window.location.href = url +"?navId="+navId+"&ptitle="+encodeURI(encodeURI(ptitle));
			}
		}else{
			window.location.href = basePath +"web/index.htm";
		}
	})
	
	/*$('.w-header .w-login-1').on('click',function(){
		window.location.href = basePath + $(this).attr('data');
	});
	*/
	var imgObj = $('.login-img');
	if(imgObj){
		var userTyp = imgObj.attr('data');
		var userName = imgObj.attr('title');
		loginPopover(userTyp,userName);
	}
	
	var searchObj = $('.searchContent');
	if(searchObj){
		$('.w-login .fa-search').on('click',function(){
			$('.searchContent').fadeIn('fast');
		});
		
		$('.searchContent i').on('click',function(){
			$('.searchContent').fadeOut('fast');
		});
		
		$('.searchContent input').on('keypress',function(){
			var content = $(this).val().trim();
			if(event.keyCode == "13"){
				window.location.href = basePath+'web/searchnews.htm?content='+encodeURI(encodeURI(content));
			}
		})
		$(".searchContent .search-btn").click(function(){
			window.location.href = basePath+'web/searchnews.htm?content='+encodeURI(encodeURI( $('.searchContent input').val().trim()));
		})
	}
})


/**
 * 返回顶部
 */
function returnTop(id){
	var src = basePath+'web/img/returntop.png';
	var src1 = basePath+'web/img/chat.png';
	var top = '<div class="returntop" style="border: 1px solid #dedede;position: absolute;right: 20px;bottom: 20px;background-color: #f6f7f8;height: 80px;width: 40px;z-index: 9999;">'+
			'<div title="回到顶部" onclick="backToTop(\''+id+'\')" style="height:40px;border-bottom: 1px solid #dedede;position:relative;"><img alt="" src="'+src+'" style="width: 20px;height: 20px;top: 10px;left: 8px;position: absolute;"></div>'+
			'<div title="在线咨询" onclick="chatonline()" style="height:40px;position:relative;"><img alt="" src="'+src1+'" style="width: 20px;height: 20px;top: 10px;left: 9px;position: absolute;"></div>'+
			'</div>';
	$('body').append(top);
}

function backToTop(id){
	$('#'+id).animate({scrollTop: 0},200);  
}

function chatonline(){
	showOnLine();
}

function loginPopover (userTyp,userName){
	var sysname = "";
	var href = "";
	$('#usrname').html(userName);
	if('A' == userTyp){
		sysname = "教务系统";
		href = basePath+'toIndex.do';
	}else{
		href = basePath + 'web/admissionprocess.htm';
		sysname = "教学系统";
	}
	$('#sysname').attr('href',href);
	$('#sysname').html(sysname);
	$(".login-img").on('mouseenter',function(){
		$('#userlist').fadeIn('fast');
	}).on('mouseleave',function(){
		setTimeout(function(){
			$('#userlist').fadeOut('fast');
		},5000);
	});
	
	$(".login-img").on('click',function(){
		var typ = $(this).attr('data');
		if('A' == typ){
			window.location.href = basePath+'toIndex.do';
		}else{
			window.location.href = basePath + 'web/admissionprocess.htm';
		}
	});
}

/**
 * 判断非空
 */
function isEmpty(str){
	if('' == str || 'null' == str || 'undefined' == str || undefined == str || null == str){
		return true;
	}
	return false;
}

/**
 * 提示框
 */
function messageDialogShow(title,content,type){
	if(isEmpty(type)){
		$('#dicon-yes').show();
		$('#dicon-no').hide();
		$('#dicon-warn').hide();
	}else if (2 == type){
		$('#dicon-yes').hide();
		$('#dicon-no').show();
		$('#dicon-warn').hide();
	}else if (3 == type){
		$('#dicon-yes').hide();
		$('#dicon-no').hide();
		$('#dicon-warn').hide();
	}else{
		$('#dicon-yes').hide();
		$('#dicon-no').hide();
		$('#dicon-warn').show();
	}

	$('#dialogmodaltitle').html(title);
	$('#dialogmodalcontent').html(content);
	$('#dialogmodal').modal('show');
};


/**
 * 提示框
 */
function messageDialogShow(title,content,type,width){
	if(isEmpty(type)){
		$('#dicon-yes').show();
		$('#dicon-no').hide();
		$('#dicon-warn').hide();
	}else if (2 == type){
		$('#dicon-yes').hide();
		$('#dicon-no').show();
		$('#dicon-warn').hide();
	}else if (3 == type){
		$('#dicon-yes').hide();
		$('#dicon-no').hide();
		$('#dicon-warn').hide();
	}else{
		$('#dicon-yes').hide();
		$('#dicon-no').hide();
		$('#dicon-warn').show();
	}
	$('#dialogmodaltitle').html(title);
	$('.modal-dialog').css('width',width);
	$('#dialogmodalcontent').html(content);
	$('#dialogmodal').modal('show');
};

function loadWaittingMask(id){
	var height = $(window).height();     
	var width = window.screen.width;     
	var leftW = 300;     
	if(width>1200){     
	   leftW = 500;     
	}else if(width>1000){     
	   leftW = 350;     
	}else {     
	   leftW = 100;     
	}
	var loadingImg = basePath + 'web/css/images/webloading.gif';
	var _html = "<div id='waittingmask' style=\"position:absolute;left:0;width:100%;cursor:wait;height:" + height + "px;" +
		"z-index:1000;top:0;opacity:0.8;filter:alpha(opacity=80);\">" +
	 	"<div style=\"position:absolute;left:53%;top:40%;width:auto;height:16px;color:#000;\"><img src='" + loadingImg + "' /></div>" +
	 	"</div>"; 
	$(_html).appendTo('#'+id);
	setTimeout(removeWaittingMask,60000);
}

function removeWaittingMask(){
	if($('#waittingmask')){
		$('#waittingmask').remove();
	}
}

function showCountDown(second,divname) { 
	var hour=Math.floor(second/3600); 
	var minute=Math.floor((second-hour*3600)/60); 
	var second=Math.floor(second-hour*3600-minute*60); 
	var cc = document.getElementById(divname); 
	if(hour < 10){
		hour = '0' + hour;
	}
	if(minute < 10){
		minute = '0' + minute;
	}
	if(second < 10){
		second = '0' + second;
	}
	cc.innerHTML = hour + " : " + minute + " : " + second; 
} 

function setContent(id,content){
	var iobj = document.getElementsByTagName('iframe');
	var length = iobj.length;
	for(var i=0;i<length;i++){
		var t = iobj[i];
		var textarea = $(t).attr('textarea');
		if(id == textarea){
			var iframId = $(t).attr('id');
			var obj = document.getElementById(iframId).contentWindow;
			var body = obj.document.getElementsByTagName('body')[0];
			if(isEmpty(content)){
				$(body).empty();
			}else{
				$(body).append(content);
			}
		}
	}
}

var REPORTPATH = 'http://wljy.whut.edu.cn:8080/';
function reportPath(){
	var reportPath = '';
	if (basePath.indexOf('wljy.whut.edu.cn') != -1) {
		reportPath = REPORTPATH;
	}else{
		reportPath = basePath;
	}
	return reportPath;
}



