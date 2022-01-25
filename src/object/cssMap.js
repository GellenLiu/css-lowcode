export default class CssMap {
	constructor(className) {
		this.className = className
	}
	// 直接全部初始化，赋值, 如果css文件中已经有了对应的class
	// constructor(cssString) {}
	setClassName(className) {
		this.className = className
	}
	// 显示css内容
	getContent() {
		let css = ''
		for (let key in this) {
			let tmp = key
			// 驼峰转中划线
			if (key == 'className' || typeof(this[tmp]) !== 'string') {
				continue
			}
			key = key
				.substr(0)
				.replace(/([A-Z])/g, '-$1')
				.toLowerCase()
			css += key + ':' + this[tmp].toString() + ';'
		}
		return "." + this.className + '{' + css + '}'
	}
	setAnimate(animation) {
    this.animation = animation
	}
	// flex布局
	setFlexCenter() {
		this.display = 'flex'
		this.justifyContent = 'center'
		this.alignItem = 'center'
	}
	// 文本超出省略
	setTextEllipsis() {
		this.overflow = 'hidden'
		this.textOverflow = 'ellipsis'
		this.MsTextOverflow = 'ellipsis'
		this.whiteSpace = 'nowrap'
	}
	setTwoLineEllipsis(num = 2) {
		this.overflow = 'hidden'
		this.textOverflow = 'ellipsis'
		this.MsTextOverflow = 'ellipsis'
		this.lineClamp = num + '';
		this.WebkitLineClamp = num + '';
	  this.display = '-webkit-box';
		this.WebkitBoxOrient = 'vertical';
		this.whiteSpace = 'wrap';
	}
	setPosition(mode = 'static', top = 'auto', right = 'auto', bottom = 'auto', left = 'auto') {
		this.position = mode
		this.top = top
		this.right = right
		this.bottom = bottom
		this.left = left
	}
	setWidth(width) {
		this.width = width
	}
	setHeight(height) {
		this.height = height
	}
	setMargin() {
		let args = arguments
		if (args.length == 1) {
			this.margin = args[0]
		} else if (args.length == 2) {
			this.margin = args[0] + ' ' + args[1]
		} else if (args.length == 3) {
			this.margin = args[0] + ' ' + args[1] + ' ' + args[2]
		} else if (args.length == 4) {
			this.margin = args[0] + ' ' + args[1] + ' ' + args[2] + args[3]
		}
	}
	setPadding() {
		let args = arguments
		if (args.length == 1) {
			this.padding = args[0]
		} else if (args.length == 2) {
			this.padding = args[0] + ' ' + args[1]
		} else if (args.length == 3) {
			this.padding = args[0] + ' ' + args[1] + ' ' + args[2]
		} else if (args.length == 4) {
			this.padding = args[0] + ' ' + args[1] + ' ' + args[2] + args[3]
		}
	}
	setFontColor(color) {
		this.color = color
	}
	setBackgroundImage(url) {
		this.backgroundImage = 'url(' + url + ')'
	}
	setBackgroundImagePosition() {}
	setBackgroundImageMode(mode) {
		switch (mode) {
			case 'fill': {
				this.backgroundSize = '100% 100%'
				break
			}
			case 'contain': {
				this.backgroundSize = 'contain'
				break
			}
			case 'cover': {
				this.backgroundSize = 'cover'
				break
			}
			case 'fitWidth': {
				this.backgroundSize = '100% auto'
				break
			}
			case 'fitHeight': {
				this.backgroundSize = 'auto 100%'
				break
			}
			default: {
				this.backgroundSize = '100% 100%'
				break
			}
		}
	}
	setTransform(args) {
		this.transform = args
	}
}
