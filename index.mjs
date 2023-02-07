#! /usr/bin/env node

import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import { exit } from 'process';
import Getopt from 'node-getopt';

/* DEFAULT VALUES */

const MESSAGES_FILE_LOCATION = './src/Messages.js';

const SOURCE_FOLDER = './src';
const SOURCE_FILES_INCLUDE = '*.{js,ts}';
const SOURCE_FILES_EXCLUDE = '*.test.js';

const YELLOW_COLOR = '\x1b[33m';
const RED_COLOR = '\x1b[31m';
const RESET_COLOR = '\x1b[0m';

/* ARGUMENT PARSING */

const getopt = new Getopt([
  ['m', 'msg=ARG', 'file with message definitions', MESSAGES_FILE_LOCATION],
  ['s', 'src=ARG', 'project source folder', SOURCE_FOLDER],
  ['i', 'include=ARG', 'which source files should be included in search.', SOURCE_FILES_INCLUDE],
  ['e', 'exclude=ARG', 'which source files should be excluded from search', SOURCE_FILES_EXCLUDE],
  ['h', 'help', 'display this help']
]);

getopt.setHelp(
  "Parses react-intl message definitions file and searches source files to find out which messages are unused\n" +
  "Usage: react-intl-unused [OPTIONS]\n" +
  "Options:\n" +
  "[[OPTIONS]]\n"
);

const { options } = getopt.parse(process.argv);

if (options.h) {
  getopt.showHelp();
}

/* TRANSLATIONS PARSING */

let messages;

try {
  // message file usually contain ES6 import syntax, but dynamic import
  // only allows module files to contain ES6 import syntax this workaround
  // creates temporary .mjs file with the same name as the message file
  // to fool JS into thinking the message file is a module
  const jsName = path.join(process.env.PWD, options.msg);
  const mjsName = jsName.replace(/.js$/, ".mjs");

  fs.copyFileSync(jsName, mjsName);
  
  messages = await import(mjsName);
  messages = messages.default;

  fs.unlinkSync(mjsName);
}
catch (e) {
  console.error(`${RED_COLOR}Message definitions file ${options.msg} does not exists or is inaccessible, use --msg <path to file> parameter to set it correctly.${RESET_COLOR}\n`, e);
  exit(-1);
}

// for each message key look through all source code files
// if message key is not found, grep exits with code 1 and
// warning message about unused translation key is printed
Object.keys(messages).forEach(key => {
  exec(`grep -rw \
            --include=${options.include} \
            --exclude=${options.exclude} \
            -e 'messages.${key}' \
            '${options.src}'
        `, error => {
    error?.code === 1 && console.log(`${YELLOW_COLOR}Warning: Message key "${key}" is unused${RESET_COLOR}`);
  });
});
