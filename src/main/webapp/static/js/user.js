		//查询URL
		var queryUrl = "queryList";
		(function(){
			$(function(){
				$("#starttime,#endtime,#starttime3,#endtime4").datepicker({
					dateFormat: 'yy-mm-dd',
					changeMonth:true,
					changeYear:true,
					monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
					monthNamesShort: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
					dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
					dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
					dayNamesMin: ['日','一','二','三','四','五','六'],
					onSelect: function(dateText){
					}
				});
				
				$('#addUserForm :input').on('blur',function(){
					if($(this).val()==''){
						$(this).addClass("inputred");
					}else{
						$(this).removeClass("inputred");
					}
				});
				//点击添加用户
				$('#adduser').click(function(){
					$('#addUserForm')[0].reset(); 
					$('#addUserForm :input').removeClass("inputred");
					$('#addUserForm :input[name=userId]').attr('readOnly',false);
					
					$("#bg").css({
				        display: "block", height: $(document).height()
				    });
				    var $box = $('.popup_box');
				    $box.css({
				        //设置弹出层距离左边的位置
				        left: ($("body").width() - $box.width()) / 2 - 20 + "px",
				        //设置弹出层距离上面的位置
				        top: ($(window).height() - $box.height()) / 2 + $(window).scrollTop() + "px",
				        display: "block"
				    });
				})
				
				/* //点击确定按钮
		        $("#query").click(function() {
		        	$("#pagenumber").val('1');
					queryCondition(queryUrl);
				});*/
				
				
				//点击确定按钮
		        $("#query").click(function() {
		        	query();
				});
		        
		        //点击搜索按钮
		        $("#spanquery").click(function() {
		        	query();
				});
		        //点击清除按钮
				$("#reset").click(function() {
					$('div.col-md-11 a').removeClass('active');
					$('div.col-md-11 a[name="Status"][data=0]').addClass("active");
					$("#starttime").val('');
					$("#endtime").val('');
					$("#keyword").val('');
					query();
				});

				//点击链接提交form  构建一个隐藏的form
				$('div.selectbox a').click(function() {								  
					 if($(this).attr('name')=='Status'){//状态多选
							$(this).toggleClass('active');
							if($(this).attr('data')==0){
								$('div.col-md-11 a[name="Status"]').removeClass("active");
								$(this).addClass('active');
							}else{
								$('div.col-md-11 a[name="Status"][data=0]').removeClass("active");
							}
		             }
					 			
						if($(this).attr('name')=='addedTimeInterval'){//时间单选               	 
							$(this).toggleClass('active');
							$('div.col-md-11 a[name="addedTimeInterval"]').removeClass("active");
							$(this).addClass('active');
						}
		             				
						query();
				});
				$('ul.pagination a').click(function() {
					if($(this).parent('li').hasClass('disabled')){
						return;
					}   
					var data = $(this).attr('data');
					if(data==null){
						return;
					}
					query();
				});
				/*
				//点击分页链接
				$("#pagenumber").keyup(
					function(e) {
						this.value = this.value.replace(/[^\d]/g, '').replace(
								/(\d{4})(?=\d)/g, "$1,");
						
						if(this.value==''){
							$(this).val(1);
						}
						var totalPage = $("#totalPage").val();
						if (this.value > totalPage) {
							this.value = totalPage;
						}
						queryCondition(queryUrl);
					});
				$("#pagesize").change(function() {
					queryCondition(queryUrl);
				});
				$('ul.pagination a').click(function() {
					if($(this).parent('li').hasClass('disabled')){
						return;
					}   
					var data = $(this).attr('data');
					if(data==null){
						return;
					}
					$('#pagenumber').val(data);
					queryCondition();
				});
*/			

				function fromValid(){
					 var num = 0 ;
					 $('#addUserForm :input').each(function(i){
						  if($(this).val()==''){
								$(this).addClass("inputred");
								num++;
							}else{
								$(this).removeClass("inputred");
							}
					 });
					 if(num==0){
						 return true;
					 }else{
						 return false ;
					 }
				 }	
				
				//点击审核弹出框关闭按钮的时候，遮罩层关闭
			    $("#btnNo").click(function () {
			        $("#bg,.popup_box").css("display", "none");
			        //防止关闭审核弹出框后保留原数据
			        $("#remarkPrompt").css("display","none");
			      	$("#userName").val("");
			        $("#userId").val("");
			        $("#starttime3").val("");
			        $("#endtime4").val("");			       
			    });
				//添加用户 --保存
				$("#btnOk").click(function(){		
					if(!fromValid()){//不通过校验
						return ;
					}
					var urlStr = "addUser";
					if($('#addUserForm :input[name=pkid]').val()!=''){
						urlStr = "modifyUser" ;
					}
					$.ajax({
						type : "Post",
						url : urlStr,
						data : $('#addUserForm').serialize(),
						dataType : "json",
						async: false,
						success : function(data) {
							if ("000000"==data.resCode) {
								layer.alert('保存成功！' , function(){query();});
								 $("#bg,.popup_box").css("display", "none");
							} else {
								var msg = '';
								if(data.resMsg != null && data.resMsg != ''){
									msg = data.resMsg;
								}
								layer.alert('保存失败！' + msg, function(){query();});
								 $("#bg,.popup_box").css("display", "none");
							}
						}
					});
				});
			});
		})();
		
		//正常/停用
		function updateStatus(pkid, status){
			$.ajax({
				type : "Post",
				url : "${projectName}" + "/user/updateStatus",
				data : "pkid=" + pkid + "&status="+status,
				dataType : "json",
				async: false,
				success : function(data) {
					if (data.resResult) {
						layer.alert('操作成功！' , function(){query();});
						$("#bg,.popup_box").css("display", "none");
					} else {
						var msg = '';
						if(data.resMsg != null && data.resMsg != ''){
							msg = data.resMsg;
						}
						layer.alert('操作失败！' + msg, function(){query();});
						$("#bg,.popup_box").css("display", "none");
					}
				},
				error : function() {
					layer.alert('请求超时，请重试！', {
						icon : 0
					});
				}
			});
		}
		
		//删除用户
		 function delStatus(pkid){
				layer.confirm("确认要删除吗?", {
					icon : 3
				}, function(index) {					
					layer.close(index);
					$.ajax({
						type : "Post",
						url : "delUser",
						data : "pkid=" + pkid ,
						dataType : "json",
						async: false,
						success : function(data) {
							if ("000000"==data.resCode) {
								layer.alert('删除成功！' , function(){query();});
							} else {
								var msg = '';
								if(data.resMsg != null && data.resMsg != ''){
									msg = data.resMsg;
								}
								layer.alert('删除失败！' + msg, function(){query();});
							}
						},
						error : function() {
							layer.alert('请求超时，请重试！', {
								icon : 0
							});
						}
					});
				});			
		} 	
		 
		 
		 var table = $(".dataTables-example").dataTable({
			 bLengthChange: false,
			 bFilter: false,
			 serverSide: true,
			 iDisplayLength : 10,
			 ajax: {
				 type:'post',
				 url: queryUrl,
				 data:function(d){
					 layer.load(0,{shade:false});
					 return genHttpBody(false,d);
				 },
				 dataSrc:function(result){
					 layer.closeAll('loading');
					 return result.data;
				 }
			 },
			 columns:[
				{data:'userName',
					render:function(data, type, full, meta ){
						return  "<span>" + data + "</span>";
					}
				},
				{data:'userId',
					render:function(data, type, full, meta ){
						return "<span>" + data + "</span>";
					}	
				},
				{data:'status',
					render:function(data, type, full, meta ){
						return  "<span>" + transStatus(data) + "</span>";
					}
				},
				{data:'validStart',
					render:function(data, type, full, meta ){
						return "<span>" + formatDateTimeYmdhs(data) + "</span>";
					}
				},
				{data:'validEnd',
					render:function(data, type, full, meta ){
						return "<span>" + formatDateTimeYmdhs(data) + "</span>";
					}
				},
				{data:'addedName',
					render:function(data, type, full, meta ){
						return  "<span>" + data + "</span>";
					}
				},
			   {data:'pkid',
		       render:function(data, type, full, meta ){
		       	var result = "";
		       	result += "<a href='javascript:void(0);' onClick = 'modifyUser(" + JSON.stringify(full) + ")'>修改</a>&nbsp;&nbsp;";
		       	result += "<a href='javascript:void(0);' onClick='delStatus(" + data + ")'>删除</a></span>";
		           return result;
		   	}
			
			}]
		}); 
		 
		 function modifyUser(obj){
			 var pkid = obj.pkid ;
			 var userId = obj.userId ;
			 var userName = obj.userName ;
			 var validStart = formatDateTimeYmdhs(obj.validStart) ;
			 var validEnd = formatDateTimeYmdhs(obj.validEnd) ;
			 $('#addUserForm :input[name=pkid]').val(pkid);
			 $('#addUserForm :input[name=userId]').val(userId);
			 $('#addUserForm :input[name=userName]').val(userName);
			 $('#addUserForm :input[name=validStart]').val(validStart);
			 $('#addUserForm :input[name=validEnd]').val(validEnd);
			 $('#addUserForm :input[name=userId]').attr('readOnly',true);	
				$("#bg").css({
			        display: "block", height: $(document).height()
			    });
			    var $box = $('.popup_box');
			    $box.css({
			        //设置弹出层距离左边的位置
			        left: ($("body").width() - $box.width()) / 2 - 20 + "px",
			        //设置弹出层距离上面的位置
			        top: ($(window).height() - $box.height()) / 2 + $(window).scrollTop() + "px",
			        display: "block"
			    });
		 }


		 function transStatus(str){
			 if("10"==str){return "正常"}
			 else if("20"==str){return "停用"}
			 else{return "非正常"}
		 }
		 function genHttpBody(doUrlEncode, d) {
		 	var result = "";
		 	
		 	$('#param').find('input:hidden').each(function() {
		 		var _v = $(this).val();
		 		if(_v.substring(0,1) == ','){
		 			_v = _v.substring(1);
		 		}
		 		result = result + "&" + $(this).attr("name") + "=" +_v;
		 	});
		 	var currentPage;
		 	if (d.start == null || d.start == '') {
		 		currentPage = 1;
		 	} else {
		 		currentPage = d.start / d.length + 1;
		 	}
		 	var startTime = $('#starttime').val();
		 	var endTime = $('#endtime').val();
		 	var keyword = $('#keyword').val();
		 	result += '&starttime=' + startTime+'&endtime=' + endTime  + "&isInList=10&pageSize=" + d.length + "&currentPage="
		 			+ currentPage+"&keyword="+keyword;
		 	return result;
		 }
		 
		 function createForm(){
				var form = $('#param');
				if (form.length <= 0) {
					form = $("<form id='param'></form>");
					form.appendTo("body");
					form.css('display','none');
				}else{
					$(':input','#param').val('');
				}
				activeEach();
				layer.closeAll();
				return form;
			}
		 
		 function activeEach(){
				var form = $('#param');
				$('a.active ').each(function(index, element) {
					var name = $(this).attr('name');
					var data = $(this).attr('data');
					if(data == null || data == '0'){
						return true;
					}
					var input = $(':input[name=' + name + ']');
					
					if (input.length >= 1) {
						var value = input.val();
						input.val(value + "," + data);
					} else {
						input = $("<input type='hidden'/>")
						input.attr('name', name);
						input.attr('value', data);
						form.append(input);
					}
				});
				
			}
		 
		 function query(){
				createForm();
	        	table.fnReloadAjax();
	    		layer.load(1);
			}