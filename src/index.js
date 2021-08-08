import fetch from 'node-fetch';

const baseUrl = 'https://v2.jokeapi.dev';
const categories = [
  'Any',
  'Misc',
  'Programming',
  'Dark',
  'Pun',
  'Spooky',
  'Christmas',
  'Miscellaneous',
  'Coding',
  'Development',
  'Halloween',
];

const blackListFlags = ['nsfw', 'religious', 'political', 'racist', 'sexist', 'explicit'];

const format = ['json', 'xml', 'yaml', 'txt'];

module.exports = class JokeApiWrapper {
  constructor(safeMode, blacklistFlags) {
    this.baseUrl = baseUrl;
    this.safeMode = safeMode;
    this.blackListFlags = blacklistFlags;
  }

  async request() {
    const res = await fetch(this.baseUrl);
  }
};
