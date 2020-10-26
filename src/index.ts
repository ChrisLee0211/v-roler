import {App, Plugin} from "vue";
import init from "./core/init";
import {fnDirective} from "./core/diretive";

var Vue:App;


/**
 * v-role初始化安装逻辑
 * @param app vue实例
 * @param opts 路由配置项
 * @author chrislee
 * @Time 2020/10/24
 */
export const vRolerPlugin: Plugin = (app,opts:PluginOpt):void => {
    if(Vue&&Vue === app){
        console.error(`[v-roler] already installed. app.use(vRoler) should be called only once in each app`);
        return
    }else{
        Vue = init(app,opts);
        let command = opts.command??'can';
        app.directive(`${command}`,fnDirective)
    }
}

export default RoleCtr