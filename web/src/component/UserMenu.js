import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter, NavLink } from 'react-router-dom';
import UserAvatar from '../component/UserAvatar';
import { Button,Popover, Menu, MenuItem, MenuDivider } from '@blueprintjs/core';

@withRouter
@inject("store")
@observer

export default class UserMenu extends Component
{

    logout()
    {
        // 跳转到 login 页面
        this.props.history.push('/login');
        // 登录用户资料清空
        this.props.store.set_var('user', null);
    }
    render()
    {
        return <div className="top-menu">
                    { this.props.store.user ? <>
                    <UserAvatar data={this.props.store.user} />    
                    {this.props.store.user.nickname}
                    
                    <Popover content={<Menu>
                        <MenuItem text="客户端·登入二维码" onClick={()=>this.props.history.push("/client")}/>
                        <MenuDivider/>
                        <MenuItem text="退出" onClick={()=>this.logout()}/>
                        </Menu>} >
                        <Button icon="caret-down" minimal={true} />
                    </Popover>
                    </> : <div className="menu-item" key="/login">
                        <NavLink  to="/login" exact={true}>登入</NavLink>
                    </div>}
                </div>;
    }
}