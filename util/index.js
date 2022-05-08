export function showToast(msg, duration, icon) {
	uni.showToast({
		title: msg,
		duration: duration,
		icon: icon
	});
}


export function showLoading(title = "加载中", mask = true, success, fail, complete) {
	console.log(title)
	uni.showLoading({
		title: title,
		success() {
			success && success();
		},
		fail() {
			fail && fail();
		},
		complete() {
			complete && complete();
		}
	});
}

export function hideLoading() {
	uni.hideLoading();
}
