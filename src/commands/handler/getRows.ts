import { Context, InlineKeyboard } from "grammy";
import { getRowsData } from "../../data/auth";
import { table, getBorderCharacters } from "table";

const getRows = async (ctx:Context) => {
    const inlineKeyboard = new InlineKeyboard()
    
    if (ctx.match == "" || ctx.match == undefined) {
        return ctx.reply(`
        Hai 👋 ! \nJika kamu ingin mendapatkan baris data dari lembar kerja yang spesifik, secara default data diambil hanya 10, gunakan perintah berikut 📑:\n/getrow ROWINDEX SHEETNAME\n\n========\n<b>CONTOH:</b> \n/getrow 2 Sheet1\n========\n\n<b>OPTIONAL:</b> \nROWINDEX = 1 (set as default)\nSHEETNAME = Sheet1 (set as default)`, {
            parse_mode: "HTML"
        })
    }
    
    const results = await getRowsData(
        {
            rowIndex: parseInt(ctx.match?.toString().split(" ")[0]), 
            sheetName: ctx.match?.toString().split(" ")[1],
            limit: 10
        }
    );
    
    if (results == undefined) 
        return ctx.reply(`OOPSS, Pastikan sebelumnya kamu sudah menjalankan \n/init <GoogleSpreadsheet-Link>`)
    
    const columnAndRow: any[] = []
    // dynamic getColumn
    columnAndRow.push(Object.keys(results[0]).filter((columnName, index) => {
        if (index > 2) {
            return columnName
        }
    }))
    
    // dynamic getRow
    results.some((row, indexData) => {
        if (indexData >= 10) {
            columnAndRow.push(
                row._rawData.map((rawData, i) => {
                    if(i == 0) return results.length
                    return 'Limit to 10 Rows'
                })
            )
            return true
        }
        columnAndRow.push(row._rawData);
    })

    
    inlineKeyboard.text("📑 Tampilkan beberapa baris", "showMultipleLines").row()
    inlineKeyboard.text("📃 Tampilkan semua baris data", `showAllLines ${parseInt(ctx.match?.toString().split(" ")[0])} ${ctx.match?.toString().split(" ")[1]}`)
    ctx.reply(`<pre>${table(columnAndRow, {
        border: getBorderCharacters("ramac")
    })}</pre>`, {parse_mode: "HTML", reply_markup: inlineKeyboard})
}

/** This structur of await getRowsData()
 * [
 *      {
 *          Name: "joko",
 *          Age: 20,
 *      },
 *      {
 *          Name: "udin",
 *          Age: 20,
 *      },
 * ]
 */

const getAllRows = async (rowIndex: number, sheetName: string) => {
    
    const results = await getRowsData({rowIndex,sheetName, limit: 0});
    
    if (results == undefined) 
        return []
    
    const columnAndRow: any[] = []
    columnAndRow.push(Object.keys(results[0]).filter((columnName, index) => {
        if (index > 2) {
            return columnName
        }
    }))
    
    results.forEach((row, indexData) => {
        columnAndRow.push(row._rawData);
    })

    return columnAndRow
}
export { getRows, getAllRows }