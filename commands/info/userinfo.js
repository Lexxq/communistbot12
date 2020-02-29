const { getMember, formatDate } = require("../../functions.js");
const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "userinfo",
    aliases: ["userinfo", "user", "who"],
    category: "info",
    description: "Returns user information",
    usage: "[username | id, | mention]",
    run: async (client, message, args) => {
        const member = getMember(message, args.join(" "));


        // Member variables
        const joined = formatDate(member.joinedAt);
        const roles = member.roles
        .filter(r => r.id !== message.guild.id)
        .map(r => r)
        .join(", ") || "none";

        // User Variables
        const created = formatDate(member.user.createdAt);

        const embed = new RichEmbed()
               .setFooter(member.displayName, member.user.displayAvatarURL)
               .setThumbnail(member.user.displayAvatarURL)
               .setColor("RED")

               .addField('Member Information', stripIndents`**> Display name:** ${member.displayName}
               **> Joined at:** ${joined}
               *>> Roles:** ${roles}`, true)

               .addField('Member Information', stripIndents`**> Display name:** ${member.user.id}
               **> Username:** ${member.user.username}
               **> Discord Tag:** ${member.user.tag}
               **> Created at:** ${created}`)

               .setTimestamp()

        if (member.user.presence.game)
        embed.addField('Currently Playing', `**> Name:** ${member.user.presence.game.name}`);

        message.channel.send(embed);




    }
}