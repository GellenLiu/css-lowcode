# css_lowcode

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

![img](./demo/index.png)
<center>系统首页</center>

![img](./demo/structure.png)
<center>左侧结构树</center>

![img](./demo/view.png)
<center>中间视图窗口</center>

![img](./demo/edit.png)
<center>右侧编辑栏</center>

1、编辑与视觉同步，所见即所得
2、自动适配移动端、PC端等不同设备的UI表现（提供适配方案选择）
3、提供位置、大小、颜色、背景、字体、间距等UI开发可视化编辑功能
4、提供图片转换成base64工具、尺寸工具、色彩摄取工具等UI开发常用工具
5、应用animate开源动画，可视化设计动画
6、保存当前的配置方案，可导出保存，并一键导入，可记录在个人账号下
7、自动生成css、scss、less等文件，并可压缩导出
8、在视图窗可一键选择dom结构，选中对应组件进行编辑
9、一键换肤功能
10、自动生成媒体查询，兼容性，适配性等代码，适配不同机型，不同浏览器内核



1、定位方式
2、高度、宽度
3、外边距
4、内边距
5、边框
6、字体大小
7、字体颜色
8、字体类型
9、文本排版
10、超出隐藏，文本不换行
11、整体透明度
12、背景、图片、颜色
13、transform变换
14、层级
15、动画，动效
16、浮动



1、文件保存功能：
1\将数据传到服务器，点击a标签，再下载下来,
方法2\ 使用createObjectURL转成url，点击a标签


2、html解析功能
input导入文件
将文件内容导入iframe

3\
解析html，生成dom树
重点，节点解析算法
字符串匹配
res[1]存储的是标签名称，只需要把两边的空格去掉

res[2]存储的是属性和值，我们用split函数按空格切割一次，再用split函数按'='切割一次，就能分解出来了

res[4]存储的就是字符串的内容

4\点击选中，红色框出来
为选中元素添加一个outline



一个按钮的多种状态？
+号新增状态，写多个样式



封装样式
1、文字超出省略
2、居中、左对齐、右对齐
3、文字居中、左对齐、右对齐
给对象加一个类名


包括Attention(晃动效果)、bounce(弹性缓冲效果)、fade(透明度变化效果)、flip(翻转效果)、rotate(旋转效果)、slide(滑动效果)、zoom(变焦效果)、special(特殊效果)

.right .merchant-wrapper 


遇到开始标签，创建新一层。遇到关闭就关闭。
<html>
  <body>
  </body>
</html>

spacingjs
监听alt按键
获取起始模块
outline框出，获取大小，位置
获取鼠标移动的目标模块
目标模块的位置，大小，标出
添加div用fixed标出尺寸