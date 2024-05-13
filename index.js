const TelegramBot = require('node-telegram-bot-api');

// Ganti dengan token bot Telegram Anda
const token = 'YOUR_TELEGRAM_BOT_TOKEN';

// Inisialisasi bot dengan token
const bot = new TelegramBot(token, { polling: true });

// Objek untuk menyimpan riwayat pengguna
const userHistory = {};

// Tangani pesan yang masuk
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const messageText = msg.text;

  // Keyboard inline
  const inlineKeyboard = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Cek ID Telegram', callback_data: 'check_id' },
          { text: 'Cek Riwayat Username', callback_data: 'check_history' }
        ]
      ]
    }
  };

  // Tangani perintah tertentu
  if (messageText.startsWith('/start')) {
    bot.sendMessage(chatId, `Halo! Pilih salah satu opsi di bawah ini:`, inlineKeyboard);
  } else if (messageText.startsWith('/id')) {
    bot.sendMessage(chatId, `ID akun Telegram Anda adalah: ${userId}`);
  }
});

// Tangani kueri tombol yang dikirimkan pengguna
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const userId = query.from.id;
  const data = query.data;

  if (data === 'check_id') {
    bot.sendMessage(chatId, `ID akun Telegram Anda adalah: ${userId}`);
  } else if (data === 'check_history') {
    bot.sendMessage(chatId, `Masukkan username yang ingin Anda cek riwayatnya.`);
    // Simpan status pengguna untuk mengetahui bahwa mereka sedang menunggu username
    userHistory[userId] = 'waiting_for_username';
  }
});

// Tangani pesan yang dikirim oleh pengguna setelah memilih opsi "Cek Riwayat Username"
bot.on('message', (msg) => {
  const userId = msg.from.id;
  const messageText = msg.text;

  if (userHistory[userId] === 'waiting_for_username') {
    // Lakukan sesuatu dengan username yang dimasukkan pengguna, misalnya mencari riwayat username
    bot.sendMessage(userId, `Anda memasukkan username: ${messageText}`);
    // Hapus status "waiting_for_username" dari userHistory setelah username telah diproses
    delete userHistory[userId];
  }
});

console.log('Bot sedang berjalan...');
