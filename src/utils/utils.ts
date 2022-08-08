/**
 * Name：公用函数库
 * Author：Yui
 * Create time：2022年8月8日
 * Modified on：2022年8月8日
 */
import { config } from '../config/config'
import { accessSync, constants, mkdirSync, appendFileSync } from 'fs';

export const UTILS = {
    /**
     *  获取当前道历 从游戏开始时间计算，每15分钟为1年     *  
     */
    GetDaoTime: function (): number {
        let newTime = new Date().getTime();
        let startTime = new Date(config.GAME_START_TIME).getTime();
        let DaoTime = Math.floor((newTime - startTime) / 1000 / 60 / 15);
        return DaoTime
    },
    /**
     * 日志保存到文件
     * @param log 日志内容
     */
    SaveLog: function (log: string): void {
        // 检查日志目录是否存在
        try {
            // 存在日志目录
            accessSync(config.LOG_SAVE_PATH, constants.R_OK | constants.W_OK);
        } catch (error) {
            // 日志目录不存在，创建日志目录
            mkdirSync(config.LOG_SAVE_PATH);
        }
        // 添加日志到文件
        let logData = this.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss') + ": " + log + "\n";
        appendFileSync(config.LOG_SAVE_PATH + "/" + this.formatDate(new Date(), 'yyyyMMdd') + ".txt", logData)
    },
    /**
     * 格式化日期时间
     * @param strDate 日期时间
     * @param strFormat 格式化规则
     * @returns 格式化后的日期时间
     */
    formatDate: function (strDate: Date | string | number, strFormat?: string): any {
        if (!strDate) { return "NaN"; }
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

