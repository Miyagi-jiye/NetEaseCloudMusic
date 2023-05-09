// 图片预览指令，v-preview="图片地址"

export const preview = {
  mounted(el, binding) {
    const img = el;
    const src = binding.value;
    img.src = src;
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      const div = document.createElement("div");
      div.style.position = "fixed";
      div.style.top = "0";
      div.style.left = "0";
      div.style.width = "100%";
      div.style.height = "100%";
      div.style.background = "rgba(0,0,0,0.5)";
      div.style.zIndex = "999";
      div.style.display = "flex";
      div.style.justifyContent = "center";
      div.style.alignItems = "center";
      const img = document.createElement("img");
      img.src = src;
      img.style.maxWidth = "100%";
      img.style.maxHeight = "100%";
      img.style.cursor = "move";
      img.style.userSelect = "none";// 禁止选中
      img.style.position = "absolute";
      div.appendChild(img);
      document.body.appendChild(div);
      // 1.图片拖动
      let isDown = false;
      let x = 0;
      let y = 0;
      // pc端拖动事件
      img.onmousedown = function (e) {// 鼠标按下
        e.preventDefault();
        isDown = true;
        x = e.clientX - img.offsetLeft;
        y = e.clientY - img.offsetTop;
        document.onmousemove = function (e) {
          if (isDown) {
            img.style.left = e.clientX - x + "px";
            img.style.top = e.clientY - y + "px";
          }
        };
        document.onmouseup = function () {
          document.onmousemove = document.onmouseup = null;// 鼠标松开时，移除事件
        };
      };
      // 移动端拖动事件
      img.ontouchstart = function (e) {
        e.preventDefault();
        isDown = true;
        x = e.touches[0].clientX - img.offsetLeft;
        y = e.touches[0].clientY - img.offsetTop;
        document.ontouchmove = function (e) {
          if (isDown) {
            img.style.left = e.touches[0].clientX - x + "px";
            img.style.top = e.touches[0].clientY - y + "px";
          }
        };
        document.ontouchend = function () {
          document.ontouchmove = document.ontouchend = null;
        };
      };
      //2. 图片放大缩小
      let scale = 1;
      img.addEventListener("wheel", (e) => {
        e.preventDefault();
        if (e.deltaY > 0) {
          scale -= 0.1;
        } else {
          scale += 0.1;
        }
        img.style.transform = `scale(${scale})`;
      });
      // 关闭预览
      div.addEventListener("click", () => {
        document.body.removeChild(div);
      });
      img.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    });
  }
}

export default preview;