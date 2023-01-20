const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const axios = require("axios");

require("dotenv").config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("createcoupon")
    .setDescription("This will create a coupon (Required Admin)")
    .addStringOption((option) =>
      option.setName("ram").setDescription("Enter Ram:").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("disk").setDescription("Enter Disk:").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("cpu").setDescription("Enter CPU:").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("servers").setDescription("Enter Server:").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("coins").setDescription("Enter Coins:").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("code").setDescription("Enter Code:").setRequired(false)
    ),

  async execute(interaction, client) {
    const Iram = interaction.options.getString("ram");
    const Idisk = interaction.options.getString("disk");
    const Icpu = interaction.options.getString("cpu");
    const Iservers = interaction.options.getString("servers");
    const Icoins = interaction.options.getString("coins");
    const Icode = interaction.options.getString("code")
    const userram = parseInt(Iram);
    const userdisk = parseInt(Idisk);
    const usercpu = parseInt(Icpu);
    const userservers = parseInt(Iservers);
    const usercoins = parseInt(Icoins);
    const adminRole = interaction.member.roles.cache.has(`${process.env.Admin_ROLE_ID}`);
    if (adminRole) {
      if (isNaN(userram)) {
        await interaction.reply({ content: "INVALID RAM", ephemeral: true });
      } else if (isNaN(userdisk)) {
        await interaction.reply({ content: "INVALID DISK", ephemeral: true });
      } else if (isNaN(usercpu)) {
        await interaction.reply({ content: "INVALID CPU", ephemeral: true });
      } else if (isNaN(userservers)) {
        await interaction.reply({ content: "INVALID SERVERS", ephemeral: true });
      } else if (isNaN(usercoins)) {
        await interaction.reply({ content: "INVALID COINS", ephemeral: true });
      } else {
        if (Icode == null) {

          const data = { ram: userram, disk: userdisk, cpu: usercpu, servers: userservers, coins: usercoins }

          await axios.post(process.env.Dash_URL + '/api/createcoupon', data, {
            headers: {
              'Authorization': `Bearer ${process.env.DASH_API}`
            }
          }).then(response => {
            const embed = new EmbedBuilder()
              .setTitle(process.env.Name)
              .setColor(0x11cbcb)
              .setURL(`${process.env.Dash_URL}/dashboard`)
              .setDescription(
                "Successfuly Created the Coupon:  [`" + response.data.code + "`]   :white_check_mark:"
              )
              .setThumbnail(
                process.env.Icon
              )
              .addFields(
                {
                  name: `Ram : `,
                  value: "```" + `${Iram} MB ` + "```",
                  inline: true,
                },
                {
                  name: `Disk : `,
                  value: "```" + `${Idisk} MB ` + "```",
                },
                {
                  name: `CPU:`,
                  value: "```" + `${Icpu}% ` + "```",
                },
                {
                  name: `Servers: `,
                  value: "```" + `${Iservers} ` + "```",
                }
              )
              .setTimestamp()
              .setFooter({
                text: interaction.member.user.tag + " | Made By NicoRuizDev",
              });
            interaction.reply({ embeds: [embed] });
          })
        } else {

          const data = { ram: userram, disk: userdisk, cpu: usercpu, servers: userservers, coins: usercoins, code: Icode }

          await axios.post(process.env.Dash_URL + '/api/createcoupon', data, {
            headers: {
              'Authorization': `Bearer ${process.env.DASH_API}`
            }
          }).then(response => {
            const embed = new EmbedBuilder()
              .setTitle(process.env.Name)
              .setColor(0x11cbcb)
              .setURL(`${process.env.Dash_URL}/dashboard`)
              .setDescription(
                "Successfuly Created the Coupon:  [`" + response.data.code + "`]   :white_check_mark:"
              )
              .setThumbnail(
                "https://images-ext-1.discordapp.net/external/F5j1P6Rg3CeYjFYIWmC6LvU5BGTKv2sAtOBxRobWtIs/%3Fsize%3D512/https/cdn.discordapp.com/icons/905747656045912064/36a39621db3580ac133006d7150e5952.png"
              )
              .addFields(
                {
                  name: `Ram : `,
                  value: "```" + `${Iram} MB ` + "```",
                  inline: true,
                },
                {
                  name: `Disk : `,
                  value: "```" + `${Idisk} MB ` + "```",
                },
                {
                  name: `CPU:`,
                  value: "```" + `${Icpu}% ` + "```",
                },
                {
                  name: `Servers: `,
                  value: "```" + `${Iservers} ` + "```",
                }
              )
              .setTimestamp()
              .setFooter({
                text: interaction.member.user.tag + " | Made By NicoRuizDev",
              });
            interaction.reply({ embeds: [embed] });
          })
        }
      }
    } else {
      await interaction.reply({
        content: "Insufficient Permissions!",
        ephemeral: true,
      });
    }
  },
};
