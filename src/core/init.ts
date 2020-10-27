import { App } from "vue";
import RoleCtr from "./instance";
import {initMixin} from "./mixin";
import {initDirective} from "./directive";
import {rolerView} from "../components/rolerView";
import { PluginOpt } from "src/types/global";

/**
 * 初始化权限路由管理器及其工具
 * @param {App} app 当前vue实例
 * @param {PluginOpt} opts 插件配置项
 * @author chrislee
 * @Time 2020/10/27
 */
export default function initVRoler(app:App,opts:PluginOpt):App {
    RoleCtr.init(opts.roles);
    initMixin(app);
    initDirective(app,opts);
    registerComponent(app);
    return app
}

/**
 * 注册全局组件
 * @param app 
 * @author chrislee
 * @Time 2020/10/27
 */
function registerComponent(app:App){
    app.component("roler-view",rolerView)
}