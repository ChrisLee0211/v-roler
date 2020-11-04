import {App, Plugin} from "vue";
import init from "./core/init";
import RoleCtr from "./core/instance";
export {useRoler} from "./core/hook";
import { PluginOpt } from "./types/global";

let Vue:App;


/**
 * v-role初始化安装逻辑
 * @param app vue实例
 * @param opts 路由配置项
 * @author chrislee
 * @Time 2020/10/24
 */
const vRolerPlugin: Plugin = (app,opts:PluginOpt):void => {
    if(Vue&&Vue === app){
        console.error(`[v-roler] already installed. app.use(vRoler) should be called only once in each app`);
        return
    }else{
        Vue = init(app,opts);
    }
}

/**
 * 更新全局权限列表
 * @param roles 权限列表
 * @author chrislee
 * @Time 2020/11/4
 */
export const updateRoles = (roles:string[]):void => {
    try{
        RoleCtr.update(roles)
    }catch(e){
        console.error(e)
    }
}

export default vRolerPlugin
