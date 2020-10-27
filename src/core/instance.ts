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
     * 动态添加角色权限
     * @param role 角色数组或单一角色
     */
    addRole(role:string|string[]):Ref<string[]>
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
    private constantRoles:string[] = [];

    constructor(list:string[]){
        this.init(list)
    };

    init(param:string[]){
        if(isArray(param)){
            let isString = param.every(v => typeof(v) === "string");
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
        let isString: boolean = typeValidate(role,"string","the validate target");
        if(!isString) return false
        let result = this.roles.value.includes(role)
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
    public ins:RoleInstanceClass | null = null;
 //
 //
 //
 //
 //这里还是需要改造成cl-flow那种先判断有没有生成实例的方式来代理
    init(roles:string[]){
        if(this.ins===null){
            this.ins = new RoleInstance(roles)
        }
    }

    getRoles():Ref<string[]>{
        return this.ins?.getRoles()??ref([])
    }

    update(roles:string[]){
        this.ins?.update(roles)
    }

    addRole(role:string|string[]):Ref<string[]>{
       return this.ins?.addRole(role)??ref([])
    }

    match(role:string):boolean{
        return this.ins?.match(role)??false
    }
}

export default new RoleCtr()