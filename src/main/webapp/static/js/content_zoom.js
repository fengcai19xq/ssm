//预览图片宽度最大值
var img_max_width = 800;
//预览图片高度最大值
var img_max_height = 600;

/* 内容页图片点击放大效果函数主体开始 */
function imgPop(_this) {
	/* 判断弹出层div是否已存在 */
	if($("#append_parent").length==0){
		$("body").append("<div id=\"append_parent\"></div>");
	}
	/* 生成HTML代码 */
	$("#append_parent")
			.html("<div id=\"imgzoom\">" +
					"<div id=\"imgzoom_zoomlayer\" class=\"zoominner\">" +
						"<p>" +
							"<span style=\"text-align:center;display:block;margin-left:10px;\"><span class='ui-artZoom-buttons'>" +
							"<a data-go='left' class='ui-artZoom-left'><span></span>左旋转</a>" +
							"<a data-go='right' class='ui-artZoom-right'><span></span>右旋转</a>" +
							"<a href='javascript:void(0);' target=\"_blank\" data-go='source' class='ui-artZoom-source'><span></span>看原图</a></span>" +
							"<span class=\"y\">" +
							"" +
							"<a title=\"关闭\" class=\"imgclose\">关闭</a></span></span>" +
						"</p>" +
						"<div id=\"imgzoom_img\" class=\"hm\" style=\"text-align: center;\">" +
							"<img src=\"\" id=\"imgzoom_zoom\" style=\"cursor:pointer;max-width:"+img_max_width
								+"px;max-height:"+img_max_height+"px;\">" +
						"</div>" +
					"</div>" +
				"</div>" +
				"<div id=\"imgzoom_cover\"></div>");

	var domHeight = $(document).height(); // 文档区域高度
	$("#imgzoom_cover").css({
		"display" : "block",
		"height" : domHeight
	});
	var imgLink = _this.attr("src");
	/* 给查看原图赋href值 */
	$(".ui-artZoom-source").attr("href", imgLink);
	/* 给弹出框图片赋src值 */
	$("#imgzoom_img #imgzoom_zoom").attr("src", imgLink);
	
	$("#imgzoom").css("display", "block");
	imgboxPlace();
	/* 关闭按钮 */
	$("#append_parent .imgclose").on('click', function() {
		$("#imgzoom").css("display", "none");
		$("#imgzoom_cover").css("display", "none");
	})
	/* 绑定图片旋转按钮事件 */
	$(".ui-artZoom-buttons a").on('click', function() {
		var dataGo = $(this).attr("data-go");
		if(dataGo == 'left'){
			$("#imgzoom_zoom").rotate(-90);
		}else if(dataGo == 'right'){
			$("#imgzoom_zoom").rotate(90);
		}
	})
	
}

/* 弹出窗口位置 */
function imgboxPlace() {
	var cwinwidth = $("#imgzoom").width();
	var cwinheight = $("#imgzoom").height();
	var browserwidth = $(window).width();// 窗口可视区域宽度
	var browserheight = $(window).height(); // 窗口可视区域高度
	var scrollLeft = $(window).scrollLeft(); // 滚动条的当前左边界值
	var scrollTop = $(window).scrollTop(); // 滚动条的当前上边界值
	var imgload_left = scrollLeft + (browserwidth - cwinwidth) / 2;
	var imgload_top = scrollTop + (browserheight - cwinheight) / 2;
	$("#imgzoom").css({
		"left" : imgload_left,
		"top" : imgload_top
	});
}

/* 图片旋转 */
jQuery.fn.rotate = function (angle, whence) {
    var p = this.get(0);
    var resize = 1;
 
    // we store the angle inside the image tag for persistence  
    if (!whence) {
        p.angle = ((p.angle == undefined ? 0 : p.angle) + angle) % 360;
    } else {
        p.angle = angle;
    }
 
    if (p.angle >= 0) {
        var rotation = Math.PI * p.angle / 180;
    } else {
        var rotation = Math.PI * (360 + p.angle) / 180;
    }
    var costheta = Math.round(Math.cos(rotation) * 1000) / 1000;
    var sintheta = Math.round(Math.sin(rotation) * 1000) / 1000;
 
    if (document.all && !window.opera) {
        var canvas = document.createElement('img');
        canvas.src = p.src;
        canvas.height = p.height;
        canvas.width = p.width;
        
        /* 调整图片最大高度 */
        if (p.width > img_max_width) {
			resize = img_max_width / p.width;
			p.height =  resize * p.height;
			p.width = img_max_width;
		};
		if (p.height > img_max_height) {
			resize = resize * img_max_height / p.height;
			p.width = img_max_height / p.height * p.width;
			p.height = img_max_height;
		};
		
        canvas.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11=" + costheta + ",M12=" + (-sintheta) + ",M21=" + sintheta + ",M22=" + costheta + ",SizingMethod='auto expand')";
    } else {
        var canvas = document.createElement('canvas');
        if (!p.oImage) {
            canvas.oImage = new Image();
            canvas.oImage.src = p.src;
        } else {
            canvas.oImage = p.oImage;
        }
        
        /* 调整图片最大高度 */
        if (canvas.oImage.width > img_max_width) {
			resize = img_max_width / canvas.oImage.width;
			canvas.oImage.height =  resize * canvas.oImage.height;
			canvas.oImage.width = img_max_width;
		};
		if (canvas.oImage.height > img_max_height) {
			resize = resize * img_max_height / canvas.oImage.height;
			canvas.oImage.width = img_max_height / canvas.oImage.height * canvas.oImage.width;
			canvas.oImage.height = img_max_height;
		};
 
        canvas.style.width = canvas.width = Math.abs(costheta * canvas.oImage.width) + Math.abs(sintheta * canvas.oImage.height);
        canvas.style.height = canvas.height = Math.abs(costheta * canvas.oImage.height) + Math.abs(sintheta * canvas.oImage.width);
 
        var context = canvas.getContext('2d');
        context.save();
        if (rotation <= Math.PI / 2) {
            context.translate(sintheta * canvas.oImage.height, 0);
        } else if (rotation <= Math.PI) {
            context.translate(canvas.width, -costheta * canvas.oImage.height);
        } else if (rotation <= 1.5 * Math.PI) {
            context.translate(-costheta * canvas.oImage.width, canvas.height);
        } else {
            context.translate(0, -sintheta * canvas.oImage.width);
        }
        context.rotate(rotation);
        context.drawImage(canvas.oImage, 0, 0, canvas.oImage.width, canvas.oImage.height);
        context.restore();
    }
    canvas.id = p.id;
    canvas.angle = p.angle;
    p.parentNode.replaceChild(canvas, p);
}
