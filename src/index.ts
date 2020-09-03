import {Plugin} from "vue";
import RoleCtr from "./core/instance";
import {fnDirective} from "./core/diretive";
interface PluginOpt {
    roles:string[],
    command?:string
}


export const vRolerPlugin: Plugin = (app,opts:PluginOpt):void => {
    RoleCtr.init(opts.roles);
    let command = opts.command??'can';
    app.directive(`${command}`,fnDirective)
}

export default RoleCtr