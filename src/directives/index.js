import draggable from './draggable.js';// 拖拽指令

// 所有自定义指令集合
const directivesList = {
  draggable
};

// 注册所有自定义指令
const directives = {
	install: function (app) {
		Object.keys(directivesList).forEach(key => {
			// 注册所有自定义指令
			app.directive(key, directivesList[key]);
		});
	}
};

export default directives;