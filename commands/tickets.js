const { MessageEmbed, Permissions } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { name } = require("../events/interactionCreate");
const {MessageActionRow, MessageSelectMenu, MessageButton} = require('discord.js');

module.exports = {
  data: 
    new SlashCommandBuilder()
    .setName("tick")
    .setDescription('Paaa'),
    run:  (client, interaction) => {
      const row =new MessageActionRow()
      .addComponents(new MessageButton()
      .setCustomId("ticketIG")
      .setLabel("Problème en jeu")
      .setStyle("PRIMARY"))

      interaction.reply({content:`test`, components:[row]})

      if(interaction.customId === "ticketIG") interaction.reply("nice");
    }
 };