import { PluginOpt } from "src/types/global";
import {App, FunctionDirective} from "vue";
import RoleCtr from "./instance";

const fnUpdate:FunctionDirective<HTMLElement,string> = (el,binding,vnode) => {
    const targetByArg:string|undefined = binding.arg;
    const targetByVal:string = binding.value;
    const role:string = targetByArg?targetByArg:targetByVal;
    if(RoleCtr.getRoles().length<=0) return;
    // if(binding.instance){
    //     const dom = el;
    //     RoleCtr.registerUpdateFn(dom,binding.instance.$forceUpdate);
    // }
    if(RoleCtr.match(role)!==true){
        el.parentNode?.removeChild(el);
    }
    // if(RoleCtr.match(role)!==true){
    //     el.setAttribute("style","display:none")
    //     el.style.display = "none"
    // }else{
    //     el.setAttribute("style","display:auto")
    // }
    return;
};

const fnDestory:FunctionDirective<HTMLElement,string> = (el,binding) => {
    RoleCtr.unregisterUpdateFn(el);
    return;
};

export const initDirective = (app:App,opts:PluginOpt):App => {
    const command = opts.command??'can';
    return app.directive(`${command}`,{
        mounted:fnUpdate,
        updated:fnUpdate,
        unmounted:fnDestory
        
    });
};