const express = require('express');
let router = express.Router();

router.get('/user',(req,res,next)=>{
	let arr = [
		{name:'张1',age:11},
		{name:'张2',age:12},
		{name:'张3',age:13},
		{name:'张4',age:14},
		{name:'张5',age:15},
		{name:'张6',age:16}
	]
	res.render('home',{
		arr:arr,
		ageLimit:15
	})
});

module.exports = router;
