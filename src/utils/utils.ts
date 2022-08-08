/**
 * Name：公用函数库
 * Author：Yui
 * Create time：2022年8月8日
 * Modified on：2022年8月8日
 */
import { config } from '../config/config'


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
    }

}

