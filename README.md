# css_lowcode for web

## 基于web的低代码UI开发平台
专注于UI开发，传统低代码平台的扩展模块，支持可视化css样式编辑，组件模块UI一键换肤等功能。

## 系统首页
![img](./demo/index.png)

## 左侧结构树
![img](./demo/structure.png)

## 中间视图窗口
![img](./demo/view.png)

## 右侧编辑栏
![img](./demo/edit.png)


## 编辑css属性
![img](./demo/edit.png)


## 高级用法：支持源代码方式编辑
![img](./demo/source_edit.png)

## 精细化UI：切换机型、放大缩小视图
![img](./demo/phone-edit.png)
![img](./demo/phone-edit2.png)



### *选中指定模块，可视化编辑css样式

### *组件模块：针对不同业务场景，一键设置不同的UI表现

### *输出css文件，压缩模式/非压缩模式


## 引用spacingjs，直观测量每个div的大小及间距
![img](./demo/spacing1.png)
![img](./demo/spacing2.png)


0、组件样式
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