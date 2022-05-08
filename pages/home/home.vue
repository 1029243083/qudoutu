<template>
	<view>
		<view class="search">
			<view class="search-box" @click="toSearch">
				请输入关键字
			</view>
		</view>
		<view class="banner-box">
			<swiper class="swiper" indicator-dots autoplay circular>
				<swiper-item v-for="item in bannerArr" :key="item.id">
					<view class="swiper-item uni-bg-red">
						<image :src="item.url"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<classification v-for="item in dataArr" :key="item.type" :data="item.data" :title="item.type" :i="item.i"
			@upload="upload" @changeIsR="changeIsR" />
	</view>
</template>

<script>
	import classification from "../../component/classification/classification.vue"
	export default {
		data() {
			return {
				bannerArr: [], // 轮播图的数据
				typeArr: ["微信", "蘑菇头", "抖音", "老婆"], // 分类的数据
				dataArr: [], // 数据库的数据,
			}
		},
		components: {
			classification
		},
		async onLoad() {
			uni.showLoading({
				title:"加载中"
			})
			const db = uniCloud.database();
			const collection2 = db.collection("imagefile");
			this.getBanner(this, db, collection2);
			const data = await this.getData(db, collection2);
			this.dataArr = data;
			uni.hideLoading();
		},
		methods: {
			toSearch: () => {
				uni.navigateTo({
					url: "../search/search"
				})
			},
			getBanner: async (vm, db, collection) => {
				const random = parseInt(Math.random() * (800 + 1), 10);
				const res = await collection.where({
					type: "蘑菇头"
				}).skip(random).limit(5).get()
				vm.bannerArr = res.result.data;
			},
			async getData(db, collection) {
				const arr = [];
				for (let i = 0; i < this.typeArr.length; i++) {
					const random = parseInt(Math.random() * (800 + 1), 10);
					const res = await collection.where({
						type: this.typeArr[i]
					}).skip(random).limit(4).get();
					arr[i] = {
						type: this.typeArr[i],
						data: res.result.data,
						i: i
					};
				}
				return arr;
			},
			async upload(obj) {
				const {
					i,
					type
				} = obj
				const random = parseInt(Math.random() * (800 + 1), 10);
				const db = uniCloud.database();
				const collection = db.collection("imagefile");
				const res = await collection.where({
					type: type
				}).skip(random).limit(4).get();
				this.dataArr.splice(i, 1, {
					data: res.result.data,
					i,
					type,
				})

			},
		}
	}
</script>

<style scoped>
	.banner-box {
		box-sizing: border-box;
		padding: 0 10rpx;
	}

	.swiper {
		margin-top: 10rpx;
		height: 500rpx;
	}

	.swiper-item {
		height: 100%;
		border-radius: 20rpx;
		overflow: hidden;
	}

	.search {

		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 10rpx;
	}

	.search-box {
		margin-top: 10rpx;
		text-align: center;
		width: 95%;
		padding: 10rpx 0;
		color: #666666;
		border-radius: 20rpx;
		font-size: 24rpx;
		border: 0.01rpx solid #eee;

	}

	image {
		width: 100%;
		height: 100%;
	}
</style>
