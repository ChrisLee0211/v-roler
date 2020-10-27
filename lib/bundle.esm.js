import { ref, readonly, h } from 'vue';

const typeEnum = {
    "string": "[object String]",
    "number": "[object Number]",
    "boolean": "[object Boolean]",
    "undefined": "object Undefined]",
    "null": "object Null]",
    "object": "[object Object]",
    "function": "[object Function]",
    "array": "[object Array]",
    "date": "[object Date]",
    "reg": "[object RegExp]"
};
/**
 * Verify that a value is an array
 * @param {any} obj
 * @returns {boolean}
 * @author chrislee
 * @Time 2020/7/12
 */
const isArray = (obj) => {
    let res;
    if (obj instanceof Array || Object.prototype.toString.call(obj) === typeEnum["array"]) {
        res = true;
    }
    else {
        res = false;
    }
    return res;
};
const typeValidate = (obj, type, constant = `The value of target`) => {
    let res;
    if (Object.prototype.toString.call(obj) === typeEnum[type]) {
        res = true;
    }
    else {
        let currentType = `undefined`;
        for (const key in typeEnum) {
            if (typeEnum[key] === Object.prototype.toString.call(obj)) {
                currentType = key;
            }
        }
        throw TypeError(`${constant} expect a ${type},but got ${currentType}`);
    }
    return res;
};

class RoleInstance {
    constructor(list) {
        this.roles = [];
        this.constantRoles = [];
        this.init(list);
    }
    init(param) {
        if (isArray(param)) {
            const isString = param.every(v => typeof (v) === "string");
            if (isString === false) {
                throw new Error(`the item in roles array expect type 'String'!`);
            }
            else {
                this.constantRoles = [...param];
                this.roles = ref(this.constantRoles);
            }
        }
        else {
            throw new Error(`please use a array as roles init option`);
        }
    }
    getRoles() {
        return this.roles;
    }
    addRole(role) {
        if (typeof role === "string") {
            this.roles.value.push(role);
        }
        else {
            const originRoles = this.roles.value.slice(0);
            this.roles.value = [...originRoles, ...role];
        }
        return this.roles;
    }
    update(param) {
        this.roles.value = [...this.constantRoles, ...param];
    }
    match(role) {
        const isString = typeValidate(role, "string", "the validate target");
        if (!isString)
            return false;
        const result = this.roles.value.includes(role);
        return result;
    }
}
/**
 * 单例模式构造类
 * @param roles 角色数组
 * @author chrislee
 * @Time 2020/9/3
 */
class RoleCtr$1 {
    constructor() {
        this.ins = null;
    }
    init(roles) {
        if (this.ins === null) {
            this.ins = new RoleInstance(roles);
        }
    }
    getRoles() {
        return this.getInstance().getRoles();
    }
    update(roles) {
        this.getInstance().update(roles);
    }
    addRole(role) {
        return this.getInstance().addRole(role);
    }
    match(role) {
        return this.getInstance().match(role);
    }
    getInstance() {
        if (this.ins !== null) {
            return this.ins;
        }
        else {
            throw new Error(`Fail to create the [v-roler] instance, please check the plugin if is installed `);
        }
    }
}
var RoleCtr$2 = new RoleCtr$1();

const initMixin = (app) => {
    app.config.globalProperties.$roles = readonly(RoleCtr$2.getRoles());
    app.config.globalProperties.$roler = RoleCtr$2;
    app.mixin({ data() {
            return {
                $$roles: RoleCtr$2.getRoles()
            };
        } });
    return app;
};

const fnDirective = (el, binding) => {
    var _a;
    const targetByArg = binding.arg;
    const targetByVal = binding.value;
    const role = targetByArg ? targetByArg : targetByVal;
    if (RoleCtr$2.getRoles().value.length <= 0)
        return;
    if (RoleCtr$2.match(role) !== true) {
        (_a = el.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(el);
    }
    return;
};
const initDirective = (app, opts) => {
    var _a;
    const command = (_a = opts.command) !== null && _a !== void 0 ? _a : 'can';
    return app.directive(`${command}`, fnDirective);
};

const rolerView = (props, context) => {
    const role = props.role;
    const isMatch = RoleCtr$2.match(role);
    if (isMatch) {
        return h(context.slots);
    }
    else {
        return h('');
    }
};

/**
 * 初始化权限路由管理器及其工具
 * @param {App} app 当前vue实例
 * @param {PluginOpt} opts 插件配置项
 * @author chrislee
 * @Time 2020/10/27
 */
function initVRoler(app, opts) {
    RoleCtr$2.init(opts.roles);
    initMixin(app);
    initDirective(app, opts);
    registerComponent(app);
    return app;
}
/**
 * 注册全局组件
 * @param app
 * @author chrislee
 * @Time 2020/10/27
 */
function registerComponent(app) {
    app.component("roler-view", rolerView);
}

function useRoler(roles) {
    let currentRoles;
    if (roles) {
        currentRoles = RoleCtr$2.addRole(roles);
    }
    else {
        currentRoles = RoleCtr$2.getRoles();
    }
    function update(roles) {
        RoleCtr$2.update(roles);
    }
    return [currentRoles, update];
}

let Vue;
/**
 * v-role初始化安装逻辑
 * @param app vue实例
 * @param opts 路由配置项
 * @author chrislee
 * @Time 2020/10/24
 */
const vRolerPlugin = (app, opts) => {
    if (Vue && Vue === app) {
        console.error(`[v-roler] already installed. app.use(vRoler) should be called only once in each app`);
        return;
    }
    else {
        Vue = initVRoler(app, opts);
    }
};
var RoleCtr$3 = RoleCtr;

export default RoleCtr$3;
export { useRoler, vRolerPlugin };
//# sourceMappingURL=bundle.esm.js.map
