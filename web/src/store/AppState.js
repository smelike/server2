import { observable } from "mobx";

class AppState
{
    @observable appname = "EasyStarter";
    @observable top_menu_items = [
        {"text": "首页", "link": "/"},
        {"text": "SendKey", "link": "/sendkey"},
        {"text": "第三方应用和服务", "link": "/apps"},
        {"text": "意见反馈", "link": "/feedback"},
    ];
}

export default new AppState();