import { createServiceEntity, get } from "api-entity";
import { unsplashAPI } from "@/config/constants";
import { resolveData, resolveResults } from "./utils";
import { SearchImagesRepositoy } from "../types/services";

const imagesService = createServiceEntity<SearchImagesRepositoy>({
  adapter: unsplashAPI,
  actions: {
    byId: get("photos/:id", resolveData),
    randomPhotos: get("photos/random", resolveResults),
    collectionById: get("collections/:id", resolveData),
    collections: get("collections", resolveResults),
    search: get("search/photos/?query=:query", resolveResults),
    searchCollections: get("search/collections?query=:query", resolveResults),
  },
});

export default imagesService;
