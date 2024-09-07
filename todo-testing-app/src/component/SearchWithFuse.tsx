import Fuse from "fuse.js";

export const SearchWithFuse = (keysToSearch: any, query: string, data: any) => {
  const fuse = new Fuse(data, {
    keys: keysToSearch,
    threshold: 0.1,
  });
  const results = query ? fuse?.search(query) : [];

  const newResults = query ? results?.map((result) => result.item) : data;

  return newResults;
};
