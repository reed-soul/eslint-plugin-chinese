# eslint-plugin-chinese

中文字符检查，判断是否包含中文简体或繁体

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-chinese`:

```sh
npm install eslint-plugin-chinese --save-dev
```

## Usage

Add `chinese` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "chinese"
    ]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "chinese/chinese-check": ["error", "S", { "autoFix": false,"ignore": ["console.log"] }]
    }
}
```

## Rules

<!-- begin auto-generated rules list -->

🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                         | Description | 🔧 |
| :------------------------------------------- | :---------- | :- |
| [chinese](docs/rules/chinese.md) | 中文简繁体校验     | 🔧 |

<!-- end auto-generated rules list -->
