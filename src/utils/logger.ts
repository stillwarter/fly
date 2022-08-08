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
        config.log_print_power && console.log(log)
        config.log_save_power && UTILS.SaveLog(log)
    },
    Err: function (log: string): void {
        config.log_print_power && console.log(log.error)
        config.log_save_power && UTILS.SaveLog(log)
    },
    Warn: function (log: string): void {
        config.log_print_power && console.log(log.warning)
        config.log_save_power && UTILS.SaveLog(log)
    },
    Succ: function (log: string): void {
        config.log_print_power && console.log(log.green)
        config.log_save_power && UTILS.SaveLog(log)
    }
}