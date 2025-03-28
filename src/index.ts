import { Telegraf } from 'telegraf';

import { about, jadwal, today, tomorrow } from './commands';
import { summarize } from './commands/summarize';
import { greeting } from './text';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { development, production } from './core';

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';

const bot = new Telegraf(BOT_TOKEN);

bot.command('about', about());
bot.command('jadwal', jadwal());
bot.command('today', today());
bot.command('tomorrow', tomorrow());
bot.command('summarize', summarize);

bot.on('message', greeting());

//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};
//dev mode
ENVIRONMENT !== 'production' && development(bot);
