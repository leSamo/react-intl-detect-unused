import { execSync } from 'child_process';

const YELLOW_COLOR = '\x1b[33m';
const RED_COLOR = '\x1b[41m';
const GREEN_COLOR = '\x1b[42m';
const RESET_COLOR = '\x1b[0m';

const EXPECTED_OUTPUT = `${YELLOW_COLOR}Warning: Message key "unusedText" is unused${RESET_COLOR}\n`;

const actualOutput = execSync(`node index.mjs --msg ./test/example/Messages.js --src ./test/example/src/`);

if (actualOutput.toString() === EXPECTED_OUTPUT) {
    console.log(`${GREEN_COLOR}TEST PASSED${RESET_COLOR}`);
    process.exit(0);
}
else {
    console.log(`${RED_COLOR}TEST FAILED${RESET_COLOR}`);
    process.exit(-1);
}

