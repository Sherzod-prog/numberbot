const TelegramApi = require("node-telegram-bot-api");
const { gameOptions, againOptions } = require("./optins");
// const { TOKEN, APP_URL } = require("../config.js");

const bot = new TelegramApi(process.env.BOT_TOKEN);

const chats = {};

const startGame = async (chatId) => {
  await bot.sendMessage(
    chatId,
    "Сейчас я загадаю цифру от  0 до 9, а ты должен ее угадать"
  );
  const randomNumber = Math.floor(Math.random() * 10);
  chats[chatId] = randomNumber;
  await bot.sendMessage(chatId, "Отгадывай", gameOptions);
};

const start = () => {
  bot.setMyCommands([
    { command: "/start", description: "Начально" },
    { command: "/info", description: "Получить информация о пользователь" },
    { command: "/game", description: "Игра угадай цифру" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") {
      await bot.sendSticker(
        chatId,
        `https://tlgrm.ru/_/stickers/3c0/085/3c0085ba-d0cb-3efd-96f1-66598e6dd69f/2.webp`
      );
      return bot.sendMessage(chatId, `Добра пожалавать телеграам бот `);
    }
    if (text === "/info") {
      return bot.sendMessage(
        chatId,
        `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`
      );
    }
    if (text === "/game") {
      return startGame(chatId);
    }
    return bot.sendMessage(chatId, "Я теб не понимаю попробую ущу раз");
  });
  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if (data === "/again") {
      return startGame(chatId);
    }

    if (data === chats[chatId]) {
      return bot.sendMessage(
        chatId,
        `Поздравдяю ты отгадал цифру ${chats[chatId]}`,
        againOptions
      );
    } else {
      return bot.sendMessage(
        chatId,
        `К сожелению ты не угадал, бот загадал цифру ${chats[chatId]}`,
        againOptions
      );
    }
  });
};

start();
