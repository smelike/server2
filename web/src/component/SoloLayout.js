import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import { withRouter } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import TopNav from '../component/TopNav';
import Footer from '../component/Footer';

@withRouter
@inject("store")
@observer
export default class SoloLayout extends Component
{
    render()
    {
        const main = this.props.children ? this.props.children : null;
        const title = this.props.title || "思考空气|2.0";
        return <DocumentTitle title={title}>
            <>
                <TopNav />
                <div className="main-page container">{main}</div>
                <Footer />
            </>
        </DocumentTitle>;
    }
}