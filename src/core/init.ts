import { App } from "vue";
import RoleCtr from "./instance";

export default function initVRoler(app:App,opts:PluginOpt):App {
    RoleCtr.init(opts.roles);
    return app
}