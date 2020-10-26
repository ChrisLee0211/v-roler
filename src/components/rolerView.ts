import { FunctionalComponent,h } from "vue";
import RoleCtr from "../core/instance";

interface Props {
    role:string
}

const rolerView:FunctionalComponent<Props> = (props,context) => {
    let role = props.role;
    const isMatch = RoleCtr.match(role);
    if(isMatch){
        return h(context.slots)
    }else{
        return h('')
    }
}

export default function createRolerView (role:string)  {
    return h(rolerView,{role})
}