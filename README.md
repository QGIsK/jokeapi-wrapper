# Joke API Client for NodeJS

A Node.js wrapper for the JokeAPI with only one dependency.

## • Installation

Latest version: 1.0.0

`npm i github:qgisk/jokeapi-wrapper`

## • JokeAPI Documentation

For complete API documentation, up-to-date parameters, responses and errors, please refer to [JokeAPI](https://jokeapi.dev)

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
const JokeAPI = require("jokeapi-wrapper");

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

## • With Api Key

```javascript
const JokeClient = new JokeAPI(<apikey>);

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
const joke = await JokeClient.getJoke({ categories: ['Coding'] });
```

or

```javascript
const joke = await JokeClient.getJoke({ categories: 'Coding' });
```

## • Info

| Key      | Type     |
| -------- | -------- |
| `format` | `string` |
| `lang`   | `string` |

### • Example

```javascript
const info = await JokeClient.info();
```

or

```javascript
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
```

or

```javascript
const categories = await JokeClient.categories({ format: 'text', lang: 'en' });
```

## • Langcode

| Key        | Type     |
| ---------- | -------- |
| `format`   | `string` |
| `language` | `string` |

### • Example

```javascript
const langcode = await JokeClient.langcode();
```

or

```javascript
const langcode = await JokeClient.langcode({ format: 'text', language: 'english' });
```

## • Languages

| Key      | Type     |
| -------- | -------- |
| `format` | `string` |
| `lang`   | `string` |

### • Example

```javascript
const languages = await JokeClient.languages();
```

or

```javascript
const languages = await JokeClient.languages({ format: 'text', lang: 'en' });
```

## • Flags

| Key      | Type     |
| -------- | -------- |
| `format` | `string` |
| `lang`   | `string` |

### • Example

```javascript
const flags = await JokeClient.flags();
```

or

```javascript
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
```

or

```javascript
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
```

or

```javascript
const ping = await JokeClient.ping({ format: 'text', lang: 'en' });
```

## • Inspiration

[miscavage](https://github.com/miscavage/JokeAPI-API/)

## • License

[MIT](LICENSE)
