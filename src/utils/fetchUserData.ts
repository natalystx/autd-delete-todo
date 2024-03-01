import { UserDto } from "../types/user.dto";
import {
  FormattedUserData,
  userSummaryTransform,
} from "./userSummaryTransform";

export const fetchUserData = async (): Promise<FormattedUserData> => {
  const response = await fetch("https://dummyjson.com/users");
  const json = await response.json();

  const formattedUserData = userSummaryTransform(json.users as UserDto[]);

  return formattedUserData;
};
