module.exports = {
	name: 'interactionCreate',
	execute: async(interaction) => {
         let client = interaction.client;
    	 if (!interaction.isCommand() && !interaction.isButton()) return interaction.reply("Erreuur");
   	     if(interaction.user.bot) return;
	        try {
         const command = client.slashcommands.get(interaction.commandName)
         command.run(client, interaction)
        } catch(ee) {
            try {
         const button = client.buttons.get(interaction.customId)
         button.run(client, interaction)
	
	} catch (e){
        interaction.reply("err: " + e )
    }}
}}