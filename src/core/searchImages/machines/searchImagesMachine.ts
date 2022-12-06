import { createMachine } from "xstate";
import imagesService from "../services";

export const searchImagesMachine = createMachine(
  {
    id: "searchImagesMachine",
    context: {
      currentPhoto: {},
      currentCollection: {},
      collections: [],
      photos: [],
    },
    states: {},
  },
  {
    actions: {},
    guards: {},
    services: {
    },
  }
);

export default searchImagesMachine;
