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

const getRowsData = async ({rowIndex = 1, sheetName = "Sheet1", limit = 10}): Promise<GoogleSpreadsheetRow[]|undefined> => {
    try {
        const doc = await getGoogleSpreadsheet()
        const sheet = doc.sheetsByTitle[sheetName];
        await sheet.loadHeaderRow(rowIndex)

        const rows = await sheet.getRows({
            limit
        })
        
        console.log(rows.length);
        return rows
    } catch (error) {
        console.log(error);
        return undefined
    }
}

// https://stackoverflow.com/questions/71193186/google-sheets-api-search-by-keyword-and-return-results-nodejs
const getColumnsData = async () => {
    const doc = await getGoogleSpreadsheet()
    const sheet = doc.sheetsByIndex[0]

    // await sheet.loadCells("A1:C1")
    // await sheet.loadHeaderRow()
    const rows = await sheet.getRows()
    // let column = await sheet.getCell(2,1)
    // console.log(column.a1Column);
    // console.log("=======");
    // const b = await sheet.getCellByA1("B2")
    // console.log(b);
    
    return rows
}

const getCellData = async () => {
    const doc = await getGoogleSpreadsheet()
    const sheet = doc.sheetsByIndex[0]
    await sheet.loadCells('A2:C14');
    const cell = await sheet.getCellByA1("A2:A5")
    console.log(cell.value);
    
}

export { auth, getRowsData, getColumnsData, getCellData }