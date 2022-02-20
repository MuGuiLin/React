import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const Child = (props) => {
    return (
        <div>
            <h3>{props.text}</h3>
        </div>
    );
}

Child.propTypes = {
    text: PropTypes.string
}

Child.defaultProps = {
    text: '我是子组件，我是受控的！'
}

class Tab2 extends PureComponent {
    state = {
        text: '我是受控值',
    }

    get() {
        console.log(this.state.text);
    }

    reset() {
        this.setState({
            text: ''
        });
    }

    render() {
        const { count, list } = this.state;
        return (
            <div className='tb2'>
                <h3 style={{ 'backgroundColor': 'purple', color: 'white' }}>受控组件</h3>

                {/* 注：在React的JSX中表单标签并不是真正的原生html表单标签！！它的状态(值)的修改，只能通过setState来进行修改 */}
                <input type="text" value="我是非受控组件" />
                <br />
                <input type="text" defaultValue="我刚渲染时是受控的，以后就是非受控组件" />
                <br />
                <input type="text" value={this.state.text} onChange={(evt) => {
                    console.log(evt.target.value);
                    this.setState({
                        text: evt.target.value
                    });
                }} />
                <br />
                <br />

                <button onClick={() => this.get()} >获取</button>
                <button onClick={() => this.reset()} >重置</button>

                <br />

                <Child {...this.state} ></Child>
            </div>
        );
    }
}

export default Tab2;