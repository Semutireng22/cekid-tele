const TelegramBot = require('node-telegram-bot-api');

// Ganti dengan token bot Telegram Anda
const token = 'YOUR_TELEGRAM_BOT_TOKEN';

// Inisialisasi bot dengan token
const bot = new TelegramBot(token, { polling: true });

// Tangani pesan yang masuk
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const messageText = msg.text;

  // Jika pesan berisi perintah /start
  if (messageText === '/start') {
    bot.sendMessage(chatId, 'Halo! Kirim pesan apa pun untuk mendapatkan ID akun Telegram Anda.');
  } 
  // Jika pesan berisi perintah /help
  else if (messageText === '/help') {
    bot.sendMessage(chatId, 'Untuk mendapatkan ID akun Telegram Anda, cukup kirimkan pesan apa pun.');
  } 
  // Jika pesan bukan perintah, kirimkan ID akun Telegram pengguna
  else {
    bot.sendMessage(chatId, `ID akun Telegram Anda adalah: ${userId}`);
  }
});

console.log('Bot sedang berjalan...');