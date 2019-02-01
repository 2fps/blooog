# blooog
blooog
基于React+koa2+mongodb的个人博客，开发中。

主要目的：  
1.练习无法在工作中使用的技术栈。  
2.替换目前的wordpress博客。

目前UI库采用了semantic-ui和element-react（少量）。后期将全部替换为semantic-ui。

文档详细地址：构建中...

## fontEnd
此文件夹下存放的是前端代码

### 安装依赖
```
cd fontEnd
npm install
```
### 启动开发环境
```
npm run start
```
浏览器中访问 http://127.0.0.1:3000/
### 修改代理服务器地址
由于使用了create-react-app脚手架，所以只要在package.json中的proxy字段中输入代理的url路径即可（最新版只支持字符串了）。
### 编译生成静态资源
```
npm run build
```

## backEnd
存放了后端代码。
### 安装依赖
```
cd backEnd
npm install
```
### 启动开发环境
```
npm run start
```
### 数据库
数据库是mongodb，所以先提前安装好数据库。  
window下的mongodb下载路径如下：http://dl.mongodb.org/dl/win32/x86_64  
我使用的是3.4.19版本的。

#### 数据库安装


## 生产环境搭建

更新中
