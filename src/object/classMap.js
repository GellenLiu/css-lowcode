import CssMap from './cssMap'

export default class ClassMap {
	constructor() {
		this.data = new Map()
	}
	getClassContent(className) {
		return this.data.get(className)
	}
	hasClass(className) {
		return this.data.has(className)
	}
	addClass(className, cssContent = new CssMap()) {
		this.data.set(className, cssContent)
	}
	deleteClass(className) {
		this.data.delete(className)
	}
}
