#! /usr/bin/env node

"use strict";
const c = require("ansi-colors");
const path = require("path");
const util = require("util");
const fs = require("fs");
const exec = util.promisify(require("child_process").exec);

if (process.argv.length < 3) {
  console.log(c.red.bold("Please name for your threejs project"));
  process.exit(1);
}

const repo = "https://github.com/EiffelFly/create-threejs-starter-pack.git";
const appName = process.argv[2];
const starterPackPath = path.join(process.cwd(), appName);

try {
  fs.mkdirSync(starterPackPath);
} catch (err) {
  if (err.code === "EEXIST") {
    console.log(c.red.bold(`App name ${appName} already exist`));
  } else {
    console.log(err);
  }
  process.exit(1);
}

const setup = async () => {
  try {
    console.log(
      c.green("-------------------------------------------------------")
    );
    console.log();
    console.log(c.blue.bold("๐  Create three.js starter pack"));
    console.log();
    console.log(c.cyan(`๐  Folder name: ${appName}`));
    console.log();
    console.log(c.blue.bold("๐ฅ  Downloading necessary file..."));
    console.log();
    await runCmd(`git clone --depth 1 ${repo} ${appName}`);
    console.log();
  
    process.chdir(starterPackPath);
  
    console.log(c.blue.bold("๐ฆ  Installing dependencies..."));
    console.log();
    await runCmd("npm install");

    // Remove git link
    await runCmd('npx rimraf ./.git');
  
    console.log(c.blue.bold("๐งน  Cleaning up..."));
    console.log();
  
    fs.unlinkSync(path.join(starterPackPath, "package.json"));
    buildPackageJson()

    fs.rm(path.join(starterPackPath, 'bin'), { recursive: true })
    
    await runCmd("npm uninstall ansi-colors");
    
    console.log("๐  You had successfully set up the starter pack")
    console.log("Check README.md for more informations")

  } catch(err){
    console.log(c.red.bold(err))
  }
};

const runCmd = async (command) => {
  try {
    const { stdout, stderr } = await exec(command);
    console.log(stdout);
    console.log(stderr);
  } catch(err) {
    return Promise.reject(err)
  }
};

const buildPackageJson = () => {
  const newPackage = {
    name: appName,
    version: "0.1.0",
    scripts: {
      dev: "webpack serve --config ./webpack/webpack.dev.js",
      build: "webpack --config ./webpack/webpack.prod.js",
    },
    dependencies: {
      "dat.gui": "^0.7.7",
      three: "^0.132.2",
    },
    devDependencies: {
      "@babel/core": "^7.15.5",
      "@babel/preset-env": "^7.15.6",
      "babel-loader": "^8.2.2",
      "clean-webpack-plugin": "^4.0.0",
      "copy-webpack-plugin": "^9.0.1",
      "css-loader": "^6.2.0",
      "html-loader": "^2.1.2",
      "html-webpack-plugin": "^5.3.2",
      "portfinder-sync": "^0.0.2",
      "style-loader": "^3.2.1",
      "webpack": "^5.52.1",
      "webpack-cli": "^4.8.0",
      "webpack-dev-server": "^4.2.0",
      "webpack-merge": "^5.8.0",
    },
  };
  fs.writeFileSync(
    `${process.cwd()}/package.json`,
    JSON.stringify(newPackage, null, 2),
    "utf8"
  );
};

setup();
