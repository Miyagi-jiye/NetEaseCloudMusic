/*
	需求：实现一个拖拽指令，可在父元素区域任意拖拽元素。

	思路：
		1、设置需要拖拽的元素为absolute，其父元素为relative。
		2、鼠标按下(onmousedown)时记录目标元素当前的 left 和 top 值。
		3、鼠标移动(onmousemove)时计算每次移动的横向距离和纵向距离的变化值，并改变元素的 left 和 top 值
		4、鼠标松开(onmouseup)时完成一次拖拽

	使用：在 Dom 上加上 v-draggable 即可
	<div class="dialog-model" v-draggable></div>
*/
export const draggable = {
	mounted: function (el) {
		el.style.cursor = "move";
		el.style.position = "absolute";
		// pc端拖拽
		el.onmousedown = function (e) {
			let disX = e.pageX - el.offsetLeft;// 鼠标按下时，鼠标距离元素左边的距离
			let disY = e.pageY - el.offsetTop;// 鼠标按下时，鼠标距离元素上边的距离
			el.onmousemove = function (e) {
				let x = e.pageX - disX;// 鼠标移动时，元素距离父元素左边的距离
				let y = e.pageY - disY;// 鼠标移动时，元素距离父元素上边的距离
				let maxX = el.parentNode.offsetWidth - el.offsetWidth;// 元素可移动的最大横向距离
				let maxY = el.parentNode.offsetHeight - el.offsetHeight;// 元素可移动的最大纵向距离
				if (x < 0) {
					x = 0;
				} else if (x > maxX) {
					x = maxX;
				}

				if (y < 0) {
					y = 0;
				} else if (y > maxY) {
					y = maxY;
				}
				el.style.left = x + "px";
				el.style.top = y + "px";
			};
			el.onmouseup = function () {
				el.onmousemove = el.onmouseup = null;// 鼠标松开时，移除事件
			};
		};
		// 移动端拖拽
		el.addEventListener("touchstart", function (e) {
			let disX = e.touches[0].pageX - el.offsetLeft;// 鼠标按下时，鼠标距离元素左边的距离
			let disY = e.touches[0].pageY - el.offsetTop;// 鼠标按下时，鼠标距离元素上边的距离
			el.addEventListener("touchmove", function (e) {
				let x = e.touches[0].pageX - disX;// 鼠标移动时，元素距离父元素左边的距离
				let y = e.touches[0].pageY - disY;// 鼠标移动时，元素距离父元素上边的距离
				let maxX = el.parentNode.offsetWidth - el.offsetWidth;// 元素可移动的最大横向距离
				let maxY = el.parentNode.offsetHeight - el.offsetHeight;// 元素可移动的最大纵向距离
				if (x < 0) {
					x = 0;
				} else if (x > maxX) {
					x = maxX;
				}

				if (y < 0) {
					y = 0;
				} else if (y > maxY) {
					y = maxY;
				}
				el.style.left = x + "px";
				el.style.top = y + "px";
			});
			el.addEventListener("touchend", function () {
				el.removeEventListener("touchmove", null);// 鼠标松开时，移除事件
				el.removeEventListener("touchend", null);// 鼠标松开时，移除事件
			});
		});
	}
};
export default draggable;
