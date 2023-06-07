import { getGoogleSpreadsheet, setGoogleSpreadsheet } from "../core/bot"
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from "google-spreadsheet";

const auth = async (idSpreadsheet: string) => {
    try {
        await setGoogleSpreadsheet(idSpreadsheet)
        return true
    } catch (error) {
        return false
    }
}

const getRowsData = async (): Promise<GoogleSpreadsheetRow[]> => {
    const doc = await getGoogleSpreadsheet()
    const sheet = doc.sheetsByIndex[0];

    const rows = await sheet.getRows()
    
    console.log(rows.length);
    return rows
}

// https://stackoverflow.com/questions/71193186/google-sheets-api-search-by-keyword-and-return-results-nodejs
const getColumnsData = async () => {
    const doc = await getGoogleSpreadsheet()
    const sheet = doc.sheetsByIndex[0]

    await sheet.loadCells("A1:C1")
    await sheet.loadHeaderRow()
    const rows = await sheet.getRows({offset:0})
    let column = await sheet.getCell(2,1)
    console.log(column.a1Column);
    console.log("=======");
    // const b = await sheet.getCellByA1("B2")
    // console.log(b);
    
    return rows
}

export { auth, getRowsData, getColumnsData }