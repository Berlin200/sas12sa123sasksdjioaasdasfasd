const express = require("express");
const app = express();

app.listen(() => console.log("start "));

app.use('/ping', (req, res) => {
  res.send(new Date());
});


const Discord = require('discord.js');
const client = new Discord.Client();
const cmd = require("node-cmd");
const ms = require("ms");
const fs = require('fs');
const ytdl = require("ytdl-core");
const canvas = require("canvas");
const convert = require("hh-mm-ss")
const fetchVideoInfo = require("youtube-info");
const simpleytapi = require('simple-youtube-api')
const util = require("util")
const gif = require("gif-search");
const jimp = require("jimp");
const guild = require('guild');
const hastebins = require('hastebin-gen');
const getYoutubeID = require('get-youtube-id');
const pretty = require("pretty-ms");
const moment = require('moment');
const request = require('request');
const dateFormat = require('dateformat');

//لا تلعب اي شي في الكود



const prefix = "#"//البرفكس
const developers = "253994997668380672"//ايديك

 
///bot حاله
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(client.guilds.map(c => `${c.name} : ${c.me.hasPermission(8)}`));
  client.user.setStatus("online");

  client.user.setActivity(`${prefix}bc`, { type: "WATCHING" });
});

//كود البرودكاست

client.on("message", async message => {
  if (!message.guild || message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  if (message.content.startsWith(prefix + "bc")) {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply ('You dont have Permissions.');
    if (message.guild.interval) return message.reply ('**بث آخر قيد التشغيل ، الرجاء الانتظار حتى ينتهي**')
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (!args) 
      return message.reply ('**يرجى إرسال رسالة بعد الأمر لإرسالها**');
      
      message.channel
      .send(
        ">>> **[1] جميع الاعضاء\n[2] الاعضاء المتصلين\n[3] الرتب الخاصة\n[0] الغاء الأمر**"
      )
      .then(m => {
        message.channel
          .awaitMessages(msg => msg.author.id === message.author.id, {
            max: 1,
            time: 1000 * 60 * 2,
            errors: ["time"]
          })
          .then(async (c) => {
          var members = null;
            if (c.first().content === "1") {
              members = message.guild.members.array ();
              c.first().delete();
              m.delete();
            }
            if (c.first().content === "2") {
              members = message.guild.members
                .filter(m => m.presence.status !== "offline").array();

              c.first().delete();
              m.delete();
            }
            if (c.first().content == "0") {
              c.first().delete();
              m.delete();
              message.channel.send("**تم الغاء الامر بنجاح**");
            }
            if (c.first().content === "3") {
              m.edit("**>>> ادخل اسم الرتبة من فضلك**").then(ms => {
                message.channel
                  .awaitMessages(msg => msg.author.id === message.author.id, {
                    max: 1,
                    time: 1000 * 60 * 2,
                    errors: ["time"]
                  })
                  .then(c => {
                    let role = message.guild.roles.find(
                      role => role.name === c.first().content
                    );
                    if (!role)
                      return message.channel
                        .send("**:x: لا استطيع العثور على الرتبة الخاصة بالرسالة**")
                        .then(() => {
                          ms.delete();
                          c.first().delete();
                        });
                    let roleID = role.id;
                    members = message.guild.roles.get(roleID).members.array();
                    c.first().delete();
                    m.delete();
                  });
              });
            }
          
          if (members == null) return message.reply ('**رقم غير صالح**');
          if (members.length == 0) return message.reply ('**لم يتم العثور على الرقم.**');
          else {
            const msg = await message.channel.send (`**جاري إرسال الرسالة إلى ${members.length} عضواً...**`)
            var count = 0;
            var ycount = 0;
            var xcount = 0;
            message.guild.interval = await setInterval (() => {
              if (!members [count]) {
                clearInterval (message.guild.inter);
                msg.edit (new Discord.RichEmbed().setDescription(`** :mailbox_with_mail:  ؛ تم أرسال الرسالة الى  ${ycount} عضواً\n:lock: ؛ و لم أستطع أرسال الرسالة إلى ${xcount} عضواً**`).setTimestamp());
                message.guild.interval = false;
              } else if (!members[count].user.bot) {
                members [count].send (`${args}`).then (() => {
                  ycount++;
                }).catch (err => {
                  return xcount++;
                });
              }
              count++;
            }, 500)
          }
          })
          .catch(() => m.delete());
      });
  } else if (message.content.startsWith(prefix + "setname")) {
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (!message.author.id === "569554557294739487") return; ///تعديل مهم حط الايدي تبعك
    client.user.setUsername(args);
    message.channel.send(`تم تغيير الاسم الى ..**${args}** `);
  } else if (message.content.startsWith(prefix + "setavatar")) {
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (!message.author.id === "569554557294739487") return; /// تعديل مهم حط الايدي تبعك
    client.user.setAvatar(args).catch(err => message.reply("send a valid url"));
    message.channel.send(`تم تغيير الصورة الى :**${args}** `);
  }
});

client.login('ODMzODA1MDU3MDE1MjgzNzEy.YH3reA.hpiedOt11V7uci5UmjMvCqkDxBg')//توكن بوتك
