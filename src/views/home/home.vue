<template>
	<div class="home-page">
		<!-- 工具栏 -->
		<div class="tools">
			<div class="tools-wrapper">
				<div class="tools-list-tab" :class="!active ? 'tab-active' : ''" @click="switchTab(0)">结构</div>
				<div class="components-list-tab" :class="active ? 'tab-active' : ''" @click="switchTab(1)">工具</div>
			</div>
			<div class="tools-list" v-if="active">
				<div class="tools-list-item"><img src="@/assets/ruler.png" /></div>
				<div class="tools-list-item" @click="getBase64">
					<img src="@/assets/toBase64.png" />
				</div>
				<div class="tools-list-item"><img src="@/assets/getColor.png" /></div>
				<div class="tools-list-item"><img src="@/assets/getColor.png" /></div>
				<div class="tools-list-item"><img src="@/assets/getColor.png" /></div>
				<div class="tools-list-item"><img src="@/assets/getColor.png" /></div>
				<!-- 配色表 -->
				<div class="tools-list-item"><img src="@/assets/getColor.png" /></div>
			</div>
			<!-- dom结构树 -->
			<div class="components-list" @click="selectModule" v-else>
				<el-menu :unique-opened="true" :default-active="activeIndex" @open="handleOpen" @close="handleClose">
					<menutree :data="htmlTree"></menutree>
				</el-menu>
			</div>
		</div>

		<div class="views-wrapper">
			<div class="phone-type">
				<el-dropdown @command="switchPhone">
					<span class="el-dropdown-link">
						{{ currentPhone }}切换机型
						<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="1">iphone 5 (320 x 568) | Dpr:2</el-dropdown-item>
						<el-dropdown-item command="2">iphone 6/7/8 (375 x 667) | Dpr:2</el-dropdown-item>
						<el-dropdown-item command="3">iphone 6/7/8 plus (414 x 736) | Dpr:3</el-dropdown-item>
						<el-dropdown-item command="4">iphone X (375 x 812) | Dpr:3</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
			<input id="fileContent" type="file" />
			<!-- 视图栏 -->
			<div class="views">
				<iframe :class="command" ref="visualViews" id="visualViews" height="500px" width="300px"></iframe>
			</div>
			<!-- 视图缩放 -->
			<div class="views-scale">
				<div @click="reduceScale">—</div>
				<div>{{ scaleTimes }}%</div>
				<div @click="increaseScale">+</div>
			</div>
			<!-- 控制台 -->
			<!-- <div class="console">
        <input/>
      </div> -->
		</div>
		<!-- 编辑栏 -->
		<div class="edit">
			<div class="tools-wrapper">
				<div class="tools-list-tab" :class="!editActive ? 'tab-active' : ''" @click="switchEditTab(0)">设置</div>
				<div class="components-list-tab" :class="editActive ? 'tab-active' : ''" @click="switchEditTab(1)">源代码</div>
			</div>
			<!-- 设置 -->
			<div v-if="!editActive">
				<div class="edit-item">
					<label>选择模块</label>
					<el-input v-model="activeCssMap.className" placeholder="请输入class"></el-input>
				</div>
				<div class="edit-item">
					<label>位置</label>
					<el-input v-model="activeCssMap.inputPosition" placeholder="请输入位置"></el-input>
				</div>
				<div class="edit-item edit-item-wrapper">
					<label>布局</label>
					<div class="text-aligh-icon">
						<img src="@/assets/horizontal-center.png" />
					</div>
					<div class="text-aligh-icon">
						<img src="@/assets/vertical-center.png" />
					</div>
					<div class="text-aligh-icon">
						<img src="@/assets/flex-end-icon.png" />
					</div>
					<div class="text-aligh-icon">
						<img src="@/assets/flex-start-icon.png" />
					</div>
				</div>
				<div class="edit-item-wrapper">
					<div class="edit-item">
						<label>宽度</label>
						<el-input v-model="activeCssMap.width" placeholder="请输入宽度" @input="cssInput"></el-input>
					</div>
					<div class="edit-item">
						<label>高度</label>
						<el-input v-model="activeCssMap.height" placeholder="请输入高度"></el-input>
					</div>
				</div>
				<div class="edit-item">
					<label>圆角</label>
					<el-input v-model="activeCssMap.borderRadius" placeholder="请输入圆角"></el-input>
				</div>
				<div class="edit-item">
					<label>文本</label>
				</div>
				<div class="edit-item">
					<label>大小</label>
					<el-input v-model="activeCssMap.fontSize" placeholder="请输入字体大小"></el-input>
				</div>
				<div class="edit-item edit-item-wrapper">
					<label>颜色</label>
					<el-input v-model="activeCssMap.fontColor" placeholder="请输入字体颜色"></el-input>
					<el-color-picker v-model="activeCssMap.color"></el-color-picker>
				</div>
				<div class="edit-item">
					<label>省略换行</label>
					<el-dropdown @command="selectText">
						<span class="el-dropdown-link">
							自动换行
							<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="animate__fadeIn">单行省略</el-dropdown-item>
							<el-dropdown-item command="animate__fadeInDown">双行省略</el-dropdown-item>
							<el-dropdown-item command="animate__fadeInLeft">单行省略</el-dropdown-item>
							<el-dropdown-item command="animate__fadeInRight" disabled>单行省略</el-dropdown-item>
							<el-dropdown-item command="animate__fadeOutUp">单行省略</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
				<div class="edit-item edit-item-wrapper">
					<div class="text-aligh-icon">
						<img src="@/assets/text-center-icon.png" />
					</div>
					<div class="text-aligh-icon">
						<img src="@/assets/text-left-iocn.png" />
					</div>
					<div class="text-aligh-icon">
						<img src="@/assets/text-right-icon.png" />
					</div>
				</div>
				<div class="edit-item">
					<label>添加动画</label>
					<el-dropdown @command="addAnimate">
						<span class="el-dropdown-link">
							选择动画
							<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="animate__fadeIn">渐入</el-dropdown-item>
							<el-dropdown-item command="animate__fadeInDown">渐入</el-dropdown-item>
							<el-dropdown-item command="animate__fadeInLeft">左渐入</el-dropdown-item>
							<el-dropdown-item command="animate__fadeInRight" disabled>右渐入</el-dropdown-item>
							<el-dropdown-item command="animate__fadeOutUp">向上消失</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
				<el-button :class="command" type="success" @click="run">运行</el-button>
				<el-button type="success" @click="downloadCss">下载保存</el-button>
			</div>
			<!-- 源代码 -->
			<div v-else>
				<div class="source-code">
					<div class="checkTitle">.{{ this.checkTitle }}</div>
					<el-checkbox-group v-model="checkedList">
						<el-checkbox v-for="checkitem in checkList" :label="checkitem" :key="checkitem">
							<span>{{ checkitem.attri }}</span>
							:{{ checkitem.value }}
						</el-checkbox>
					</el-checkbox-group>
				</div>
			</div>
		</div>
		<!-- 弹窗 -->
		<to-base-64-dialog v-if="show64Dialog" v-on:closed="closedialog"></to-base-64-dialog>
		<div class="dialog-mask" v-if="show64Dialog" v-on:closed="closedialog"></div>
	</div>
