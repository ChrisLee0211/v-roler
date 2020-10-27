import { PluginOpt } from "src/types/global";
import {App, FunctionDirective} from "vue";
import RoleCtr from "./instance";

export const fnDirective:FunctionDirective<HTMLElement,string> = (el,binding) => {
    const targetByArg:string|undefined = binding.arg;
    const targetByVal:string = binding.value;
    let role:string = targetByArg?targetByArg:targetByVal;
    if(RoleCtr.getRoles().value.length<=0) return
    if(RoleCtr.match(role)!==true){
        el.parentNode?.removeChild(el);  
    }
    return
}

export const initDirective = (app:App,opts:PluginOpt):App => {
    let command = opts.command??'can';
    return app.directive(`${command}`,fnDirective)
}