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
 * 非父子通信-状态提升（中间者模式）
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
      this.setState({
        list: res.data.films,
        info: res.data.films[0]
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  setInfo(info) {
    this.setState({
      info
    })
  }

  render() {
    const { list, info } = this.state;
    return (
      <div className='box'>
        <h3>1-非父子通信-状态提升（中间者模式）</h3>
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
