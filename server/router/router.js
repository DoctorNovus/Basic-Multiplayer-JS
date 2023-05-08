import { Logger } from "../utility/logger";

export class Router {
  constructor(engine) {
    this.engine = engine;
  }

  handlePrimary(req, res) {
    let { url, method } = req;
    url = url.split("/game/")[1];

    return { url, method };
  }

  handleGET(req, res) {
    let { url } = this.handlePrimary(req, res);
    Logger.log("Router", url);

    res.end("SUCCESS");
  }

  handlePOST(req, res) {
    let { url } = this.handlePrimary(req, res);
    Logger.log("Router", url);

    res.end("SUCCESS");
  }
}
