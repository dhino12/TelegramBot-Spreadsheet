import { Context } from "grammy";
import { getRowsData } from "../../data/auth";

const getRows = async (ctx:Context) => {
    const results = await getRowsData();
    let columnsString = "NIM\t| Name\t| Class\n"
    results.forEach((row, indexData) => {
        Object.keys(row).forEach((columnData, index) => {
            if (index > 2) {
                // columnsString += columnData
                columnsString += `${row[columnData]}\t|`
            }
            if (Object.keys(row).length -1 == index) {
                columnsString += "\n"
            }
        })

        if (indexData > 10) return
    })
    ctx.reply(columnsString)
}

export default getRows