import { Compiler } from 'webpack';
import { PluginConfiguration } from "vue-class-stores-generators";
export declare class WebpackClassStoresLoader {
    private configuration;
    constructor(configuration?: PluginConfiguration);
    apply(compiler: Compiler): void;
    setupWatcher(): void;
}
