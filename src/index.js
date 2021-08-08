const fetch = require('node-fetch');

const Constants = require('./helpers/constants');
const Util = require('./helpers/util');

/**
 * @class JokeAPI
 * @author Demian <devaccdemiann@gmail.com>
 * @description A Node.js wrapper for the Joke API with one dependency. For more information, visit: https://jokeapi.dev/
 * @example
 *     const JokeAPI = require('jokeapi-wrapper');
 *     const JokeAPIClient = new JokeAPi();
 * @public
 * @version 1.0.0
 * @license MIT
 */
class JokeAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }
  getJoke(params = {}) {
    const url = this._buildUrl('joke', params);
    return this._request(url);
  }

  info(params = {}) {
    const url = this._buildUrl('info', params);
    return this._request(url);
  }

  categories(params = {}) {
    const url = this._buildUrl('categories', params);
    return this._request(url);
  }

  langcode(params = {}) {
    const url = this._buildUrl('langcode', params);
    return this._request(url);
  }

  languages(params = {}) {
    const url = this._buildUrl('languages', params);
    return this._request(url);
  }

  flags(params = {}) {
    const url = this._buildUrl('flags', params);
    return this._request(url);
  }

  formats(params = {}) {
    const url = this._buildUrl('formats', params);
    return this._request(url);
  }

  ping(params = {}) {
    const url = this._buildUrl('ping', params);
    return this._request(url);
  }

  endpoints(params = {}) {
    const url = this._buildUrl('endpoints', params);
    return this._request(url);
  }

  submit(params = {}) {
    const url = this._buildUrl('submit', params);
    return this._request(url, { method: 'POST' });
  }

  _buildUrl(endpoint, params) {
    const wildcard = params.langCode ? params.langCode : Util.parseArray(params.categories, 'any');

    const obj = Util.parseParams(params);
    const url = `${Constants.BASE}/${endpoint}/${wildcard}`;

    return obj ? this._buildQuery(url, obj) : url;
  }

  _buildQuery(url, query) {
    const parsedQuery = Object.entries(query)
      .map((pair) => pair.map(encodeURIComponent).join('='))
      .join('&');

    return parsedQuery ? `${url}?${parsedQuery}` : url;
  }

  async _request(url, options) {
    const headers = this.apiKey ? { Authorization: this.apiKey } : {};
    const res = await fetch(url, { ...options, headers });

    const formattedUrl = new URL(url);
    const urlSearchParams = new URLSearchParams(formattedUrl.search);
    const format = urlSearchParams.get('format');

    if (format) return res.text();

    return res.json();
  }
}

JokeAPI.BASE = Constants.BASE;
JokeAPI.HOST = Constants.HOST;
JokeAPI.API_VERSION = Constants.API_VERSION;
JokeAPI.CATEGORIES = Constants.CATEGORIES;
JokeAPI.BLACKLIST_FLAGS = Constants.BLACKLIST_FLAGS;
JokeAPI.FORMAT = Constants.FORMAT;
JokeAPI.TYPE = Constants.TYPE;
JokeAPI.AMOUNT_MAX = Constants.AMOUNT_MAX;
JokeAPI.TIMEOUT = Constants.TIMEOUT;

module.exports = exports = JokeAPI;
