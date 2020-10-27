import { Ref } from "_vue@3.0.2@vue";

export interface PluginOpt {
    roles:string[],
    command?:string
}

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

declare module '@vue/runtime-core' {
       interface ComponentCustomProperties {
         $roles:string[];
         $roler:Omit<RoleInstanceClass,"init">
      }
     }