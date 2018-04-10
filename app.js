//加载模块
let express = require('express');
let path = require('path');
let exphbs  = require('express-handlebars');
//加载数据库模块
let mongoose = require('mongoose');
//加载body-parser，用来处理post提交过来的数据
let bodyParser = require('body-parser');
//加载cookies模块
let Cookies = require('cookies');
//创建app应用
let app = express();

//使用hbs模板，后缀为.hbs
//app.engine('.hbs',exphbs({extname:'.hbs'}));
//app.set('view engine','.hbs');
app.engine('.html',exphbs({extname:'.html'}));
app.set('view engine','.html');
//设置模板文件存放的目录
app.set('views',path.join(__dirname,'views'))
//设置静态文件托管
app.use(express.static(path.join(__dirname, 'public')));

//bodyParser设置
app.use(bodyParser.urlencoded({extended:true}))
//设置cookies
app.use((req,res,next)=>{
	req.cookies=new Cookies(req,res);
	console.log(req.cookies.get('user'))
	next();
})
//路由
//根据不同的功能划分模块
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/main'));


//链接数据库
mongoose.connect('mongodb://127.0.0.1:27017/blog',(err)=>{
	if(err){
		console.log('数据库连接失败')
	}else{
		console.log('数据库连接成功')
	}
})
//监听http请求
app.listen(3000,'127.0.0.1');
