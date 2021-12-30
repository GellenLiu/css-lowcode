<template>
  <div class="home-page">
    <!-- 工具栏 -->
    <div class="tools">
      <div class="tools-wrapper">
        <div class="tools-list-tab" :class="!active? 'tab-active' : ''" @click="switchTab(0)">工具</div>
        <div class="components-list-tab" :class="active? 'tab-active' : ''" @click="switchTab(1)">组件</div>
      </div>
      <div class="tools-list" v-if="!active">
        <div class="tools-list-item"><img src="@/assets/ruler.png"/></div>
        <div class="tools-list-item" @click="getBase64"><img src="@/assets/toBase64.png"/></div>
        <div class="tools-list-item"><img src="@/assets/getColor.png"/></div>
        <div class="tools-list-item"><img src="@/assets/getColor.png"/></div>
        <div class="tools-list-item"><img src="@/assets/getColor.png"/></div>
        <div class="tools-list-item"><img src="@/assets/getColor.png"/></div>
        <!-- 配色表 -->
        <div class="tools-list-item"><img src="@/assets/getColor.png"/></div>
      </div>
      <div class="components-list" v-if="active">
        <div class="components-list-item"><img src="@/assets/picture.png"/></div>
        <div class="components-list-item"><img src="@/assets/select-btn.png"/></div>
        <div class="components-list-item"><img src="@/assets/btn-open.png"/></div>
        <div class="components-list-item"><img src="@/assets/drop-down.png"/></div>
        <div class="components-list-item"><img src="@/assets/line-div.png"/></div>
        <div class="components-list-item"><img src="@/assets/row-div.png"/></div>
      </div>
    </div>

    <div class="views-wrapper">
      <div class="phone-type">
        <el-dropdown  @command="switchPhone">
          <span class="el-dropdown-link">
            {{currentPhone}}切换机型<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="1">iphone 5 (320 x 568) | Dpr:2</el-dropdown-item>
          <el-dropdown-item command="2">iphone 6/7/8 (375 x 667) | Dpr:2</el-dropdown-item>
          <el-dropdown-item command="3">iphone 6/7/8 plus (414 x 736) | Dpr:3</el-dropdown-item>
          <el-dropdown-item command="4">iphone X (375 x 812) | Dpr:3</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!-- 视图栏 -->
      <div class="views">
        <iframe :class="command" ref="visualViews" id="visualViews" height="500px" width="300px"></iframe>
        <input id="fileContent" type="file"/>
      </div>
      <!-- 视图缩放 -->
      <div class="views-scale">
        <div>—</div>
        <div>{{ scaleTimes }}</div>
        <div>+</div>
      </div>
      <!-- 控制台 -->
      <!-- <div class="console">
        <input/>
      </div> -->
    </div>
    <!-- 编辑栏 -->
    <div class="edit">
      <div class="tools-wrapper">
        <div class="tools-list-tab" :class="!editActive? 'tab-active' : ''" @click="switchEditTab(0)">设置</div>
        <div class="components-list-tab" :class="editActive? 'tab-active' : ''" @click="switchEditTab(1)">源代码</div>
      </div>
      <!-- 设置 -->
      <div v-if="!editActive">
      <div class="edit-item">
        <label>选择模块</label>
        <el-input v-model="cssMap.inputClass" placeholder="请输入class"></el-input>
      </div>
      <div class="edit-item">
        <label>位置</label>
        <el-input v-model="cssMap.inputPosition" placeholder="请输入位置"></el-input>
      </div>
      <div class="edit-item edit-item-wrapper">
        <label>布局</label>
        <div class="text-aligh-icon"><img src="@/assets/horizontal-center.png"/></div>
        <div class="text-aligh-icon"><img src="@/assets/vertical-center.png"/></div>
        <div class="text-aligh-icon"><img src="@/assets/flex-end-icon.png"/></div>
        <div class="text-aligh-icon"><img src="@/assets/flex-start-icon.png"/></div>
      </div>
      <div class="edit-item-wrapper">
        <div class="edit-item">
          <label>宽度</label>
          <el-input v-model="cssMap.inputWidth" placeholder="请输入宽度"></el-input>
        </div>
        <div class="edit-item">
          <label>高度</label>
          <el-input v-model="cssMap.inputHeight" placeholder="请输入高度"></el-input>
        </div>
      </div>
      <div class="edit-item">
        <label>圆角</label>
        <el-input v-model="cssMap.inputHeight" placeholder="请输入圆角"></el-input>
      </div>
      <div class="edit-item">
        <label>文本</label>
      </div>
      <div class="edit-item">
        <label>大小</label>
        <el-input v-model="cssMap.inputFontSize" placeholder="请输入字体大小"></el-input>
      </div>
      <div class="edit-item">
        <label>颜色</label>
        <el-input v-model="cssMap.inputFontColor" placeholder="请输入字体颜色"></el-input>
        <el-color-picker v-model="cssMap.fontColorSelect"></el-color-picker>
      </div>
      <div class="edit-item edit-item-wrapper">
        <div class="text-aligh-icon"><img src="@/assets/text-center-icon.png"/></div>
        <div class="text-aligh-icon"><img src="@/assets/text-left-iocn.png"/></div>
        <div class="text-aligh-icon"><img src="@/assets/text-right-icon.png"/></div>
      </div>
      <div class="edit-item">
        <label>添加动画</label>
        <el-dropdown @command="addAnimate">
          <span class="el-dropdown-link">
            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
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
      <div v-else>
        <div class="source-code">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="复选框 A"></el-checkbox>
            <el-checkbox label="复选框 B"></el-checkbox>
            <el-checkbox label="复选框 C"></el-checkbox>
            <el-checkbox label="禁用" ></el-checkbox>
            <el-checkbox label="选中且禁用" ></el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      
    </div>
    <!-- 弹窗 -->
    <to-base-64-dialog v-if="show64Dialog"></to-base-64-dialog>
    <div class="dialog-mask" v-if="show64Dialog"></div>
  </div>
