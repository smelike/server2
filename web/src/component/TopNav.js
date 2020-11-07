import React, { Component } from 'react';
import {observer, inject } from 'mobx-react';
import {withRouter } from 'react-router-dom';
import TopMenu from '../component/TopMenu';
import UserMenu from '../component/UserMenu';

@withRouter
@inject("store")
@observer

export default class TopNav extends Component 
{
    render() {
        return <div className="top-nav">
            <div className="container">
                <div className="left">
                    <div className="logo"><h2>Server将</h2></div>
                    <TopMenu />
                </div>
                <div className="right">
                    <h3><UserMenu /></h3>
                </div>
            </div>
        </div>;
    }
}