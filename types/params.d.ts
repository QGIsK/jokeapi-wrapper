/* prettier-ignore */
// for some reason prettier adds 'value' before Format
// TODO :: Figure out why ^^
import { Format, Categories, BlacklistFlags, JokeType, Flags, SafeMode} from './';

export interface BaseParams {
  format?: Format;
  lang?: string; // TODO :: Define
  'safe-mode'?: SafeMode;
}

export interface JokeParams extends BaseParams {
  categories?: Categories | Categories[];
  blacklistFlags?: BlacklistFlags | BlacklistFlags[];
  idRange?: string | number;
  contains?: string;
  type?: JokeType;
  amount?: number;
}

export interface SubmitJokeParams extends BaseParams {
  'dry-run'?: any;
  formatVersion: number;
  category: Categories;
  type: JokeType;
  joke: string;
  flags: Flags;
  lang: string;
}

export interface LangCodeParams extends BaseParams {
  language: string;
}

export type ExtendedParams = BaseParams | JokeParams | SubmitJokeParams | LangCodeParams;
