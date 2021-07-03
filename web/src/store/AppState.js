import { observable } from "mobx";
import axios from 'axios';

class AppState
{
    api_base = 'http://127.0.0.1:8080';
    @observable appname = "EasyStarter";
    @observable top_menu_items = [
        {"text": "首页", "link": "/"},
        {"text": "SendKey", "link": "/sendkey"},
        {"text": "第三方应用和服务", "link": "/apps"},
        {"text": "意见反馈", "link": "/feedback"},
    ];
    async get_qrcode()
    {
        const {data} = await axios.get(this.api_base + '/qrcode');
        return data || false;
    }
}

export default new AppState();