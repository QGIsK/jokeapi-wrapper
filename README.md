A Node.js wrapper for the JokeAPI with only one dependency.

## • Installation

Latest version: 1.0.0

`npm install @qgisk/joke-api-wrapper`

## • JokeAPI Documentation

For complete API documentation, up-to-date parameters, responses and errors, please refer to [JokeAPI](https://jokeapi.dev)

## • Constants

This module provides helper constants for use in calls.

## • Quick Start Example

```javascript
// Import the wrapper library
const JokeAPI = require('jokeapi-wrapper');

// Initiate the client
const JokeClient = new JokeAPI();

// Create a function that gets a joke
const get = () => {
  const joke = await JokeClient.getJoke();
};

// Execute the function
get();
```

## • With api key

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
...
  const joke = await JokeClient.getJoke({categories: ['Coding']});
  or
  const joke = await JokeClient.getJoke({categories: 'Coding'});
...
```

## • Info

| Key      | Type     |
| -------- | -------- |
| `format` | `string` |
| `lang`   | `string` |

### • Example

```javascript
...
  const joke = await JokeClient.info();
...
```

## • Categories

| Key      | Type     |
| -------- | -------- |
| `format` | `string` |
| `lang`   | `string` |

### • Example

```javascript
...
  const joke = await JokeClient.categories();
...
```

## • Langcode

| Key      | Type     |
| -------- | -------- |
| `format` | `string` |
| `lang`   | `string` |

### • Example

```javascript
...
  const joke = await JokeClient.langcode();
...
```

## • Languages

| Key      | Type     |
| -------- | -------- |
| `format` | `string` |
| `lang`   | `string` |

### • Example

```javascript
...
  const joke = await JokeClient.languages();
...
```

## • Flags

| Key      | Type     |
| -------- | -------- |
| `format` | `string` |
| `lang`   | `string` |

### • Example

```javascript
...
  const joke = await JokeClient.flags();
...
```

## • Formats

| Key      | Type     |
| -------- | -------- |
| `format` | `string` |
| `lang`   | `string` |

### • Example

```javascript
...
  const joke = await JokeClient.formats();
...
```

## • Ping

| Key      | Type     |
| -------- | -------- |
| `format` | `string` |
| `lang`   | `string` |

### • Example

```javascript
...
  const joke = await JokeClient.ping();
...
```

## • Inspiration

[miscavage](https://github.com/miscavage/CoinGecko-API/)

## • License

[MIT](LICENSE)
