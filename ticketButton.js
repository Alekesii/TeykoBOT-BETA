 const { MessageEmbed, Permissions } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { name, execute } = require("../events/interactionCreate");
const {MessageActionRow, MessageSelectMenu, MessageButton} = require('discord.js');

module.exports = {
  data: 
  new MessageActionRow()
      .addComponents(new MessageButton()
      .setCustomId("ticketIG")
      .setLabel("Problème en jeu")
      .setStyle("PRIMARY")),
  run:  (client, interaction) => {
      interaction.reply("aa")
  }
    

 };