import { FunctionalComponent,h,defineComponent, toRefs, VNode, isRef } from "vue";
import RoleCtr from "../core/instance";

interface Props {
    role:string
}

export const rolerView:FunctionalComponent<Props> = (props,{slots}) => {
    const role = props.role;
    const isMatch = RoleCtr.match(role);
    if(isMatch){
        return slots.default?slots.default():null
    }else{
        return null
    }
}
