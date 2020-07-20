import React from 'react';

import {ListItem, ListItemIcon, ListItemText} from '@material-ui/core';

export default class Item extends React.Component {
    constructor(props) {
        super(props)
    };

    render() {
        // console.log(this.props);
        let { text } = this.props;
        let icon = ['🍆', '🌷', '🍒', '🍎', '🌻', '🍇', '🌽', '🍀', '🌼', '🍓', '🌲', '🍏', '🍄', '🍅', '🍐', '🍹']
        return (
            <ListItem>
                <ListItemIcon >{icon[parseInt(Math.random() * 8)]}</ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
        )
    }
}