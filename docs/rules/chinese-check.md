# 中文简繁体校验 (chinese/chinese-check`)

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

## Options

### 对中文简体进行 lint

```js
{
  plugins: ['chinese']
  rules: {"chinese/chinese-check": ["error", "S", { autoFix: false,ignore: ['console.log'] }}]}
}


```

### 对中文繁体进行 lint

```js
{
  plugins: ['chinese'],
  rules: {"chinese/chinese-check": ["error", "T", { autoFix: false,ignore: ['console.log'] }}]}
}


```

### 开启自动 fix

autoFix 属性默认为 false

```js
{
  plugins: ['chinese'],
  rules: {"chinese/chinese-check": ["error", "T", { autoFix: true,ignore: ['console.log'] }}]}
}


```

### 跳过对 console.log 的校验

ignore 默认忽略对 console.log 的校验

```js
{
  plugins: ['chinese'],
  rules: {"chinese/chinese-check": ["error", "T", { autoFix: true, ignore: ['console.log'] }}]}
}


```
