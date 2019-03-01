# blooog
blooog
基于semantic-ui-react + react + koa2 + mongodb的个人博客，目前仍在开发中，只有很简单的功能。

技术栈：
UI: semantic-ui、toastr(全局提示组件)。  
JS：React、react-router、redux、redux-thunk。  
服务端: koa2 + typescript(逐步替换js)。  
数据库: mongodb（mongoose）。  

demo地址：http://132.232.131.250:3000    admin / admin  
上域名太麻烦了，请轻测。  

主要目的：  
1.练习无法在工作中使用的技术栈。  
2.一直都想有个自己写的博客，可以随时替换一些功能，顺便替换现在的博客。

文档详细地址：https://www.kancloud.cn/fps_2fps/test1/937003  
API详细地址：https://www.showdoc.cc/234860389352945?page_id=1338365306594574  
修改记录地址：https://github.com/2fps/blooog/wiki/ModifyRecord  

## fontEnd
此文件夹下存放的是前端代码。

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
由于使用了create-react-app脚手架，所以只要在package.json中的proxy字段中输入代理的url路径即可（最新版的3.0只支持字符串了）。

### 编译生成静态资源
```
npm run build
```

## backEnd
此文件夹下存放的是服务端代码。

### 默认基础配置
在config文件夹下的config.js中，可以设置默认用户的账户名和密码（服务器启动后会写入数据库），请启动前修改，或启动后修改密码。  
更多配置修改和设置在后期提供。

### 安装依赖
```
cd backEnd
npm install
```
### 启动开发环境
```
npm run start
```
服务端的端口是8000，可自行修改。

### 数据库
使用到的数据库是mongodb，window下的mongodb下载路径如下：http://dl.mongodb.org/dl/win32/x86_64。  
本人使用的是3.4.19版本的，并使用了robomongo可视化工具。  
可视化工具下载地址：https://robomongo.org/download。 
生产环境中的是在ubuntu下安装的。   

## 生产环境搭建
本人是在ubuntu16.04下搭建的。

### 安装mongodb
```
sudo apt update
sudo apt install mongo -y

mongo -version
```
如果能出现对应的版本，那么就安装成功了，本人服务器上安装的是2.6.10版本。
安装完后的数据库默认是启动的。

### 启动koa2
本人是在服务端直接clone github上的代码，并启动node程序的。

#### 安装git
```
sudo apt-get install git
// 配置git账户
git config --global user.name "xxx"
git config --global user.email "你的邮箱地址"
```

#### 安装node与npm
```
sudo wget https://nodejs.org/dist/v11.9.0/node-v11.9.0-linux-x64.tar.xz
sudo tar -xvf node-v11.9.0-linux-x64.tar.xz
sudo mv node-v11.9.0-linux-x64 /usr/local
sudo ln -s /usr/local/node-v11.9.0-linux-x64/bin/node /usr/local/bin/node
sudo ln -s /usr/local/node-v11.9.0-linux-x64/bin/npm /usr/local/bin/npm

node -v
npm -v
```

node与npm都能输出正确的版本的话，即安装正确了。

#### 获取代码并启动服务
本人在/home/目录下克隆了github仓库中的代码。
```
sudo git clone https://github.com/2fps/blooog.git
cd blooog/backEnd/ && sudo npm install
sudo npm install pm2 -g
sudo ln -s /usr/local/node-v11.9.0-linux-x64/bin/pm2 /usr/local/bin
npm run prd
```

### 安装nginx并配置
前端build出的代码给nginx做静态资源的代理，而api则被代理到其他koa2的端口上。
```
sudo apt-get install nginx -y

cd /etc/nginx/sites-enabled/
sudo touch web
sudo vi web
```
将nginx的配置修改为：
```
server {
	listen 3000;
	
	gzip on;
	gzip_min_length 1k;
	gzip_buffers 4 16k;
	gzip_comp_level 6;
	gzip_types text/plain application/javascript application/x-javascript text/javascript text/xml text/css;

	location / {
		root /home/resource;
		index index.html index.htm;
	}

	location /api {
		proxy_redirect off;
		proxy_set_header HOST $host;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_pass http://127.0.0.1:8000/api;
	}
}
```

重启nginx
```
sudo server nginx restart
```

#### 上传静态资源
本人是在本地build前端的资源文件，再上传到服务端上的。没有安装ftp，所以使用了rz命令。
进入build目录，压缩成 ***.zip，再用unzip命令进行解压。
```
sudo apt-get install lrzsz
sudo apt-get install unzip
```
安装完命令后，cd到 /home/resource 文件夹下，没有的话，请先创建。
接着选中需要上传的压缩文件。
```
sudo rz
suzo unzip ***.zip
```

## 最后一步
此时在浏览器的地址栏中输入，http://ip:3000（自己有域名的话，可以挂上），可以访问到blooog了。  
如果使用admin/admin密码的请登录后，再右上角点击修改密码。  
为了博客的一些功能的正常使用，请在设置中增加正确的配置。  

刚起步，其他功能正在加入或优化。

Have Fun!