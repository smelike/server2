import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter, NavLink } from 'react-router-dom';
import UserAvatar from '../component/UserAvatar';

@withRouter
@inject("store")
@observer

export default class UserMenu extends Component
{

    render()
    {
        return <div className="top-menu">
                { this.props.store.user ? <UserAvatar data={this.props.store.user} />
                : <div className="menu-items" key="/login">
                <NavLink to="login" exact={true}>登入</NavLink>
                </div>}
                </div>;
    }
}