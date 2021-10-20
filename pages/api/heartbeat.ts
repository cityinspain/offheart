import { NextApiRequest, NextApiResponse } from "next";

import { promises as fs } from "fs";
import path from "path";

const LOG_HEADER = "timestamp,speed_down,speed_up";

const formatToLogLine = (body: {
  from: string;
  speedUp: string;
  speedDown: string;
}) => {
  return `\n${Math.floor(new Date().getTime())},${body.speedDown},${
    body.speedUp
  }`;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const logsDirectory = path.join(process.cwd(), "logs");

    try {
      await fs.access(logsDirectory);
    } catch (err) {
      fs.mkdir(logsDirectory)
        .then(() => {
          const logFilePath = path.join(logsDirectory, "log.csv");
          fs.writeFile(
            logFilePath,
            `${LOG_HEADER}${formatToLogLine(req.body)}`
          ).then(() => res.send(200));
        })
        .catch((err) => console.error("ERROR!", err));

      return;
    }

    const logFilePath = path.join(logsDirectory, "log.csv");
    try {
      await fs.access(logFilePath);
    } catch (err) {
      fs.writeFile(logFilePath, `${LOG_HEADER}${formatToLogLine(req.body)}`)
        .then(() => res.send(200))
        .catch((err) => console.error("ERROR!", err));

      return;
    }

    fs.appendFile(logFilePath, formatToLogLine(req.body))
      .then(() => res.send(200))
      .catch((err) => console.error("ERROR!", err));

    return;
  }
}
