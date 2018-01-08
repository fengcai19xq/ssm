(function(){
	jQuery.fn.extend({//要求url请求返回值为json格式，例如：[{ "code":"1001", "name":"宝山区"},{ "code":"1002", "name":"杨浦区"}];
		  inputSel: function(url,paramJson,callback) {//callback(data){{'code':01,'name':测试}}
			  var obj = $(this);
			  var tParent = obj.parent();
			  if(tParent.children(".drop_box")){
				  tParent.children(".drop_box").remove();
			  }
				  var templ ='<div class="drop_box">'+
				  '<div class="ul_box" style="width:'+($(this).prop("offsetWidth")-1)+'px;"><ul>';
			   $.getJSON(url, paramJson, function(dataJson){
				  //alert("JSON Data: " + json.users[3].name);
				  if(dataJson==''){
					  return templ+='<li>无数据</li>';
				  }else{
					  $.each(dataJson,function(i, item) {
						  templ+='<li data='+item.code+'>'+item.name+'</li>';
			            });
				  }
				  templ+='</ul></div></div>';
				  tParent.append(templ);
				  tParent.children(".drop_box").css('position','relative');
				  tParent.find(".drop_box li").each(function(){
					   $(this).css({'list-style': 'none','cursor': 'pointer','margin-top':'3px'});
					   $(this).hover(function(){
						   $(this).css({'color':'#666','background-color':'#F8F8F8'});
						  });
					   $(this).on({
						  click:function(){
							  obj.val($(this).text());
							  tParent.children(".drop_box").hide();
							  callback({'code':$(this).attr("data"),'name':$(this).text()});
							 
						  }
						  //blur:function(){alert(1);tParent.children(".drop_box").hide();}
					   });
					 });
				  tParent.find(".drop_box ul").css({'padding':'5px','margin-top':'0px','margin-bottom':'0px'});
				  tParent.find(".ul_box").css({'position':'absolute','left':'0','top': '-1px','z-index':'999',
				  	                                        'border':'1px solid #D3DDE7','background-color':'#fff','height':'auto','margin':'auto','overflow-x':'hidden'});
				  
				}); 
			   $(document).click(function (e) {
					 if(!obj.is(e.target)){
						 var isFlag = false ;
						 tParent.find(".drop_box ul li").each(function(er){
							if($(er.target).is(e.target)){
								isFlag = true ;
							} 
						 });
						 if(!isFlag){
							 tParent.children(".drop_box").hide();
						 }
					 }
					
				});
		  },
		  inputSelData:function(dataJson,callback) {//callback(data){{'code':01,'name':测试}}
			  var obj = $(this);
			  var tParent = obj.parent();
			
			  if(tParent.children(".drop_box")){
				  tParent.children(".drop_box").remove();
			  }
				  var templ ='<div class="drop_box">'+
				  '<div class="ul_box" style="width:'+($(this).prop("offsetWidth")-1)+'px;"><ul>';
			  
				  if(dataJson==''){
					  return templ+='<li>无数据</li>';
				  }else{
					  $.each(dataJson,function(i, item) {
						  templ+='<li data='+item.code+'>'+item.name+'</li>';
			            });
				  }
				  templ+='</ul></div></div>';
				  tParent.append(templ);
				  tParent.children(".drop_box").css('position','relative');
				  tParent.find(".drop_box li").each(function(){
					   $(this).css({'list-style': 'none','cursor': 'pointer','margin-top':'3px'});
					   $(this).hover(function(){
						   $(this).css({'color':'#666','background-color':'#F8F8F8'});
						  });
					   $(this).on({
						  click:function(){
							  obj.val($(this).text());
							  tParent.children(".drop_box").hide();
							  callback({'code':$(this).attr("data"),'name':$(this).text()});
							 
						  }
					   });
					 });
				  tParent.find(".drop_box ul").css({'padding':'0px','margin-top':'0px','margin-bottom':'0px'});
				  tParent.find(".ul_box").css({'position':'absolute','left':'0','top': '-1px','z-index':'999',
				  	                                        'border':'1px solid #D3DDE7','background-color':'#fff','height':'auto','margin':'auto','overflow-x':'hidden'});
				  
				$(document).click(function (e) {
					 if(!obj.is(e.target)){
						 var isFlag = false ;
						 tParent.find(".drop_box ul li").each(function(er){
							if($(er.target).is(e.target)){
								isFlag = true ;
							} 
						 });
						 if(!isFlag){
							 tParent.children(".drop_box").hide();
						 }
					 }

					
				});
		  }
	
		});
  
})();