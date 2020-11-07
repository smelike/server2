import React, { Component } from 'react';
import Hello from '../component/Hello';
import { inject } from 'mobx-react';
import { withRouter,Link } from 'react-router-dom';
import { Button, Intent, Spinner } from '@blueprintjs/core';
import SoloLayout from '../component/SoloLayout';

@withRouter
@inject("store")
export default class Index extends Component
{
    render()
    {
        return <SoloLayout title="首页">content</SoloLayout>;
        // return <div>
        //     <h1><Hello/></h1>
        //     <div><Button onClick={()=>this.props.store.appname+='🎈'}>change</Button></div>
        //     <div><span onClick={()=>this.props.history.push("/login")}>Login</span></div>

        // </div>;
    }
} 