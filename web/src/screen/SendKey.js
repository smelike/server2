import React, { Component } from 'react';
import { observer , inject } from 'mobx-react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
// import DocumentTitle from 'react-document-title';
import { Button, ControlGroup, FormGroup, InputGroup } from '@blueprintjs/core';
import {CopyToClipboard} from "react-copy-to-clipboard";
import SoloLayout from '../component/SoloLayout';
import { toast } from '../util/Function';

@withRouter
@inject("store")
@observer
export default class SendKey extends Component
{
    state = {"show_key": false };

    async make_key( confirm = false)
    {
        if ( confirm ) {
            if (!window.confirm('是否重新生成 sendkey')) return false;
        }
        const ret = await this.props.store.make_key();
        if (ret || ret.sendkey) {
            this.props.store.set_var("user", ret);
        }
        console.log(ret);
    }

    render()
    {
        const user = this.props.store.user;
        if (!user) return <>请先登入</>;
        
        const thekey = this.state.show_key ? user.sendkey : "***********";
        const theicon = this.state.show_key ? 'eye-open' : 'eye-off';

        const main = <div className="padding50">
            <div className="thetitle">SendKey</div>
            <FormGroup className="top10">
                <ControlGroup vertical={false}>
                <Button large={true} icon={theicon} onClick={() => this.setState({"show_key": !this.state.show_key})} />
                <InputGroup id="text-input" placeholder="SendKey" large={true} value={thekey} />
                </ControlGroup>
            </FormGroup>
            <div>
                { thekey ? <>
                <CopyToClipboard text={thekey} onCopy={() => {toast("SendKey已经复制到剪贴板")}}>
                    <Button className="right10" text="复制" large={true} />
                </CopyToClipboard>
                <Button text="重置" intent="danger" large={true} onClick={() => this.make_key(true)} />
                </> : <Button text="生成key" large={true} onClick={() => this.make_key(true)} /> }
            </div>
        </div>;

        return <SoloLayout title={this.props.store.appname}>{main}</SoloLayout>;
    }
}