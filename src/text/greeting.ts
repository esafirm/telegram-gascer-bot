import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:greeting_text');

const greeting = () => async (ctx: Context) => {
  debug('Triggered "greeting" text command');

  const messageId = ctx.message?.message_id;
  const userName = ctx.message?.from.username;

  if (messageId) {
    await ctx.reply(`Hello, ${userName}!`, {
      reply_parameters: { message_id: messageId },
    });
  }
};

export { greeting };
