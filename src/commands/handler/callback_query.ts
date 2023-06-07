import { Context, InlineKeyboard } from "grammy";
import * as textHelp from "../../utils/textHelp.json";

const callback_query = async (ctx: Context): Promise<void> => {
    if (ctx.from == undefined) return console.log('id is empty');
    
    const callbackData = ctx.callbackQuery?.data;
    const updatedKeyboard = new InlineKeyboard()
    switch (callbackData) {
        case "firstconnection":
            ctx.reply(textHelp.firstConnection);
            await ctx.editMessageReplyMarkup({reply_markup: updatedKeyboard})
            break;
        case 'setting_forward':
            updatedKeyboard.text("📃 Get my Forward", "getAllForward").row()
            updatedKeyboard.text("🗑 Delete Forward", "deleteForward")
            await ctx.editMessageText(textHelp.forward, {reply_markup: updatedKeyboard})
            break;
        default:
            break;
    }
    await ctx.answerCallbackQuery();
};

export default callback_query;
