export interface GalleryModel {
  data: [ImageModel];
  total: number;
}

export interface ImageModel {
  src: string;
  _id: number;
  description: string;
  thumb: string;
}
