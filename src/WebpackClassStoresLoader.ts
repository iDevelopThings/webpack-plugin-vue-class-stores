import {Compiler} from 'webpack';
import {generate, Configuration, PluginConfiguration, isInternallyGeneratedFile} from "vue-class-stores-generators";
import chokidar, {FSWatcher} from 'chokidar';

let watcher: FSWatcher = null;

export class WebpackClassStoresLoader {
	private configuration: PluginConfiguration;

	constructor(configuration?: PluginConfiguration) {
		this.configuration = configuration;

		Configuration.setConfiguration(configuration);
	}

	apply(compiler: Compiler) {

		console.log('Re-generating vue-class-store loader files.');

		generate(undefined, this.configuration);

		if (compiler.watching || compiler.watchMode) {
			this.setupWatcher();
		}
	}

	public setupWatcher() {
		if (watcher) {
			return;
		}

		watcher = chokidar.watch(Configuration.storesPath, {
			ignoreInitial : true,
			ignored       : Object.values(Configuration.fileNames(true, true))
		});

		watcher.on('all', (event, filename) => {

			if (event !== 'add' && event !== 'unlink' && event !== 'change') {
				return;
			}

			if (isInternallyGeneratedFile(filename)) {
				return;
			}

			generate(undefined, this.configuration);

			console.log('Re-generated vue-class-store files.');
		});
	}


}
