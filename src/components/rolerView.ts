import { FunctionalComponent,h,defineComponent, toRefs, VNode, isRef } from "vue";
import RoleCtr from "../core/instance";

interface Props {
    role:string
}

export const rolerView:FunctionalComponent<Props> = (props,{slots}) => {
    const role = props.role;
    const isMatch = (role && RoleCtr.match(role))??false;
    if(isMatch&&slots.default){
        return slots.default
    }else{
        return null
    }
}
