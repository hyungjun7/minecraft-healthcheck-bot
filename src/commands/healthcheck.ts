import {ICommand} from "../types/command";
import {ping} from "minecraft-server-ping";
import config from "config"

const healthCheckCommand: ICommand = {
	name: 'healthcheck',
	description: '서버가 살아있나~ 죽었나~'
}

async function healthCheckHandler(): Promise<boolean> {
	try {
		await ping(config.get("minecraft.address"), config.get("minecraft.port"));
		return true
	} catch (e) {
		return false
	}
}



export {healthCheckCommand, healthCheckHandler}