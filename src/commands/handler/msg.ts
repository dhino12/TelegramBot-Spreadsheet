/* eslint-disable prettier/prettier */
import { Context } from "grammy";

const forwardTo = async (forwardWorker: {from: [], to: []}[], ctx: Context) => {
  // console.log(ctx.message);
  
  for (const dataUser of forwardWorker) {
    for (const from of dataUser.from) {
      if (ctx.chat?.id != from) continue
      for (const to of dataUser.to) {
        await ctx.forwardMessage(to, from);
      }
    }
  }
}

const msg = async (ctx: Context): Promise<void> => { 
  try {
    if (ctx.chat == undefined) throw { code: 404, message: "chatType not found" }
    if (ctx.from == undefined) throw { code: 404, message: "chat id not found" }
    if (ctx.message == undefined) throw { code: 404, message: "chatMessage not found" }
    console.log('masuk ' + ctx.from.first_name);
    
    const { data } = {data: {from: [], to: []}['']};
    if (data == undefined) return;

    switch (ctx.chat.type) {
      case "channel":
        forwardTo(data, ctx)
        break;
      case "supergroup":
        forwardTo(data, ctx)
        break;
      case "group":
        forwardTo(data, ctx)
        break;
      case "private":
        // forwardTo(resultWorker, ctx)
        console.log('masuk private: ', ctx.message.text);
        if (ctx.message.text?.includes("mycode")) {
        }
        break;
      default:
        break;
    }
  } catch (error) {
    // console.error(error);
  }
};

export default msg;
