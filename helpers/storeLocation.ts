import { writeFile } from "fs/promises";
import path from "path";
import { RobotLocation } from "../types";

export const storeLocation = async (currentLocation: RobotLocation) => {
  const filePath = path.join(__dirname, "../", "last-location.txt");

  try {
    await writeFile(filePath, JSON.stringify(currentLocation));
    console.log("Location of the robot stored to file successfully.");
  } catch (error) {
    console.log("Error storing the location of the robot to file.");
  }
};
