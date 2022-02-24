# React Cli 的使用：

## [[Create React App 中文文档](https://www.html.cn/create-react-app/)](https://www.html.cn/create-react-app/docs/getting-started/)

# Create-react-app 介绍

通过 <u>script</u> 的方式虽然也能完成 <u>React.js</u> 的开发，但是有一个现在前端很重要的特性 - 模块化，无法使用。

### Create React App

<u>Create React App</u> 是一个使用 <u>Node.js</u> 编写的命令行工具，通过它可以帮助我们快速生成 <u>React.js</u> 项目，并内置了 <u>Babel</u>、<u>Webpack</u> 等工具帮助我们实现 <u>ES6+</u> 解析、模块化解析打包，也就是通过它，我们可以使用 模块化 以及 <u>ES6+</u> 等更新的一些特性。同时它还内置 <u>ESLint</u> 语法检测工具、<u>Jest</u> 单元测试工具。还有一个基于 <u>Node.js</u> 的 <u>WebServer</u> 帮助我们更好的在本地预览应用，其实还有更多。

这些都通过 <u>Create React App</u> 帮助我们安装并配置好了，**开箱即用**



#### 一、[创建新的 React 应用](https://react.docschina.org/docs/create-a-new-react-app.html)

> 注：在创建React 应用之前，你需要在你的机器上安装NodeJs环境： [Node >= 8.10 和 npm >= 5.6](https://nodejs.org/en/)

**全局安装React Cli脚手架（不推荐，因为一旦全局安装后，当官方发布新版本时，想用新版又要得重装）**

```sh
1、全局安装React Cli脚手架：
	npm install -g create-react-app
	或
	yarn global add create-react-app
	
2、创建项目：	
	create-react-app 项目名 //项目名自定义，如：my-app 【此时会在当前目录创建一个以上面的项目名为文件夹名的项目文件夹（里面包含相应的资源目录、模块、配置文件等）】
	或：
	create-react-app 项目名 --template typescript	// 创建ts版的react项目
	
3、cd 项目名：
	cd my-app	// 进入项目根目录
	
4、运行（启动）：
	npm start	// 运行启动项目 会启动一个内置的本地 <u>WebServer</u>，根目录映射到 './public' 目录，默认端口：3000
```



**局部临时React Cli脚手架（推荐，因为次装安都是最新的）**[官方文档](https://react.docschina.org/tutorial/tutorial.html#setup-option-2-local-development-environment)

```sh
1、创建项目：
	npx create-react-app my-app // my-app可自定义
	或：
	npx create-react-app my-app --template typescript // 创建ts版的react项目
	
2、cd 项目名：
	cd my-app	// 进入项目根目录
	
2、运行（启动）：
	npm start	// 运行启动项目
```




#### 二、运行、打包【注：以下命令要在项目根目录执行】

```sh
1、cd 项目名：
      进入项目根目录
	
2、打包（构建）：
	npm run build   //打包发布 【注 npm run build 命令一定要在和src同级目录中才能正常运行！！】
```


​		
#### 三、其他命令
```sh
npm run test	// 启动测试运行器。

npm run eject   // 暴露配置项 显示webpack相关文件（注：该命令一旦执行后，不可逆！！）
```



#### 四、项目结构

运行命令以后，就会在运行命令所在目录下面创建一个以项目名称为名的目录

```bash
my-app/
    node_modules/	// 依赖包
	public/			// 静态公共目录
		index.html	
    	favicon.ico
    src/			// 项目工程源代码目录
    	App.css
    	App.js
    	App.test.js
    	index.css
    	index.js
    	logo.svg
    package.json	// 依赖包版本管理
	README.md		// 使用方法文档
```