</template>
<script>
import ClassMap from '@/object/classMap.js';
import CssMap from '@/object/cssMap.js';
import toBase64Dialog from './module/toBase64Dialog';
import ToBase64Dialog from './module/toBase64Dialog.vue';
export default {
  components: {toBase64Dialog,ToBase64Dialog},
  data() {
    return {
      active: false,
      editActive: false,
      show64Dialog: false,
      currentPhone: 'iphone 6/7/8',
      scaleTimes: '100%',
      command: '',
      base64: '',
      classMap: new ClassMap(),//文件所有class
      cssMap: new CssMap(),//当前class的css内容
      inputContent: '',
      checkList: ['选中且禁用','复选框 A']
    }
  },
  mounted() {
    let testClass = new CssMap()
    testClass.setWidth("100px")
    testClass.setTextEllipsis()
    console.log(testClass.showClass())

    let that = this
    document.getElementById("fileContent").addEventListener("change",function () {
      console.log("input事件监听");
      that.htmlAnalysis()
    });
    this.addSpacingjs()
    this.getDomNode()
  },
  methods: {
    switchTab(index) {
      if(index == 0) {
        this.active = false
      } else if(index == 1) {
        this.active = true
      }
    },
    switchEditTab(index) {
      if(index == 0) {
        this.editActive = false
      } else if(index == 1) {
        this.editActive = true
      }
    },
    switchPhone(command) {
      console.log("command: " + command)
      if(command == 1) {
        this.$refs.visualViews.style.width = '320px'
        this.$refs.visualViews.style.height = '568px'
        this.currentPhone = "iphone 5 (320 x 568)"
      } else if(command == 2) {
        this.$refs.visualViews.style.width = '375px'
        this.$refs.visualViews.style.height = '667px'
        this.currentPhone = "iphone 6/7/8 (375 x 667)"

      } else if(command == 3) {
        this.$refs.visualViews.style.width = '414px'
        this.$refs.visualViews.style.height = '736px'
        this.currentPhone = "iphone 6/7/8 plus (414 x 736)"
      } else if(command == 4) {
        this.$refs.visualViews.style.width = '375px'
        this.$refs.visualViews.style.height = '812px'
        this.currentPhone = "iphone X (375 x 812)"
      }
    },
    // 添加动画
    addAnimate(command) {
      console.log(command)
      // 要加animate__animated 才生效
      this.command = "animate__animated " + command;
    },
    // 重置css设置选项
    settingInit() {
      
    },
    run() {
      console.log("run");
      let views = document.getElementById("visualViews").contentWindow.document
      console.log(views)
     
      let style = document.createElement("style")
      style.innerText = this.cssMap.inputClass + "{" + "color: " + this.cssMap.inputFontColor + ";}"
      views.body.appendChild(style)
      this.fileInfo()
    },
    downloadCss() {
      this.download("1234", "123.css")
    },
    // 下载文件
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
    // 解析html文件
    htmlAnalysis() {
      console.log("解析")
      this.fileInfo()
      setTimeout(()=>{
        console.log(this.inputContent)
      },100)


      let views = document.getElementById("visualViews").contentWindow.document
      // 正则匹配元素标签
      var re = /<(\w+\s*)(\w+[=][\'\"](.*)?[\'\"]\s*)*>(.*)?<\/\w+>/;
      var str = '<div style="color:red;background:green;" name="test" id="test">this is a test string</div>';
      // str = this.inputContent
      var res = str.match(re);
      var tagName = null, attrList = [], arr = [], obj = {};
        if( res[1] ) {
            tagName = res[1].trim();
            obj['tag'] = tagName;
        }
        if( res[4] ) {
            obj['inner'] = res[4];
        }
        if ( res[2] ) {
            attrList = res[2].split( /\s+/ );
            for( var i = 0, len = attrList.length; i < len; i++ ){
                arr = attrList[i].split("=");
                console.log( arr );
                obj[arr[0]] = arr[1].replace( /(^[\'\"]+|[\'\"]$)/g, function(){
                    return '';
                } );
            }
        }
        var o = views.createElement( obj['tag'] );
        o.innerHTML = obj['inner'];
        delete obj['inner'];
        delete obj['tag'];
        for( var key in obj ){
            o.setAttribute( key, obj[key] );
        }
        console.log(obj)
        views.body.appendChild( o );

        let test = document.getElementById("visualViews").contentWindow.document.getElementById("test")
     console.log(test.offsetWidth)
     let testWidth = test.offsetWidth
     let testHeight = test.offsetHeight
     let testLeft = test.offsetLeft
     let testTop = test.offsetTop
  
      test.style.border = "#fff solid 3px"
    },
    // 添加spacingjs,测量边距
    addSpacingjs() {
      var spacingjs = document.createElement('script');
      spacingjs.id = "spacingjs"
      spacingjs.src = "https://unpkg.com/spacingjs"
      document.getElementById("visualViews").contentWindow.document.body.appendChild(spacingjs)
    },
    removeSpacingjs() {
      document.getElementById("visualViews").contentWindow.document.body.removeChild(spacingjs)
    },
    fileInfo() {
      let resultFile = document.getElementById('fileContent').files[0]
      if (resultFile) {
        // 获取文件信息
        this.file = resultFile
        this.fileName = resultFile.name                     
        let reader = new FileReader()                     
        reader.readAsText(resultFile, 'UTF-8')
        var fileContent;
        let that = this;
        reader.onload = function (e) {
          fileContent = e.target.result
          // let html = document.getElementById("visualViews").contentWindow.document.querySelector("html")
          // document.getElementById("visualViews").contentWindow.document.removeChild(html)
          document.getElementById("visualViews").contentWindow.document.write(fileContent);
          // document.write(fileContent);
          document.getElementById("visualViews").contentWindow.document.addEventListener("click", function(e){
             console.log(e.target)
             console.log(e.target.className)
             document.getElementById("visualViews").contentWindow.document.querySelector("."+e.target.className).style.border = "#fff solid 3px"
           })
          // console.log(fileContent)
          that.inputContent = fileContent
          // let views = document.getElementById("visualViews").contentWindow.document
          // views.html.appendChild(fileContent)
        }
        reader.onloadend = function () {
          that.addSpacingjs()
          document.getElementById("visualViews").contentWindow.document.close()
        }
      }
    },
    // 获取dom节点的类名
    getDomNode() {
      // 点击获取元素
      // document.querySelector
      // document.getElementById("visualViews").contentWindow.addEventListener("click", function(e){
      //   console.log(e.target)
      // })
      document.addEventListener("click", function(e){
        console.log(e.target)
        console.log(e)
      })
      // let html = document.getElementById("visualViews").contentWindow.document.querySelector("html")
      // document.getElementById("visualViews").contentWindow.document.removeChild(html) 
    },
    getBase64(img) {
      console.log("getBase64()")
      this.show64Dialog = true
      var openInput = document.createElement('input'); 
      openInput.style.display = 'none'; 
      document.body.appendChild(openInput); 

      openInput.click()
      // const reader = new FileReader();
      // reader.readAsDataURL(img);
      // reader.addEventListener("load", function () {
      //   this.base64 = reader.result;
      // }, false);

    }
  },
}
</script>
<style lang="scss" src="@/styles/home.scss">
</style>