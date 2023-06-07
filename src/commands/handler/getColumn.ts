import { Context } from "grammy";
import { getColumnsData } from "../../data/auth";

const getColumn = async (ctx: Context) => {
    const columns = await getColumnsData();
    columns.forEach((column) => {
        console.log(column.a1Range, " ", column.rowIndex, " ", column.Name);        
    })
}

export default getColumn