import AppToaster from './Toaster';
import store from '../store/AppState';
export function toast( string ) {
    AppToaster.show({ "message": string});
}

export function tucao( pid )
{
    const user = store.user;
    let data = {};
    if( user ) data = {
        "nickname":user.nickname,
        "openid":user.id,
        "avatar":user.headimgurl
    } 
    Tucao.request(pid, data);
}