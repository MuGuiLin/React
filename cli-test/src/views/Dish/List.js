import React, { Component } from 'react';
import axios from 'axios';
import { withRouter, Link } from "react-router-dom";
import "./List.scss";

class Dish extends Component {
    constructor() {
        super();
        this.state = {
            list: []
        }
    }

    getList = () => {
        axios.post('/list', {
            firstName: 'Fred',
            lastName: 'Flintstone'
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }

    toInfo = (id) => {
        this.props.history.push('/dish/info/' + id);
    }

    componentDidMount() {
        axios.get('http://a.itying.com/api/productlist', {
            params: {
                id: 12345
            }
        }).then((res) => {
            console.log(res.data.result);
            this.setState({
                list: res.data.result
            })
        }).catch(function (error) {
            console.log(error);
        }).finally(function () {
            // always executed
        });
    }

    render() {
        console.log('------------------', this.props)
        return (
            <section className="dishlist">
                {
                    this.state.list.map((item, index) => {
                        return (
                            <dl key={item._id} >
                                <dt>
                                    <h4>{item.title}</h4>
                                </dt>
                                {
                                    item.list.map((o, i) => {
                                        return (
                                            <dd key={o._id} onClick={(e) => { this.toInfo(o._id) }} >
                                                {/* <Link to={"/info/" + o._id}> */}
                                                <img src={"http://a.itying.com/" + o.img_url} className="img-thumbnail" />
                                                <p>￥：{o.price}</p>
                                                <h4>{o.title}</h4>
                                                {/* </Link> */}
                                            </dd>
                                        )
                                    })
                                }

                            </dl>
                        )
                    })
                }
            </section>
        );
    }
}

export default Dish;