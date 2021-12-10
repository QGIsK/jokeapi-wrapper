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

## • Example Project

[Discord Bot](https://discord.com/oauth2/authorize?client_id=896816739336196208&permissions=0&scope=bot%20applications.commands) | [Source](https://github.com/QGIsK/JokeBot)

## • JokeAPI Documentation

For the full wrapper documentation checkout [this](https://jokewrapper.docs.demiann.dev/)

For complete API documentation, up-to-date parameters, responses and errors, please refer to [JokeAPI](https://jokeapi.dev).

## • Quick Start Example

```javascript
// Import the wrapper library
import JokeAPI from '@qgisk/jokeapi-wrapper';

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

## • Inspiration

[miscavage](https://github.com/miscavage/CoinGecko-API/)

## • License

[MIT](LICENSE)
