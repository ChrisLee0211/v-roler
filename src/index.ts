import {App, Plugin} from "vue";
import RoleCtr from "./core/instance";
import {fnDirective} from "./core/diretive";

var Vue:App;
interface PluginOpt {
    roles:string[],
    command?:string
}

/**
 * v-role初始化安装逻辑
 * @param app vue实例
 * @param opts 路由配置项
 * @author chrislee
 * @Time 2020/10/24
 */
export const vRolerPlugin: Plugin = (app,opts:PluginOpt):void => {
    if(Vue&&Vue === app){
        console.error(`[v-roler] already installed. app.use(vRoler) should be called only once`);
        return
    }else{
        Vue = app;
        
        RoleCtr.init(opts.roles);
        let command = opts.command??'can';
        app.directive(`${command}`,fnDirective)
    }
}

export default RoleCtr