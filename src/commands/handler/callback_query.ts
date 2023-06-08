import { Context, InlineKeyboard } from "grammy";
import * as textHelp from "../../utils/textHelp.json";
import { getAllRows } from "./getRows";
import { getBorderCharacters, table } from "table";

const callback_query = async (ctx: Context): Promise<void> => {
    if (ctx.from == undefined) return console.log('id is empty');
    if (ctx.callbackQuery?.data == undefined) return;

    let callbackData = ctx.callbackQuery.data;
    if (callbackData?.includes(" ")) {
        callbackData = callbackData.split(" ")[0]
    }
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
        case 'showAllLines':
            updatedKeyboard.text("❌ Close", "removeKeyboard").row()
            const results = await getAllRows(
                parseInt(ctx.callbackQuery.data.split(" ")[1]),
                ctx.callbackQuery.data.split(" ")[2]
            )
            
            if (results?.length == undefined)  return
            ctx.reply(`<pre>${table(results, {
                border: getBorderCharacters("ramac")
            })}</pre>`, {parse_mode: "HTML", reply_markup: updatedKeyboard})
            break;
        case 'removeKeyboard':
            
        default:
            break;
    }
    await ctx.answerCallbackQuery();
};

export default callback_query;
