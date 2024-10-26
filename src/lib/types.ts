export interface SearchImageItemData {
  center: string;
  date_created: string;
  description: string;
  keywords?: string[];
  media_type: string;
  nasa_id: string;
  title: string;
  secondary_creator: string;
}

export interface SearchImageItemLink {
  href: string;
  rel: string;
  render: string;
}

export interface SearchImageItem {
  data: SearchImageItemData[];
  href: string;
  links?: SearchImageItemLink[];
}

export interface PaginationLink {
  href: string;
  prompt: string;
  rel: string;
}

export interface SearchImageResult {
  collection: {
    href: string;
    items: SearchImageItem[];
    metadata: {
      total_hits: number;
    };
    links?: PaginationLink[];
    version: string;
  };
}

export interface QueryParams {
  q: string;
  year_start?: string;
  year_end?: string;
  page?: string;
}
