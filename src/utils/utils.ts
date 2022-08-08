/**
 * Name：公用函数库
 * Author：Yui
 * Create time：2022年8月8日
 * Modified on：2022年8月8日
 */
import { config } from '../config/config'
import { LOGGER } from './logger';
import { accessSync, constants, mkdirSync, appendFile } from 'fs';

export const UTILS = {
    /**
     *  获取当前道历 从游戏开始时间计算，每15分钟为1年
     *  
     */
    GetDaoTime: function (): number {
        let newTime = new Date().getTime();
        let startTime = new Date(config.game_start_time).getTime();
        let DaoTime = Math.floor((newTime - startTime) / 1000 / 60 / 15);
        return DaoTime
    },
    SaveLog: function (log: string): void {
        // 检查日志目录是否存在
        try {
            // 存在日志目录
            accessSync(config.log_save_path, constants.R_OK | constants.W_OK);
        } catch (error) {
            // 日志目录不存在，创建日志目录
            mkdirSync(config.log_save_path);
        }
        // 添加日志到文件
        let logData = this.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss') + ": " + log;
        appendFile(config.log_save_path + "/" + this.formatDate(new Date(), 'yyyyMMdd') + ".txt", logData, function (err) {
            LOGGER.Err(JSON.stringify(err))
        })

        LOGGER.Log(config.log_save_path)
    },
    formatDate: function (strDate: any, strFormat?: any) {
        if (!strDate) { return; }
        if (!strFormat) { strFormat = 'yyyy-MM-dd'; }
        switch (typeof strDate) {
            case 'string':
                strDate = new Date(strDate.replace(/-/, '/'));
                break;
            case 'number':
                strDate = new Date(strDate);
                break;
        }
        if (strDate instanceof Date) {
            const dict: any = {
                yyyy: strDate.getFullYear(),
                M: strDate.getMonth() + 1,
                d: strDate.getDate(),
                H: strDate.getHours(),
                m: strDate.getMinutes(),
                s: strDate.getSeconds(),
                MM: ('' + (strDate.getMonth() + 101)).substr(1),
                dd: ('' + (strDate.getDate() + 100)).substr(1),
                HH: ('' + (strDate.getHours() + 100)).substr(1),
                mm: ('' + (strDate.getMinutes() + 100)).substr(1),
                ss: ('' + (strDate.getSeconds() + 100)).substr(1),
            };
            return strFormat.replace(/(yyyy|MM?|dd?|HH?|mm?|ss?)/g, function () {
                return dict[arguments[0]];
            });
        }
    }
}

