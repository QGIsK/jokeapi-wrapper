export interface Options {
  apiKey?: string;
  'safe-mode'?: SafeMode;
  format?: Format;
  blacklistFlags?: string | string[];
  lang?: string;
}

export interface RequestOptions {
  // defaults to get
  method?: 'POST';
  body?: string;
}

export interface Flags {
  nsfw?: boolean;
  religious?: boolean;
  political?: boolean;
  racist?: boolean;
  sexist?: boolean;
  explicit?: boolean;
}

export type Categories =
  | 'any'
  | 'misc'
  | 'programming'
  | 'dark'
  | 'pun'
  | 'spooky'
  | 'christmas'
  | 'miscellaneous'
  | 'coding'
  | 'development'
  | 'halloween';

export type BlacklistFlags = 'nsfw' | 'religious' | 'political' | 'racist' | 'sexist' | 'explicit';

export type Format = 'json' | 'xml' | 'yaml' | 'txt';

export type JokeType = 'single' | 'twopart';

export type SafeMode = boolean | string;
