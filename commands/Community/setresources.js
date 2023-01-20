const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const axios = require("axios");

require("dotenv").config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setresources")
        .setDescription("This will set a resource for a specific user (Required Admin)")
        .addStringOption((option) =>
            option.setName("id").setDescription("Enter ID:").setRequired(true)
        )
        .addStringOption((option) =>
            option.setName("ram").setDescription("Enter RAM:").setRequired(true)
        )
        .addStringOption((option) =>
            option.setName("disk").setDescription("Enter DISK:").setRequired(true)
        )
        .addStringOption((option) =>
            option.setName("cpu").setDescription("Enter CPU:").setRequired(true)
        )
        .addStringOption((option) =>
            option.setName("servers").setDescription("Enter Servers:").setRequired(true)
        ),

    async execute(interaction, client) {
        const ID = interaction.options.getString("id")
        const Iram = parseInt(interaction.options.getString("ram"))
        const Idisk = parseInt(interaction.options.getString("disk"))
        const Icpu = parseInt(interaction.options.getString("cpu"))
        const Iservers = parseInt(interaction.options.getString("servers"))

        const adminRole = interaction.member.roles.cache.has(`${process.env.Admin_ROLE_ID}`);
        if (adminRole) {
            const data = { id: ID, ram: Iram, disk: Idisk, cpu: Icpu, servers: Iservers }
            await axios.post(process.env.Dash_URL + '/api/setresources', data, {
                headers: {
                    'Authorization': `Bearer ${process.env.DASH_API}`
                }
            }).then(response => {
                if (response.data.status === 'success') {
                    const embed = new EmbedBuilder()
                        .setTitle(process.env.Name)
                        .setColor(0x11cbcb)
                        .setURL(`${process.env.Dash_URL}/dashboard`)
                        .setDescription(
                            "Successfuly Modified The Resources for user: ```" + ID + " ```"
                        )
                        .setThumbnail(
                            "https://images-ext-1.discordapp.net/external/F5j1P6Rg3CeYjFYIWmC6LvU5BGTKv2sAtOBxRobWtIs/%3Fsize%3D512/https/cdn.discordapp.com/icons/905747656045912064/36a39621db3580ac133006d7150e5952.png"
                        )
                        .setTimestamp()
                        .setFooter({
                            text: interaction.member.user.tag + " | Made By NicoRuizDev",
                        });
                    interaction.reply({ embeds: [embed], ephemeral: true, });
                } else {
                    interaction.reply({
                        content: "INVALID RESPONSE!",
                        ephemeral: true,
                    });
                }
            })

        } else {
            await interaction.reply({
                content: "Insufficient Permissions!",
                ephemeral: true,
            });

        }
    }
};
