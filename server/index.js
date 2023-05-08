import express from "express";
import { Router } from "./router/router";
import { Logger } from "./utility/logger";
import { Game } from "./game/game";

const app = express();
const port = 3000;
const ws_port = 3001;
const game = new Game(ws_port);
const router = new Router(game);

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.get("/game", (req, res) => router.handleGET(req, res));
app.get("/game/*", (req, res) => router.handleGET(req, res));
app.post("/game", (req, res) => router.handlePOST(req, res));
app.post("/game/*", (req, res) => router.handlePOST(req, res));

app.listen(port, () => {
  Logger.log("Server", `Server online on port ${port}`);
});
