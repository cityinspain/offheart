import { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";
import path from "path";

export type Log = {
  timestamp: number;
  speedUp: number;
  speedDown: number;
};

export function getLogs(): Promise<Log[]> {
  const logsDirectory = path.join(process.cwd(), "logs");
  const logsFile = path.join(logsDirectory, "log.csv");
  console.log("get logs");
  return fs
    .readFile(logsFile, "utf-8")
    .then((data) => {
      console.log(data);
      return data
        .split("\n")
        .filter((line) => !line.startsWith("timestamp"))
        .map((line) => {
          const [timestamp, speedDown, speedUp] = line.split(",");
          return {
            timestamp: parseInt(timestamp),
            speedDown: parseFloat(speedDown),
            speedUp: parseFloat(speedUp),
          };
        });
    })
    .catch((err) => {
      console.error("No file yet");
      return [];
    });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Log[]>
) {
  getLogs()
    .then((data) => res.json(data))
    .catch((err) => console.error("error: ", err));
}
