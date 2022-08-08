/**
 * Name：日志模块
 * Author：Yui
 * Create time：2022年8月8日
 * Modified on：2022年8月8日
 */
import Colors = require('colors.ts');
import { config } from "../config/config";

Colors.enable();

export const LOGGER = {
    Log: function (log: string): void {
        config.log_print_power && console.log(log)
        // config.log_save_power &
    },
    Err: function (log: string): void {
        config.log_print_power && console.log(log.error)
    },
    Warn: function (log: string): void {
        config.log_print_power && console.log(log.warning)
    },
    Succ: function (log: string): void {
        config.log_print_power && console.log(log.green)
    }
}