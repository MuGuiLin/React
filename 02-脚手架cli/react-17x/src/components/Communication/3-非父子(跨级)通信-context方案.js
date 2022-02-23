import React, { Component, useState, useEffect } from 'react'
import './style.css'

const MyContext = React.createContext();  // 创建context对象
// const { Provider, Consumer } = React.createContext();  // 创建并解构context对象

/**
 * 通过Provider(生产者)和Consumer(销费者)来实现组件跨层级通信，这样不就受限于组件之的层级关系了！！
 */

// 左侧点击项 受控组件
class Item extends Component {

  // houldComponentUpdate()性能提升、优化生命周期函数
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.filmId !== nextProps.filmId) {
      return true;
    }
    return false;   // 注 这里通过shouldComponentUpdate() 能有效阻止下面的 render()执行了，担阻止不了Consumer中的回调函数(value) => {}
  }

  render() {
    console.error('render被执行了！！');
    const { poster, name } = this.props;
    return (
      // Consumer 销费者
      <MyContext.Consumer>
        {
          // 通过回调函数方式，获取供应商(生产者)传过来的数据、函数等
          (value) => {
            console.log('value', value);
            return (
              <div className='item' onClick={() => {
                value.changeInfo(this.props);
              }}>
                <img width="100" src={poster} alt={name} />
                <h5>{name}</h5>
              </div>)
          }
        }
      </MyContext.Consumer>
    );
  };
}

// 右侧详情 受控组件
class Info extends Component {
  render() {
    return (
      // Consumer 销费者
      <MyContext.Consumer>
        {
          // 通过回调函数方式，获取供应商(生产者)传过来的数据、函数等
          ({ info }) => (<article>
            <h2>{info.name}</h2>
            <p>出品地方：{info.nation}， 观众评分：{info.grade}， 播放时长: {info.runtime}分钟</p>
            <section>
              {info.synopsis}
            </section>
          </article>)
        }
      </MyContext.Consumer>
    );
  };
}


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
