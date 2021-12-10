---
title: Get Joke
description: 'Get a joke'
position: 5
category: 'Methods'
---

## Simple usage

This will get a random joke in any category.

```javascript[index.js]
await JokeClient.getJoke();
```

## Parameters

Parameters supported on this method

### `categories`

- Type: `String|Array`
- Default: `Any`

Can be given in either an array or a string seperated with , + -

```javascript[index.js]
await JokeClient.getJoke({ categories: ['Coding', 'dark'] });
await JokeClient.getJoke({ categories: 'Coding,dark' });
await JokeClient.getJoke({ categories: 'Coding+dark' });
await JokeClient.getJoke({ categories: 'Coding-dark' });
```

### `format`

- Type: `String`
- Default: `json`
- Options: `json`, `xml`, `yaml` and `txt`

Response Formats (or just "Formats") are a way to get your data in a different file format.
Maybe your environment or language doesn't support JSON natively. In that case, JokeAPI is able to convert the JSON-formatted joke to a different format for you.

```javascript[index.js]
await JokeClient.getJoke({
  format: 'xml'
})
```

### `blacklistFlags`

- Type: `String`
- Default: `Undefined`
- Options: `nsfw`, `religious`, `political`, `racist`, `sexist` and `explicit`

This parameter can be used on every endpoint, but it is possible that no translations or jokes exist yet for your language.
If it is used, jokes that match the specified flag(s) will not be served

```javascript[index.js]
await JokeClient.getJoke({
  blacklistFlags: ['nsfw', 'religious']
})
```

### `idRange`

- Type: `Number`
- Default: `Undefined`

If this filter is used, you will only get jokes that are within the provided range of IDs.
You don't necessarily need to provide an ID range though, a single ID will work just fine as well.
Example: an ID range of 0-9 will mean you will only get one of the first 10 jokes, while an ID range of 5 will mean you will only get the 6th joke.

```javascript[index.js]
await JokeClient.getJoke({
  idRange: 10
})
```

### `contains`

- Type: `String`
- Default: `Undefined`

If the search string filter is used, only jokes that contain the specified string will be returned.

```javascript[index.js]
await JokeClient.getJoke({
  contains: 'Donuts'
})
```

### `type`

- Type: `String`
- Default: `Undefined`
- Options: `single` and `twopart`

  Each joke comes with one of two types: single or twopart.
  If a joke is of type "twopart", it has a setup string and a delivery string, which are both part of the joke.
  They are separated because you might want to present the users the delivery after a timeout or in a different section of the UI.
  A joke of type "single" only has a single string, which is the entire joke.

```javascript[index.js]
await JokeClient.getJoke({
  type: 'single'
})
```

### `amount`

- Type: `number`
- Default: `Undefined`
- Options: `1` - `10`

  This filter allows you to set a certain amount of jokes
  Setting it to a number larger than 10 will make JokeAPI default to the maximum (10).
  If you request more than 5 jokes, the API will try to serve them encoded with Brotli, Gzip or Deflate

```javascript[index.js]
await JokeClient.getJoke({
  number: 10
})
```

## Output example

```json
{
  "error": false,
  "category": "Programming",
  "type": "twopart",
  "setup": "Why does no one like SQLrillex?",
  "delivery": "He keeps dropping the database.",
  "flags": {
    "nsfw": false,
    "religious": false,
    "political": false,
    "racist": false,
    "sexist": false,
    "explicit": false
  },
  "id": 13,
  "safe": true,
  "lang": "en"
}
```
