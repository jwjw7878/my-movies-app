import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";

const getFetchGenre = () => {
  return api.get(`/genre/movie/list?language=en`);
};

export const useGenreforIds = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: getFetchGenre,
    select: (data) => data.data.genres,
  });
};
