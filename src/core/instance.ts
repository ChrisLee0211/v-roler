import { RoleInstanceClass } from "src/types/global";
import {Ref, ref} from "vue";
import {isArray,typeValidate} from "../utils";

class RoleInstance implements RoleInstanceClass {
    private roles:Ref<string[]> = [] as any;
    private constantRoles:string[] = [];

    constructor(list:string[]){
        this.init(list)
    }

    init(param:string[]){
        if(isArray(param)){
            const isString = param.every(v => typeof(v) === "string");
            if(isString===false){
                throw new Error(`the item in roles array expect type 'String'!`)
            }else{
               this.constantRoles = [...param];
               this.roles = ref(this.constantRoles);
            }
        }else{
            throw new Error(`please use a array as roles init option`)
        }
    }

    getRoles():Ref<string[]>{
        return this.roles
    }

    addRole(role:string|string[]):Ref<string[]>{
        if(typeof role === "string"){
            this.roles.value.push(role)
        }else{
            const originRoles = this.roles.value.slice(0);
            this.roles.value = [...originRoles,...role];

        }
        return this.roles
    }

    update(param:string[]){
        this.roles.value = [...this.constantRoles,...param];
    }

    match(role:string):boolean {
        const isString: boolean = typeValidate(role,"string","the validate target");
        if(!isString) return false
        const result = this.roles.value.includes(role)
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

    getRoles():Ref<string[]>{
        return this.getInstance().getRoles()
    }

    update(roles:string[]){
        this.getInstance().update(roles)
    }

    addRole(role:string|string[]):Ref<string[]>{
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