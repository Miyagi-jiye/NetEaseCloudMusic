import draggable from './draggable.js';// 拖拽指令
import preview from './preview.js';// 图片预览指令

// 所有自定义指令集合
const directivesList = {
	draggable,
	preview
};

// 注册所有自定义指令
const directives = {
	install: function (app) {
		Object.keys(directivesList).forEach(key => {
			// 注册所有自定义指令
			app.directive(key, directivesList[key]);// (指令名, 指令对象)
		});
	}
};

export default directives;