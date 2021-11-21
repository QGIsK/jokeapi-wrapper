---
title: Information
description: 'Information for the JokeAPI'
position: 6
category: 'Methods'
---

## Simple Usage

This method provides a lot of information about JokeAPI and its jokes:

- The version number
- The amount of jokes
- All the available categories, flags, types and formats
- A 13-character UNIX timestamp
- The URL to a joke submission form
- A list of languages (code and name) JokeAPI currently supports
- The minimum and maximum values of an ID range per each language
- The amount of safe jokes there are per language
- A string with some information, like a message of the day

```javascript
const info = await JokeClient.info();
```

## Parameters

### `format`

- Type: `String`
- Default: `json`
- Options: `json`, `xml`, `yaml` and `txt`

Response Formats (or just "Formats") are a way to get your data in a different file format.
Maybe your environment or language doesn't support JSON natively. In that case, JokeAPI is able to convert the JSON-formatted joke to a different format for you.

```javascript[index.js]
await JokeClient.info({
  format: 'xml'
})
```

### `lang`

- Type: `String`
- Default: `Undefined`
- Supported system languages: `cs`, `de`, `en`, `it` and `ru`
- Supported joke languages: `cs`, `de`, `en`, `es`, `fr` and `pt`

This parameter can be used on every endpoint, but it is possible that no translations or jokes exist yet for your language.

```javascript[index.js]
await JokeClient.info({
  lang: 'en'
})
```
