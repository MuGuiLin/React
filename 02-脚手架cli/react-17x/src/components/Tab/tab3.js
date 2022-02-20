
import React from 'react';
import PropTypes from 'prop-types';

const Tab3 = (props) => {
    console.log(3333, props);
    return (
        <div>
            <h3 style={{ 'backgroundColor': 'green' }}>我是组件3</h3>
            <br />
            <br />
            <br />
            {
                props.title
            }
            {
                props.data.key
            }
            {
                props.data.arr[0]
            }
        </div>
    );
};

console.log('React自带的类型验证器：', PropTypes);

// props属性数据类型验证
Tab3.propTypes = {
    title: PropTypes.string,
    data: PropTypes.object
};

// props属性默认值设置
Tab3.defaultProps = {
    title: '我是默认标题3',
    data: {
        key: 'key',
        arr: ['arr']
    }
};

export default Tab3;                                                       