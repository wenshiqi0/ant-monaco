const fs  = require('fs');
const path = require('path');
const cp = require('child_process');
const os = require('os');

const absolute = path.join(__dirname, './extensions');

fs.readdirSync(absolute).forEach(dir => {
  if (fs.statSync(path.join(absolute, dir)).isDirectory()) {
    const ret = cp.spawnSync(`npm${os.platform() === 'win32' ? '.cmd' : ''}`, ['i'], {
      cwd: path.join(__dirname, './extensions', dir)
    });

    console.log(ret.stdout.toString('utf-8'));

    const server = path.join(__dirname, './extensions', dir, 'server');
    if (fs.existsSync(server)) {
      const ret = cp.spawnSync(`npm${os.platform() === 'win32' ? '.cmd' : ''}`, ['i'], {
        cwd: server
      });

      console.log(ret.stdout.toString('utf-8'));
    }
  }
})