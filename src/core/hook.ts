import RoleCtr from "./instance";

type roles = string[]
type updateRolesFn = (roles:string[])=>void

export function useRoler(roles?:string[]):[roles,updateRolesFn]{
    let currentRoles:string[];
    if(roles){
       currentRoles = RoleCtr.addRole(roles);
    }else{
        currentRoles = RoleCtr.getRoles();
    }

    function update(roles){
        RoleCtr.update(roles);
    }

    return [currentRoles,update];
}