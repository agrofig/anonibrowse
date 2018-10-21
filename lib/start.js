const path = require('path');
const config = require('../lib/config');
const util = require('../lib/util');

const start = (buildConfig = config.defaultBuildConfig, options) => {
  config.buildConfig = buildConfig;
  config.update(options);

  const braveArgs = [
    '--enable-logging',
    '--v=' + options.v,
  ];
  if (options.vmodule) {
    braveArgs.push('--vmodule=' + options.vmodule);
  }
  if (options.no_sandbox) {
    braveArgs.push('--no-sandbox')
  }
  if (options.disable_brave_extension) {
    braveArgs.push('--disable-brave-extension')
  }
  if (options.disable_brave_rewards_extension) {
    braveArgs.push('--disable-brave-rewards-extension')
  }
  if (options.disable_pdfjs_extension) {
    braveArgs.push('--disable-pdfjs-extension')
  }
  if (options.ui_mode) {
    braveArgs.push(`--ui-mode=${options.ui_mode}`)
  }
  if (!options.enable_brave_update) {
    // This only has meaning with MacOS and official build.
    braveArgs.push('--disable-brave-update')
  }
  if (options.single_process) {
    braveArgs.push('--single-process')
  }
  if (options.show_component_extensions) {
    braveArgs.push('--show-component-extension-options')
  }

  let cmdOptions = {
    stdio: 'inherit',
    shell: true
  };

  if (process.platform === 'darwin') {
    util.run(path.join(config.outputDir, config.macAppName() + '.app', 'Contents', 'MacOS', config.macAppName()), braveArgs, cmdOptions)
  } else if (process.platform === 'win32') {
    util.run(path.join(config.outputDir, 'brave.exe'), braveArgs, cmdOptions)
  } else {
    util.run(path.join(config.outputDir, 'brave'), braveArgs, cmdOptions)
  }
};

module.exports = start;
