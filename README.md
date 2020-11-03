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
显示的结果是，ChildA被渲染，ChildB被删除，原因是在初始化插件vRoler时，ChildA指令传入的`"view"`权限已经被声明在权限数组中，所以会正常渲染，但是ChildB的指令传入的`"create"`并不在初始化的权限数组中.
> 提示：指令中支持v-xx:view或者:v-xx="'view'"的方式。
### 2、使用`roler-view`组件
v-roler在全局注册了`roler-view`组件，你可以将任何需要做权限控制的元素或内容用`roler-view`来包裹着，`roler-view`本身只接收一个熟悉`role`，其作用和指令一致。
```html
<roler-view role="view">
    查看权限
        <roler-view role="edit">编辑权限</roler-view>
        <roler-view role="delete">删除权限</roler-view>
</roler-view>
```
视图只会渲染查看权限和删除权限，因为在插件初始化时并没有声明`edit`的权限路由。