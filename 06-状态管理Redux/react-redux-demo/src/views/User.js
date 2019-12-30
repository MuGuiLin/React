import React from 'react';

import store from '../store';

export default class User extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        // 可以直接导入store后，用getState()方法来取数据
        console.log(store.getState())
        let { users } = store.getState();
        return (
            <section>

            </section>
        )
    }
};