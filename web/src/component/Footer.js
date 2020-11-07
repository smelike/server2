import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject("store")
@observer

export default class Footer extends Component
{
    render() {
        return <div className="footer container">
            <div className="gray">-思考空气 荣誉出品-</div>
        </div>
    }
}