import { useState } from "react";
import { FormattedUserData } from "../../utils/userSummaryTransform";
import { fetchUserData } from "../../utils/fetchUserData";

export const useViewModel = () => {
  const [userData, setUserData] = useState<FormattedUserData>({});
  const onFetchUserData = async () => {
    const userDataTemp = await fetchUserData();
    setUserData(userDataTemp);
  };

  return {
    userData,
    onFetchUserData,
  };
};
