import { createMachine, assign } from "xstate";
import imagesService from "../services";

export const searchImagesMachine = createMachine(
  {
    id: "searchImagesMachine",
    context: {
      currentPhoto: null,
      currentCollection: null,
      collections: [],
      photos: [],
    } as any,
    initial: "fetching:collections",
    states: {
      "fetching:collections": {
        tags: ["fetching"],
        invoke: {
          id: "getCollections",
          src: "getCollections",
          onDone: {
            target: "success:collections",
            actions: "setCollections",
          },
          onError: "error.collections",
        },
      },
      "fetching:photos": {
        tags: ["fetching"],
        invoke: {
          id: "searchPhotos",
          src: "searchPhotos",
          onDone: {
            target: "success:photos",
            actions: "setPhotos",
          },
          onError: "error.photos",
        },
      },
      error: {
        on: {
          RETRY_COLLECTION: "fetching:collections",
          RETRY_PHOTOS: "fetching:photos",
        },
        states: {
          collections: {},
          photos: {},
        },
      },
      "success:collections": {
        on: {
          SEARCH_PHOTOS: {
            target: "fetching:photos",
          },
        },
      },
      "success:photos": {
        on: {
          RETRY_PHOTOS: {
            target: "fetching:photos",
          },
          SELECT_PHOTO: {
            target: "selected:photo",
          },
        },
      },
      "selected:photo": {
        on: {
          DESELECT_PHOTO: {
            target: "deselected:photo",
            actions: assign({
              currentPhoto: null
            })
          },
        },
      },
      "deselected:photo": {
        on: {
          SELECT_PHOTO: {
            target: "selected:photo",
            actions: assign({
              currentPhoto: (_context, event: any) => event.data
            })
          },
          RETRY_PHOTOS: {
            target: "fetching:photos",
          },
        },
      },
    },
  },
  {
    actions: {
      setPhotos: assign({
        photos: (_context, event: any) => event.data,
      }),
      setCollections: assign({
        collections: (_context, event: any) => event.data,
      }),
    },
    guards: {},
    services: {
      getCollections: () => imagesService.collections(),
      searchPhotos: (_context, event) => {
        return imagesService.search({ query: event.query });
      },
    },
  }
);

export default searchImagesMachine;
