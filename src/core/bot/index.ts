import { GoogleSpreadsheet } from "google-spreadsheet";
import { Bot } from "grammy";

const bot = new Bot(String(process.env.BOT_TOKEN));
let doc: GoogleSpreadsheet

bot.init()
    .then((ctx) => {
        console.log(`Berhasil masuk sebagai ${bot.botInfo.username} - ${bot.botInfo.id}`);
    })
    .catch((err) => console.error(err));

bot.api.setMyCommands([
    { command: "start", description: "Mulai bot ini" },
    { command: "connect", description: "setup account" },
    { command: "forward", description: "setup auto forward" },
    { command: "getuser", description: "Get User ID" },
    { command: "getgroup", description: "Get Group ID" },
    { command: "getchanel", description: "Get Channel ID" },
]);

async function setGoogleSpreadsheet(idSpreadsheet: string) {
    doc = new GoogleSpreadsheet(idSpreadsheet);
    await doc.useServiceAccountAuth({
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCvwnG6RADw4A3s\naz7g78KABFogMiXOhkCwEXUMgXQGrCnxL+3cTxAjWTDiHBINN/w11XOP5J0ig49S\nnHvAKAuI0v/J89rRxBhkrhdNLGLa3y7lD16k+l1KktSBNODAY88ZYdt86Ow0b21a\nokBZFqUE4Zr28tkgIEcHanfvat3halDMhnqxaQKZOevGFRaZ40CwoAe17R50s8wZ\noSFn5xqMfkzyRVKdZE5e/9cbjFEnUR4U8lZ03JNaZmNmVLPEuOWR47oo5w3dd5sN\njTgX4cR9FSWoWsxHqh1jf+2hvB/c9GRow5xNQNuLlENld96M/UXakle3x0TVzwvX\nyYcL9QW5AgMBAAECggEAA1GCA3jJpcKa54zhYon45MW5Z+Rafj1ezbjHzJwAzrqW\nIGxrc+ebq1Kc/U2b8e2EmeEHdyysdNNvfM3hHkKVlJhkZYQVWjT29l3z8j6QyvT3\nEXul4HOszxlHl/0zzovPTUKYgxGWdc4f6aTx3xOWlrvKSNzlEZC1377mE4N8zfSe\n5hCg8dV02SAp8M85i1hx1JhfOOFaTTrCV4V+K9JlTdNX8ZI/CoPx0IVGBi2C2t7n\nEIpwGbF7hHh16D3wWPl2ZkyE2xdzDzshk0jXWrE9cbIXX2GHvwC/sDcV5Aonx+uV\nOniYKXiG9V1ZP6jauds2PVV+tlHfj4T6UAYZ0TFuKwKBgQDzbwjewK8UuiAKtU2N\npwOAaKwObSuYSvoUbgsiHD5qHxAi78tqDilfopTdpgBj0Xiu8ClkuvKkjtfPQ3qc\nTlndGMeyJuIpfOwnqR9AXy4awtRtV39sl1ois1q1WkyKwsuF8QtTDqF3pz6xjd+J\nSF+0XwLt0NLsgCUlcD9NRHjh+wKBgQC41Rk0hD8SPPBthYVywJn2XEZ5F3Snx+Ha\nyLBDJnpzwxzI67kbC9dz0ciRvf77bbAxMOrNFD/luywybRleEzSd2sPNzcoadPzW\noSevI7wDj9FWqxUKfIf+J1FmJ1ujvxEAU+euapetCTsI0YeN2piNsKOEXRZUaTyT\nx7QrS4jc2wKBgE7W0g+aZdmXohL1vuU2hurKe5a8gpbzCWUecpqcfRZPcyFtefqi\nFYI0nHPgdFXfnG9DtpQ5+6WR4ZDtsML4mSADC4HGGA8Jt03s9wMZEEx4duXmpY0c\nw4NjhOghE5MJHXMGqv0+Ssr+rk5AvXmvp9c5wjAVJoqTwfQLE2VJ3MCLAoGAAMOo\n0gXF+P5VhC5sKdhQCqvBAtks+1ChR3VS/UQYd4gUA2SuJEV9Q5ZXfPrLJiEC/IEW\nR3jQ9tM6UI8Q7smniwuPibdTIZ7gOMb70gaUzXL3y6LzeFKhgVSKSqDZCSlOGbE/\nIQKB1A5YtyWeqOCBhvx3AKId6IVy4a2OuisayscCgYBj0KoRVcpWWhHw7Lfc+XRR\n/xyl7nSr1XZlTZAxJ8pvs6YNkAAWerEs4p8EYkb2rr9zxgmcLRfK+xCzYJ3qtO8d\ntmMQq38UfqA6h91H81L00CZS6rFQHp6unSCGMYAgttVvtajvryeAc2ADGzXZvavg\nhhf7gD8ZDwU455wl4xkEug==\n-----END PRIVATE KEY-----\n",
        client_email: "telebot-spreadsheet@telebot-spreadsheet-388516.iam.gserviceaccount.com",
    })
    await doc.loadInfo();
}

async function getGoogleSpreadsheet() {
    return doc
}

bot.catch((ctx) => {
    console.error("Error Bot: " + ctx.message);
    console.error("===========================");
    // console.log(ctx);
})


export { bot, setGoogleSpreadsheet, getGoogleSpreadsheet };