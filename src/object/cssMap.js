export default class CssMap {
	data = new Map()
	constructor(className) {
		this._className = className
	}
	// 直接全部初始化，赋值, 如果css文件中已经有了对应的class
	// constructor(cssString) {}
	setClassName(className) {
		this._className = className
	}
	// 显示css内容
	showClass() {
		let css = ''
		for (let key in this) {
			let tmp = key
			// 驼峰转中划线
			if (key == '_className') {
				continue
			}
			key = key
				.substr(1)
				.replace(/([A-Z])/g, '-$1')
				.toLowerCase()
			css += key + ':' + this[tmp] + ';'
		}
		return this._className + '{' + css + '}'
	}
	// flex布局
	setFlexCenter() {
		this._display = 'flex'
		this._justifyContent = 'center'
		this._alignItem = 'center'
	}
	// 文本超出省略
	setTextEllipsis() {
		this._overflow = 'hidden'
		this._textOverflow = 'ellipsis'
		this._MsTextOverflow = 'ellipsis'
		this._whiteSpace = 'nowrap'
	}
	setPosition(mode = 'static', top = 'auto', right = 'auto', bottom = 'auto', left = 'auto') {
		this._position = mode
		this._top = top
		this._right = right
		this._bottom = bottom
		this._left = left
	}
	setWidth(width) {
		this._width = width
	}
	setHeight(height) {
		this._height = height
	}
	setMargin() {
		let args = arguments
		if (args.length == 1) {
			this._margin = args[0]
		} else if (args.length == 2) {
			this._margin = args[0] + ' ' + args[1]
		} else if (args.length == 3) {
			this._margin = args[0] + ' ' + args[1] + ' ' + args[2]
		} else if (args.length == 4) {
			this._margin = args[0] + ' ' + args[1] + ' ' + args[2] + args[3]
		}
	}
	setPadding() {
		let args = arguments
		if (args.length == 1) {
			this._padding = args[0]
		} else if (args.length == 2) {
			this._padding = args[0] + ' ' + args[1]
		} else if (args.length == 3) {
			this._padding = args[0] + ' ' + args[1] + ' ' + args[2]
		} else if (args.length == 4) {
			this._padding = args[0] + ' ' + args[1] + ' ' + args[2] + args[3]
		}
	}
	setFontColor(color) {
		this._color = color
	}
	setBackgroundImage(url) {
		this._backgroundImage = 'url(' + url + ')'
	}
	setBackgroundImagePosition() {}
	setBackgroundImageMode(mode) {
		switch (mode) {
			case 'fill': {
				this._backgroundSize = '100% 100%'
				break
			}
			case 'contain': {
				this._backgroundSize = 'contain'
				break
			}
			case 'cover': {
				this._backgroundSize = 'cover'
				break
			}
			case 'fitWidth': {
				this._backgroundSize = '100% auto'
				break
			}
			case 'fitHeight': {
				this._backgroundSize = 'auto 100%'
				break
			}
			default: {
				this._backgroundSize = '100% 100%'
				break
			}
		}
	}
	setTransform(args) {
		this._transform = args
	}
}
