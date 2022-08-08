/**
 * Name：日志模块
 * Author：Yui
 * Create time：2022年8月8日
 * Modified on：2022年8月8日
 */
import Colors = require('colors.ts');
import { config } from "../config/config";
import { UTILS } from "./utils"

Colors.enable();

export const LOGGER = {
    Log: function (log: string): void {
        config.LOG_PRINT_POWER && console.log(log)
        config.LOG_SAVE_POWER && UTILS.SaveLog(log)
    },
    Err: function (log: string): void {
        config.LOG_PRINT_POWER && console.log(log.error)
        config.LOG_SAVE_POWER && UTILS.SaveLog(log)
    },
    Warn: function (log: string): void {
        config.LOG_PRINT_POWER && console.log(log.warning)
        config.LOG_SAVE_POWER && UTILS.SaveLog(log)
    },
    Succ: function (log: string): void {
        config.LOG_PRINT_POWER && console.log(log.green)
        config.LOG_SAVE_POWER && UTILS.SaveLog(log)
    }
}