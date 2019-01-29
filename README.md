# blooog
blooog
基于React+koa2+mongodb的个人博客，开发中。

目前UI库采用了bootstrap和element-react。后期将替换为semantic-ui。

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

http://127.0.0.1:3000/访问
```
### 编译生成静态资源
```
npm run build
```

### 修改代理服务器地址
由于使用了create-react-app脚手架，所以只要在package.json中的proxy字段中输入代理的url路径即可。

## backEnd
存放了后端代码
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
mongodb各个版本的下载的路径如下：http://dl.mongodb.org/dl/win32/x86_64。  
我使用的是3.4.19版本的。

## 生产环境搭建

更新中
