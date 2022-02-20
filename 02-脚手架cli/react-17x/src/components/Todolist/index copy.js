import React, { PureComponent } from 'react';

import './index.css'

export default class index extends PureComponent {
  state = {
    list: [],
    keep: []
  }

  myName = React.createRef();

  add() {
    // console.log(this.myName.current.value);

    const obj = {
      id: Date.now(),
      name: this.myName.current.value,
      show: true
    };

    // 注：不要直接修改状态！！因为可能会造成不可预期的问题！
    // this.state.list.push(obj);

    // 要深复制
    // let newList = this.state.list.concat(); // 深复制(返回一个新数组)
    // let newList = this.state.list.slice();  // 深复制(返回一个新数组)
    let newList = [...this.state.list];  // 深复制(返回一个新数组)

    newList.push(obj);

    this.setState({
      list: newList,
    });

    // 清空输入框
    this.myName.current.value = '';

    console.log(this.state.list);
  }

  add2 = () => {
    this.add();
  }

  keep(i, show) {
    console.log(i, show);

    let newKeep = [...this.state.keep]; // 深复制(返回一个新数组)
    if (show) {
      // 添加收藏
      const item = this.state.list[i];
      item.show = false;
      newKeep.push(item);
      this.setState({
        keep: newKeep,
      })
      return false;
    }

    // 取消收藏
    let newList = this.state.list.map((o, index) => {
      if (i == index) {
        o.show = true;
      }
      return o;
    });
    newKeep.splice(i, 1);
    this.setState({
      list: newList,
      keep: newKeep,
    })
  }

  del(i) {
    let newList = [...this.state.list];  // 深复制(返回一个新数组)

    newList.splice(i, 1);

    this.setState({
      list: newList,
    })

  }

  /*
  注：React并不会在真正的绑定事件到每一个具体的标签元素上，而是采用事件代理(向上冒泡到在根组件document.getElementById('root')上) 的模式

  call  改变this 自动执行函数 
  apply 改变this 自动执行函数 []
  bind  改变this 不自动执行函数，手动执行要在后面就加括号() 如：this.xxfn.bind(this)();
*/

  render() {
    const { list, keep } = this.state;
    return (
      <div className='to-do-list'>
        <h1>ToDoList</h1>
        <label>
          {/* <input type="text" ref={this.myName} /> */}
          <textarea ref={this.myName} placeholder="支持输入富文本(html标签)" ></textarea>
          <button onClick={() => this.add()}>添加</button>
          <button onClick={this.add2}>添加</button>
          <button onClick={this.add.bind(this)}>添加</button>
          {/* <button onClick={this.add.call(this)}>添加</button>
          <button onClick={this.add.apply(this)}>添加</button> */}
        </label>
        <hr />
        <div className='list-box'>
          <ul>
            {
              this.state.list.length > 0 && this.state.list.map((o, i) => {
                return (
                  <li key={o.id}>
                    {/* {o.name} */}
                    {/* 富文本展示 */}
                    <span dangerouslySetInnerHTML={{ __html: o.name }}></span>

                    {/* 事件与传参 */}
                    <button onClick={this.del.bind(this, i)}>删除</button>
                    <button onClick={() => this.del(i)}>删除</button>

                    {/* 条件渲染 */}
                    {o.show ? <button onClick={() => this.keep(i, o.show)}>添加收藏</button>
                      : <button onClick={() => this.keep(i, o.show)}>取消收藏</button>
                    }
                    <button onClick={() => this.keep(i, o.show)}>
                      {o.show ? '添加收藏' : '取消收藏'}
                    </button>
                  </li>
                )
              })
            }
            <li className={this.state.list.length === 0 ? '' : 'hidden'}>暂无数据！</li>
          </ul>
          <ul>
            {
              keep.length > 0 && keep.map((o, i) => {
                return (
                  <li key={o.id}>{o.name}
                    <button onClick={() => this.keep(i)}>取消收藏 </button>
                  </li>
                )
              })
            }
            {keep.length < 1 ? <li>暂无数据！</li> : null}
            {keep.length < 1 && <li>暂无数据！</li>}
            <li className={keep.length === 0 ? '' : 'hidden'}>暂无数据！</li>
          </ul>
        </div>
      </div>
    )
  }
}
