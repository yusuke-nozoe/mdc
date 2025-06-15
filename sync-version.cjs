const fs = require('fs');
const path = require('path');

// package.jsonを読み込み
const packageJson = require('./package.json');

// tauri.conf.jsonを読み込み
const tauriConfPath = path.join(__dirname, './src-tauri/tauri.conf.json');
const tauriConf = require(tauriConfPath);

// バージョンを同期
if (tauriConf.package) {
  tauriConf.package.version = packageJson.version;
} else {
  tauriConf.version = packageJson.version;
}

// ファイルを書き込み
fs.writeFileSync(tauriConfPath, JSON.stringify(tauriConf, null, 2) + '\n');

console.log(`Version synced to ${packageJson.version}`);
