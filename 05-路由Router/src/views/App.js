import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'

import Menu from '../components/Menu';

import Home from '../views/Home';
import About from '../views/About';
import Self from '../views/Self';
import Goods from '../views/Goods';
import View from "../views/View";
import Cart from "../views/Cart";
import Login from "../views/Login";
import NotFound from "../views/NotFound";

import '../static/css/App.css';

const myUser = {
  // name: '沐枫',
  age: 28,
  sex: '男',
  job: {
    h5: 'HTML5，CSS3, ES6, TS3',
    js: {
      dom: 'Node.Js'
    },
    es: 'Web 前端开发'
  },
}

const myGoods = {

  items: [
    {
      id: 1,
      name: 'iPhone XR',
      price: 542500,
      image: 'http://img.yzcdn.cn/upload_files/2018/10/02/FoDSUZxgvASb3gkEcY49s7G8rP5X.jpg?imageView2/2/w/580/h/580/q/75/format/jpg'
    },
    {
      id: 2,
      name: 'Apple iPad Air 3',
      price: 377700,
      image: 'http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20190322/bf58e2bfc02049938ed53ca3a225faf2.jpg'
    },
    {
      id: 3,
      name: 'Macbook Pro 15.4',
      price: 1949900,
      image: 'http://pic7.58cdn.com.cn/zhuanzh/n_v1bkuymcyzthvvqylqifza_750_0.jpg'
    },
    {
      id: 4,
      name: 'Apple iMac',
      price: 1629900,
      image: 'http://news.mydrivers.com/img/20091122/02404674.jpg'
    },
    {
      id: 5,
      name: 'Apple Magic Mouse',
      price: 72900,
      image: 'http://img4.imgtn.bdimg.com/it/u=3557298481,916986847&fm=26&gp=0.jpg'
    },
    {
      id: 6,
      name: 'Apple Watch Series 4',
      price: 599900,
      image: 'http://wx2.sinaimg.cn/wap720/a7807f15ly1fwp3z56uiuj21bh0qogsq.jpg'
    }
  ]
}

/*
 路由：
      当应用变得复杂的时候，就需要分块的进行处理和展示，传统模式下，我们是把整个应用分成了多个页面，然后通过URL进行连接。但是这种方式也有一些问题，每次切换页面都需要重新发送所有请求和渲染整个页面，不止性能上会有影响，同时也会导致整个JavaScript重新执行，丢失状态。

  SPA 单页应用：
      根据不同的URL的变化（用哈希路由、历史记录等方式去监听URL的变化）时，显示并渲染我们指定对应的各个组件(页面)，而这个过程不会发生整个页面的刷新，因为这个过程就只是在一个页面中完成的，所以叫：单页面！！！

  组件按视图可分为2种：
      1、页面组件（视图组件）一般情况下，一个页面组件就是一个完整的页面，并且页面组件可以包涵功能组件
      2、功能组件 是一个具有一功能的，可复用的组件，如：弹出框，轮播图，柱状图，数据过滤、格式化，状态管理等，它可分为2种：
          a、带视图的功能组件，如：弹出框，轮播图，柱状图等。
          b、不带视图、只操作数据的功能组件，如：数据请求、过滤、格式化，状态管理等。

  组件存放目录：
      1、页面组件一般是放在src目录下的views目录中
      2、功能件件一般是放在src目录下的components目录中
*/

