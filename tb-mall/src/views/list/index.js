import React, { Component } from "react";
import "./index.scss";
import diagraml from "../../static/images/diagraml.png"

export default class List extends Component {

    constructor() {
        super();
        this.state = {
            lifeCycle: `⽣命周期⽅法：⽤于在组件不同阶段执⾏⾃定义功能。在组件被创建并插⼊到 DOM 时（即挂载中阶段【mounting】），组件更新时，组件取消挂载或从 DOM 中删除时，都有可以使⽤的⽣命周期⽅法。`
        }
    };

    componentDidMount() {

    };

    render() {
        return (
            <section className="list">
                {this.state.lifeCycle}
                <a target="_blank" href="https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/">⽣命周期</a>

                <img src={diagraml}/ >
            <ul>
                <li>1</li>
                <li>2</li>
                <li>2</li>
            </ul>
            </section>
        );
    };
};
