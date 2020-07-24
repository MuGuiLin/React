import React, { Component } from 'react';
import "./Footer.scss"
class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <ul>
                    <li>
                        <a href="https://github.com/facebook/react" target="_blank"> GitHub仓库</a>
                    </li>
                    <li>
                        <a href="#">实例</a>
                    </li>
                    <li>
                        <a href="#">优站精选</a>
                    </li>
                    <li>
                        <a href="https://react.docschina.org" target="_blank">关于</a>
                    </li>
                </ul>
            </footer>
        );
    }
}

export default Footer;