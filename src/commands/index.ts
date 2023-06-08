import { Composer } from "grammy";

// require("./middleware");
import hello from "./handler/hello";
import start from "./handler/start";
import callback_query from "./handler/callback_query";
import msg from "./handler/msg";
import init from "./handler/init";
import getColumn from "./handler/getColumn";
import {getRows} from "./handler/getRows";
import { getCellData } from "../data/auth";

const composer = new Composer();

composer.command("hello", hello);
composer.command("start", start);
composer.command("init", init);
composer.command("getcolumn", getColumn);
composer.command("getrow", getRows);
// composer.hears(/mycode\d+/, signInUser)
composer.hears(/^cell=.*/, async (ctx) => {
    // await deleteForward(ctx, undefined)
    await getCellData()
});

composer.on("msg", msg);
composer.on("callback_query:data", callback_query);
composer.on("message:text", (ctx) => {
    console.log(ctx.msg.text);
    
})
export default composer;