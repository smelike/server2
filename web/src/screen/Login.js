import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import {withRouter, Link} from 'react-router-dom';
import {Button, Intent, Spinner } from '@blueprintjs/core';
import SoloLayout from '../component/SoloLayout';
import QRCode from 'qrcode.react';
import { toast } from '../util/Function';

@withRouter
@inject("store")
@observer
export default class Login extends Component
{
    state={"qrcode": false}
    async componentDidMount()
    {
        // 调用 AppState.js 中的 get_qrcode 方法请求后台 express
        const ret = await this.props.store.get_qrcode();
        if (ret && ret.url) {
            this.setState({'qrcode': ret.url});
            this.props.store.set_var( 'token', ret.token);
        }
    }

    async check_login()
    {
        const ret = await this.props.store.check_login();
        if( ret && ret.level > 0 )
        {
            this.props.store.set_var( 'user', ret);
            toast("登入成功");
            this.props.history.push("/");
        }
        else
        {
            toast("请扫码并在微信中收到提示后再点击按钮");
        }   
    }

    render()
    {
        return <SoloLayout title="登入">
            <div className="code-box">
                {this.state.qrcode ? <><QRCode value={this.state.qrcode} />
                <div className="gray subtitle">请使用微信扫码登录</div></> :<Spinner/>}
                { this.props.store.token ? <div className="checkbtn top10">
                <Button text="扫码后点此继续" onClick={()=>this.check_login()} />
                </div> : null  }
            </div>
        </SoloLayout>
    }
} 