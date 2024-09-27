import { readFile } from "fs/promises";
import path from "path";
import { RobotLocation } from "../types";
import { existsSync } from "fs";
import { getErrorMessage } from "./getErrorMessage.util";

export const retrieveLocation = async (): Promise<
  RobotLocation | undefined
> => {
  const filePath = path.join(__dirname, "../", "last-location.txt");

  // check if file exists before trying to read it
  if (!existsSync(filePath)) {
    return;
  }

  try {
    const location = await readFile(filePath, "utf-8");
    console.log(
      "Location of the robot's last location retrieved from file successfully."
    );
    return JSON.parse(location) as RobotLocation;
  } catch (error) {
    console.log(
      getErrorMessage(error) ??
        "Error retrieving the robot's last location from file."
    );
  }
};
