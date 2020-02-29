const { RichEmbed} = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");

module.exports = {
    name: "kick",
    category: "moderation",
    description: "Kicks the member",
    usage: "<id | mention",
    run: async (client, message, args) => {
        const logChannel = message.guild.channels.find(c => c.name === "logs") || message.channel;

        if (message.deleteable) message.delete();


        //no mention
        if (!args[0]) {
            return message.reply("Please provide a person to kick")
            .then(m => m.delete(5000));

        }

        //no reason
        if (!args[1]) {
          return message.reply("Please provide a reason to kick")
          .then(m => m.delete(5000));

    }       

        //no author permission
        if (!message.member.hasPermission("KICK_MEMBERS")) {
            return message.reply("❌ You do not have permission to kick members.")
            .then(m => m.delete(5000));

        }


        //no mention
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
            return message.reply("❌ I do not have permissions to kick")
            .then(m => m.delete(5000));

        }


        const toKick = message.mentions.members.first() || message.guild.members.get(args[0]);

        // No Member found

        if (!toKick) {
            return message.reply("Couldn't find that member, try again!")
                .then(m => m.delete(5000));
        }


        //Cant kick urself

        if (message.author.id === toKick.id) {
            return message.reply("Can't kick urself dumbass")
                 .then(m => m.delete(5000));
                
        }


        if (!toKick.kickable) {
            return message.reply("y u tryna kick someone that higher role then u dumb boi")
                .then(m => m.delete(5000));

        }

        const embed = new RichEmbed()
        .setColor("RED")
        .setThumbnail(toKick.user.displayAvatarURL)
        .setFooter(message.member.displayName, message.author.displayAvatarURL)
        .setDescription(stripIndents`**> Kicked member:** ${toKick} (${toKick.id})
        **> Kicked By:** ${message.author} (${message.author.id}
        **> Reason:** ${args.slice(1).join(" ")}`);

        const promptEmbed = new RichEmbed()
        .setColor("GREEN")
        .setAuthor("This verification becomes invalid after 30s")
        .setDescription(`Do you want to kick ${toKick}?`)


    
         message.channel.send(promptEmbed).then(async msg => {
             const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

             if (emoji === "✅") {
                 msg.delete();

                 toKick.kick(args.slice(1).join(" "))
                 .catch(err => {
                     if (error) return message.channel.send(`Well.... something went wrong!`);

                 });

                 log.channel.send(embed);

                } else if (emoji === "❌") {
                    msg.delete();


                    message.reply("Kick cancelled...")
                       .then(m => m.delete(5000));
                }
            });
        }
    }
                
                
        
        
            
