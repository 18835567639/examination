var second = limitTime*60;
var timer;
$(function() {
	
	//答题卡浮动
	//floatDaTika();
	
	//提交试卷
	$('.btn-mysubmit').on('click',function(){
		modalStyle('confirmmodal',180);
	});
	
	//提交试卷确定关闭窗口事件
	$('#btn-sure').on('click',function(){
		window.close();
	});
	
	//加载试题
	showQuestions();
	
});

/**
 * 答题卡浮动
 */
function floatDaTika() {
	//获取要定位元素距离浏览器顶部的距离
	var datika = $("#datika").offset().top - 15;

	//滚动条事件
	$(window).scroll(function() {
		//获取滚动条的滑动距离
		var scroH = $(this).scrollTop();
		//滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，就固定，反之就不固定
		if (scroH >= datika) {
			$("#datika").removeClass('col-md-12').addClass('col-md-2');
			$("#datika").css({
				"position" : "fixed",
				'left' : '12px',
				'top' : '0px'
			});
		} else if (scroH < datika) {
			$("#datika").removeClass('col-md-2').addClass('col-md-12');
			$("#datika").css({
				"position" : "static"
			});
		}
	});
}

/**
 * 控制模态框样式垂直居中事件
 */
function modalStyle(id,height){
	var topHeight = Math.max(0, ($(window).height() - $('#'+id).find('.modal-dialog').height()) / 2)-height;
	$('#'+id).modal({backdrop: 'static', keyboard: false});
	$('#'+id).css('display', 'block');
	$('#'+id).css({'margin-top': topHeight});
	$('#'+id).modal('show');
}

/**
 * 加载试题
 */
function showQuestions() {
	//设置模态框点击空白和键盘事件不关闭
	modalStyle('shijuanmodal',150);
	web.ajax(basePath + '/exam/paperInstance/showbeforePracticeQuestionsRecord.ajax', {
		userid:userId,instNo:instNo
	}, true, function(r) {
		$('#shijuandiv').empty();
		if (r.flag == 0) {
			$('#shijuanmodal').modal('hide');
			messageDialogShow("提示", r.msgInfo);
			return;
		} else {
			if ('' != r.paperName) {
				$("#paperName").text(r.paperName);
				$("#titleName").text(r.paperName);
				if(r.paperDetail){
					$('#datika-tmpl').tmpl(r.paperDetail).appendTo('#datika');
					$('#shijuan-tmpl').tmpl(r.paperDetail).appendTo('#shijuandiv');
					var downD = r.paperDetail.length-1;
					for(var i = 0; i <= downD; i++){
						if(r.paperDetail[i].questionList){
							var downQ = r.paperDetail[i].questionList.length-1;
							//单选   判断
							if(r.paperDetail[i].queType=='1'||r.paperDetail[i].queType=='4'){
								for(var j = 0; j <= downQ; j++){
									var result = r.paperDetail[i].questionList[j].result;
									var queNoT = r.paperDetail[i].questionList[j].queNo;
									var userAnswerT = r.paperDetail[i].questionList[j].userAnswer;
									var correctAnswerT = r.paperDetail[i].questionList[j].correctAnswer;
									var rnT = r.paperDetail[i].questionList[j].rn;
									if(r.paperDetail[i].questionList[j].userAnswer){
										if(userAnswerT != null && userAnswerT != ""){
											var obj = $('#datika').find('a');
											$('#A_'+rnT).removeClass('datikaa');
											$('#A_'+rnT).addClass('answerselect');
											$("#"+queNoT+userAnswerT+"").attr("checked", "checked");
											
										}
									}
									if(result!="1" && r.instState=="99"){
										$('#Q_'+rnT).append("<p style='color:red;padding-left:20px;font-size:15px'>错误:【"+correctAnswerT+"】</p>");
										$('#A_'+rnT).removeClass('datikaa');
										$('#A_'+rnT).addClass('answerselect');
										$('#A_'+rnT).css("background-color","red");
									}
								}
							}
							//填空
							if(r.paperDetail[i].queType!='1'&&r.paperDetail[i].queType!='3' && 
									r.paperDetail[i].queType!='4' && r.paperDetail[i].queType!='6'){
								for(var j = 0; j <= downQ; j++){
									var queNoT = r.paperDetail[i].questionList[j].queNo;
									var userAnswerT = r.paperDetail[i].questionList[j].userAnswer;
									var correctAnswerT = r.paperDetail[i].questionList[j].correctAnswer;
									var rnT = r.paperDetail[i].questionList[j].rn;
									if(userAnswerT != null && userAnswerT != ""){
										var obj = $('#datika').find('a');
										$('#A_'+rnT).removeClass('datikaa');
										$('#A_'+rnT).addClass('answerselect');
										$("#"+queNoT+"").val(userAnswerT);
									}
									if(userAnswerT!=correctAnswerT){
										$('#Q_'+rnT).append("<div style='color:red;margin-left:20px;'>正确答案："+correctAnswerT+"</div>");
										$('#A_'+rnT).removeClass('datikaa');
										$('#A_'+rnT).addClass('answerselect');
										$('#A_'+rnT).css("background-color","red");
									}
								}
							}
							//多选
							if(r.paperDetail[i].queType=='3'){
								for(var j = 0; j <= downQ; j++){
									var result = r.paperDetail[i].questionList[j].result;
									var queNoT = r.paperDetail[i].questionList[j].queNo;
									var userAnswerT = r.paperDetail[i].questionList[j].userAnswer;
									var correctAnswerT = r.paperDetail[i].questionList[j].correctAnswer;
									var rnT = r.paperDetail[i].questionList[j].rn;
									if(r.paperDetail[i].questionList[j].userAnswer){
										if(userAnswerT != null && userAnswerT != ""){
											var obj = $('#datika').find('a');
											$('#A_'+rnT).removeClass('datikaa');
											$('#A_'+rnT).addClass('answerselect');
											var userAnswerT =  userAnswerT.split(";");
											for(var k=0;k<userAnswerT.length;k++){
												$("input:checkbox[id='"+queNoT+userAnswerT[k]+"']").attr("checked","checked");
											}
											
										}
									}
									if(result!="1" && r.instState=="99"){
										$('#Q_'+rnT).append("<p style='color:red;padding-left:20px;font-size:15px'>错误:【"+correctAnswerT+"】</p>");
										$('#A_'+rnT).removeClass('datikaa');
										$('#A_'+rnT).addClass('answerselect');
										$('#A_'+rnT).css("background-color","red");
									}
								}
							}
							
						}
					}
				}else{
					$('#datika').empty();
					$('#shijuandiv').empty();
				}
				
			} else {
				$("paperName").text('暂无信息');
				$('#datika').empty();
				$('#shijuandiv').empty();
			}
			
			$('#shijuanmodal').modal('hide');
			
//			initEvent(); //注册答案选择事件
			$('input,textarea').attr("disabled","disabled");
			//试题加载完成后,考试时间倒计时
			timer = window.setInterval(function() {
				showCountDown(second, 'kaoshitimeleft');
				second--;
				if(second == -1){
					clearInterval(timer);
					modalStyle('confirmmodal',180);
				}
			}, 1000);
		}
	});
	
}

/**
 * 选择答案更新考试分数事件
 */
function initEvent() {
	//单项选择题保存事件
	$("#endExam").on("click", function() {
		window.close();
	});
}


