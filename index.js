const { spawn } = require('child_process');

function mkvpropedit(file, options) {
  return new Promise((res, rej) => {
    const args = [`${file}`];
    options.forEach(option => {
      args.push(`-e`,`${option.selector}`);
      if (option.set) {
        for (const prop in option.set) {
          const value = option.set[prop];
          args.push(`-s`,`${prop}=${value}`);
        }
      }
      if (option.delete) {
        for (const prop of option.delete) {
          args.push(`-d`,`${prop}`);
        }
      }
    });
    let mkvpropedit;
    try {
      mkvpropedit = spawn('mkvpropedit', args);
    } catch (e) {
      rej(e);
    }
    let stdout = '',
      stderr = '';
    if (mkvpropedit.stdout) {
      mkvpropedit.stdout.on('data', data => {
        stdout += data;
      });
    }

    if (mkvpropedit.stderr) {
      mkvpropedit.stderr.on('data', data => {
        stderr += data;
      });
    }

    mkvpropedit.on('error', error => {
      res({ error, stdout, stderr });
    });

    mkvpropedit.on('close', code => {
      res({ stdout, stderr });
    });
  });
}

module.exports = mkvpropedit;
