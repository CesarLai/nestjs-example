export interface UploadEntity {
  fileName: string;
  type: 'image' | 'doc';
  url: string;
  timestamp: number;
  mimetype: string;
  ext: string;
  uploader?: {
    name: string;
    email: string;
  };
}
