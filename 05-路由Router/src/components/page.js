import React from 'react';
import { Link, withRouter } from 'react-router-dom'

class Page extends React.Component {
    static mupiao = {
        page: 1,
        pages: 8,
    };

    constructor(props) {
        super(props)
        this.state = {
            page: this.props.page || 1,
            pages: this.props.pages || 6
        }
        this.toggle = this.toggle.bind(this);
    };

    toggle(e, p) {
        console.log(e, p)
    };

    render() {

        let { history, pages, page } = this.props;
        // console.log(this.props, pages, page);
        
        return (
            <ul className="Pagination">

                {
                    /* <li><a noClick={e => { this.toggle(e, 'prev') }}>上一页</a></li> */
                    page > 1 && <li><Link to={'/goods/?page=' + (page - 1)} >上一页</Link></li>
                }

                {
                    (new Array(pages)).fill('').map((o, i) => {
                        return <li key={++i}><Link to={'/goods/?page=' + i} className={i == page ? 'active' : ''} >{i}</Link></li>
                    })
                }

                {
                    /* <li><a noClick={e => { this.toggle(e, 'next') }}>下一页</a></li> */
                    page < pages && <li><Link to={'/goods/?page=' + (page - 0 + 1)} >下一页</Link></li>
                }

                <li className="number">前往<input type="number" defaultValue={page} onKeyDown={e => {
                    if (e.target.value && 13 == e.keyCode) {
                        history.push('/goods/?page=' + e.currentTarget.value);
                        // history.go();
                        // this.props.history.go()可以进行组件刷新，go括号里面填的是数字，代表前一页和后一页，这个特点就是刷新！
                    }
                }} />页</li>
            </ul>
        )
    }
}


/**
 * 注：如果没有用withRouter() 的话，需要在父组件中把history={this.props.history}传过来哦，
 */
// export default Page;

/**
 * withRouter 是react-router-dom中的一个高阶组件，它会把路由的相关对象（history、location、match、staticContext）注入到对应所包裹组件的props对象中，并返回一个带有路由相关对象的，原来的组件
 */
export default withRouter(Page);