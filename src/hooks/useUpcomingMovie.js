import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";

const fetchUpcomingMovies = () => {
  return api.get(`/movie/upcoming`);
};

export const useUpcomingMovies = () => {
  return useQuery({
    queryKey: ["upcoming"],
    queryFn: fetchUpcomingMovies,
    select: (data) => data?.data,
  });
};
