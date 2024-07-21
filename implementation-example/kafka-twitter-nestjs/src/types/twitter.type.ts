export interface Twitter {
  edit_history_tweet_ids: string[];
  entities: Entities;
  id: string;
  lang: string;
  text: string;
}

export interface Entities {
  hashtags?: Hashtag[];
  mentions?: Mention[];
  urls?: URL[];
}

export interface Hashtag {
  start: number;
  end: number;
  tag: string;
}

export interface Mention {
  start: number;
  end: number;
  username: string;
  id: string;
}

export interface URL {
  start: number;
  end: number;
  url: string;
  expanded_url: string;
  display_url: string;
  status: number;
  title: string;
  description: string;
  unwound_url: string;
}
