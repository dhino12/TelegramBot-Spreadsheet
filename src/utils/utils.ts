import { GoogleSpreadsheetWorksheet } from "google-spreadsheet";

const loopAsAlphabet = (rangeA1: string, cell: GoogleSpreadsheetWorksheet) => {
    // "A2:B5"
    const start = rangeA1.split(":")[0]
    const end = rangeA1.split(":")[1]
    let startRow = parseInt(start.substring(1));
    let endRow = parseInt(end.substring(1));
    const startCol = checkIsString(start)
    const endCol = checkIsString(end)
    if (startCol == null || endCol == null) return

    let tmp: any[] = []
    const datas: any[] = []
    for (let row = startRow; row <= endRow; row++) {
        tmp = []
        for (let colCode = startCol[0].charCodeAt(0); colCode <= endCol[0].charCodeAt(0); colCode++) {
            tmp.push(cell.getCellByA1(`${String.fromCharCode(colCode)}${row}`).value)
        }
        datas.push(tmp)
    }

    return datas
}

const checkIsString = (msg: string) => {
    if (msg.match(/[A-Z]+/)) {
      return msg.match(/[A-Z]+/)
    }
}

export default loopAsAlphabet