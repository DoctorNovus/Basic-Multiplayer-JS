export class Movement {
  constructor(canva) {
    this.keysOn = {};
    this.keysOff = {};

    window.onkeydown = (data) => {
      let k = data.key;

      if (this.keysOn[k]) this.keysOn[k](k);
    };

    window.onkeyup = (data) => {
      let k = data.key;

      if (this.keysOff[k]) this.keysOff[k](k);
    };
  }

  on(key, callback) {
    this.keysOn[key] = callback;
  }

  onAll(socket, keys, type) {
    for (let key of keys) {
      this.on(key, (keye) => {
        socket.send({
          type,
          key: keye,
        });
      });
    }
  }

  offAll(socket, keys, type) {
    for (let key of keys) {
      this.off(key, (keye) => {
        socket.send({
          type,
          key: keye,
        });
      });
    }
  }

  off(key, callback) {
    this.keysOff[key] = callback;
  }
}
