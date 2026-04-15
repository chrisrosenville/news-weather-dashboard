export interface NewsResponse {
  posts: Article[];
  totalResults: number;
  moreResultsAvailable: number;
  next: string | null;
  requestsLeft: number;
  warnings: string[] | null;
}

export interface Article {
  author: string;
  categories: string[];
  crawled: string;
  entities: {
    persons: string[];
    organizations: string[];
    locations: string[];
  };
  external_images: string[];
  external_links: string[];
  highlightText: string;
  highlightThreadTitle: string;
  highlightTitle: string;
  language: string;
  ord_in_thread: number;
  parent_url: string | null;
  published: string;
  rating: number | null;
  sentiment: string;
  text: string;
  thread: {
    uuid: string;
    url: string;
    site_full: string;
    site_section: string;
    site_type: string;
    country: string;
  };
  title: string;
  updated: string;
  url: string;
  uuid: string;
}
