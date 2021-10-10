# Joke API Client for NodeJS

<span class="badge-npmversion"><a href="https://www.npmjs.com/package/@qgisk/jokeapi-wrapper" title="View this project on NPM"><img src="https://img.shields.io/npm/v/@qgisk/jokeapi-wrapper.svg" alt="NPM version"/></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/@qgisk/jokeapi-wrapper" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/@qgisk/jokeapi-wrapper.svg" alt="NPM downloads" /></a></span>
[![CodeQL](https://github.com/QGIsK/jokeapi-wrapper/actions/workflows/codeql-analysis.yml/badge.svg?branch=main)](https://github.com/QGIsK/jokeapi-wrapper/actions/workflows/codeql-analysis.yml)
[![Test package](https://github.com/QGIsK/jokeapi-wrapper/actions/workflows/test.js.yml/badge.svg?branch=main)](https://github.com/QGIsK/jokeapi-wrapper/actions/workflows/test.js.yml)

A Node.js wrapper for the JokeAPI with only one dependency [isomorphic-unfetch](https://www.npmjs.com/package/isomorphic-unfetch).

## • Installation

```bash
npm i @qgisk/jokeapi-wrapper
```

## • JokeAPI Documentation

For complete API documentation, up-to-date parameters, responses and errors, please refer to [JokeAPI](https://jokeapi.dev).

## • Constants

This module provides helper constants for use in calls.

| Key               | Usage                     | Description                         |
| ----------------- | ------------------------- | ----------------------------------- |
| `BASE`            | `JokeAPI.BASE`            | Base url for api                    |
| `HOST`            | `JokeAPI.HOST`            | Host url                            |
| `API_VERSION`     | `JokeAPI.API_VERSION`     | Current api version                 |
| `CATEGORIES`      | `JokeAPI.CATEGORIES`      | Lists all avaliable categories      |
| `BLACKLIST_FLAGS` | `JokeAPI.BLACKLIST_FLAGS` | Lists all avaliable blacklist flags |
| `FORMAT`          | `JokeAPI.FORMAT`          | Lists all avaliable formats         |
| `TYPE`            | `JokeAPI.TYPE`            | Lists all avaliable types           |
| `AMOUNT_MAX`      | `JokeAPI.AMOUNT_MAX`      | Max amount of jokes per request     |

## • Quick Start Example

```javascript
// Import the wrapper library
const JokeAPI = require('@qgisk/jokeapi-wrapper');

// Initiate the client
const JokeClient = new JokeAPI();

// Create a function that gets a joke
const get = async () => {
  const joke = await JokeClient.getJoke();
  console.log(joke);
};

// Execute the function
get();
```

## • With Options

| Key              | Type           |
| ---------------- | -------------- |
| `apiKey`         | `string`       |
| `safemode`       | `boolean`      |
| `format`         | `string`       |
| `blacklistFlags` | `string/array` |
| `lang`           | `string`       |

### • Example

```javascript
// NOTE:: Params take priority over options so when key is supplied in both, Params will be used.
const JokeClient = new JokeAPI({ apiKey: 'exampleapikey', safemode: true, format: 'xml' blacklistflags: ['nsfw'], lang: 'de'});
```

## • Categories & BlacklistFlags

can be given in an array or a string seperated by , + or -

### • Example

```javascript
const JokeClient = new JokeAPI({ blacklistflags: ['nsfw', 'explicit'] });
const joke = await JokeClient.getJoke({ categories: 'coding,dark' });
const joke = await JokeClient.getJoke({ categories: 'coding+dark' });
const joke = await JokeClient.getJoke({ categories: 'coding-dark' });
```

## • Get Joke

| Key              | Type           |
| ---------------- | -------------- |
| `categories`     | `string/array` |
| `format`         | `string`       |
| `blacklistFlags` | `string/array` |
| `lang`           | `string`       |
| `idRange`        | `number`       |
| `contains`       | `string`       |
| `type`           | `string`       |
| `amount`         | `number`       |

### • Example

```javascript
const joke = await JokeClient.getJoke({ categories: ['Coding', 'dark'] });

const joke = await JokeClient.getJoke({ categories: 'Coding,dark' });

// If theres no categories provided it defaults to /any
const joke = await JokeClient.getJoke();
```

## • Output example

Headers are only supplied when format is JSON

```json
{
  "error": false,
  "category": "Programming",
  "type": "twopart",
  "setup": "Why do programmers confuse Halloween and Christmas?",
  "delivery": "Because Oct 31 = Dec 25",
  "flags": {
    "nsfw": false,
    "religious": false,
    "political": false,
    "racist": false,
    "sexist": false,
    "explicit": false
  },
  "id": 11,
  "safe": true,
  "lang": "en",
  "headers": {
    "date": "Wed, 01 Sep 2021 12:44:50 GMT",
    "retry-after": "21",
    "ratelimit-limit": "120",
    "ratelimit-remaining": "118",
    "ratelimit-reset": "Wed Sep 01 2021 14:45:11 GMT+0200 (Central European Summer Time)"
  }
}
```

## • Info

| Key      | Type     |
| -------- | -------- |
| `format` | `string` |
| `lang`   | `string` |

### • Example

```javascript
const info = await JokeClient.info();

const info = await JokeClient.info({ format: 'text', lang: 'en' });
```

## • Categories

| Key      | Type     |
| -------- | -------- |
| `format` | `string` |
| `lang`   | `string` |

### • Example

```javascript
const categories = await JokeClient.categories();

const categories = await JokeClient.categories({ format: 'text', lang: 'en' });
```

## • Langcode

| Key        | Type     | required |
| ---------- | -------- | -------- |
| `format`   | `string` | `false`  |
| `language` | `string` | `true`   |

### • Example

```javascript
const langcode = await JokeClient.langcode({ format: 'text', language: 'english' });
```

## • Languages

| Key      | Type     |
| -------- | -------- |
| `format` | `string` |

### • Example

```javascript
const languages = await JokeClient.languages({ format: 'text' });
```

## • Flags

| Key      | Type     |
| -------- | -------- |
| `format` | `string` |
| `lang`   | `string` |

### • Example

```javascript
const flags = await JokeClient.flags();

const flags = await JokeClient.flags({ format: 'text', lang: 'en' });
```

## • Formats

| Key      | Type     |
| -------- | -------- |
| `format` | `string` |
| `lang`   | `string` |

### • Example

```javascript
const formats = await JokeClient.formats();

const formats = await JokeClient.formats({ format: 'text', lang: 'en' });
```

## • Ping

| Key      | Type     |
| -------- | -------- |
| `format` | `string` |
| `lang`   | `string` |

### • Example

```javascript
const ping = await JokeClient.ping();

const ping = await JokeClient.ping({ format: 'text', lang: 'en' });
```

## • Submitting

For testing define dry-run as anything

### • Example

```javascript
const submitSingle = await JokeClient.submit({
  'dry-run': true,
  formatVersion: 3,
  category: 'Misc',
  type: 'single',
  joke: 'testing',
  flags: { nsfw: true, religious: false, political: false, racist: false, sexist: false, explicit: true },
  lang: 'en',
});

const submitDouble = await JokeClient.submit({
  'dry-run': true,
  formatVersion: 3,
  category: 'misc',
  type: 'twopart',
  setup: 'Setup',
  delivery: 'Delivering',
  flags: { nsfw: true, religious: false, political: false, racist: false, sexist: false, explicit: true },
  lang: 'en',
});
```

## • Inspiration

[miscavage](https://github.com/miscavage/CoinGecko-API/)

## • License

[MIT](LICENSE)
