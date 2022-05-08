'use strict';
const axios = require('axios');
exports.main = async (code, context) => {
	//event为客户端上传的参数
	console.log('code', code.code)
	const url =`https://api.weixin.qq.com/sns/jscode2session?appid=${'wx16097bbb3a4b5d79'}&secret=${'5ecf54f92eb4046d9c126c5681b886ea'}&js_code=${code.code}&grant_type=authorization_code`;
	const res = await axios.get(url);
	console.log(res.data);
	//返回数据给客户端
	return res.data
};