</template>
<script>
import ClassMap from '@/object/classMap.js';
import CssMap from '@/object/cssMap.js';
import toBase64Dialog from './module/toBase64Dialog';
import ToBase64Dialog from './module/toBase64Dialog.vue';
import menutree from '@/components/menuTree.vue';
export default {
	components: { toBase64Dialog, ToBase64Dialog },
	data() {
		return {
			active: false,
			editActive: false,
			show64Dialog: false,
			currentPhone: 'iphone 6/7/8',
			scaleTimes: 170,
			command: '',
			base64: '',
			classMap: new ClassMap(), //文件所有class
			inputContent: '',
			checkTitle: '',
			checkList: [], // 源代码调试
			checkedList: [],
			activeCssMap: new CssMap(),
			activeClass: '', //选择红框
			currentClass: '',
			htmlTree: [], //dom树解析
			activeIndex: '1'
		};
	},
	components: {
		menutree
	},
	mounted() {
		let that = this;
		document.getElementById('fileContent').addEventListener('change', function () {
			console.log('input事件监听');
			let resultFile = document.getElementById('fileContent').files[0];
			that.fileInfo(resultFile);
		});
		this.addSpacingjs();
		this.settingInit();
		document.getElementById('visualViews').style.transform = `scale(${this.scaleTimes / 100})`;
    this.dragInput()
	},
	methods: {
		// 侧边栏折叠
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key + keyPath);
		},
		// 事件委托,结构选择
		selectModule(e) {
			console.log(e.target.innerText);
			this.currentClass = this.activeClass;
			this.activeClass = e.target.innerText.substring(e.target.innerText.indexOf('.') + 1);
			document.getElementById('visualViews').contentWindow.document.querySelector('.' + this.currentClass).style.outline = 'none';
			document.getElementById('visualViews').contentWindow.document.querySelector('.' + this.activeClass).style.outline = 'red solid 2px';
			this.activeCssMap = new CssMap(this.activeClass);
			this.settingInit(this.activeClass);
		},
		// 源代码调试
		handleCheckAllChange(val) {
			this.checkedCities = val ? cityOptions : [];
			this.isIndeterminate = false;
		},
		handleCheckedCitiesChange(value) {
			let checkedCount = value.length;
			this.checkAll = checkedCount === this.cities.length;
			this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
		},
		// tab切换
		switchTab(index) {
			if (index == 0) {
				this.active = false;
			} else if (index == 1) {
				this.active = true;
			}
		},
		switchEditTab(index) {
			if (index == 0) {
				this.editActive = false;
			} else if (index == 1) {
				this.editActive = true;
			}
		},
		switchPhone(command) {
			console.log('机型command: ' + command);
			if (command == 1) {
				this.$refs.visualViews.style.width = '320px';
				this.$refs.visualViews.style.height = '568px';
				this.currentPhone = 'iphone 5 (320 x 568)';
			} else if (command == 2) {
				this.$refs.visualViews.style.width = '375px';
				this.$refs.visualViews.style.height = '667px';
				this.currentPhone = 'iphone 6/7/8 (375 x 667)';
			} else if (command == 3) {
				this.$refs.visualViews.style.width = '414px';
				this.$refs.visualViews.style.height = '736px';
				this.currentPhone = 'iphone 6/7/8 plus (414 x 736)';
			} else if (command == 4) {
				this.$refs.visualViews.style.width = '375px';
				this.$refs.visualViews.style.height = '812px';
				this.currentPhone = 'iphone X (375 x 812)';
			}
		},
		reduceScale() {
			this.scaleTimes -= 10;
			document.getElementById('visualViews').style.transform = `scale(${this.scaleTimes / 100})`;
		},
		increaseScale() {
			this.scaleTimes += 10;
			document.getElementById('visualViews').style.transform = `scale(${this.scaleTimes / 100})`;
		},
		cssInput() {
			// console.log(this.activeCssMap)
			console.log(this.activeCssMap.getContent());
		},
		// 省略换行选择
		selectText(command) {
			this.command = command;
			switch (command) {
				case 'ellipsis':
					this.activeCssMap.setTextEllipsis();
					break;
				default:
					this.activeCssMap.setTextEllipsis();
					break;
			}
		},
		// 添加动画
		addAnimate(command) {
			console.log(command);
			// 要加animate__animated 才生效
			this.command = 'animate__animated ' + command;
			this.activeCssMap.animate = 'bounce 2s';
		},
		// 重置css设置选项,遍历cssmap
		settingInit(className = '') {
			let style = document.getElementById('visualViews').contentWindow.document.querySelector('style');
			console.log(style);
			// let base =  style.indexOf(className)
			// 保存上次的设置
			this.classMap.setClass(className, this.activeCssMap);
			// 更新新选择的模块设置
			this.activeCssMap = this.classMap.getClassContent(className);
			// 更新源代码编辑
			this.checkedList = [];
			this.checkList = [];
			for (let key in this.activeCssMap) {
				console.log(this.activeCssMap);
				if (key === 'className') {
					this.checkTitle = this.activeCssMap[key];
				} else {
					let attributeMap = {
						attri: '',
						value: ''
					};
					attributeMap.attri = key;
					attributeMap.value = this.activeCssMap[key];
					this.checkList.push(attributeMap);
					// console.log("attr:" + attributeMap[0]+":"+attributeMap[1])
					console.log(attributeMap);
					// this.checkedList.push(key)
				}
			}
		},
		// 添加样式到对应class
		run() {
			console.log('添加样式到对应class,写入style标签');
			if (this.classMap.hasClass(this.activeClass)) {
				this.classMap.setClass(this.activeClass, this.activeCssMap);
			} else {
				this.classMap.addClass(this.activeClass, this.activeCssMap);
			}
			console.log(this.classMap);
			let views = document.getElementById('visualViews').contentWindow.document;
			console.log(views.body);
			let style = document.createElement('style');
			style.id = 'css_id';
			style.innerText = this.classMap.getContent();
			console.log(style);
			// 删除原有的节点
			let currentStyle = document.getElementById('visualViews').contentWindow.document.getElementById('css_id');
			if (currentStyle !== null) {
				document.getElementById('visualViews').contentWindow.document.body.removeChild(currentStyle);
			}
			// 新增节点
			document.getElementById('visualViews').contentWindow.document.body.appendChild(style);
			this.settingInit();
			// this.fileInfo();
		},
		// 下载文件
		downloadCss() {
			let content = this.classMap.getContent();
			this.download(content, 'index.css');
		},
		download(content, filename) {
			var eleLink = document.createElement('a');
			eleLink.download = filename;
			eleLink.style.display = 'none';
			var blob = new Blob([content]);
			eleLink.href = URL.createObjectURL(blob);
			document.body.appendChild(eleLink);
			eleLink.click();
			document.body.removeChild(eleLink);
		},
		// 添加spacingjs,测量边距
		addSpacingjs() {
			var spacingjs = document.createElement('script');
			spacingjs.id = 'spacingjs';
			spacingjs.src = 'https://unpkg.com/spacingjs';
			document.getElementById('visualViews').contentWindow.document.body.appendChild(spacingjs);
		},
		removeSpacingjs() {
			document.getElementById('visualViews').contentWindow.document.body.removeChild(spacingjs);
		},
		// 拖拽方式导入文件
		dragInput() {
      let that = this;
			window.onload = function (ev) {
				var container = document.getElementById('visualViews').contentWindow.document;
				container.ondragenter = function () {
          console.log("ondragenter")
        };
				container.ondragover = function (e) {
          console.log("ondragover")
					//关闭默认事件
					e.stopPropagation();
					e.preventDefault();
					//设置获取模式，为复制
					e.dataTransfer.dropEffect = 'copy';
				};
				container.ondragleave = function () {
          console.log("ondragleave")
        };
				container.ondrop = function (e) {
          console.log("ondrop")
					e.stopPropagation();
					e.preventDefault();
					var file = e.dataTransfer.files;
					var file_name = file[0].name;
					console.log(file_name);
          that.fileInfo(file[0])
				};
			};
		},
		fileInfo(resultFile) {
			// let resultFile = document.getElementById('fileContent').files[0];
			if (resultFile) {
				this.file = resultFile;
				this.fileName = resultFile.name;
				let reader = new FileReader();
				reader.readAsText(resultFile, 'UTF-8');
				var fileContent;
				let that = this;
				reader.onload = function (e) {
					fileContent = e.target.result;
					// 写入内容
					document.getElementById('visualViews').contentWindow.document.write(fileContent);
					// 添加点击事件
					document.getElementById('visualViews').contentWindow.document.addEventListener('click', function (e) {
						console.log('class:' + e.target.className);
						if (e.target.className === '') {
							console.log('the class is empty!');
						} else {
							this.currentClass = this.activeClass;
							this.activeClass = e.target.className;
							document.getElementById('visualViews').contentWindow.document.querySelector('.' + this.currentClass).style.outline = 'none';
							document.getElementById('visualViews').contentWindow.document.querySelector('.' + this.activeClass).style.outline = 'red solid 2px';
							that.activeCssMap = new CssMap(e.target.className);
							that.settingInit(e.target.className);
						}
					});
					that.inputContent = fileContent;
					console.log(fileContent);
					var totalIndex = 0;
					function parseNode(node, list = that.htmlTree) {
						for (let nodeItem of node.childNodes) {
							let nodeObj = {
								id: totalIndex,
								name: '首页',
								path: totalIndex,
								icon: 'icon_hrIndex.png',
								children: []
							};
							totalIndex++;
							if (Object.prototype.toString.call(nodeItem).match(/\[object (.*?)\]/)[1] !== 'Text') {
								if (nodeItem.className !== '') {
									nodeObj.name = nodeItem.nodeName + '.' + nodeItem.className;
								} else {
									nodeObj.name = nodeItem.nodeName;
								}
								list.push(nodeObj);
							}
							if (nodeItem.childNodes.length !== 0) {
								parseNode(nodeItem, nodeObj.children);
							}
						}
					}
					// 节点树解析
					let documentText = document.getElementById('visualViews').contentWindow.document;
					let htmlNode = documentText.documentElement;
					parseNode(htmlNode, this.htmlTree);
					console.log(that.htmlTree);
					// this.htmlAnalysis()
				};
				reader.onloadend = function () {
					that.addSpacingjs();
					// 关闭后就操作不了dom了
					// document.getElementById('visualViews').contentWindow.document.close();
				};
			}
		},
		// 获取dom节点的类名
		getDomNode() {
			document.addEventListener('click', function (e) {
				console.log(e.target);
				console.log(e.className);
			});
		},
		getBase64(img) {
			console.log('getBase64()');
			this.show64Dialog = true;
			var openInput = document.createElement('input');
			openInput.style.display = 'none';
			document.body.appendChild(openInput);

			openInput.click();
			// const reader = new FileReader();
			// reader.readAsDataURL(img);
			// reader.addEventListener("load", function () {
			//   this.base64 = reader.result;
			// }, false);
		},
		closedialog(a) {
			console.log('close dialog');
			this.show64Dialog = false;
		}
	}
};
</script>
<style lang="scss" src="@/styles/home.scss"></style>
