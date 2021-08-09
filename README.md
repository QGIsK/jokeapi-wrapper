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
const joke = await JokeClient.info();
```

## • Categories

| Key      | Type     |
| -------- | -------- |
| `format` | `string` |
| `lang`   | `string` |

### • Example

```javascript
const joke = await JokeClient.categories();
```

or

```javascript
  const joke = await JokeClient.categories({format: 'text', lang: 'en'}));
```

## • Langcode

| Key      | Type     |
| -------- | -------- |
| `format` | `string` |
| `lang`   | `string` |

### • Example

```javascript
const joke = await JokeClient.langcode();
```

or

```javascript
  const joke = await JokeClient.langcode({format: 'text', lang: 'en'}));
```

## • Languages

| Key      | Type     |
| -------- | -------- |
| `format` | `string` |
| `lang`   | `string` |

### • Example

```javascript
const joke = await JokeClient.languages();
```

or

```javascript
  const joke = await JokeClient.languages({format: 'text', lang: 'en'}));
```

## • Flags

| Key      | Type     |
| -------- | -------- |
| `format` | `string` |
| `lang`   | `string` |

### • Example

```javascript
const joke = await JokeClient.flags();
```

or

```javascript
  const joke = await JokeClient.flags({format: 'text', lang: 'en'}));
```

## • Formats

| Key      | Type     |
| -------- | -------- |
| `format` | `string` |
| `lang`   | `string` |

### • Example

```javascript
const joke = await JokeClient.formats();
```

or

```javascript
  const joke = await JokeClient.formats({format: 'text', lang: 'en'}));
```

## • Ping

| Key      | Type     |
| -------- | -------- |
| `format` | `string` |
| `lang`   | `string` |

### • Example

```javascript
const joke = await JokeClient.ping();
```

or

```javascript
  const joke = await JokeClient.ping({format: 'text', lang: 'en'}));
```

## • Inspiration

[miscavage](https://github.com/miscavage/CoinGecko-API/)

## • License

[MIT](LICENSE)
