import { setWebhook } from "vercel-telegram-bot-api";
import bot from "../scr/index.js";

const path = "api/telegram.js";

export default setWebhook({ bot, path, handleErrors: true });
