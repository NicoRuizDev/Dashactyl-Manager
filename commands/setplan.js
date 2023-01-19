const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const axios = require("axios");

require("dotenv").config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setplan")
        .setDescription("This will set a plan for a specific user (Required Admin)")
        .addStringOption((option) =>
            option.setName("id").setDescription("Enter User ID:").setRequired(true)
        )
        .addStringOption((option) =>
            option.setName("package").setDescription("Enter Package:").setRequired(true)
        ),

    async execute(interaction, client) {
        const Iuser = interaction.options.getString("id")
        const Ipackage = interaction.options.getString("package")
        const adminRole = interaction.member.roles.cache.has(`${process.env.Admin_ROLE_ID}`);
        if (adminRole) {
            const data = { id: Iuser, coins: Ipackage }

            await axios.post(process.env.Dash_URL + '/api/setplan', data, {
                headers: {
                    'Authorization': `Bearer ${process.env.DASH_API}`
                }
            }).then(response => {
                if (response.data.status == 'success') {
                    const embed = new EmbedBuilder()
                        .setTitle(process.env.Name)
                        .setColor(0x11cbcb)
                        .setURL(`${process.env.Dash_URL}/dashboard`)
                        .setDescription(
                            "Success :white_check_mark:"
                        )
                        .setThumbnail(
                            process.env.Icon
                        )
                        .setTimestamp()
                        .setFooter({
                            text: interaction.member.user.tag + " | Made By NicoRuizDev",
                        });
                    interaction.reply({
                        embeds: [embed],
                        ephemeral: true,
                    });

                } else {
                    interaction.reply({
                        content: "INVALID CODE!",
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
