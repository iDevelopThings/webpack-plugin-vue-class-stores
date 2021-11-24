"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebpackClassStoresLoader = void 0;
var vue_class_stores_generators_1 = require("vue-class-stores-generators");
var chokidar_1 = __importDefault(require("chokidar"));
var watcher = null;
var WebpackClassStoresLoader = /** @class */ (function () {
    function WebpackClassStoresLoader(configuration) {
        this.configuration = configuration;
        vue_class_stores_generators_1.Configuration.setConfiguration(configuration);
    }
    WebpackClassStoresLoader.prototype.apply = function (compiler) {
        console.log('Re-generating vue-class-store loader files.');
        (0, vue_class_stores_generators_1.generate)(undefined, this.configuration);
        if (compiler.watching || compiler.watchMode) {
            this.setupWatcher();
        }
    };
    WebpackClassStoresLoader.prototype.setupWatcher = function () {
        var _this = this;
        if (watcher) {
            return;
        }
        watcher = chokidar_1.default.watch(vue_class_stores_generators_1.Configuration.storesPath, {
            ignoreInitial: true,
            ignored: Object.values(vue_class_stores_generators_1.Configuration.fileNames(true, true))
        });
        watcher.on('all', function (event, filename) {
            if (event !== 'add' && event !== 'unlink' && event !== 'change') {
                return;
            }
            if ((0, vue_class_stores_generators_1.isInternallyGeneratedFile)(filename)) {
                return;
            }
            (0, vue_class_stores_generators_1.generate)(undefined, _this.configuration);
            console.log('Re-generated vue-class-store files.');
        });
    };
    return WebpackClassStoresLoader;
}());
exports.WebpackClassStoresLoader = WebpackClassStoresLoader;
//# sourceMappingURL=WebpackClassStoresLoader.js.map