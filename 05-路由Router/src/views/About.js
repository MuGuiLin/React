import React from 'react';

export default class About extends React.Component {
    constructor(props) {
        super(props)
    };

    render() {
        console.log(this.props)
        return(
            <section className="views-box">
                <h1>关于我</h1>
                <hr></hr>


            </section>
        )
    }
};