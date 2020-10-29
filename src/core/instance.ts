import { RoleInstanceClass } from "src/types/global";
import {reactive, Ref, ref, watch} from "vue";
import {isArray,typeValidate} from "../utils";

class RoleInstance implements RoleInstanceClass {
    private roles= reactive<{extra:string[],constant:string[]}>({
        extra:[],
        constant:[]
    })
    private updateMaps:WeakMap<HTMLElement,Function> = new WeakMap()
    constructor(list:string[]){
        this.init(list)
    }

    init(param:string[]){
        if(isArray(param)){
            const isString = param.every(v => typeof(v) === "string");
            if(isString===false){
                throw new Error(`the item in roles array expect type 'String'!`)
            }else{
               this.roles.constant = [...param];
               this.roles.extra = [...param];
               watch(this.roles.extra,()=>{
                   console.log("roles update")
               })
            }
        }else{
            throw new Error(`please use a array as roles init option`)
        }
    }

    getRoles():string[]{
        return this.roles.extra
    }

    addRole(role:string|string[]):string[]{
        if(typeof role === "string"){
            this.roles.extra.push(role)
        }else{
            // const originRoles = [...this.roles.extra];
            this.roles.extra = this.roles.extra.concat(role)

        }
        return this.roles.extra
    }

    update(param:string[]){
        const constant = [...this.roles.constant];
        this.roles.extra = [...constant,...param];
    }

    match(role:string):boolean {
        const isString: boolean = typeValidate(role,"string","the validate target");
        if(!isString) return false
        const result = this.roles.extra.includes(role)
        return result
    }
}


/**
 * 单例模式构造类
 * @param roles 角色数组
 * @author chrislee
 * @Time 2020/9/3
 */
class RoleCtr implements RoleInstanceClass {
    private ins:RoleInstanceClass | null = null;

    init(roles:string[]){
        if(this.ins===null){
            this.ins = new RoleInstance(roles);
        }
    }

    getRoles():string[]{
        return this.getInstance().getRoles()
    }

    update(roles:string[]){
        this.getInstance().update(roles)
    }

    addRole(role:string|string[]):string[]{
       return this.getInstance().addRole(role)
    }

    match(role:string):boolean{
        return this.getInstance().match(role)
    }

    getInstance():RoleInstanceClass{
        if(this.ins!==null){
            return this.ins
        }else{
            throw new Error(`Fail to create the [v-roler] instance, please check the plugin if is installed `)
        }
    }
}

export default new RoleCtr()