<template>
	<view class="content">
		<view class="user-info">
			<view class="center">
				<view class="av">
					<image v-if="!av" src="../../static/bjb.png" mode="widthFix"></image>
					<image v-else :src="av" mode="widthFix"></image>
				</view>
				<view class="name">
					{{ name }}
				</view>
				<button v-if="!name" type="primary" plain open-type="getUserInfo" @click="getuserinfo">登录</button>
			</view>
		</view>
		<view class="list">
			<view class="item" v-if="openId === 'o254S5dVq5JaP5HMdSXYsTsv40Is'">
				<text class="iconfont icon-fenxiang"></text>
				<navigator class="text" url="../upload/upload"><text>上传图片</text></navigator>
				<text class="iconfont icon-xiangyoujiantou"></text>
			</view>
			<view class="item">
				<button class="text" open-type="share" size="mini" type="primary">分享朋友</button>
			</view>
			<view class="item">
				<button class="text" open-type="contact" size="mini" type="primary">联系客服</button>
			</view>
		</view>
	</view>
</template>

<script>
	let that = null;
	export default {
		data() {
			return {
				name: "",
				av: "",
				openId: ""
			}
		},
		onLoad() {
			that = this;
		},
		methods: {
			handlefenxiang: () => {
				uni.showShareMenu({});
			},
			getuserinfo: async () => {
				const res = await uni.getUserProfile({
					desc: "desc"
				})
				that.name = res[1].userInfo.nickName;
				that.av = res[1].userInfo.avatarUrl;
				await that.getOpedId();
				console.log(that.openId)
			},
			getOpedId: async () => {
				let openId = '';
				let provider = '';
				const pro = await uni.getProvider({
					service: "oauth"
				})
				provider = pro[1].provider[0]
				const res = await uni.login({
					provider: provider,
					onlyAuthorize: true,
				});
				const code = res[1].code;
				const callRes = await uniCloud.callFunction({
					name: "loginaaa",
					data: {
						code: code
					},
				})
				that.openId = callRes.result.openid;
				console.log(that.openId)
			}
		},

	}
</script>

<style scoped>
	.content {
		height: 100vh;
		background-color: #f0f0f0;
	}

	.user-info {
		height: 40%;
		background-image: linear-gradient(135deg, #FD6585 10%, #0D25B9 100%);
	}

	.center {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.av {
		width: 200rpx;

	}

	.av image {
		border: 10rpx solid #ffffff;
		border-radius: 50%;
		width: 100%;
	}

	.name {
		margin-top: 10rpx;
		color: #fff;
	}

	.list {
		background-color: #fff;
		margin-top: 30rpx;
	}


	.item {
		border-bottom: 0.01rpx solid rgb(0, 0, 0, 0.1);
		padding: 25rpx;
		font-size: 26rpx;
		display: flex;
		align-items: center;
	}

	.text {
		flex: 5;
	}

	.iconfont {
		margin-right: 20rpx;
		flex: 0;
	}

	.icon-xiangyoujiantou {
		margin: 0;
		flex: 0;
		text-align: right;
	}
</style>
