import { App,readonly } from "vue";

import RoleCtr from "./instance";

export const initMixin = (app:App):App => {
    app.config.globalProperties.$roles = readonly(RoleCtr.getRoles());
    app.config.globalProperties.$roler = RoleCtr;
    app.mixin({data(){
        return {
            $$roles:RoleCtr.getRoles()
        }
    }})

    return app
}