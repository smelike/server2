import React, { Component } from 'react';
import { observer , inject } from 'mobx-react';
import {withRouter, NavLink} from 'react-router-dom';

@withRouter
@inject("store")
@observer
export default class TopMenu extends Component
{
    render()
    {
        return <div className="top-menu">
            { this.props.store.top_menu_items && this.props.store.top_menu_items.map(
                item => <div className="menu-item" key={item.link}>
                    <NavLink to={item.link} exact={true}>{item.text}</NavLink>
                </div>
            )}
        </div>;
    }
}