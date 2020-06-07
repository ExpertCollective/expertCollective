import * as fs from "fs";
import * as path from "path";

export class LogToFile {
  writeFileToDirectory(logDirectory: string, input: any) {
    fs.access(logDirectory, (err) => {
      if (err && err.code === "ENOENT") {
        // Create dir in case not found
        fs.mkdir(logDirectory, (error) => {
          if (error) throw error;
          this.writeFileToLog(logDirectory, input);
        });
      } else {
        this.writeFileToLog(logDirectory, input);
      }
    });
  }

  private writeFileToLog(logDirectory: string, input: any) {
    const timeOfMessage = this.getDateTime();
    const fullPath = path.join(logDirectory, `message-${timeOfMessage}.txt`);
    fs.writeFile(fullPath, JSON.stringify(input), (err) => {
      if (err) throw err;
      console.log(`The file '${fullPath}' has been saved!`);
    });
  }

  getDateTime() {
    const date = new Date();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
  }
}
