<template>
	<view class="wrapper">
		<view class="search-box">
			<input type="text" v-model="val" placeholder="输入关键字" />
			<button type="primary" class="btn" @click="handleClick">搜索</button>
		</view>
		<view class="list">
			<view class="img-box" v-for="(item,index) in dataArr">
				<image :src="item.imagelink " :key="item.shortlink" @click="to(item.imagelink)"></image>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				val: "",
				dataArr: []
			}
		},
		methods: {
			async handleClick() {
				if (!this.val) return;
				const res = await uni.request({
					url: "https://api.muxiaoguo.cn/api/emoticons?&api_key=8a9eeec8cf4c8edd&tuname=" + this.val
				})
				if (!res[0] && res[1] && res[1].data) {
					this.dataArr = res[1].data.data
				}
			},
			to(url) {
				uni.navigateTo({
					url: "../viewImg/viewImg?url=" + url + "&type=蘑菇头"
				})
			}
		}
	}
</script>

<style scoped>
	.list {
		display: flex;
		flex-wrap: wrap;
		background-color: #eee;
	}


	.list .img-box {
		width: 25%;
		height: 200rpx;
		box-sizing: border-box;
		padding: 7rpx;
	}

	.list .img-box image {
		width: 100%;
		height: 100%;
	}

	.search-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		color: #666666;
		box-sizing: border-box;

		padding: 10rpx 10rpx 10rpx 10rpx;
		font-size: 24rpx;
	}

	.search-box input {
		width: 75%;
		border-radius: 20rpx;
		height: 55rpx;
		border: 0.1rpx solid #000;
	}

	.btn {
		width: 20%;
		height: 55rpx;
		font-size: 24rpx;
		border: 0rpx !important;
	}

	.wrapper {
		height: 100vh;
		background-color: #eee;
	}
</style>
