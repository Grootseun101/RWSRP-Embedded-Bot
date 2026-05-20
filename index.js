import './src/app.js';

const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  PermissionFlagsBits
} = require("discord.js");

client.on("messageCreate", async (message) => {
  if (message.content === "!supportpanel") {
    const embed = new EmbedBuilder()
      .setTitle("📬 Redwood State RP • Assistance Center")
      .setDescription(
        "Welcome to the **Redwood State RP Support Center**.\n\n" +
        "Please select the correct support category below to create a ticket."
      )
      .setColor("#992d22")
      .addFields(
        {
          name: "💬 General Support",
          value: "General questions, server assistance, minor reports, or community help.",
          inline: false
        },
        {
          name: "🛠️ Management Support",
          value: "Claims, paid ads, appeals, partnerships, or management concerns.",
          inline: false
        },
        {
          name: "🏛️ Ownership Support",
          value: "Serious staff complaints, major appeals, or ownership matters.",
          inline: false
        }
      )
      .setFooter({ text: "Redwood State RP • Support Panel" });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("general_support")
        .setLabel("General Support")
        .setEmoji("💬")
        .setStyle(ButtonStyle.Primary),

      new ButtonBuilder()
        .setCustomId("management_support")
        .setLabel("Management Support")
        .setEmoji("🛠️")
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId("ownership_support")
        .setLabel("Ownership Support")
        .setEmoji("🏛️")
        .setStyle(ButtonStyle.Danger)
    );

    await message.channel.send({ embeds: [embed], components: [row] });
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;

  const supportRoles = {
    general_support: "1506524552828686377",
    management_support: "1506310934761836737",
    ownership_support: "1506012481146060956"
  };

  const categories = {
    general_support: "1506676202834890843",
    management_support: "1506676284757905519",
    ownership_support: "1506676344342319125"
  };

  const names = {
    general_support: "general",
    management_support: "management",
    ownership_support: "ownership"
  };

  if (!supportRoles[interaction.customId]) return;

  const channel = await interaction.guild.channels.create({
    name: `${names[interaction.customId]}-${interaction.user.username}`,
    type: ChannelType.GuildText,
    parent: categories[interaction.customId],
    permissionOverwrites: [
      {
        id: interaction.guild.id,
        deny: [PermissionFlagsBits.ViewChannel]
      },
      {
        id: interaction.user.id,
        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
      },
      {
        id: supportRoles[interaction.customId],
        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
      }
    ]
  });

  await channel.send(`Welcome ${interaction.user}, support will assist you shortly.`);
  await interaction.reply({ content: `Ticket created: ${channel}`, ephemeral: true });
});
client.on("messageCreate", async (message) => {
  console.log("Message received:", message.content);

  if (message.content === "!test") {
    await message.reply("Bot is reading messages.");
  }
});
