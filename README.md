# react-intl-detect-unused
Detects unused [react-intl](https://www.npmjs.com/package/react-intl) translation keys. Parses react-intl message definitions file and searches source files to find out which messages are unused.

## Usage
`react-intl-unused [-m=ARG] [-s=ARG] [-i=ARG] [-e=ARG] [-h]`


Option                  | Description                                       | Default value
------------------------|---------------------------------------------------|--------------------
`-m` or `--msg=ARG`     | File with message definitions                     | `./src/Messages.js`
`-s` or `--src=ARG`     | Project source folder                             | `./src`
`-i` or `--include=ARG` | Which source files should be included in search   | `*.{js,ts}`
`-e` or `--exclude=ARG` | Which source files should be excluded from search | `*.test.js`
`-h` or `--help`        | Display this help                                 |

## Example usage
`react-intl-unused -m=./intl/Messages.js -s=./src -i=*.js -e=./util`

## Restrictions
The script requires `grep` command to be available.