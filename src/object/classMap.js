import CssMap from './cssMap';

export default class ClassMap {
	constructor() {
		this.data = new Map();
		this.componentStyle = ""
	}
	getClassContent(className) {
		return this.data.get(className);
	}
	hasClass(className) {
		return this.data.has(className);
	}
	addClass(className, cssContent = new CssMap()) {
		this.data.set(className, cssContent);
	}
	setClass(className, cssContent = new CssMap()) {
		this.data.set(className, cssContent);
	}
	deleteClass(className) {
		this.data.delete(className);
	}
	getContent() {
		let content = '';
		for (let item of this.data) {
			content += item[1].getContent();
		}
		console.log(content);
		return content;
	}
	cssParse(str) {
		// 模块分割
		let regEmpty = /\s/g;
		str = str.toString().replace(regEmpty, '');
		let strArr = str.toString().split('}');
		strArr.pop();
		console.log(strArr);
		for (let item of strArr) {
			let regClassName = /\..*?{/;
			let className = item.match(regClassName)[0];
			let len = className.length - 2;
			className = className.substring(1, len);
			let regAttri = /([;{\s\t\n]).*?:/g;
			let attriName = item.match(regAttri);
			console.log(attriName);
			let regAtrriValue = /:.*?;/g;
			let AtrriValue = item.match(regAtrriValue);
			console.log(AtrriValue);
			for (let attriIndex in attriName) {
				// this.
			}
		}
	}
}
