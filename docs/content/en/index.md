---
title: Introduction
description: 'Introduction'
category: 'Getting Started'
position: 1
features:
  - Categories
  - Blacklists
  - Languages
  - Formatting
  - Safemode
---

A NodeJS wrapper/client for the [JokeAPI](https://jokeapi.dev) made by [Sv443](https://github.com/Sv443)

For up to date paramaters, values, options checkout their [documentation](https://jokeapi.dev)

## Features

<list :items="features"></list>

## Simple Example

```javascript[index.js]
// Import the wrapper library
import JokeAPI from '@qgisk/jokeapi-wrapper'

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
