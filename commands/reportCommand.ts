import { getErrorMessage } from "../helpers/getErrorMessage.util";
import { validateRobotLocation } from "../helpers/validateRobotLocation";
import { RobotLocation } from "../types";

export const reportCommand = (currentLocation: RobotLocation) => {
  console.log("Reporting the Location of the Toy Robot...");
  try {
    validateRobotLocation(currentLocation);
    console.log(
      currentLocation[0] + "," + currentLocation[1] + "," + currentLocation[2]
    );
    console.log("Toy Robot Location Reported Successfully.");
  } catch (error) {
    console.log(getErrorMessage(error));
    console.log("Toy Robot Location not Reported.");
  }
};
