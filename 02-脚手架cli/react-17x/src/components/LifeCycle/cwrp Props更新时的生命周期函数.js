import React, { Component, useState, useEffect } from 'react';
import './style.css';

class Child1 extends Component {

    componentWillReceiveProps(nextProps) {
        console.debug('Child1 nextProps', nextProps);
    };

    render() {
        console.error('注意看这里：父组件并没有给这个子组件传任何属性，但父组件在每更新1次状态时，子组件也会被执行1次！！！', this.props);
        return (
            <div>
                <h3>Child1</h3>
                父组件没有我这个子组件传任何属性
            </div>
        )
    };
};

class Child2 extends Component {
    state = {
        title: '我是Child2中的this.state={}默认的值'
    }
    // cwrp
    componentWillReceiveProps(nextProps) {
        console.log('Child2 nextProps', nextProps, this.props);

        // 当父组件更新状态属性时触发这个生命周期，此时子组件中的props也会更新，这里也是最先获取父组件传的属性，可在这里利用属性进一些业务逻辑处理。
        // 如：把父组件nextProps传来的属性，转化成 子组件自己的this.state属性
        this.setState({
            title: nextProps.current * 10
        })
    };

    render() {
        return (
            <div>
                <h3>Child2</h3>
                {this.props.current}、
                {this.state.title}
            </div>
        )
    };
};


const Child3 = (props) => {
    const [title, setTtitle] = useState({ num: 0, key: '我是Child3中的useState()默认的值' });

    useEffect(() => {
        // setTtitle({ num: props.obj.num, key: props.obj.key });
        setTtitle(props.obj);

        setTimeout(() => {
            setTtitle({ num: 666, key: 'Admin' });
        }, 3000);
    }, [props]);
    return (
        <div>
            <h3>Child3</h3>
            {props.obj.num}、
            {props.obj.key}、
            {title.num}、
            {title.key}
        </div>
    );
}


class Child4 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 1,
            list: []
        }
    };

    getData(type) {

        // fetch('http://m.smgradio.cn/api/api.php?action=index&pageindex=2&pagenum=5').then(res => res.json()).then(res => {
        fetch(`https://m.maizuo.com/gateway?cityId=310100&pageNum=1&pageSize=100&type=${type}&k=9191970`, {
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"16453564353677531387461633"}',
                'X-Host': 'mall.film-ticket.film.list'
            }
        }).then(res => res.json()).then(res => {
            console.log(11111, res);
            this.setState({
                list: res.data.films
            })
        }).catch(err => {
            console.error('catch', err);
        }).finally(mse => {
            console.info('finally', mse);
        });
    }

    // 初始化生命周期只执行1次
    componentDidMount() {
        this.setState({
            type: this.props.type
        })
        if (this.props.type === 1) {
            this.getData(1);
            console.log('请求正在热映数据！');
        } else {
            this.getData(2);
            console.log('请求即将上映数据！');
        }
    };

    // 要监听父组件传过来的props状态，可通过UNSAFE_componentWillReceiveProps(nextProps)来获取最新的props状态
    // 但是：由于UNSAFE_componentWillReceiveProps()在16.2以后就不被推荐使用了，因为它处在diff算法的第一个阶段，会被多次重复执行。
    // 所以：
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            type: nextProps.type
        })
        // console.log(666, nextProps.type);
        if (nextProps.type === 1) {
            this.getData(1);
            console.log('请求正在热映数据！');
        } else {
            this.getData(2);
            console.log('请求即将上映数据！');
        }

    };

    render() {
        return (
            <div>
                {this.state.type}
                <ul className='film'>
                    {
                        this.state.list.map((o, i) => {
                            return <li key={o.filmId}>
                                <img src={o.poster} alt={o.name} />
                                <h4>{o.name}</h4>
                            </li>
                        })
                    }
                </ul>
            </div>
        )
    }
}


export default class Cwrp extends Component {

    state = {
        current: 1,
        obj: {
            num: 1,
            key: 'value'
        },
        type: 1
    };

    setType(type) {
        this.setState({
            type
        })
    }

    render() {
        return (<div className='cwrp'>
            <h1>
                cwrp Props更新时的生命周期函数 <button onClick={() => {
                    const newVal = this.state.current + 1;
                    this.setState({
                        current: newVal,
                        obj: {
                            num: newVal,
                            key: '父组件render()更新时，所有的子组件都会被更新！！'
                        }
                    });
                }} >更新状态</button>
            </h1>
            <hr />

            <br />
            <Child1 ></Child1>
            <hr />

            <br />
            <Child2 current={this.state.current} ></Child2>
            <hr />

            <br />
            <Child3 obj={this.state.obj} ></Child3>
            <hr />

            <br />
            <ul className='nav'>
                <li onClick={() => this.setType(1)}>正在热映</li>
                <li onClick={() => this.setType(2)}>即将上映</li>
            </ul>
            <Child4 type={this.state.type} ></Child4>
        </div>)
    };
};
