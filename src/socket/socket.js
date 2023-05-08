export class Socket {
  constructor(url) {
    this.url = url;

    this.ws = new WebSocket("ws://127.0.0.1:3001");
    this.ws.onmessage = (wsMessage) => {
      this.handleMessage(this.ws, wsMessage);
    };
  }

  handleMessage(ws, wsMessage) {
    let message = JSON.parse(wsMessage.data);

    this.parseMessage(message);
  }

  parseMessage(message) {
    switch (message.type) {
      case "Text":
        console.log(`[Text] ${message.text}`);
        break;

      default:
        console.log(`Unknown Type: ${message.type} with data`, message);
    }
  }
}
