#!/usr/bin/env node
const program = require('commander');
const pkg = require('./package.json');
const clone = require('git-clone');
const log = require('tracer').colorConsole();
const shell = require('shelljs');
const fs = require('fs');

// handle the command
// program
//   .command('init')
//   .description('initialize the Jit files')
//   .action((options) => {
//     init(options);
//   });
program
  .command('create')
  .argument('<string>', 'Give your project a wonderful name!')
  .option('--template <template>', 'Choose a template for project! [Not supported as far as now]')
  .action((name, options) => {
    if (name) {
      log.info('\n✨ Questions and suggestions about Mud.js are welcome: https://github.com/CoderSerio/Mud.js/issues ✨ \n');
      const pwd = shell.pwd();
      const projectPath = `${pwd}/${name}`;
      if (fs.existsSync(projectPath)) {
        log.error(`\nThe project path already exists：${projectPath} \n`);
        return;
      }
      log.info(`\nBuilding on：${projectPath} ... \n`);

      clone(`https://github.com/CoderSerio/mud-template`, projectPath, null, () => {
        shell.rm('-rf', `${projectPath}/.git`);

        log.info('\n🎉 Build successfully! 🎉 \n');
      });
    } else {
      log.error('\nSyntax error, correct format: mud-cli <name> \n');
    }
  });


program
  .version(`👾 ${pkg.version} 🎉`)
  .description(`🤩 ${pkg.description} 🎉`);

program.parse(process.argv);