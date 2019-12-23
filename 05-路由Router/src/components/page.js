import React from 'react';

export default class Page extends React.Component{
    constructor(props){
        super(props)
    };

    render() {
        return(
            <ul className="Pagination">
                <li><a>上一页</a></li>
                <li><a className="active">1</a></li>
                <li><a>2</a></li>
                <li><a>3</a></li>
                <li><a>下一页</a></li>
                <li className="number">前往<input type="number" />页</li>
            </ul>
        )
    }
}