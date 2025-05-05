import { useQuery } from "@tanstack/react-query";
import request from "../services/fetch.service.js";

export const useRequest = (endpoint, refetchInterval) => {
  return useQuery({
    queryKey: [endpoint],
    queryFn: () => request(endpoint),
    refetchOnWindowFocus: true,
    refetchInterval: refetchInterval || false,
  });
};
