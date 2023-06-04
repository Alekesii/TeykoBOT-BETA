const { MessageEmbed, Permissions } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { name } = require("../events/interactionCreate");

module.exports = {
  data: 
    new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Pong!'),
    run:  (client, interaction) => {
      interaction.reply(`Pong 🏓`)
    }
 };