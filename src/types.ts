export type DataImage = {
  id: string;
  urls: {[key: string]: string}
    alt_description: string;
    likes?: number;
    created_at: Date;
    description?: string;
}

export type Data = {
  results: DataImage[];
  total: number;
  total_pages: number;
}