import React, { Component } from 'react';
import './index.css';


/**
 
# React中的表单
        在React 里，HTML 表单元素的工作方式和其他的 DOM 元素有些不同。
    一般来说，表单以及表单中的控件（如：input、select……）是页面中与 JavaScript 打交道最多的元素了。
    虽然我们可以通过 ref 的形式去操作它们，但是这样会比较麻烦，React.js 为我们提供了一个更好的方式把 React.js 中的数据以及逻辑与表单控件关联起来。


# 受控组件 :
    用 props 传入数据的话，组件可以被认为是受控（因为组件被父级传入的 props 控制）


# 非受控组件 : 
    数据只保存在组件内部的 state 的话，是非受控组件（因为外部没办法直接控制 state）

        广义来说，页面中的任意元素都是一个独立的组件，表单控件也是，它们内部也会维护属于自己的状态（如：value，selected，checked……），
    当然这些状态是由原生实现的，而非 React.js 来控制的，但是有的时候我们希望通过 React.js 来管理和维护表单控件的状态，
    我们把这种控件（控件）称为： 受控组件， 针对不同的组件，状态的维护方式也有所差异
 

## 非受控组件默认值
        有的时候，我们希望给一个非受控组件一个初始值，但是又不希望它后续通过React.js来绑定更新，
    这个时候我们就可以通过 defaultValue 或者  defaultChecked  来设置非受控组件的默认值！

*/
class MyForm extends Component {
    constructor() {
        super(); //在访问“ this”或从派生构造函数返回之前，必须在派生类中调用超级构造函数;

        this.state = {
            user: '沐枫',
            age: 28,
            text: '文本内容',
            radio: '男',
            checkbox: ['后端', '产品'],
            select: '',
            select2: ['html', 'javascript'],
        }
        this.onChangeVal = this.onChangeVal.bind(this);

        // 监听订阅自定义事件
        React.$emitter.addListener('mupiao', (msg) => {
            console.log('my-from----------', msg)
        })
    }

    btnClick = () => {
        this.setState((state) => {
            return {
                age: state.age + 1
            }
        }, () => {
            console.log('更新成功！')
        });
        console.log(this.state.age)
    }

    onChangeVal(e) {
        console.log(e.target.value);

        this.setState({
            user: e.target.value
        })
    }

    changeValue2 = (e) => {
        this.setState({
            text: e.target.value.toUpperCase()
        })
    }
    changeValue3 = (e) => {
        this.setState({
            select: e.target.value
        })
    }
    changeValue4 = ({ target: { options } }) => {
        this.setState({
            select2: [...options].filter(o => o.selected).map(o => o.value)
        });
    }
    changeValue5 = (e) => {
        this.setState({
            radio: e.target.value
        })
    }

    changeValue6 = ({ target: { value } }) => {
        let { checkbox } = this.state;
        if (checkbox.includes(value)) {
            checkbox = checkbox.filter(v => v !== value);
        } else {
            checkbox.push(value)
        }
        this.setState({
            checkbox
        });
    }



    render() {

        return (
            <div className="my-form">
                <div className="from-item">        
                    {/* 不能直接修复value，要修改state与组件的某个状态进行绑定onChange、onInput监听组件某些事件来更新 state */}
                    <input type="text" value={this.state.user} onChange={this.onChangeVal} />
                    <input type="text" defaultValue={this.state.user} onChange={this.onChangeVal} />
                    <button onClick={this.btnClick}>{this.state.age}</button> ：{this.state.user}
                </div>

                <div className="from-item">
                    {/* textarea 与 input 类似，但是需要注意的是： 使用 value ，而不是 内容 */}
                    <textarea value={this.state.text} onChange={this.changeValue2} cols="30" rows="5"></textarea>：{this.state.text}
                </div>

                <div className="from-item">
                    {/* select 在 React.js 中也做了一些处理，不在是通过 selected 属性来表示选中元素，而是通过 select 标签的 value 属性 */}
                    <select value={this.state.select} onChange={this.changeValue3}>
                        <option value="html">html</option>
                        <option value="css">css</option>
                        <option value="javascript">javascript</option>
                    </select>
                    ：{this.state.select}
                </div>

                <div className="from-item">
                   
                    {/* 我们还可以设置多选 select，对应的 value 就是一个数组 */}
                    <select value={this.state.select2} onChange={this.changeValue4} multiple>
                        <option value="html">html</option>
                        <option value="css">css</option>
                        <option value="javascript">javascript</option>
                    </select> 
                    按住Ctrl键多选：{this.state.select2}
                </div>

                <div className="from-item">
                    {/* 单选 radio 需要注意的是，受控的属性不在是 value ，而是 checked */}
                    <label><input name="sex" type="radio" value="男" checked={this.state.radio === '男'} onChange={this.changeValue5} />男</label>
                    <label><input name="sex" type="radio" value="女" defaultChecked={this.state.radio}  onChange={this.changeValue5} />女</label>
                    <label><input name="sex" type="radio" value="保密" checked={this.state.radio === '保密'} onChange={this.changeValue5} />保密</label>
                    ：{this.state.radio}
                </div>

                <div className="from-item">
                    {/* 多选 checkbox 需要注意的是，受控的属性不在是 value ，而是 checked */}
                    <label><input name="job" type="checkbox" value="前端" checked={this.state.checkbox.includes('前端')} onChange={this.changeValue6} />前端</label>
                    <label><input name="job" type="checkbox" value="后端" checked={this.state.checkbox.includes('后端')} onChange={this.changeValue6} />后端</label>
                    <label><input name="job" type="checkbox" value="产品" checked={this.state.checkbox.includes('产品')} onChange={this.changeValue6} />产品</label>
                    ：{this.state.checkbox}
                </div>
            </div>
        );
    }
}

export default MyForm;