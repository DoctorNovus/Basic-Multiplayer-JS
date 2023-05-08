export class Socket {
  constructor(url) {
    this.url = url;

    this.ws = new WebSocket("ws://127.0.0.1:3001");
    this.ws.onmessage = (wsMessage) => {
      this.handleMessage(this.ws, wsMessage);
    };

    this.events = {};
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

      case "Event":
        if (this.events[message.event]) {
          console.log(`[Event] ${message.event} has been run`);
          if (message.options) this.events[message.event](message.options);
          else this.events[message.event]();
        } else {
          console.log(`[Event] ${message.event} cannot be found.`);
        }
        break;

      default:
        console.log(`Unknown Type: ${message.type} with data`, message);
    }
  }

  on(event, callback) {
    this.events[event] = callback;
  }

  off(event) {
    delete this.events[event];
  }

  send(data) {
    this.ws.send(JSON.stringify(data));
  }
}
