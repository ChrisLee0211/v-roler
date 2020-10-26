import {Ref, ref} from "vue";
import {isArray,typeValidate} from "../utils";
import {useRoler} from "./hook";

/**
 * 构造一个控制角色列表的类，用于实现对权限的存放更新与判断操作
 * @author chrislee
 * @Time 2020/9/3
 */
export interface RoleInstanceClass {
    /**
     * 获取当前已初始化的角色列表
     */
    getRoles():Ref<string[]>,
    /**
     * 初始化操作
     * @param roles 角色数组
     */
    init(roles:string[]):void,
    /**
     * 更新角色列表
     * @param roles 角色数组
     */
    update(roles:string[]):void,
    /**
     * 验证某一个角色是否存在角色列表中
     * @param role 要验证的角色
     */
    match(role:string):boolean
}

class RoleInstance implements RoleInstanceClass {
    private roles:Ref<string[]> = [] as any;
    private reset:(roles:string[])=>void = ()=>{};

    constructor(list:string[]){
        this.init(list)
    };

    init(param:string[]){
        if(isArray(param)){
            let isString = param.every(v => typeof(v) === "string");
            if(isString===false){
                throw new Error(`the item in roles array expect type 'String'!`)
            }else{
               [this.roles,this.reset] = useRoler(param)
            }
        }else{
            throw new Error(`please use a array as roles init option`)
        }
    }

    getRoles():Ref<string[]>{
        return this.roles
    }

    update(param:string[]){
        this.reset(param)
    }

    match(role:string):boolean {
        let isString: boolean = typeValidate(role,"string","the validate target");
        if(!isString) return false
        let result = this.roles.value.includes(role)
        return result
    }
}

var ins:RoleInstanceClass | null= null;

/**
 * 单例模式构造类
 * @param roles 角色数组
 * @author chrislee
 * @Time 2020/9/3
 */
class RoleCtr implements RoleInstanceClass {
    public ins:RoleInstanceClass | null = null;

    init(roles:string[]){
        if(this.ins===null){
            this.ins = new RoleInstance(roles)
        }
    }

    getRoles():Ref<string[]>{
        return ins?.getRoles()??ref([])
    }

    update(roles:string[]){
        ins?.update(roles)
    }

    match(role:string):boolean{
        return ins?.match(role)??false
    }
}

export default new RoleCtr()