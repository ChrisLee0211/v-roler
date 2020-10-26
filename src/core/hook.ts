import {Ref, ref} from "vue";
import RoleCtr from "./instance";

type roles = Ref<string[]>
type updateRolesFn = (roles)=>void
type useRolerResult = [roles,updateRolesFn]

export const useRoler = (roles?:string[]):useRolerResult => {
    let currentRoles = roles?ref(roles):RoleCtr.getRoles();

    const update = (newRoles) => {
        if(roles){
            currentRoles.value = newRoles
        }
    };
    return [currentRoles,update]
}