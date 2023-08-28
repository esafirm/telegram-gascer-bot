import { Context } from 'telegraf';
import { getSchedule } from '../schedule/ScheduleProvider';
import { getTomorrow } from '../schedule/DateProvider';
import createDebug from 'debug';

const debug = createDebug('bot:tomorrow_command');

export const tomorrow = () => async (ctx: Context) => {
  const today = getTomorrow();
  const message = await getSchedule(today);

  debug(`Sending message: ${message}`);

  await ctx.replyWithMarkdownV2(message);
};
