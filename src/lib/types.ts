export interface SearchImageItemData {
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

export interface SearchImageResult {
  collection: {
    href: string;
    items: SearchImageItem[];
    metadata: {
      total_hits: number;
    };
    version: string;
  };
}
