import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";

const fetchPopularMovies = () => {
  return api.get(`/movie/popular`);
};

export const usePopularMovies = () => {
  return useQuery({
    queryKey: ["popular-movies"],
    queryFn: fetchPopularMovies,
    select: (data) => data?.data,
  });
};
