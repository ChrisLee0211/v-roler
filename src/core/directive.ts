import {FunctionDirective} from "vue";
import RoleCtr from "./instance";

export const fnDirective:FunctionDirective<HTMLElement,string> = (el,binding,vnode) => {
    const targetByArg:string|undefined = binding.arg;
    const targetByVal:string = binding.value;
    let role:string = targetByArg?targetByArg:targetByVal;
    if(RoleCtr.getRoles().value.length<=0) return
    if(RoleCtr.match(role)===true){
        el.parentNode?.removeChild(el);  
    }
    return
}