import * as _ from 'lodash'
import * as Path from 'path'
import * as Log4js from 'log4js'
import * as Util from 'util'
import * as Moment from 'moment'
import * as StackTrace from 'stacktrace-js'
import Chalk from 'chalk'
import { LoggerService } from '@nestjs/common';

export enum LoggerLevel {
    ALL = 'ALL',
    MARK = 'MARK',
    TRACE = 'TRACE',
    DEBUG = 'DEBUG',
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR',
    FATAL = 'FATAL',
    OFF = 'OFF',
}

export class ContextTrace {
    constructor(
        public readonly context: string,
        public readonly path?: string,
        public readonly lineNumber?: number,
        public readonly columnNumber?: number,
    ) { }
}

Log4js.addLayout('Awesome-nest', (logConfig: any) => {
    return (logEvent: Log4js.LoggingEvent): string => {
        let moduleName: string = ''
        let position: string = ''

        const messageList: string[] = []
        logEvent.data.forEach((value: any) => {
            if (value instanceof ContextTrace) {
                moduleName = value.context
                if (value.lineNumber && value.columnNumber) {
                    position = `${value.lineNumber}, ${value.columnNumber}`
                }
                return
            }

            if (typeof value !== 'string') {
                value = Util.inspect(value, false, 3, true)
            }

            messageList.push(value)
        })

        const messageOutput: string = messageList.join(' ')
        const positionOutput: string = position ? ` [${position}]` : ''
        const typeOutput: string = `[${
            logConfig.type
            }] ${logEvent.pid.toString()}   - `
        const dateOutput: string = `${Moment(logEvent.startTime).format(
            'YYYY-MM-DD HH:mm:ss',
        )}`
        const moduleOutput: string = moduleName
            ? `[${moduleName}] `
            : '[LoggerService] '
        let levelOutput: string = `[${logEvent.level}] ${messageOutput}`

        switch (logEvent.level.toString()) {
            case LoggerLevel.DEBUG:
                levelOutput = Chalk.green(levelOutput)
                break
            case LoggerLevel.INFO:
                levelOutput = Chalk.cyan(levelOutput)
                break
            case LoggerLevel.WARN:
                levelOutput = Chalk.yellow(levelOutput)
                break
            case LoggerLevel.ERROR:
                levelOutput = Chalk.red(levelOutput)
                break
            case LoggerLevel.FATAL:
                levelOutput = Chalk.hex('#DD4C35')(levelOutput)
                break
            default:
                levelOutput = Chalk.grey(levelOutput)
                break
        }

        return `${Chalk.green(typeOutput)}${dateOutput}    ${Chalk.yellow(
            moduleOutput,
        )}${levelOutput}${positionOutput}`
    }
})

// Log4js.configure({
//     appenders: {
//         console: {
//             type: 'stdout',
//             layout: { type: 'Awesome-nest' },
//         }
//     },
//     categories: {
//         default: {
//             appenders: ['console'],
//             level: 'debug',
//         },
//     },
// })


const logger = Log4js.getLogger()
logger.level = LoggerLevel.TRACE

const httpLog = Log4js.getLogger('http');
export const httpLogger = Log4js.connectLogger(httpLog, { level: 'WARN', });

export class CustomLogger implements LoggerService {
    trace(...args) {
        logger.trace(this.getStackTrace(), ...args)
    }

    debug(...args) {
        logger.debug(this.getStackTrace(), ...args)
    }

    log(...args) {
        logger.info(this.getStackTrace(), ...args)
    }

    info(...args) {
        logger.info(this.getStackTrace(), ...args)
    }

    warn(...args) {
        logger.warn(this.getStackTrace(), ...args)
    }

    warning(...args) {
        logger.warn(this.getStackTrace(), ...args)
    }

    error(...args) {
        logger.error(this.getStackTrace(), ...args)
    }

    fatal(...args) {
        logger.fatal(this.getStackTrace(), ...args)
    }

    getStackTrace(deep: number = 2): ContextTrace {
        const stackList: StackTrace.StackFrame[] = StackTrace.getSync()
        const stackInfo: StackTrace.StackFrame = stackList[deep]

        const lineNumber: number = stackInfo.lineNumber
        const columnNumber: number = stackInfo.columnNumber
        const fileName: string = stackInfo.fileName

        const extnameLength: number = Path.extname(fileName).length
        let basename: string = Path.basename(fileName)
        basename = basename.substr(0, basename.length - extnameLength)
        const context: string = _.upperFirst(_.camelCase(basename))

        return new ContextTrace(context, fileName, lineNumber, columnNumber)
    }
}


Log4js.configure({
    appenders: {
        fileAppender: {
            type: 'DateFile',
            filename: './logs/prod.log',
            pattern: 'yyyyMMdd.log',
            alwaysIncludePattern: true,
            layout: { type: 'Awesome-nest' },
            daysToKeep: 60
        },
        errorLog: {
            type: 'file',
            filename: './logs/error.log',
            pattern: 'yyyyMMdd.log',
            alwaysIncludePattern: true,
            layout: { type: 'Awesome-nest' },
        },
        error: { type: "logLevelFilter", level: "error", appender: 'errorLog' },
        //http请求日志  http请求日志需要app.use引用一下， 这样才会自动记录每次的请求信息 
        httpLog: {
            type: "file",
            filename: "./logs/http.log",
            pattern: "yyyyMMdd.log",
            alwaysIncludePattern: true,
            // keepFileExt: true,
            layout: { type: 'Awesome-nest' },
        },
    },
    categories: {
        //appenders:采用的appender,取上面appenders项,level:设置级别
        http: {
            appenders: ['httpLog'],
            level: "debug"
        },
        default: {
            appenders: ['fileAppender', 'error'],
            level: 'info'
        }
    },
})