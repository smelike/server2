import React, { Component } from 'react';
import {inject} from 'mobx-react';
import {withRouter, Link} from 'react-router-dom';
import {Button, Intent, Spinner } from '@blueprintjs/core';
import SoloLayout from '../component/SoloLayout';

@withRouter
@inject("store")

export default class Login extends Component
{
    render()
    {
        return <SoloLayout title="登入">Login Form</SoloLayout>
        // return <h1>Login form</h1>;
    }
} 