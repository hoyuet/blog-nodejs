$(()=>{
	let loginBox=$('#login');
	let registerBox=$('#register');
	let userInfoBox=$('#userinfo');
	
	//切换到注册
	loginBox.find('.goRegister').on('click',()=>{
		registerBox.show();
		loginBox.hide();
	});
	//切换到登录
	registerBox.find('.goLogin').on('click',()=>{
		loginBox.show();
		registerBox.hide();
	});
	//注册
	registerBox.find('button').on('click',()=>{
		//通过ajax提交
		$.ajax({
			type:'post',
			url:'/api/user/register',
			data:{
				username:registerBox.find('[name="username"]').val(),
				password:registerBox.find('[name="password1"]').val(),
				repassword:registerBox.find('[name="password2"]').val()
				
			},
			dataType:'json',
			success:function(res){
				console.log(res)
				registerBox.find('.register-tips').html(`***${res.msg}***`);
				if(!res.code){
					setTimeout(()=>{
						loginBox.show();
						registerBox.hide();
					},1000);
				}
				
			}
		});
		
	})
	//登录
	loginBox.find('button').on('click',()=>{
		$.ajax({
			type:'post',
			url:'/api/user/login',
			data:{
				username:loginBox.find('[name="uname"]').val(),
				password:loginBox.find('[name="pwd"]').val()
			},
			dataType:'json',
			success:function(res){
				console.log(res)
				loginBox.find('.login-tips').html(`***${res.msg}***`);
				if(!res.code){
					setTimeout(()=>{
						userInfoBox.show();
						userInfoBox.find('.username').html(res.username);
						userInfoBox.find('.userinfo span').html(res.userinfo);
						if(res.username=='admin'){
							userInfoBox.find('.userinfo a').show();
						}
						loginBox.hide();
						
					},1000);
				}
				
			}
		});
	});
});
