export class Logger {
  static TEXT = 0;
  static WARNING = 1;
  static ERROR = 2;

  static log(host, text, level) {
    if (level) {
    } else {
      console.log(`[${host}] ${text}`);
    }
  }
}
