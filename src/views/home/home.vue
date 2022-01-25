<template>
	<div class="home-page">
		<!-- 工具栏 -->
		<div class="tools">
			<div class="tools-wrapper">
				<div class="tools-list-tab" :class="!active ? 'tab-active' : ''" @click="switchTab(0)">结构</div>
				<div class="components-list-tab" :class="active ? 'tab-active' : ''" @click="switchTab(1)">工具</div>
			</div>
			<div class="tools-list" v-if="active">
				<div class="tools-list-item" @click="openRuler"><img src="@/assets/ruler.png" /></div>
				<div class="tools-list-item" @click="getBase64">
					<img src="@/assets/toBase64.png" />
				</div>
				<div class="tools-list-item" style="position: relative">
					<img src="@/assets/getColor.png" />
					<el-color-picker class="color-picker-tool"></el-color-picker>
				</div>
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
				<img src="@/assets/phoneRotate.png" @click="phoneRotate" />
				<img src="@/assets/refresh.png" @click="refreshPage" />
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
				<div class="edit-item module-edit-item">
					<label>选择模块</label>
					<el-input v-model="activeCssMap.className" placeholder="请输入class"></el-input>
					<!-- 样式库 -->
					<el-select v-model="componentStyleSelect" placeholder="默认样式" @change="componentStyleSelectHandler">
						<el-option v-for="item in componentStyleSelectOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</div>
				<div class="edit-item position-edit-item">
					<label>位置</label>
					<el-select v-model="positionSelect" placeholder="默认" @change="positionSelect">
						<el-option v-for="item in positionSelectOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
					<el-input v-model="activeCssMap.inputPosition" placeholder="x"></el-input>
					<el-input v-model="activeCssMap.inputPosition" placeholder="y"></el-input>
				</div>
				<div class="edit-item edit-item-wrapper">
					<label>主轴布局</label>
					<div class="text-aligh-icon" @click="flexMainLayout('center')">
						<img src="@/assets/horizontal-center.png" />
					</div>
					<div class="text-aligh-icon" @click="flexMainLayout('justify-center')">
						<img src="@/assets/vertical-center.png" />
					</div>
					<div class="text-aligh-icon" @click="flexMainLayout('flex-end')">
						<img src="@/assets/flex-end-icon.png" />
					</div>
					<div class="text-aligh-icon" @click="flexMainLayout('flex-start')">
						<img src="@/assets/flex-start-icon.png" />
					</div>
				</div>
				<div class="edit-item edit-item-wrapper">
					<label>交叉轴布局</label>
					<div class="text-aligh-icon" @click="flexCrossLayout('center')">
						<img src="@/assets/horizontal-center.png" />
					</div>
					<div class="text-aligh-icon" @click="flexCrossLayout('justify-center')">
						<img src="@/assets/vertical-center.png" />
					</div>
					<div class="text-aligh-icon" @click="flexCrossLayout('flex-end')">
						<img src="@/assets/flex-end-icon.png" />
					</div>
					<div class="text-aligh-icon" @click="flexCrossLayout('flex-start')">
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
				<div class="edit-item border-setting edit-item-wrapper">
					<label>边框</label>
					<el-select v-model="borderStyle" placeholder="请选择" @change="borderSelect">
						<el-option v-for="item in borderStyleOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
					<el-input class="input-border-width" v-model="activeCssMap.borderWidth" placeholder="宽度"></el-input>
					<el-input v-model="activeCssMap.borderColor" placeholder="边框颜色"></el-input>
					<el-color-picker v-model="activeCssMap.borderColor"></el-color-picker>
				</div>
				<div class="edit-item">
					<label>外边距</label>
					<el-input class="input-margin" v-model="activeCssMap.margin" placeholder=""></el-input>
					<div class="el-icon-circle-plus-outline" @click="expandMargin"></div>
					<div class="input-margin-item" style="display: none">
						<el-input-number v-model="activeCssMap.marginTop" :precision="2" :step="0.1" :max="10" placeholder="上边距"></el-input-number>
						<el-input-number v-model="activeCssMap.marginRight" :precision="2" :step="0.1" :max="10" placeholder="下边距"></el-input-number>
						<el-input-number v-model="activeCssMap.marginBottom" :precision="2" :step="0.1" :max="10" placeholder="右边距"></el-input-number>
						<el-input-number v-model="activeCssMap.marginLeft" :precision="2" :step="0.1" :max="10" placeholder="左边距"></el-input-number>
					</div>
				</div>
				<div class="edit-item">
					<label>内边距</label>
					<el-input class="input-padding" v-model="activeCssMap.padding" placeholder=""></el-input>
					<div class="el-icon-circle-plus-outline" @click="expandPadding"></div>
					<div class="input-padding-item" style="display: none">
						<el-input-number v-model="activeCssMap.paddingTop" :precision="2" :step="0.1" :max="10" placeholder="上边距"></el-input-number>
						<el-input-number v-model="activeCssMap.paddingRight" :precision="2" :step="0.1" :max="10" placeholder="下边距"></el-input-number>
						<el-input-number v-model="activeCssMap.paddingBottom" :precision="2" :step="0.1" :max="10" placeholder="右边距"></el-input-number>
						<el-input-number v-model="activeCssMap.paddingLeft" :precision="2" :step="0.1" :max="10" placeholder="左边距"></el-input-number>
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
					<el-input v-model="activeCssMap.color" placeholder="请输入字体颜色"></el-input>
					<el-color-picker v-model="activeCssMap.color"></el-color-picker>
				</div>
				<div class="edit-item edit-item-wrapper">
					<label>文本对齐</label>
					<div class="text-aligh-icon">
						<img src="@/assets/text-center-icon.png" />
					</div>
					<div class="text-aligh-icon">
						<img src="@/assets/text-left-iocn.png" />
					</div>
					<div class="text-aligh-icon">
						<img src="@/assets/text-right-icon.png" />
					</div>
					<div class="text-aligh-icon">
						<img src="@/assets/both-ends.png" />
					</div>
				</div>
				<div class="edit-item">
					<label>省略换行</label>
					<el-select v-model="ellipsisSelect" placeholder="请选择" @change="ellipsisSelectHandler">
						<el-option v-for="item in ellipsisSelectOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</div>
				<div class="edit-item edit-item-wrapper edit-item-pic">
					<label>图片设置</label>
					<el-popover placement="right" width="400" trigger="click">
						<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
							<el-form-item label="CDN地址" prop="name" class="cdn-text">
								<el-input v-model="ruleForm.name"></el-input>
							</el-form-item>
							<el-form-item label="是否上传" prop="delivery">
								<el-switch v-model="ruleForm.delivery"></el-switch>
							</el-form-item>
							<el-form-item label="是否压缩" prop="delivery">
								<el-switch v-model="ruleForm.delivery"></el-switch>
							</el-form-item>
							<el-form-item label="压缩效果" prop="name">
								<el-input-number v-model="activeCssMap.paddingTop" :precision="2" :step="0.1" :max="1" placeholder="上边距"></el-input-number>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
								<el-button @click="resetForm('ruleForm')">重置</el-button>
							</el-form-item>
						</el-form>
						<div class="pic-setting" slot="reference"></div>
					</el-popover>
					<div class="picture-wrapper">
						<!-- <div class="pic-input-select" @click="picSelect"></div> -->
						<el-upload
							:limit="1"
							:drag="true"
							:on-success="selectPic"
							:on-error="selectPic"
							action="https://jsonplaceholder.typicode.com/posts/"
							list-type="picture-card"
							:on-preview="handlePictureCardPreview"
							:on-remove="handleRemove"
						>
							<i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="" />
						</el-dialog>
					</div>
				</div>
				<div class="edit-item">
					<label>图片名称：</label>
					<el-input v-model="activeCssMap.backgroundImage"></el-input>
				</div>
				<div class="edit-item">
					<label>图片模式</label>
					<el-dropdown @command="backgroundMode" trigger="click">
						<span class="el-dropdown-link">
							{{ bgMode }}
							<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="contain">contain</el-dropdown-item>
							<el-dropdown-item command="cover">cover</el-dropdown-item>
							<el-dropdown-item command="fitWidth">fitWidth</el-dropdown-item>
							<el-dropdown-item command="fitHeight">fitHeight</el-dropdown-item>
							<el-dropdown-item command="repeat">repeat</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
				<div class="edit-item">
					<label>添加动画</label>
					<el-dropdown @command="addAnimate" trigger="click">
						<span class="el-dropdown-link">
							{{ animateSelect }}
							<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="fadeIn">渐入</el-dropdown-item>
							<el-dropdown-item command="fadeInDown">渐入</el-dropdown-item>
							<el-dropdown-item command="fadeInLeft">左渐入</el-dropdown-item>
							<el-dropdown-item command="fadeInRight" disabled>右渐入</el-dropdown-item>
							<el-dropdown-item command="fadeOutUp">向上消失</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
				<div class="edit-item">
					<label>动画时长</label>
					<el-input v-model="activeCssMap.animationDuration" placeholder=""></el-input>
				</div>
				<el-button type="success" @click="run">运行</el-button>
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
		<basetodialog v-if="show64Dialog" v-on:closed="closedialog"></basetodialog>
		<div id="ruler" :draggable="true"></div>
		<div class="dialog-mask" v-if="show64Dialog" v-on:closed="closedialog"></div>
	</div>
