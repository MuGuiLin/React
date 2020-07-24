import React, { Component } from 'react';
import './Jsx.scss';

class Jsx extends Component {
    render() {

        // 变量id
        let id = 'box';

        // 字符串 和 数字就原样输出
        let num = 1024;

        let str = '我是一个字符串' + num;  

        let ele = <div>我是一个<b style={{ color: 'blue' }}>DIV</b>标签</div>;

        // 数组会转成字符串 [].join(''), 并且去掉了,逗号  [数组]在JSX中可用 map() 循环
        let arr = new Array(5).fill(' 数组 ');  

        let css = { color: 'white', textAlign: 'left', fontSize: '18px', background: 'blue' };

        // 对象 { key: value }在JSX中可用 Object.keys() 循环
        let obj = {
            html: {
                name: 'HTML5',
                attr: ['div', 'p', 'section', 'a', 'i', 'b']
            },
            css: {
                name: 'CSS3',
                attr: ['font-size', 'color', 'width', 'background']
            },
            js: {
                name: 'JavaScript 2015',
                attr: ['window', 'document', 'Object', 'alert', 'class']
            }
        };

        // 对象循环
        console.log(Object.keys(obj))
        Object.keys(obj).forEach((key, index) => {
            console.log(obj[key])
            obj[key].attr.forEach((o, i) => {
                console.log(o)
            })
        });

        // for (const key of obj) {
        //     console.log(obj[key])
        //     for (const key of obj[key].attr) {
        //         console.log(obj[key].attr[key])
        //     }
        // }

        let fun = (len) => {
            // let li = [];
            // for (let i = 0; i < len; i++) {
            //     li.push(<li key={i}>{i + 1}、我是li无序列表！</li>);
            // }
            // return li

            // return [...'.'.repeat(len)].map((o, i) => {
            //     return <li key={i}>{i + 1}、我是li无序列表！</li>
            // })

            return [...'.'.repeat(len)].map((o, i) => <li key={i}>{i + 1}、我是li无序列表！</li>);
        }

        return (
            <section className="jsx-box">
                <div id={id} className="dom" >我是div </div>
                <h1 style={{ color: 'red', textAlign: 'left', fontSize: '24px' }}>666</h1>
                <p>注：JSX最外层有且只能有一个标签包起来哦</p>
                <hr />

                {/* 这是JSX中的注释 单行 多行 都一样 */}

                <b>{str}</b>

                {ele}

                <div className="array">
                    Array数组渲染：

                    <i>{arr}</i>

                    <ul>{fun(6)}</ul>

                    <ol style={css}>
                        {
                            fun(6).map((item, index) => {
                                return (
                                    <li key={index}>我是li有序列表！</li>
                                )
                            })
                        }
                    </ol>

                    <ul>{fun(6).map((item, index) => <li key={index}>{index + 1}、我是li无序列表！</li>)} </ul>
                </div>


                <div className="object">
                    Object对象渲染：
                    {
                        Object.keys(obj).map((key, index) => {
                            let attr = obj[key].attr;
                            return (
                                <dl key={index}>
                                    <dt><b>{obj[key].name}</b></dt>
                                    {
                                        /*注：表达式一一定要用 {} 括起来哦！！！*/

                                        attr.map((o, i) => {
                                            return <dd key={i}>{i + 1}、{o}</dd>
                                        })
                                    }
                                </dl>
                            )
                        })
                    }
                </div>

            </section>
        );
    }
}

export default Jsx;