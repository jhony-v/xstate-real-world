type Query = { query: string };
type QueryId = { id: string };

export interface SearchImagesRepositoy {
  search(query: Query): Promise<any[]>;
  byId(query: QueryId): Promise<any>;
  randomPhotos(query: Query): Promise<any[]>;
  collections(): Promise<any[]>;
  searchCollections(query: Query): Promise<any[]>;
  collectionById(query: QueryId): Promise<any>;
}
