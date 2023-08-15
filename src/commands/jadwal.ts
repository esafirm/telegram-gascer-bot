import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:jadwal_command');

const jadwal = () => async (ctx: Context) => {
  debug('Receiving jadwal command');
  await ctx.replyWithPhoto(
    'https://raw.githubusercontent.com/esafirm/telegram-gascer-bot/main/assets/jadwal_gascer.jpg',
  );
};

export { jadwal };
