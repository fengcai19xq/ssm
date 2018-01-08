
$(function(){
	//indexHome.init();   
	$("#LoginName").val("");

/*    $('input').focusin(function(){
        indexHome.hideError();
    })*/
    
    function validate(loginName,loginPassword){
		if(loginName==null||loginName==''){
			//alert("亲,请输入用户名");
			indexHome.showError('请输入用户名！');
			return false;
		}else if(loginPassword==null||loginPassword==""){
			//alert("亲,密码不能为空");
			indexHome.showError('请输入密码！');
			return false ;					
		}else{
			return true ;
		}
	}
    
    $('#LoginName').on("keydown", function(event) {
    	var key = event.which;
    	if (key == 13) {
    	         event.preventDefault();
    	         $("#loginBtn").click();
    	  }
    	});
    
    $('#LoginPassword').on("keydown", function(event) {
    	var key = event.which;
    	if (key == 13) {
    	         event.preventDefault();
    	         $("#loginBtn").click();
    	  }
    	});
    
    $("#loginBtn").click(function(){
		 var a = layer.load(1);
		 var _this = $(this);
		
    	var loginName= $.trim($("#LoginName").val());
		var loginPassword = $.trim($("#LoginPassword").val());
		if(!validate(loginName,loginPassword)){
			layer.close(a);
			clearTimeout(_time);
			return;
		}
		loginChange();
		$.ajax({
            type: "post",
            url: contextPath + "/doLogin",
            data:{
            	'loginName':loginName,
            	'loginPassword':loginPassword
            },
            datatype: "json",
            async: true,
            cache:false,
            success: function (rslt) {
            	var resResult = rslt.resResult;
            	var resMsg = rslt.resMsg;
            	if(resResult){
            		layer.close(a);
        			clearTimeout(_time);
            		window.location.href = contextPath+'/customer/queryPageCustomerList';
            	}else{
            		indexHome.showError(resMsg);
            		layer.close(a);
        			clearTimeout(_time);
        			_this.text('立即登录');
        			return ;
            	}
            },error : function( xhr, status ) { 
            	
            }
		});
	});

    var indexHome = {
			init: function(){
				indexHome.login();
			},
		    //登录切换
		    login: function(){
		        $('#btn_login').click(function(){
		            $(this).hide().parent().find('span').html('<a href="">loginName</a>    欢迎来到金融CRM平台！');
		            $('#btn_register').hide();
		            $('#btn_quit').show();
		            $('.index_banner').addClass('login').find('.login_box').hide().siblings().show();
		            $('.determined').slideDown();
		        })

		        $('#btn_quit').click(function(){
		            $(this).hide().parent().find('span').html('欢迎来到金融CRM平台！');
		            $('#btn_register').show();
		            $('#btn_login').show();
		            $('.index_banner').removeClass('login').find('.login_box').show().siblings().hide();
		            $('.determined').slideUp();
		        })
		    },

		    //显示报错
		    showError: function(Msg){
		        $('.errorBox').addClass('error').find('.errorMsg').html(Msg);
		    },

		    //隐藏报错
		    hideError: function(){
		        $('.errorBox').removeClass('error').find('.errorMsg').html('请输入');
		    }    
		}
})
var _time;
function loginChange(){
	var obj = $("#loginBtn");
	var text=obj.text();
	if(text.indexOf('正在登录')<0){
		text= '正在登录.';
	}
	if(text.length==9){
		text='正在登陆.'
	}else{
		text +='.'
	}
	obj.text(text);
	_time=setTimeout("loginChange()", 1000)
}


