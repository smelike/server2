import React, { Component } from 'react';
import { observer , inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Icon } from "@blueprintjs/core";

@withRouter
@inject("store")
@observer
export default class UserAvatar extends Component
{
    // constructor(props) 
    // {
    //     super(props);
    // }
    
    // componentDidMount()
    // {
    //    // 
    // }

    // componentDidUpdate(prevProps)
    // {
    //     if (this.props.data !== prevProps.data) 
    //     {
           
    //     }
    // }
    
    render()
    {
        return <div className="user-avatar"><img src={this.props.data.headimgurl} /></div>;
    }
}