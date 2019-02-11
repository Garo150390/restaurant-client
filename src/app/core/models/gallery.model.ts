export interface GalleryModel {
  data: [ImageModel];
  total: number;
}

export interface ImageModel {
  name: string;
  id: number;
  title: string;
}
