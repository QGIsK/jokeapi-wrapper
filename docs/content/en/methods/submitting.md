---
title: Submit a Joke
description: 'This endpoint returns a parameter named "ping" that contains the word "Pong'
position: 12
category: 'Methods'
---

## Usage

This endpoint is used to programatically submit a joke to be reviewed and added to JokeAPI's official jokes.
If you instead just want to manually submit a joke, please [click here](https://jokeapi.dev/#submit).

For up to date parmaters on this please check out their [documentation](https://jokeapi.dev/#submit-endpoint)

### Testing

For testing define dry-run as anything

```javascript[index.js]
await JokeClient.submit({'dry-run': true});
```

### Single Joke

```javascript
await JokeClient.submit({
  'dry-run': true,
  formatVersion: 3,
  category: 'Misc',
  type: 'single',
  joke: 'testing',
  flags: { nsfw: true, religious: false, political: false, racist: false, sexist: false, explicit: true },
  lang: 'en',
});
```

### Two Part Joke

```javascript[index.js]
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
