export const ROUTES = {
  HOME: "/popcorn",
  SEARCH: "/popcorn/recherche",
  ADD: "/popcorn/ajouter",
  DETAILS: (id = ":id") => `/popcorn/details/${id}`,
};