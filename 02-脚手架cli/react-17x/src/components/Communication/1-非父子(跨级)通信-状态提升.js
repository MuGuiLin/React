import React, { Component } from 'react'
import './style.css'

// 左侧点击项 受控组件
const Item = (props) => {
  const { name, poster, show } = props
  return (
    <div className='item' onClick={() => show(props)} >
      <img width="100" src={poster} alt={name} />
      <h5>{name}</h5>
    </div>
  );
}

// 右侧详情 受控组件
const Info = (props) => {
  console.log(props);
  return (
    <article>
      <h2>{props.name}</h2>
      <p>出品地方：{props.nation}， 观众评分：{props.grade}， 播放时长: {props.runtime}分钟</p>
      <section>
        {props.synopsis}
      </section>
    </article>
  );
}

/**
 * 非父子(跨级)通信-状态提升（中间者模式）
 * 
 * 原理：当两个非父子组件之间要进行通信时，可通过一个中间组件来进行转发即可！！
 */


export default class Promote extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      info: ''
    }
    this.getData();
  }

  getData() {
    fetch('/data.json').then(res => res.json()).then((res) => {
      if (res.data.films.length) {
        this.setState({
          list: res.data.films,
          info: res.data.films[0]
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  setInfo(info) {
    this.setState({
      info
    });
  }

  //组件销毁阶段
  componentWillUnmount() {
    console.debug('组件即将被销毁！'); // 只执行1次，在删除销毁之前触发，可用于一些清理类操作，如清除定时器、事件监所器等。
  }

  render() {
    const { list, info } = this.state;
    return (
      <div className='box'>
        <h3>1-非父子(跨级)通信-状态提升（中间者模式）</h3>
        <hr />
        <main className='main'>
          <div className='list'>
            {
              list.length && list.map((o, i) => {
                return <Item key={o.filmId} show={(item) => this.setInfo(item)} {...o} />
              })
            }
          </div>
          <div className='info'>
            <Info {...info} />
          </div>
        </main>
      </div>
    )
  }
}
