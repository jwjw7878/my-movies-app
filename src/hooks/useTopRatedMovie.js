import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";

const fetchTopRated = () => {
  return api.get(`/movie/top_rated`);
};

export const useTopRatedMovie = () => {
  return useQuery({
    queryKey: ["top_rated"],
    queryFn: fetchTopRated,
    select: (data) => data?.data,
  });
};
