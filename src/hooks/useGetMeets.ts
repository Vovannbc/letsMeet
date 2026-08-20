import { useQuery } from "@tanstack/react-query";
import { getMeets, Meet } from "@/api/meets";
// import { useIsFocused } from '@react-navigation/native'

const useGetMeets = () => {
  // const isFocused = useIsFocused();
  const meetsQuery = useQuery<Meet[], Error>({
    queryKey: ["notes"],
    queryFn: getMeets,
    // subscribed: isFocused
  });

  return meetsQuery;
};

export default useGetMeets;
