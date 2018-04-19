const {logLevel} = evaSpace
function isWindows () {
  return process.platform === 'win32'
}

function isLinux () {
  return process.platform === 'linux'
}

function isMac () {
  return process.platform === 'darwin'
}

const rewriteConsole = logger => {
  console.log = function (item) {
    logger.info(item)
  }
  console.info = function (item) {
    logger.info(item)
  }
  console.debug = function (item) {
    logger.debug(item)
  }
  console.trace = function (item) {
    logger.trace(item)
  }
}

const initLogger = (level) => {
  const log4js = require('log4js')
  log4js.configure({
    appenders: {
      out: {
        type: 'console', layout: {
          type: 'pattern',
          pattern: '%[%d{hh:mm:ss\'SSS} %p -- %m%]'
        }
      }
    },
    categories: {default: {appenders: ['out'], level: 'all'}}
  });
  const logger = log4js.getLogger()
  logger.level = level

  // 所有日志种类 ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF
  logger.mark(`日志模块初始化成功，当前日志级别: ${logger.level}`)
  console.oldLog = console.log
  rewriteConsole(logger)
  // 推荐使用 TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK
  return logger
}

const md5 = (str) => {
  const cr = require('crypto');
  const md5 = cr.createHash('md5');
  md5.update(str);
  const result = md5.digest('hex');
  return result.toUpperCase();  //32位大写
}

module.exports = {
  isWindows: isWindows(),
  isLinux: isLinux(),
  isMac: isMac(),
  md5,
  logger: initLogger(logLevel)
}
