let express = require('express');
let router = express.Router();
let User = require('../models/User')

//统一返回格式
let responseData;
router.use((req,res,next)=>{
	responseData = {
		code:0,
		msg:''
	}
	next();
})
/*
 * 用户注册
 * 注册逻辑
 * 1 用户不能为空
 * 2 密码不能为空
 * 3 两次输入的密码必须一致
 * 
 * 1 用户是否被注册了  数据库查询
 */

router.post('/user/register',(req,res,next)=>{
	//获取提交过来的数据req.body
	let username=req.body.username;
	let password=req.body.password;
	let repassword=req.body.repassword;
	
	//用户是否为空
	if(username==''){
		responseData={
			code:1,
			msg:'用户不能为空'
		}
		res.json(responseData);
		return;
	}
	
	
	//密码是否为空
	if(password==''){
		responseData={
			code:2,
			msg:'密码不能为空'
		}
		res.json(responseData);
		return;
	}
	//两次输入密码是否一致
	if(password!=repassword){
		responseData={
			code:3,
			msg:'两次输入的密码不一致'
		}
		res.json(responseData);
		return;
	}
	//用户是否存在，数据库查找
	User.findOne({
		username:username
	}).then((userinfo)=>{
		if(userinfo){
			//数据库中有该记录
			responseData={
				code:4,
				msg:'用户名已经被注册'
			}
			res.json(responseData);
			return;
		}
		//如果没有记录，则保存用户信息到数据库中
		let user = new User({
			username:username,
			password:password
		});
		return user.save();
	}).then((newUserInfo)=>{
		responseData={
			code:0,
			msg:'注册成功'
		}
		res.json(responseData);
	})
});

/*
 * 用户登录
 */
router.post('/user/login',(req,res)=>{
	let username = req.body.username;
	let password = req.body.password;
	//用户名或密码不能为空
	if(username=='' || password==''){
		responseData = {
			code:1,
			msg:'用户名或密码不能为空'
		}
		res.json(responseData);
		return;
	}
	//查询数据库中相同用户名和密码的记录是否存在，如果存在则登录
	User.findOne({
		username:username,
		password:password
	}).then((userInfo)=>{
		if(!userInfo){
			responseData = {
				code:2,
				msg:'用户名或密码错误'
			}
			res.json(responseData);
			return;
		}else{
			//用户名和密码是正确的
			let userinfo;
			username=='admin'? userinfo='你好，你是管理员' : userinfo='你好，欢迎登录我的博客';
			responseData = {
				code:0,
				msg:'登录成功',
				username:username,
				userinfo:userinfo
			};
			//登录信息存入cookie
			let user=JSON.stringify({
				username:username,
				userinfo:userinfo
			})
//			console.log(typeof user)
			req.cookies.set('user',"1");
			res.json(responseData);
			return;
		}
		
		
	})
})
module.exports = router;
