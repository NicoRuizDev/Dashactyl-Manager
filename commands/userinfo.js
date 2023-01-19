const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const axios = require("axios");
require("dotenv").config();
id = null;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("This will show the resources stats on the dashboard!")
    .addStringOption((option) =>
      option.setName("id").setDescription("Enter ID:").setRequired(false)
    ),

  async execute(interaction, client) {
    const id = interaction.options.getString("id");
    const userid = parseInt(id);
    const strid = toString(id);

    if (id != null) {
      if (isNaN(userid)) {
        await interaction.reply({ content: "INVALID ID", ephemeral: true });
      } else {
        const options = {
          method: "GET",
          url: process.env.Dash_URL + "/api/userinfo/",
          params: { id: id },
          headers: { Authorization: `Bearer ${process.env.DASH_API}` },
        };
        axios.request(options).then(async function (response) {
          data = response.data;
          if (data.status == "invalid id") {
            await interaction.reply({ content: "INVALID ID", ephemeral: true });
          } else {
            const ram = data.package.ram + data.extra.ram + data.j4r.ram;
            const disk = data.package.disk + data.extra.disk + data.j4r.disk;
            const cpu = data.package.cpu + data.extra.cpu + data.j4r.cpu;
            const servers =
              data.package.servers + data.extra.servers + data.j4r.servers;
            const embed = new EmbedBuilder()
              .setTitle(process.env.Name)
              .setColor(0x11cbcb)
              .setURL(`${process.env.Dash_URL}/dashboard`)
              .setDescription(
                "Get Information about Resources Using this command"
              )
              .setThumbnail(
                process.env.Icon
              )
              .addFields(
                {
                  name: `Ram : `,
                  value: "```" + `${ram} MB ` + "```",
                  inline: true,
                },
                {
                  name: `Disk : `,
                  value: "```" + `${disk} MB ` + "```",
                },
                {
                  name: `CPU:`,
                  value: "```" + `${cpu}% ` + "```",
                },
                {
                  name: `Servers: `,
                  value: "```" + `${servers} ` + "```",
                },
                {
                  name: `User ID:`,
                  value: "```" + id + "```",
                }
              )
              .setTimestamp()
              .setFooter({
                text: interaction.member.user.tag + " | Made By NicoRuizDev",
              });

            await interaction.reply({ embeds: [embed] });
          }
        });
      }
    } else {
      const options = {
        method: "GET",
        url: process.env.Dash_URL + "/api/userinfo/",
        params: { id: interaction.member.user.id },
        headers: { Authorization: `Bearer ${process.env.DASH_API}` },
      };
      axios.request(options).then(async function (response) {
        data = response.data;
        if (data.status == "invalid id") {
          await interaction.reply({ content: "INVALID ID", ephemeral: true });
        } else {
          const ram = data.package.ram + data.extra.ram + data.j4r.ram;
          const disk = data.package.disk + data.extra.disk + data.j4r.disk;
          const cpu = data.package.cpu + data.extra.cpu + data.j4r.cpu;
          const servers =
            data.package.servers + data.extra.servers + data.j4r.servers;
          const embed = new EmbedBuilder()
            .setTitle("Developer Switch")
            .setColor(0x11cbcb)
            .setURL("https://discord.js.org/")
            .setDescription(
              "Get Information about Resources Using this command"
            )
            .setThumbnail(
              "https://images-ext-1.discordapp.net/external/F5j1P6Rg3CeYjFYIWmC6LvU5BGTKv2sAtOBxRobWtIs/%3Fsize%3D512/https/cdn.discordapp.com/icons/905747656045912064/36a39621db3580ac133006d7150e5952.png"
            )
            .addFields(
              {
                name: `Ram : `,
                value: "```" + `${ram} MB ` + "```",
                inline: true,
              },
              {
                name: `Disk : `,
                value: "```" + `${disk} MB ` + "```",
              },
              {
                name: `CPU:`,
                value: "```" + `${cpu}% ` + "```",
              },
              {
                name: `Servers: `,
                value: "```" + `${servers} ` + "```",
              },
              {
                name: `User ID:`,
                value: "```" + interaction.member.user.id + "```",
              }
            )
            .setTimestamp()
            .setFooter({
              text: interaction.member.user.tag + " | Made By NicoRuizDev",
            });

          await interaction.reply({ embeds: [embed] });
        }
      });
    }
  },
};
