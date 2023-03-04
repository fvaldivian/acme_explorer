import winston, {Logger} from "winston";
import path from "path";

const logDir = 'logs';
const env = process.env.NODE_ENV || 'development';
let logger: Logger;

winston.addColors(winston.config.npm.colors);

logger = winston.createLogger({
    levels: winston.config.npm.levels,
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({stack: true}),
        winston.format.align(),
        winston.format.printf(info => `${info.timestamp} ${info.level}: ${env === 'development' && info.stack ? info.stack : info.message}`)
    ),
    transports: [
        new winston.transports.Console({
            level: 'warn', // Only write logs of warn level or higher
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            level: env === 'development' ? 'debug' : 'info',
            filename: path.join(__dirname, logDir, '/logs.log'),
            maxsize: 1024 * 1024 * 10 // 10MB
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: path.join(__dirname, logDir, '/exceptions.log')
        })
    ],
    exitOnError: false
});

export default logger;