</template>
<script>
import ClassMap from '@/object/classMap.js';
import CssMap from '@/object/cssMap.js';
import basetodialog from '@/views/home/module/basetodialog.vue';
import menutree from '@/components/menuTree.vue';
import ImageCompressor from '@/assets/image-compressor.min.js';
export default {
	components: { basetodialog, menutree },
	data() {
		return {
			active: false,
			editActive: false,
			show64Dialog: false,
			currentPhone: 'iphone 6/7/8',
			scaleTimes: 170,
			command: 1,
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
			activeIndex: '1',
			dialogImageUrl: '',
			dialogVisible: false,
			unflodMargin: false,
			unflodPadding: false,
			file: null,
			bgMode: 'contain',
			animateSelect: '无',
			selectClassFlag: false,
			borderStyleOptions: [
				{
					value: 'solid',
					label: '实线'
				},
				{
					value: 'dashed',
					label: '虚线'
				},
				{
					value: 'none',
					label: '无边框'
				},
				{
					value: 'double',
					label: '双边框'
				},
				{
					value: 'outset',
					label: '3d突出'
				}
			],
			borderStyle: '实线', //边框设置
			ruleForm: {
				name: '',
				region: '',
				date1: '',
				date2: '',
				delivery: false,
				type: [],
				resource: '',
				desc: ''
			},
			rules: {
				name: [
					{ required: true, message: 'cdn地址', trigger: 'blur' },
					{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				region: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
				date1: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
				date2: [{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }],
				type: [{ type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }],
				resource: [{ required: true, message: '请选择活动资源', trigger: 'change' }],
				desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
			},
			rulerVisible: false,
			positionSelect: '默认',
			positionSelectOptions: [
				{
					value: 'static',
					label: '默认'
				},
				{
					value: 'relative',
					label: '相对自身偏移'
				},
				{
					value: 'absolute',
					label: '相对非默认父盒子绝对定位'
				},
				{
					value: 'fixed',
					label: '相对浏览器窗口'
				}
			],
			ellipsisSelect: '自动换行',
			ellipsisSelectOptions: [
				{
					value: 'auto',
					label: '自动换行'
				},
				{
					value: 'aLineEllipsis',
					label: '单行省略'
				},
				{
					value: 'twoLineEllipsis',
					label: '双行省略'
				},
				{
					value: 'noneLineEllipsis',
					label: '不换行'
				},
				{
					value: 'thirdLineEllipsis',
					label: '三行省略'
				}
			],
			componentStyleSelect: '默认样式',
			componentStyleSelectOptions: [
				{
					value: '',
					label: '默认样式'
				},
				{
					value: 'qqSpeed',
					label: 'QQ飞车'
				},
				{
					value: 'pvp',
					label: '王者荣耀'
				},
				{
					value: 'gp',
					label: '和平精英'
				},
				{
					value: 'hlddz',
					label: '欢乐斗地主'
				}
			]
		};
	},
	components: {
		menutree
	},
	mounted() {
		let text = require('../../styles/styleStore/app.js');
		console.log(text.style);

		this.switchPhone(this.command);
		let that = this;
		document.getElementById('fileContent').addEventListener('change', function () {
			console.log('input事件监听');
			let resultFile = document.getElementById('fileContent').files[0];
			this.file = resultFile;
			that.fileInfo(resultFile);
		});
		this.addSpacingjs();
		this.settingInit();
		document.getElementById('visualViews').style.transform = `scale(${this.scaleTimes / 100})`;
		this.dragInput();
		this.classMapInit();
		let ruler = document.getElementById('ruler');
		ruler.ondragover = function (e) {
			console.log('ondragover');
			console.log(e.pageX);
			//关闭默认事件
			that.rulerTool(e.pageX, e.pageY);
			e.stopPropagation();
			e.preventDefault();
		};
	},
	methods: {
		// 点到点连线，的距离
		distanceP2P() {},

		// 直尺位置
		openRuler() {
			this.rulerVisible = !this.rulerVisible;
			let ruler = document.getElementById('ruler');
			if (!this.rulerVisible) {
				ruler.style.display = 'none';
			} else {
				ruler.style.display = 'block';
			}
		},
		rulerTool(x, y) {
			let ruler = document.getElementById('ruler');
			ruler.style.left = x + 'px';
			ruler.style.top = y + 'px';
			console.log(ruler);
		},
		// 布局设置
		flexMainLayout(mode) {
			this.activeCssMap.display = 'flex';
			switch (mode) {
				case 'center':
					this.activeCssMap.justifyContent = 'center';
					break;
				case 'flex-end':
					this.activeCssMap.justifyContent = 'flex-end';
					break;
				case 'flex-start':
					this.activeCssMap.justifyContent = 'flex-start';
					break;
				default:
					this.activeCssMap.justifyContent = 'center';
					break;
			}
		},
		flexCrossLayout(mode) {
			this.activeCssMap.display = 'flex';
			switch (mode) {
				case 'center':
					this.activeCssMap.alignItems = 'center';
					break;
				case 'flex-end':
					this.activeCssMap.alignItems = 'flex-end';
					break;
				case 'flex-start':
					this.activeCssMap.alignItems = 'flex-start';
					break;
				default:
					this.activeCssMap.alignItems = 'center';
					break;
			}
		},
		expandMargin() {
			if (this.unflodMargin) {
				document.querySelector('.input-margin-item').style.display = 'none';
			} else {
				document.querySelector('.input-margin-item').style.display = 'block';
			}
			this.unflodMargin = !this.unflodMargin;
		},
		expandPadding() {
			if (this.unflodPadding) {
				document.querySelector('.input-padding-item').style.display = 'none';
			} else {
				document.querySelector('.input-padding-item').style.display = 'block';
			}
			this.unflodPadding = !this.unflodPadding;
		},
		borderSelect(e) {
			this.activeCssMap.borderStyle = e;
		},
		picSelect() {
			var obj = document.createElement('input');
			obj.type = 'file';
			obj.id = 'picSelect';
			console.log(obj);

			let that = this;
			obj.addEventListener('change', function () {
				console.log('input事件监听');
				let resultFile = obj.files[0];

				var reader = new FileReader();
				reader.onload = function () {
					that.compressImage(reader.result);
				};
				reader.readAsDataURL(resultFile);
			});
			obj.click();
		},
		// canvas 压缩图片
		compressImage(imgFile) {
			console.log('开始压缩');
			console.log(imgFile);
			new ImageCompressor(imgFile, {
				quality: 0.6,
				success(result) {
					console.log('压缩完成');
					console.log(result);
					// const formData = new FormData(); // FormData学习地址 https://developer.mozilla.org/zh-CN/docs/Web/API/FormData
					// formData.append('file', result, result.name);

					// 通过XMLHttpRequest服务发送压缩的图像文件-Send the compressed image file to server with XMLHttpRequest.
					// axios.post('/path/to/upload', formData).then(() => {
					// 	console.log('Upload success');
					// });
				},
				error(e) {
					console.log('error');
					console.log(e.message);
				}
			});
		},
		// 图片上传CDN
		putImgCDN(url, file) {
			// 需要配置跨域访问、AWS签名认证(临时签名需要从后端动态获取)
			let AccessKey = 'AKID6W7c-uinfVQBF5TE5ztAYxS6St3RlcySSA8ZYflLLS6zW1F42jYOaooyCWGHW6R0';
			let SecretKey = '4ZatXKEE33GXnk/y+hrQYK6R3bBRRQ0yXUnvq81AtQ4=';
			let SessionToken =
				'ZniDSrt709rbILeb5q2ESrC3IbvzxWbae5787b1c3d2b057490dc9e71f844614bXo41xKKgiPhb2l-QzkIM3YqtBIATNsQjMwbLagggPw4GiX5ysGBLfdnNQWM55guwZxi9HKf5Z-SUqONs78c29AlvJr7KlqjxYG9LnLHQAeSXi7_qdscI2pJ1liv8WHqcIK6Gag_NsPrJUOFr1tpAdbCsWjegBi5TuIK0w-q85Nt3d0LMySWNwq1bZ91xFRsL7Fjo62r8wpLQyN0eM2NDgwOtfWwV6-icUcyIaQF6diKyGb-xL9AHp8QJCMuJm-wpOBfS8A8yZVLpBfxpRBx9eTVwxrty_5lr5wWPt3mYjrs';

			let auth = 'Authorization: AWS ' + AccessKey + ':' + SecretKey;
			var xhr = new XMLHttpRequest();
			xhr.open('PUT', url, true);
			xhr.setRequestHeader('Authorization', auth);
			xhr.send(file);
		},

		//图片设置
		handleRemove(file, fileList) {
			console.log(file, fileList);
		},
		handlePictureCardPreview(file) {
			console.log(2);
			this.dialogImageUrl = file.url;
			// this.dialogVisible = true;
		},
		selectPic(event, file, fileList) {
			console.log('file-url:' + file.url);
			this.activeCssMap.backgroundImage = 'url(' + file.url + ')';
			this.activeCssMap.backgroundSize = 'contain';

			this.compressImage(file.raw);

			// this.putImgCDN("https://image-1251917893.cos.ap-guangzhou.myqcloud.com/imgOptimization/120.png",file)
		},
		ellipsisSelectHandler() {
			let command = this.ellipsisSelect;
			switch (command) {
				case 'aLineEllipsis':
					this.activeCssMap.setTextEllipsis();
					break;
				case 'twoLineEllipsis':
					this.activeCssMap.setTwoLineEllipsis();
					break;
				case 'thirdLineEllipsis':
					this.activeCssMap.setTwoLineEllipsis(3);
					break;
				default:
					this.activeCssMap.setTextEllipsis();
			}
			// this.activeCssMap.setTextEllipsis();
		},
		componentStyleSelectHandler() {
			let command = this.componentStyleSelect;
			let style;
			switch (command) {
				case 'pvp':
					style = require('../../styles/styleStore/pvp.js');
					break;
				case 'gp':
					style = require('../../styles/styleStore/gp.js');
					break;
				case 'qqSpeed':
					style = require('../../styles/styleStore/qqSpeed.js');
					break;
				case 'hlddz':
					style = require('../../styles/styleStore/hlddz.js');
					break;
				default:
					style = require('../../styles/styleStore/app.js');
					break;
			}
      console.log(style.style)
      let str = style.style
      str.replaceAll(/(\n|\r|(\r\n)|(\u0085)|(\u2028)|(\u2029))/g, "");
      let a = str.indexOf('.')
      let b = str.indexOf('{')
      let c = str.indexOf(':')
      let d = str.indexOf(';')
      let hfcssMap = new CssMap(str.substring(a+1, b))
      hfcssMap[str.substring(b+1, c)] = str.substring(c+1,d)
      this.classMap.setClass(str.substring(a+1, b), hfcssMap)
      console.log("classmmmm:")
      console.log(this.classMap)
		},
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
			if (this.currentClass === this.activeClass) {
				this.selectClassFlag = !this.selectClassFlag;
			}
			if (this.selectClassFlag) {
				document.getElementById('visualViews').contentWindow.document.querySelector('.' + this.activeClass).style.outline = 'none';
			}
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
			this.command = command;
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
		// 机型旋转
		phoneRotate() {
			let temp = this.$refs.visualViews.style.height;
			this.$refs.visualViews.style.height = this.$refs.visualViews.style.width;
			this.$refs.visualViews.style.width = temp;
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
		refreshPage() {
			console.log('refreshPage');
			// 关闭文档流
			document.getElementById('visualViews').contentWindow.document.close();
			// 重新写入html文件,覆盖之前的
			this.htmlTree = [];
			this.fileInfo(this.file);
			// 重新设置监听，spacingjs，animation

			// 遍历cssMap，classMAp重新插入style标签
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
			this.animateSelect = command;
			let link = document.createElement('link');
			link.id = 'animation_id';
			link.rel = 'stylesheet';
			link.href = 'https://unpkg.com/animate.css@3.5.2/animate.min.css';
			console.log(link);
			// 删除原有的节点
			let currentlink = document.getElementById('visualViews').contentWindow.document.getElementById('animation_id');
			if (currentlink !== null) {
				document.getElementById('visualViews').contentWindow.document.body.removeChild(currentlink);
			}
			// 新增节点
			document.getElementById('visualViews').contentWindow.document.body.appendChild(link);
			console.log(command);
			// 要加animate__animated 才生效
			switch (command) {
				case 'fadeIn':
					this.activeCssMap.setAnimate('flash 2s');
					break;
				case 'fadeIn':
					this.activeCssMap.setAnimate('flash 2s');
					break;
				default:
					this.activeCssMap.setAnimate('flash 2s');
					break;
			}
		},
		// 重置css设置选项,遍历cssmap
		settingInit(className = '') {
			let style = document.getElementById('visualViews').contentWindow.document.querySelector('#css_id');
			console.log(style);
			// let base =  style.indexOf(className)
			// 保存上次的设置
			this.classMap.setClass(className, this.activeCssMap);
			// 更新新选择的模块设置
			this.activeCssMap = this.classMap.getClassContent(className);
			console.log('classMap:');
			console.log(this.classMap);
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
		backgroundMode(command) {
			this.activeCssMap.setBackgroundImageMode(command);
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
			this.settingInit(this.activeClass);
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
					console.log('ondragenter');
				};
				container.ondragover = function (e) {
					console.log('ondragover');
					//关闭默认事件
					e.stopPropagation();
					e.preventDefault();
					//设置获取模式，为复制
					e.dataTransfer.dropEffect = 'copy';
				};
				container.ondragleave = function () {
					console.log('ondragleave');
				};
				container.ondrop = function (e) {
					console.log('ondrop');
					e.stopPropagation();
					e.preventDefault();
					var file = e.dataTransfer.files;
					var file_name = file[0].name;
					console.log(file_name);
					that.fileInfo(file[0]);
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
							if (this.currentClass === this.activeClass) {
								this.selectClassFlag = !this.selectClassFlag;
							}
							if (this.selectClassFlag) {
								document.getElementById('visualViews').contentWindow.document.querySelector('.' + this.activeClass).style.outline = 'none';
							}
							if (that.classMap.hasClass(e.target.className)) {
								that.activeCssMap = that.classMap.getClassContent(e.target.className);
							} else {
								that.activeCssMap = new CssMap(e.target.className);
							}
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
		},
		// 初始化classMap
		classMapInit() {}
	}
};
</script>
<style lang="scss" src="@/styles/home.scss"></style>
