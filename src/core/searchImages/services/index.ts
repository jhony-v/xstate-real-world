import { createServiceEntity, get } from "api-entity";
import { unsplashAPI } from "@/config/constants";
import { resolveData, resolveImages } from "./utils";
import { SearchImagesRepositoy } from "../types/services";

const imagesService = createServiceEntity<SearchImagesRepositoy>({
  adapter: unsplashAPI,
  actions: {
    byId: get("photos/:id", resolveData),
    randomPhotos: get("photos/random", resolveImages),
    collectionById: get("collections/:id", resolveData),
    search: get("search/photos/?query=:query", resolveImages),
    searchCollections: get("search/collections?query=:query", resolveImages),
  },
});

export default imagesService;
