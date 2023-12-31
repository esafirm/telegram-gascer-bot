import { Context } from 'telegraf';
import { getSchedule } from '../schedule/ScheduleProvider';
import { getToday } from '../schedule/DateProvider';
import createDebug from 'debug';

const debug = createDebug('bot:today_command');

export const today = () => async (ctx: Context) => {
  const today = getToday();
  const message = await getSchedule(today);

  debug(`Sending message: ${message}`);

  await ctx.replyWithMarkdownV2(message);
};
