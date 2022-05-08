<template>
	<view class="wrapper">
		<view class="title">
			<view class="aa">

			</view>
			<text class="title-text">{{title}}</text>
			<view class="icon" @click="handlerClick">
				<text>换一换</text>
				<text class="iconfont icon-huanyihuan" v-bind:class="{r:isR}"></text>
			</view>
		</view>
		<view class="img-box">
			<image v-for="(item,index) in data" :src="item.url" @click="to(item.url)"></image>
		</view>
	</view>
</template>

<script>
	export default {
		props: ["title", "data", "i"],
		data() {
			return {
				isR: false
			}
		},
		methods: {
			to(url) {
				uni.navigateTo({
					url: "../../pages/viewImg/viewImg" + `?url=${url}&type=${this.title}`
				})
			},
			handlerClick() {
				this.isR = true;
				setTimeout(() => {
					this.isR = false;
				}, 1000)
				this.$emit("upload", {
					i: this.i,
					type: this.title
				})
			}
		}
	}
</script>

<style scoped>
	@keyframes myfirst {
		from {
			transform: rotateZ(0deg);
		}

		to {
			transform: rotateZ(360deg);
		}
	}

	.r {
		animation: myfirst 1s infinite;
	}

	.wrapper {
		background-color: rgba(0, 0, 0, 0.5);
		width: 95%;
		margin: 30rpx auto;
		box-sizing: border-box;
		border-radius: 20rpx;
		padding: 0 30rpx;
		padding-bottom: 10rpx;
	}

	.title {
		display: flex;
		align-items: center;
		margin-top: 10rpx;
		padding: 10rpx 0;
	}

	.aa {
		width: 10rpx;
		height: 30rpx;
		margin-right: 10rpx;
		background-color: #2ca2ad;
	}

	.title {
		color: #2ca2ad;
	}


	.title .title-text {
		flex: 5;
	}

	.title .icon {
		display: flex;
		align-items: center;
		font-size: 24rpx;
		flex: 1;
	}

	.img-box {
		box-sizing: border-box;
		background-color: rgba(0, 0, 0, 0.5);
		border-radius: 20rpx;
		padding: 0 10rpx;
		padding-top: 15rpx;

		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.img-box image {
		width: 24%;
		height: 139rpx;
		overflow: hidden;
		margin-bottom: 20rpx;
		border-radius: 20rpx;
	}
</style>
