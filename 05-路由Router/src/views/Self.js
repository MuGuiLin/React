import React from 'react';

export default class Self extends React.Component {
    constructor(props) {
        super(props)
    };

    render() {
        console.log(this.props)
        return(
            <section className="about">
                <h1>个人中心</h1>
                <hr></hr>


            </section>
        )
    }
};