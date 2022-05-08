<template>
	<view class="wrapper">
		<view class="img-box">
			<image :src="url" mode="widthFix"></image>
		</view>
		<view class="btn-box">
			<button class="btn" type="primary" size="mini" open-type="share">分享</button>
			<button class="btn1" type="default" size="mini" @click="down">下载</button>
		</view>
		<view class="list-box">
			<view class="img-box" v-for="(item,index) in imgArr">
				<image :src="item.url" :key="item._id" @click="to(item.url)"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: "",
				imgArr: []
			}
		},
		async onLoad(res) {
			this.url = res.url
			const result = await this.getData(res.type);
			this.imgArr = result;
		},
		methods: {
			to(url) {
				this.url = url;
			},
			async getData(type) {
				this.db = uniCloud.database();
				this.collection = this.db.collection("imagefile");
				const random = parseInt(Math.random() * (800 + 1), 10);
				const res = await this.collection.where({
					type: type
				}).skip(random).limit(20).get();
				return res.result.data;
			},
			async down() {
				uni.showLoading({
					title: "下载中"
				})
				const res = await uni.downloadFile({
					url: this.url
				})
				if (res[1] && res[1].tempFilePath) {
					const is = await uni.saveImageToPhotosAlbum({
						filePath: res[1].tempFilePath
					})
					if (is[1] && is[1].errMsg === "saveImageToPhotosAlbum:ok") {
						uni.hideLoading();
						uni.showToast({
							title: "下载完成"
						})
					}
				}
			}
		}
	}
</script>

<style scoped>
	.list-box {
		display: flex;
		background-color: #EEEEEE;
		flex-wrap: wrap;
	}

	.list-box .img-box {
		width: 25%;
		height: 200rpx;
		box-sizing: border-box;
		padding: 7rpx;
	}

	.list-box .img-box image {
		width: 100%;
		height: 100%;
	}

	.wrapper {
		height: 100vh;
		background-color: #EEEEEE;
	}

	.img-box {
		width: 100%;
	}

	.img-box image {
		width: 100%;
	}

	.btn-box {
		text-align: center;
		/* display: flex;
		justify-content: space-around; */
	}

	.btn {
		padding: 10rpx 100rpx;
		margin-left: 40rpx;

	}

	.btn1 {
		padding: 10rpx 100rpx;
		margin-left: 40rpx;
		background-color: #008c8c;
		color: #fff;
	}
</style>
