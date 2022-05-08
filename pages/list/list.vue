<template>
	<scroll-view scroll-y="true" class="scroll" refresher-enabled @refresherrefresh="refresherrefresh"
		:refresher-triggered="refresherTriggered" @scrolltolower="scrolltolower">
		<view class="wrapper">
			<view class="cls">
				<view class="cls-box" v-bind:class="{current:i===current}" v-for="(item,i) in clsArr" :key="item.title"
					@click="handleClick(i)">
					<image :src="item.src" mode="widthFix"></image>
					<text>{{item.title}}</text>
				</view>
			</view>
			<view class="msg">
				下拉刷新
			</view>
			<view class="list">
				<view class="img-box" v-for="(item,index) in dataArr">
					<image :src="item.url" :key="item._id" @click="to(item.url)"></image>
				</view>

			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				// 心情 卡通  抖音 老婆 搞笑 可爱 小女孩 伤心 微信 蘑菇头 
				clsArr: [{
					title: "心情",
					src: "/static/01.png"
				}, {
					title: "卡通",
					src: "/static/02.png"
				}, {
					title: "抖音",
					src: "/static/03.png"
				}, {
					title: "老婆",
					src: "/static/04.png"
				}, {
					title: "搞笑",
					src: "/static/05.png"
				}, {
					title: "可爱",
					src: "/static/06.png"
				}, {
					title: "小女孩",
					src: "/static/07.png"
				}, {
					title: "伤心",
					src: "/static/08.png"
				}, {
					title: "微信",
					src: "/static/09.png"
				}, {
					title: "蘑菇头",
					src: "/static/10.png"
				}],
				current: 0,
				refresherTriggered: false,
				dataArr: []
			}
		},
		async onLoad() {
			this.db = uniCloud.database();
			this.collection = this.db.collection("imagefile");
			const res = await this.getData("心情");
			this.updata(res)
		},
		methods: {
			async handleClick(i) {
				this.current = i;
				uni.showLoading({
					title: '加载中'
				});
				const res = await this.getData(this.clsArr[this.current].title);
				this.updata(res);
				uni.hideLoading()
			},
			async refresherrefresh() {
				// 下拉刷新事件
				this.refresherTriggered = true;
				const res = await this.getData(this.clsArr[this.current].title);
				this.updata(res)
				this.refresherTriggered = false;
			},
			async getData(type) {
				const random = parseInt(Math.random() * (800 + 1), 10);
				const res = await this.collection.where({
					type: type
				}).skip(random).limit(50).get();
				return res.result.data;
			},
			updata(res) {
				this.dataArr = res;
			},
			addData(res) {
				if (Array.isArray(res)) {
					this.dataArr.push(...res);
				}
			},
			async scrolltolower() {
				uni.showLoading({
					title: '加载中'
				});
				const res = await this.getData(this.clsArr[this.current].title);
				this.addData(res);
				uni.hideLoading()
			},
			to(url) {
				uni.navigateTo({
					url: `../viewImg/viewImg?url=${url}&type=${this.clsArr[this.current].title}`
				})
			}
		}
	}
</script>

<style scoped>
	.scroll {
		height: 100vh;
		background-color: #EEEEEE;
	}

	.wrapper {
		height: 100vh;
		background-color: #ffff;
	}

	.cls {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-around;
		padding-top: 20rpx;
	}

	.cls-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 130rpx;
		margin-bottom: 20rpx;
		font-size: 24rpx;
		height: 130rpx;
		border-radius: 50%;
		border-bottom: 1rpx solid #FEC22C;
	}

	.cls-box image {
		display: block;
		width: 40%;
	}

	.cls-box.current {
		background-color: #FEC22C;
		color: #666666;
	}

	.msg {
		text-align: center;
		font-size: 24rpx;
		border-radius: 30rpx;
		padding: 10rpx 0;
		margin-bottom: 10rpx;
		background-color: #D9AFD9;
		background-image: linear-gradient(45deg, #D9AFD9 0%, #97D9E1 100%);
		color: #fff;

	}

	.list {
		display: flex;
		flex-wrap: wrap;
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
</style>
