import { Context, InlineKeyboard } from "grammy";
import { getRowsData } from "../../data/auth";
import { table, getBorderCharacters } from "table";

const getRows = async (ctx: Context) => {
  if (ctx.match == "" || ctx.match == undefined) {
    return ctx.reply(
      `
        Hai 👋 ! \nJika kamu ingin mendapatkan baris data dari lembar kerja yang spesifik, secara default data diambil hanya 10, gunakan perintah berikut 📑:\n/getrow ROWINDEX SHEETNAME\n\n========\n<b>CONTOH:</b> \n/getrow 2 Sheet1\n========\n\n<b>OPTIONAL:</b> \nROWINDEX = 1 (set as default)\nSHEETNAME = Sheet1 (set as default)`,
      {
        parse_mode: "HTML",
      }
    );
  }
  const inlineKeyboard = new InlineKeyboard();
  const sheetName = ctx.match.toString().split(" ").filter((sheet, i) => i >= 1).join(" ");
  const rowIndex = parseInt(ctx.match?.toString().split(" ")[0]);
  
  const results = await getRowsData({ rowIndex,sheetName, limit: 10 });

  if (results == undefined)
    return ctx.reply(
      `OOPSS, Pastikan sebelumnya kamu sudah menjalankan \n/init <GoogleSpreadsheet-Link>`
    );

  const columnAndRow: any[] = [];
  // dynamic getColumn
  columnAndRow.push(
    Object.keys(results[0]).filter((columnName, index) => {
      if (
        columnName != "_sheet" &&
        columnName != "_rowNumber" &&
        columnName != "_rawData"
      ) {
        return columnName;
      }
    })
  );

  // dynamic getRow
  results.some((row, indexData) => {
    console.log(row.a1Range, " ", row.rowIndex, " ", row._rawData);

    columnAndRow.push(row._rawData);
  });

  inlineKeyboard.text("📑 Tampilkan beberapa baris", "showMultipleLines").row();
  inlineKeyboard.text(
    "📃 Tampilkan semua baris data",
    `showAllLines ${rowIndex} ${sheetName}`
  );
  ctx.reply(
    `Secara default data tampil hanya 10 data, agar kamu dapat membaca data lebih jelas\n<pre>${table(
      columnAndRow,
      {
        border: getBorderCharacters("ramac"),
      }
    )}</pre>`,
    { parse_mode: "HTML", reply_markup: inlineKeyboard }
  );
};

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
    const results = await getRowsData({ rowIndex, sheetName, limit: 0 });
    if (results == undefined) return [];

    const columnAndRow: any[] = [];
    columnAndRow.push(
        Object.keys(results[0]).filter((columnName, index) => {
        if (index > 2) {
            return columnName;
        }
        })
    );

    results.forEach((row, indexData) => {
        columnAndRow.push(row._rawData);
    });

    return columnAndRow;
};
export { getRows, getAllRows };
