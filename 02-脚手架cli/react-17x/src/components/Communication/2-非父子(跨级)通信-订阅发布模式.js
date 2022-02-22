import React, { Component, useState, useEffect } from 'react'
import './style.css'

import sub from './stp';

console.log(sub);
/**
 * 通过发布订阅模式来实现组件跨层级通信，这样不就受限于组件之的层级关系了！！
 */

// 左侧点击项 受控组件
const Item = (props) => {
  const { name, poster } = props;
  return (
    <div className='item' onClick={() => {
      // 发布者
      sub.publish(props);
    }} >
      <img width="100" src={poster} alt={name} />
      <h5>{name}</h5>
    </div>
  );
}

// 右侧详情 受控组件
const Info = () => {
  const [props, setProps] = useState({});

  /**
   * 注：由于函数式组件没有render()方法，所以在更新状态和DOM时，整个函数都会被调用，不像类式组件在更新状态和DOM时，只调用render()方法；
   */
  useEffect(() => {
    sub.subscribe((info) => {
      console.log(info);
      setProps(info)
    });
  }, []);

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


export default class SubscribeToPublish extends Component {
  constructor() {
    super();
    this.state = {
      list: []
    }
    this.getData();
  }

  getData() {
    fetch('/data.json').then(res => res.json()).then((res) => {
      this.setState({
        list: res.data.films
      });

      // 发布者
      sub.publish(res.data.films[0]);

    }).catch((err) => {
      console.log(err);
    });
  }


  render() {
    const { list } = this.state;
    return (
      <div className='box'>
        <h3>2-非父子(跨级)通信-订阅发布模式</h3>
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
    )
  }
}
