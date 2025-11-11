import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";

const fetchSearchMovies = ({ keyword, page }) => {
  return keyword
    ? api.get(`search/movie?query=${keyword}&page=${page}`)
    : api.get(`/movie/popular?page=${page}`);
};

export const useSearchMovies = ({ keyword, page }) => {
  return useQuery({
    queryKey: ["search", { keyword, page }],
    queryFn: () => fetchSearchMovies({ keyword, page }),
    select: (data) => data?.data,
  });
};
