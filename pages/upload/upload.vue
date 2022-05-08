<template>
	<view class="wrapper">
		<view class="type-box box">
			<text class="text">类型：</text>
			<input type="text" v-model="type" placeholder="请输入类型" />
		</view>
		<view class="alias-box box">
			<text class="text">具体类型：</text>
			<input type="text" v-model="alias" placeholder="请输入具体类型" />
		</view>
		<button class="btn" @click="uploadImg" type="primary">上传文件</button>
	</view>
</template>

<script>
	import {
		showToast,
		showLoading,
		hideLoading
	} from "../../util/index.js"
	export default {
		data() {
			return {
				type: "",
				alias: ""
			}
		},
		methods: {
			async uploadImg() {
				if (this.type.trim() === "" || this.alias.trim() === "") {
					showToast('类型或具体类型不正确', 2000, "none")
					return;
				}

				// 选择上传的图片
				const res = await uniCloud.chooseAndUploadFile({
					type: "image",
					count: 10
				})

				showLoading();
				// 调用云函数，把数据写入数据库，并且把图片保存到云存储
				const callRes = uniCloud.callFunction({
					name: "dbadd",
					data: res.tempFiles.map(item => {
						return {
							...item,
							type: this.type,
							alias: this.alias
						}
					})
				})
				if (callRes === null) {
					console.log("数据类型出错");
				}
				hideLoading();
				showToast('上传成功', 2000, "success");
				this.type = "";
				this.alias = "";
			}
		}
	}
</script>

<style scoped>
	.wrapper {
		padding: 0 10rpx;
	}

	.box {
		display: flex;
		box-sizing: border-box;
		align-items: center;
		padding: 10rpx 10rpx;
		margin-bottom: 30rpx;
	}

	.text {
		display: block;
		text-align: right;
		width: 150rpx;
		font-size: 26rpx;
	}

	.box input {
		flex: 1;
		padding: 10rpx 0;
		border: 0.01rpx solid #EBEEF5;
		border-radius: 30rpx;
		padding-left: 30rpx;
		font-size: 26rpx;
	}
</style>
