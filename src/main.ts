import TelegramBot from 'node-telegram-bot-api';

// import moment from 'moment';
import dotenv from 'dotenv';

dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true
});

export const start = async () => {
  bot.on('message', async (msg): Promise<void> => {
    const chatId = msg.chat.id;
    const { text } = msg;
    const commands = [
      {
        command: '/start',
        description: 'Начальное приветствие'
      },
      { command: '/enter', description: 'Указать время входа' },
      { command: '/exit', description: 'Указать время выхода' },
      { command: '/info', description: 'Получить информацию о себе' },
      { command: '/date', description: 'Дата сегодня' }
    ];

    try {
      if (text === '/start') {
        await bot.sendMessage(chatId, 'hello');
      }
      if (text === '/info') {
        await bot.sendMessage(
          chatId,
          `Тебя зовут: ${msg.from.first_name} ${
            msg.from.last_name ? msg.from.last_name : ''
          }, твой id: ${msg.from.id}`
        );
      } else if (text === '/enter') {
        bot.sendMessage(chatId, 'Напишите время входа в офис: ');
      } else if (text === '/exit') {
        bot.sendMessage(chatId, 'Напишите время выхода из офиса: ');
      } else {
        await bot.sendMessage(
          chatId,
          `Привет, ты написал мне: "${text}", напиши какую-нибудь команду...`
        );
      }
    } catch (error) {
      bot.sendMessage(chatId, 'Произошла ошибка...');
      console.log(error);
    }

    bot.setMyCommands(commands);
    console.log('Сообщение: ', text, '. От ', msg.from.first_name);
  });
};

start();
