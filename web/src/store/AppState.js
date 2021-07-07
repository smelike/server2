import { observable , action, computed } from "mobx";
import axios from 'axios';
import { toast } from '../util/Function';

const API_BASE = 'http://127.0.0.1:8080';
// const API_BASE = 'https://service-d9vlyhs4-880000000.gz.apigw.tencentcs.com/release';
async function my_post( url , params )
{
    try {
        const { data } = await axios.post( API_BASE + url, params );
        return data || false;
    } catch (error) {
        const message = error.response &&  error.response.data || error.message;
        toast( message );
        return false; 
    }
}

class AppState
{
    
    @observable appname = "Easy-Starter";
    @observable top_menu_items = [
        {"text": "首页", "link": "/"},
        {"text": "SendKey", "link": "/sendkey"},
        {"text": "第三方应用和服务", "link": "/apps"},
        {"text": "意见反馈", "link": "/feedback"},
    ];
    @observable token = false;    
    @observable user = false;    
    fields_to_save = ['user','token']; 
    
    constructor()
    {
        this.load_vars();
    }

    async get_qrcode()
    {
        // 向服务器的 express 发送【微信扫码登录请求】
        const {data} = await axios.get(API_BASE + '/qrcode');
        return data || false;
    }

    async check_login()
    {
        var params = new URLSearchParams();
        params.append("token" , this.token);

        return await my_post( '/user/self', params );
    }

    async make_key()
    {
        var params = new URLSearchParams();
        params.append("token", this.token);
    
        const { data } = await axios.post(API_BASE + '/user/makekey', params);
        return data || false;
    }

    @action set_var( field , value )
    {
        this[field] = value;
        if( this.fields_to_save.includes(field) ) this.save_vars();
    }

    @action load_vars()
    {
        const saved = window.localStorage.getItem('SC2_SAVED');
        if (saved) {
            const data = JSON.parse(saved);
            this.fields_to_save.forEach(field  => {
                this[field] = data[field];
            });
        }
    }
    @action save_vars()
    {
        let data = {};
        this.fields_to_save.forEach( field =>{
            data[field] = this[field];
        });
        console.log( "data" , JSON.stringify(data) );
        window.localStorage.setItem( "SC2_SAVED" , JSON.stringify( data ) );
    }
}

export default new AppState();