'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event.length)
	const db = uniCloud.database();
	const collection = db.collection("imagefile");
	for (let i = 0; i < event.length; i++) {
		const {
			url,
			name,
			type,
			alias
		} = event[i];
		console.log(url, name, type, alias)
		await collection.add({ // 写入数据库
			url,
			name,
			type,
			alias
		})
	}
	//返回数据给客户端
	return event.length;
};
