import {Client, REST, Routes} from 'discord.js'
import {healthCheckCommand, healthCheckHandler} from "./commands/healthcheck";
import config from "config"

const commands = [
	healthCheckCommand
];

const TOKEN = config.get("discord.botToken")

const CLIENT_ID = config.get("discord.clientId")

const rest = new REST({ version: '10' }).setToken(TOKEN);

export const client = new Client({intents: ["Guilds", "GuildMessages"]})

async function bootstrap() {
	try {
		await rest.put(Routes.applicationCommands(CLIENT_ID), {body: commands});

		client.on("ready", () => {
			console.log("discord bot ready!")
		})

		client.on("interactionCreate", async (interaction) => {
			if (!interaction.isChatInputCommand()) return

			let message
			await interaction.reply("잠시만 기다려보게나! 내 금방 알아오겠네");
			switch (interaction.commandName) {
				case healthCheckCommand.name:
					const isHealthy = await healthCheckHandler()
					message = isHealthy ? '서버는 살아있다네!' : '서버는 현재 죽어있군..'
					break
				default:
					message = 'unknown command'
			}

			console.log(interaction.commandName, message)
			await interaction.followUp(message);
		})

		await client.login(TOKEN)
	} catch (e) {
		console.log(e)
	}
}

bootstrap()

