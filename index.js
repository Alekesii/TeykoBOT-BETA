const Discord = require('discord.js');
const { Client, Intents, Partials, Collection } = require("discord.js");
const { token, clientID} = require('./config.js');
const { readdirSync } = require("fs")
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const client = new Client({
	intents: [
        Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_BANS,
        Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
        Discord.Intents.FLAGS.GUILD_INVITES,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Discord.Intents.FLAGS.GUILD_PRESENCES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILD_WEBHOOKS,
	], 
});
const DiscordRPC =  require('discord-rpc');
const RPC = new DiscordRPC.Client({ transport: 'ipc'});
DiscordRPC.register(clientID);

async function setActivity(){
    if(!RPC) return;
    RPC.setActivity({
        details:'Teyko',
        state:'Joue sur Teyko',
        startTimestamp: Date.now(),
        largeImageKey:'bird',
        largeImageText:'bird',
        smallImageKey:'bird',
        smallImageText:'bird',
        instance: false,
        buttons: [
        {
            label:'Discord',
            url:'https://discord.gg/teyko'

        },
        {
            label:'WEB',
            url:'https://teyko.eu'
        }
    ]
    })


}
const rest = new REST({ version: '9' }).setToken(token);
client.slashcommands = new Collection()
client.handlerbuttons = new Collection()

client.on('ready', () => {
    console.log("Teyko BOT est opérationnel !")
    try {
        rest.put(
            Routes.applicationCommands(client.user.id),
            { body: slashcommands, handlerbuttons },
        )
    } catch (error0) {
        console.error(error0);
    }
    setActivity();

    setInterval (() => {
        setActivity
    }, 15*1000);
    
    RPC.login({id:clientID}).catch(err => console.log(err))

    console.log(`Commandes : OK`);
    
});



const slashcommands = [];
readdirSync('./commands').forEach(async file => {

  const command = require(`./commands/${file}`);
  slashcommands.push(command.data.toJSON());
  client.slashcommands.set(command.data.name, command);
})

const handlerbuttons = [];
readdirSync('./buttons').forEach(async file => {

  const buttons = require(`./buttons/${file}`);
  handlerbuttons.push(buttons.data.toJSON());
  client.handlerbuttons.set(buttons.data.name, buttons);
})

readdirSync('./events').forEach(async file => {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
})


client.login(token, clientID);



