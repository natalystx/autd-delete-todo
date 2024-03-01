import { useViewModel } from "./useViewModel";
const FetchUserData = () => {
  const { userData, onFetchUserData } = useViewModel();
  return (
    <div>
      <pre>{JSON.stringify(userData, null, 2)}</pre>

      <button onClick={onFetchUserData}>Click here to fetch user data</button>
    </div>
  );
};

export default FetchUserData;