function App() {

  return (<React.Fragment>

    <section className="page-menu">
      <Menu></Menu>
    </section>



    <section className="page-main">

      {/*********** 路由跳转方式 导航 ************/}
      {
        /* 
          <nav>
            1、HashRouter 容器组件、路由根组件（哈希方式） 注：用 <a>标签 来跳转页面时，要在index.js中把内容组件换成<HashRouter><App /></HashRouter>包起来才行哦！
            <a href="#/">首 页</a>
            <a href="#/about">关 于</a>
 
 
            2、BrowserRouter 容器组件、路由根组件（历史记录方式） 注：用 <a>标签 来跳转页面时，要在index.js中把内容组件换成<BrowserRouter><App /></BrowserRouter>包起来才行哦！
            <a href="/">首 页</a>
            <a href="/about">关 于</a>
            【注：这里有个坑哦，如果在BrowserRouter方式中 用<a>标签来跳转页面时，请仔细看（整个页面都刷新了）哦！！】 所以就有了下面的第3种Link方式啦！
 
            
            3、Link 以上两种方式都可以 注：用 <Link />组件 来跳转页面时，就没所谓了用HashRouter，BrowserRouter都行！其是<Link to=""/>最终也是<a href="">，但<Link/>不会刷新整个页面（因为<Link/>组件重新定义(代理、监听)了<a>标签跳事件[添加了click方法]，并阻止<a>标签的默认跳转事件，可以打开浏览器控制台，选择Elements选项卡，再选中<a>标签，然后看中的Event Listeners面板就可以看到dom所绑定的相关事件啦）！
            <Link className="App-link" to="#/about">关 于</Link>
            <Link className="App-link" to="/about">关 于</Link>
          </nav>
 
          注：这里为了使代码更简洁、更优雅，把上面的导航拆分到components功能组件里的Mnue.js组中了。
        */
      }



      <Switch>
        {/*********** 组件渲染方式 <Route/> 路由组件映射  ************/}
        {
          // hash路由：根据URL变化，显示不同页面的原理，所以用react-router-dom中的<Route/>来配置url 与 组件的映射关系（就是根url显示对应的组件的意思，也就是把路由 和 组件关联起来）注：path=""要一一对应哦！！
          // window.location.hash == '#/self' && <Self />
        }

        {/* 第1种、页面渲染方式 - 纯展示 没有路由 */}
        {/* <Home/> */}
        {/* <About></About> */}


        {/* 第2种、页面路由渲染方式 - 有路由，但不能传参 【注：path="路由地址" component={要显示的组件}】*/}
        {/* <Route path="/" component={Home}></Route> */}
        {/* <Route /> 中的常用属性：path=""，exact，component={}，render={()=>{}} */}


        {/* 第3种、页面路由渲染方式 - 有路由，可以传参 【注：path="/" 时，对应的页面会一直显示，所以要加 exact 表示唯一（exact 精确路由配置）】 */}
        <Route path="/" exact render={() => {
          return <Home sendData={myUser}></Home>
        }}></Route>


        {/* 第4种、页面路由渲染方式 - 有路由，可以传参，并可以在路由中传参(动态路由传参) 注：在 /: 后面就是参数名，这是要在<Link/>中去设置参数值哦！！ */}
        <Route path="/about/:mupiao" render={() => {
          return <About data={myUser}></About>
        }}></Route>


        {/* 上面第4种的简写 */}
        <Route path="/self" render={() => <Self data={myUser}></Self>} />


        <Route path="/goods" render={(props) => {
          return <Goods history={props.history} goods={myGoods} ></Goods>
        }}></Route>


        {/* (动态路由传参) 注：在 /: 后面就是参数名，这是要在<Link/>中去设置参数值,(\d+) 是正则，表示传递的参数是只能是数字 */}
        {/* <Route path="/view/:goods_id(\d+)" component={View} /> */}

        {/* 由于除了要向View组件传goods_id以外，还要传一些其他数据，所以有要用到render() */}
        <Route path="/view/:goods_id(\d+)" render={(props) => {
          // props参数中的值
          // - history 里面包括的返回上一个页面的方法goBack()
          // - location 和原生的location一样
          // - match 当前页面路由的相关信息
          // - staticContext
          console.log(props)
          // return <View history={props.history} location={props.location} match={props.match} data={myGoods}></View>

          // 由于上面这种传递的数据太多，写起来复杂，所以可以像下面这样简写 解构
          return <View {...props} data={myGoods} ></View>
        }} />

        {/* <Route path="/cart" component={Cart}></Route> */}

        {/* 判断否登录：如登录则显示购物车，否则就重定向到登录页面 */}
        <Route path="/cart" component={() => {
          if (myUser.name) {
            return <Cart />
          } else {
            // return <Login />
            // 重定向
            return <Redirect to="/login" />
          }
        }}></Route>

        <Route path="/login" component={Login}></Route>



        {/* 注：如果不设置path=""路由，会匹配所有页面，就相当于switch()所以case:都没有break;一样会向下穿透！！ 所以用<Switch>后，一般404页面的<Route>都放到最下面，其他的<Route>放到前面*/}
        <Route component={NotFound}></Route>

      </Switch>
    </section>

  </React.Fragment>);
};

export default App;
