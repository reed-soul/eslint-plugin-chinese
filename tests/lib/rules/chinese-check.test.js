'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

let rule = require('../../../lib/rules/chinese-check')

let RuleTester = require('eslint').RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

let ruleTester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {
    ecmaVersion: 10,
  },
})

ruleTester.run('chinese-check', rule, {
  valid: [
    // 合法示例
    "var a = '環境測試'",
    "console.log('運行成功')",
  ],

  invalid: [
    // 不合法示例
    {
      code: "const a = '简體'",
      errors: [
        {
          messageId: 'chinese-check',
          data: {
            message: `【简體】检测到简体字：\n${[{ o: '简', n: '簡' }]
              .map((char) => `\n${char.o} => ${char.n}`)
              .join('')}`,
          },
        },
      ],
      options: ['S'],
    },
    {
      code: "console.log('運行失败')",
      errors: [
        {
          messageId: 'chinese-check',
          data: {
            message: `【運行失败】检测到繁体字：\n${[{ o: '運', n: '运' }]
              .map((char) => `\n${char.o} => ${char.n}`)
              .join('')}`,
          },
        },
      ],
      options: ['T'],
    },
  ],
})
