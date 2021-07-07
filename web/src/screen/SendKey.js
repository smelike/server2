import React, { Component } from 'react';
import { observer , inject } from 'mobx-react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
// import DocumentTitle from 'react-document-title';
import { Button, FormGroup, InputGroup } from '@blueprintjs/core';
import SoloLayout from '../component/SoloLayout';

@withRouter
@inject("store")
@observer
export default class SendKey extends Component
{
    async make_key( confirm = false)
    {
        if ( confirm ) {
            if (!window.confirm('是否重新生成 sendkey')) return false;
            const ret = await this.props.store.make_key();
            console.log(ret);
        }
    }
    render()
    {
        const user = this.props.store.user;

        const main = <div className="padding50">
            <div className="thetitle">SendKey</div>
            <FormGroup className="top10">
                <InputGroup id="text-input" placeholder="SendKey" large={true} value={user.sendkey} />
            </FormGroup>
            <div>
                { user.sendkey ? <>
                <Button className="right10" text="复制" large={true} />
                <Button text="重置" intent="danger" large={true} onClick={() => this.make_key()} />
                </> : <Button text="生成key" large={true} onClick={() => this.make_key(true)} /> }
            </div>
        </div>;

        return <SoloLayout title={this.props.store.appname}>{main}</SoloLayout>;
    }
}