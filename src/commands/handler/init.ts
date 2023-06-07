import { Context } from "grammy";
import { auth } from "../../data/auth";

const init = async (ctx: Context) => {
    if (ctx.match == undefined) return
    let idSpreadsheet = ctx.match.toString()
    if (ctx.match.toString().includes("http")) {
        const idSpreadsheetArray = ctx.match.toString().split("/")
        idSpreadsheet = idSpreadsheetArray.slice(5, 6)[0]
    }
    const resultInit = await auth(idSpreadsheet)
    
    if (resultInit) {
        return ctx.reply("Success", { 
            reply_to_message_id: ctx.message?.message_id 
        })
    } else {
        return ctx.reply("Ooops Something went wrong", { 
            reply_to_message_id: ctx.message?.message_id 
        })
    }

}

export default init