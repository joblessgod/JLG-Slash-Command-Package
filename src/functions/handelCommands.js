const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
require("dotenv").config();

const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

module.exports = (client) => {
  client.handleCommands = async (commandFolders, path) => {
    client.commandArray = [];
    for (folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`${path}/${folder}`)
        .filter((file) => file.endsWith(".js"));
      for (const file of commandFiles) {
        const command = require(`../commands/${folder}/${file}`);
        client.commands.set(command.data.name, command);
        client.commandArray.push(command.data.toJSON());
      }
    }

    const rest = new REST({
      version: "9",
    }).setToken(process.env.TOKEN);

    (async () => {
      try {
        console.log(
          "🔄 Starting the command refresh process... Please hold on."
        );

        await rest.put(Routes.applicationCommands(clientId), {
          body: client.commandArray,
        });

        console.log(
          "✨ The refresh process is complete! All application (/) commands are now synchronized."
        );
      } catch (error) {
        console.error(
          "⚠️ There was an issue during the refresh process. Details:",
          error
        );
      }
    })();
  };
};
