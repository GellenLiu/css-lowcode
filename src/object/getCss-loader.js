// 替换require的css的内容为css文件内容
const fs = require("fs")

module.exports = function (source) {
    let res = source
    let filePathList = source.match(/requireCSS@.*?\.css/g)
    for(let i in filePathList) {
        filePathList[i] = filePathList[i].replace("requireCSS@", 'src')
    }
    console.log(filePathList)
    if(filePathList == [] || filePathList == null) {
        return res
    }
    for(let element of filePathList) {
        var data = fs.readFileSync(element);
        console.log("同步读取: " + data.toString());
        element.replace('src', "requireCSS@")
        let reg = new RegExp(element.replace('src', "requireCSS@"), 'g')
        res =  res.replace(reg,  data.toString())
    }
    return res;
  }