const { SC, TC } = require('./constants')

// 简体转繁体
const cn2tw = (str) => TC[SC.indexOf(str)]

// 繁体转简体
const tw2cn = (str) => SC[TC.indexOf(str)]

// 判断是否包含中文
const isChinese = (str) => /[\u4e00-\u9fa5]/.test(str)

// 过滤转义字符
const parseChineseToArray = (str) =>
  str
    .replace(/[\r\n]/gm, '')
    .split('')
    .filter((char) => isChinese(char))

// 判断是包含中文简体
const containSimplified = (str) => parseChineseToArray(str).some((char) => SC.includes(char))

// 判断是包含中文繁体
const containTraditional = (str) => parseChineseToArray(str).some((char) => TC.includes(char))

/**
 * 获取fix后的文本内容
 * @param {*} str
 * @param {*} onlyTraditional
 * @returns
 */
const generateNewText = (str, onlyTraditional) => {
  return str.split('').map((char) => {
    if(!isChinese(char)) return char

    if(onlyTraditional && containSimplified(char)) return cn2tw(char)
    if(!onlyTraditional && containTraditional(char)) return tw2cn(char)

    return char
  }).join('')
}

/**
 * 获取报错信息
 * @param {*} str
 * @param {*} onlyTraditional
 * @returns
 */
const generateErrMessage = (str, onlyTraditional) => {
  const replaceStr = parseChineseToArray(str).join('')
  return `【${replaceStr}】${
    onlyTraditional ? '检测到简体字：' : '检测到繁体字：'
  }\n${replaceStr
    .split('')
    .filter((char) => (onlyTraditional ? containSimplified(char) : containTraditional(char)))
    .map((char) => ({ o: char, n: onlyTraditional ? cn2tw(char) : tw2cn(char) }))
    .filter((char) => char.o !== char.n)
    .map((char) => `\n${char.o} => ${char.n}`)
    .join('')}`
}

/**
 * 获取配置项
 * @param {*} context
 * @returns
 */
const getSchemaConfig=(context)=>{
  const [ mode='S',{ autoFix=false, ignore=[] } ] = context.options
  return { mode, autoFix, ignore }
}


/**
 * 是否是console.log
 * @param {*} node
 * @returns
 */
const isConsoleLog = (node) => {
  return node.callee && node.callee.object && node.callee.object.name === 'console' && node.callee.property && node.callee.property.name === 'log'
}

module.exports = {
  getSchemaConfig,
  cn2tw,
  tw2cn,
  isChinese,
  containSimplified,
  containTraditional,
  generateNewText,
  generateErrMessage,
  isConsoleLog
}
