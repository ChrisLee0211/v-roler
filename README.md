# 介绍
![IMAGE](https://img.shields.io/badge/vue-3.x-blue)
![IMAGE](https://img.shields.io/badge/typescript-3.x-blue)

使用简单的vue指令，即可完成元素级别的权限控制功能(只支持vue3.x以上版本，未对vue2.x做兼容)
<br>

# 使用方法
## 一、通过yarn或npm安装`v-roler`
```
npm install v-roler
```
## 二、安装插件
在你的vue实例中,安装插件
```typescript
import {createApp} from "vue";
import vRoler from "v-roler";
import App from './App.vue';

createApp(App)
.use(vRoler({roles:["view","add","delete"],command:"can"}))
.mount('#app');

```

## 三、使用
### 1、使用指令控制权限（推荐）
比如在某个组件中需要对某个组件中的元素进行权限控制渲染，如在`a.vue`中：
```html
<Parent>
    <ChildA v-can：view>
        <span>查看权限</span>
    </ChildA>
    <ChildB v-can:create>
        <span>添加权限</span>
    </ChildB>
</Parent>

```
显示的结果是，ChildA被渲染，ChildB被删除，原因是在初始化插件vRoler时，ChildA指令传入的`view`权限已经被声明在权限数组中，所以会正常渲染，但是ChildB的指令传入的`create`并不在初始化的权限数组中，因此会被移除，除非它改为`add`
