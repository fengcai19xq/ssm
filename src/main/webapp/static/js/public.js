$(function(){
	var obj={
		$title_bottom:$(".title-bottom")
	
	}
	obj.$title_bottom.on('click','a',function(){
		$(this).siblings('[data=0]').removeClass('color');
		if($(this).hasClass('color')){	
			$(this).removeClass('color');
			if($(this).siblings().hasClass('color')==false){
				$(this).siblings('[data=0]').addClass('color');
			}
		}else{
			
			$(this).addClass('color');
		}
	})
	obj.$title_bottom.on('click','[data=0]',function(){
		$(this).addClass('color').siblings().removeClass('color');
	})
})

//列表查询
function queryCondition(url) {
	var param = [];
	var form = $('<form></form>');
	form.attr('action', url);
	 form.attr('method', 'post');
    form.attr('target', '_self');
    form.appendTo("body");
    form.css('display', 'none');
	$('a.active').each(function(index, element) {
		var name = $(this).attr('name');
		var data = $(this).attr('data');
		var input = $(':input[name=' + name + ']');
		if (input.length >= 1) {
			var value = input.val();
			if(value == null || value == ''){
				value = data;
			}else{
				value = value + "," + data;
			}
			input.val(value);
		} else {
			input = $("<input type='hidden'/>")
			input.attr('name', name);
			input.attr('value', data);
			form.append(input);
		}
	});
	var begintime = $('#starttime').val();
	var endtime = $('#endtime').val();
	form
			.append($("<input type='hidden' name='starttime' value="+begintime+">"));
	form
			.append($("<input type='hidden' name='endtime' value="+endtime+">"));
	form.append($("<input type='hidden' name='keyword' value="
			+ $('#keyword').val() + ">"));
	form.append($("<input type='hidden' name='currentPage' value="
			+ $("#pagenumber").val() + ">"));
	form.append($("<input type='hidden' name='pageSize' value="
			+ $("#pagesize").val() + ">"));
	form.submit();
}
//列表导出
function queryConditionExport(exportUrl) {
	var param = [];
	var form = $('#exportForm');
	if (form.length <= 0) {
		form = $("<form id='exportForm'></form>");
		form.attr('action', exportUrl);
		form.attr('method', 'post');
	    form.attr('target', '_self');
	    form.appendTo("body");
	    form.css('display', 'none');
	}else{
		$(':input','#exportForm').val('');
	}
	$('a.active').each(function(index, element) {
		var name = $(this).attr('name');
		var data = $(this).attr('data');
		var input = $('#exportForm :input[name=' + name + ']');
		if (input.length >= 1) {
			var value = input.val();
			if(value == null || value == ''){
				value = data;
			}else{
				value = value + "," + data;
			}
			input.val(value);
		} else {
			input = $("<input type='hidden'/>")
			input.attr('name', name);
			input.attr('value', data);
			form.append(input);
		}
	});
	var begintime = $('#starttime').val();
	var endtime = $('#endtime').val();
	form.append($("<input type='hidden' name='starttime' value="+begintime+">"));
	form.append($("<input type='hidden' name='endtime' value="+endtime+">"));
	form.append($("<input type='hidden' name='keyword' value="
			+ $('#keyword').val() + ">"));
	form.submit();
}

function ajaxFileUpload(projectImg, projectName, uploadedfile, businessPkid, type) {
	var indexMsg = layer.msg("图片上传中，请稍后...", {icon: 16, time: 0, shade: 0.3});
	$.ajaxFileUpload({
		url : projectName + '/upload/uploadFile',
		secureuri : false,
		fileElementId : uploadedfile,
		dataType : 'json',
		data : {
			attachType : type,
			businessPkid : businessPkid,
		},
		success : function(data) {
			layer.close(indexMsg);
			if (data.flag != 1) {
				layer.alert('上传失败,'+data.msg, {
					icon : 0
				});
				return;
			}else{
				layer.msg('上传成功！', {icon : 1});
				var urlStr = data.url.split(".");
				var suffixName = urlStr[urlStr.length-1];
				if(suffixName=='jpg' || suffixName=='jpeg' || suffixName=='png' || 
						suffixName=='gif' || suffixName=='bmp' || suffixName=='tiff' || 
						suffixName=='ai' || suffixName=='cdr' || suffixName=='eps'
						||suffixName=='JPG' || suffixName=='JPEG' || suffixName=='PNG' || 
						suffixName=='GIF' || suffixName=='BMP' || suffixName=='TIFF' || 
						suffixName=='AI' || suffixName=='CDR' || suffixName=='EPS'){
					$("#"+type).html("<img id=\"newImg\" src=\""+data.url+"\"/>");
					//给新加载的图片绑定放大事件
				    $("#"+type+" img").click(function () {
				    	if($(this).attr("src") != null && $(this).attr("src").trim() != "" && !$(this).attr("data")){
				    		imgPop($(this));
				    	}
				    });
				}else{
					$("#"+type).html("<a href='"+data.url+"' target='_blank' >" +
							"<img src='"+projectImg+"/pdf.png' data='false' alt=''/></a>");
				}
			}
		},
		error : function(data, status, e) {
			layer.close(indexMsg);
			//这里
			layer.alert('上传失败，请稍后再试！', {
				icon : 0
			});
		}
	});
}

function formatString(str){
	if(str == null || str.length == 0){
		return "";
	}
	return str;
}

//格式化金额，实现每几位一个逗号,其中n为参数每几位的值
function formatCash(s, n,sign) {
	if(typeof(sign) == "undefined") sign="￥";
	if (!s) {
		return sign+'0.00';
	}
	n = n > 0 && n <= 20 ? n : 2; 
	s = parseFloat(s);
	s=s.toFixed(n); 
	s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
	var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
	t = "";
	for (i = 0; i < l.length; i++) {
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
	}
	// 可能会出现-,100.00这样的错误格式
	rslt = t.split("").reverse().join("") + "." + r;
	rslt = rslt.replace("-,", "-");
	return sign+rslt;
}

function initTableTr(table, array){
	if(table.length == 0 || array == null || array.length == 0){
		return;
	}
	var ths = table.find("th");
	for(var i=0; i<array.length; i++){
		var htmlStr = "<tr>"
		for(var s=0; s<ths.length; s++){
			htmlStr += "<td>"+ array[i][ths[s].innerHTML] +"</td>";
		}
		table.append(htmlStr + "</tr>");
	}
}
