var indexHome = {
	init: function(){
		indexHome.login();
	},

    //登录切换
    login: function(){
        $('#btn_login').click(function(){
            $(this).hide().parent().find('span').html('<a href="">张三</a>    欢迎来到供应链金融平台！');
            $('#btn_register').hide();
            $('#btn_quit').show();
            $('.index_banner').addClass('login').find('.login_box').hide().siblings().show();
            $('.determined').slideDown();
        })

        $('#btn_quit').click(function(){
            $(this).hide().parent().find('span').html('欢迎来到供应链金融平台！');
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

$(function(){
	indexHome.init();

    $('#loginBtn').click(function(){
        indexHome.showError('用户名或密码错误');
    })

    $('input').focusin(function(){
        indexHome.hideError();
    })
})

