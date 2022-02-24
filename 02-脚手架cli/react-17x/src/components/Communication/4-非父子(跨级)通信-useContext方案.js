import React, { Component, useContext } from 'react'
import './style.css';


const MyContext = React.createContext();  // 创建context对象
// const { Provider, Consumer } = React.createContext();  // 创建并解构context对象

/**
 * 通过Provider(生产者)和Consumer(销费者)来实现组件跨层级通信，这样不就受限于组件之的层级关系了！！
 */

// 左侧点击项 受控组件
const Item = (props) => {

  const { poster, name } = props;

  // 通过useContext，获取供应商(生产者)传过来的数据、函数等
  const value = useContext(MyContext);

  // console.log('useContext', value);
  return (
    <div className='item' onClick={() => {
      value.changeInfo(props);
    }}>
      <img width="100" src={poster} alt={name} />
      <h5>{name}</h5>
    </div>

  );
};


// 右侧详情 受控组件
const Info = () => {
  // 通过useContext，获取供应商(生产者)传过来的数据、函数等
  const { info } = useContext(MyContext);
  return (<article>
    <h2>{info.name}</h2>
    <p>出品地方：{info.nation}， 观众评分：{info.grade}， 播放时长: {info.runtime}分钟</p>
    <section>
      {info.synopsis}
    </section>
  </article>)
};


export default class Context extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      info: {}
    }
    this.getData();
  }

  getData() {
    fetch('/data.json').then(res => res.json()).then((res) => {
      this.setState({
        list: res.data.films,
        info: res.data.films[0]
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    const { list } = this.state;
    return (
      // Provider 供应商(生产者)
      <MyContext.Provider value={{
        // 向销费者提供商品(数据)
        key: 'value',
        info: this.state.info,
        changeInfo: (newInfo) => {
          this.setState({
            info: newInfo
          });
        }
      }}>
        <div className='box'>
          <h3>3-非父子(跨级)通信-context方案（Provider(生产者)和Consumer(销费者)）</h3>
          <hr />
          <main className='main'>
            <div className='list'>
              {
                list.length && list.map((o, i) => {
                  return <Item key={o.filmId} {...o} />
                })
              }
            </div>
            <div className='info'>
              <Info />
            </div>
          </main>
        </div>
      </MyContext.Provider>
    )
  }
}
