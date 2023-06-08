import { Context } from "grammy"
import { getCellData } from "../../data/auth"
import loopAsAlphabet from "../../utils/utils"
import { getBorderCharacters, table } from "table"

const cellHandler = async (ctx: Context) => {
    try {
        if (ctx.match == undefined || ctx.message?.text == undefined) return
        const sheet = await getCellData(
            ctx.message?.text?.split(";")[0].replace("cell=", ""),
            ctx.message?.text?.split(";")[1].replace("sheet=", "")
        )
        
        const resultsCells = loopAsAlphabet(ctx.message?.text?.replace("cell=", "").toUpperCase(), sheet)
        if (resultsCells?.length == undefined) return
        
        await ctx.reply(
            `<pre>${table(resultsCells, {
                border: getBorderCharacters("ramac"),
            }
            )}</pre>`,
            { parse_mode: "HTML"}
        );
    } catch (error) {
        console.log(error);
        
        await ctx.reply("Ooops 😮 Terjadi masalah !...\nPastikan kamu sudah /init <docsURL> dan pastikan juga namaSheet sesuai dengan spreadsheet kamu")
    }
}

export default cellHandler