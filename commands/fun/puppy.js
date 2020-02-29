const { RichEmbed }  = require("discord.js");
const randomPuppy = require("random-puppy");
 
module.exports = {
    name: "puppy",
    category: "fun",
    description: "sends you an epic puppy picture",
    run: async (client, message, args) => {
        const subReddits = ["puppy", "cutepuppy", "fluffyrats"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];

        const img = await randomPuppy(random);
        const embed = new RichEmbed()
        .setColor("RED")
        .setImage(img)
        .setTitle(`From /r/${random}`)
        .setURL(`https://reddit.com/r/${random}`);


    message.channel.send(embed);

    }
}