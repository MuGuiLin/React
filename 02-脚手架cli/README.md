# React Cli 的使用：


#### 一、安装React Cli脚手架(如果已安装React Cli脚手架 此步略过)

	npm install -g create-react-app  //全局全装creact脚手架工具


	
#### 二、创建项目

	create-react-app 项目名 （此时会在当前目录创建一个以上面的项目名为文件夹名的项目文件夹（里面包含相应的项目目录、模块、配置文件等））

	

#### 三、运行、打包【注：以下命令要在项目根目录执行】

	1、cd 项目名：
	      进入项目根目录
	
	2、运行（启动）：
		npm start //运行项目，自动打开浏览器
		
	3、打包（构建）：
		npm run build   //打包
		
		
#### 四、其他命令
	npm run eject  //显示webpack相关文件



# Create-react-app 介绍

通过 <u>script</u> 的方式虽然也能完成 <u>React.js</u> 的开发，但是有一个现在前端很重要的特性 - 模块化，无法使用。

### Create React App

<u>Create React App</u> 是一个使用 <u>Node.js</u> 编写的命令行工具，通过它可以帮助我们快速生成 <u>React.js</u> 项目，并内置了 <u>Babel</u>、<u>Webpack</u> 等工具帮助我们实现 <u>ES6+</u> 解析、模块化解析打包，也就是通过它，我们可以使用 模块化 以及 <u>ES6+</u> 等更新的一些特性。同时它还内置 <u>ESLint</u> 语法检测工具、<u>Jest</u> 单元测试工具。还有一个基于 <u>Node.js</u> 的 <u>WebServer</u> 帮助我们更好的在本地预览应用，其实还有更多。

这些都通过 <u>Create React App</u> 帮助我们安装并配置好了，**开箱即用**



### 安装与使用

通过 <u>npm</u>、<u>yarn</u>、<u>npx</u> 都可以

#### 安装

###### npm

```bash
npm i -g create-react-app
```

###### yarn

```bash
yarn global add create-react-app
```

#### 使用

安装完成以后，即可使用 <u>create-react-app</u> 命令

```bash
create-react-app <项目名称>
```

或者通过 <u>npx</u> 的方式

###### npx

```bash
npx create-react-app <项目名称>
```

### 项目目录结构说明

运行命令以后，就会在运行命令所在目录下面创建一个以项目名称为名的目录

```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
```

### 命令脚本

<u>create-react-app</u> 同时也提供了其它一些命令来帮助我们进行开发

###### npm  start

启动一个内置的本地 <u>WebServer</u>，根目录映射到 './public' 目录，默认端口：3000

###### npm test

运行 <u>Jest</u> 测试

###### npm run build

打包应用（准备上线）






