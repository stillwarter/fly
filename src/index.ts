import { UTILS } from "./utils/utils";
import { LOGGER } from './utils/logger';
import { config } from "./config/config";
import { init, exec, sql, transaction } from 'mysqls'

// console.log(`道历：${UTILS.GetDaoTime()}年`)
// LOGGER.Warn("test")
LOGGER.Log("Server Test！")

init(config.MYSQL);




async function ServerInit() {
    const sqlstr = sql.table('fly_dev_test').select()

    const result = await exec(sqlstr.toString());

    LOGGER.Succ(JSON.stringify(result));
}

ServerInit()