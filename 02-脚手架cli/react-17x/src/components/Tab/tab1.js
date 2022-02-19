import React, { Component } from 'react';

class Tab1 extends Component {

    constructor() {
        super();
        this.state = {
            list: []
        };
        fetch('https://m.maizuo.com/gateway', {
            headers: {
                'X-Client-Info': '{ "a": "3000", "ch": "1002", "v": "5.2.0", "e": "16452716063599453176987649", "bc": "310100" }',
                'X-Host': 'mall.film-ticket.film.list'
            }
        }).then(res => res.json()).then((res) => {
            console.log(res);
            this.setState({
                list: res.data
            });
        }).catch((err) => {
            console.log(err);
        });

        this.keywords = React.createRef();
    };

    search() {

        const arr = ['abc', 'bcbdb', 'acc', 'ddad', 'eece', 'fffa'];

        // 模糊搜索
        // const newArr = arr.filter(o => o.includes('a')); // 例：返回数组中所有带a的 新数组
        const newArr = arr.filter(o => o.toUpperCase().includes(this.keywords.current.value.toUpperCase()));

        this.setState({
            list: newArr
        });
    }

    render() {
        return (
            <div>
                <h3 style={{ 'backgroundColor': 'red' }}>模糊搜索</h3>
                <input type="search" ref={this.keywords} placeholder="模糊搜索!" />
                <button onClick={() => this.search()} >搜索</button>

                {this.state.list.map((o, i) => {
                    return <p key={i} >{o}</p>
                })}
                <br />
                <br />
                <br />
            </div>
        );
    }
}

export default Tab1;