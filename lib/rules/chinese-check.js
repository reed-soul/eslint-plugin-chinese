const {
  containSimplified,
  containTraditional,
  isChinese,
  generateNewText,
  generateErrMessage,
  getSchemaConfig,
  isConsoleLog
} = require('../utils')

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: '中文简繁体校验',
      category: 'Possible Errors',
      recommended: false,
    },
    fixable: 'code',
    schema: [
      { enum: ['S', 'T'] },
      {
        type: 'object',
        properties: {
          autoFix: {
            type: 'boolean',
            default: false
          },
          ignore: {
            type: 'array',
            default:  []
          }
        },
        additionalProperties: false
      }],
    messages: {
      'chinese-check': "'{{ message }}'",
    },
  },
  create(context) {
    const { mode, ignore } =  getSchemaConfig(context)
    const onlyTraditional = mode === 'S'

    // 是否跳过对console.log的校验
    const isIgnoreConsoleLog = ignore.includes('console.log')

    function check(node, text, onlyTraditional,range) {
      if (!onlyTraditional && !containTraditional(text)) return
      if (onlyTraditional && !containSimplified(text)) return
      context.report({
        node,
        messageId: 'chinese-check',
        data: {
          message: generateErrMessage(text, onlyTraditional),
        },
        fix(fixer) {
          if(getSchemaConfig(context).autoFix) {
           return fixer.replaceTextRange(range, generateNewText(text, onlyTraditional))
          }
        },
      })
    }

    return {
      ...context.parserServices.defineTemplateBodyVisitor({
        VText(node) {
          if (isChinese(node.value)) {
            check(node, node.value, onlyTraditional, node.range)
          }
        },
        VLiteral(node) {
          if (isChinese(node.value)) {
            check(node, node.value, onlyTraditional, node.range)
          }
        },
      }),
      TemplateElement(node) {
        const element = node.parent && node.parent.parent
        if(isIgnoreConsoleLog && isConsoleLog(element))return

        if (isChinese(node.value.raw)) {
          check(node, node.value.raw, onlyTraditional, node.range)
        }
      },
      Literal(node) {
        const element = node.parent
        if(isIgnoreConsoleLog && isConsoleLog(element))return

        if (isChinese(node.value)) {
          check(node, node.value, onlyTraditional, node.range)
        }
      },
    }
  },
}
