import React, { Component } from 'react';
import { observer , inject } from 'mobx-react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
// import DocumentTitle from 'react-document-title';
import SoloLayout from '../component/SoloLayout';

@withRouter
@inject("store")
@observer
export default class ClassNamePlaceHolder extends Component
{
    // constructor(props) 
    // {
    //     super(props);
    // }
    
    // componentDidMount()
    // {
    //    // 
    // }

    render()
    {
        const main = <div>ClassNamePlaceHolder</div>;
        return <SoloLayout title={this.props.store.appname}>{main}</SoloLayout>;
    }
}