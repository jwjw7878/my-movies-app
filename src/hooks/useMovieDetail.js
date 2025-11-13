import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";

const fetchMovieDetail = (id) => {
  return api.get(`/movie/${id}`);
};

export const useMovieDetail = (id) => {
  return useQuery({
    queryKey: ["detail", id],
    queryFn: () => fetchMovieDetail(id),
    select: (data) => data?.data,
  });
};
