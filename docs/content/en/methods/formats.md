---
title: Formats
description: 'Returns all avaliable formats'
position: 10
category: 'Methods'
---

## Simple Usage

This endpoint returns a list / an array of all available response formats

```javascript[index.js]
await JokeClient.formats();
```

## Parameters

Parameters supported on this method

### `format`

- Type: `String`
- Default: `json`
- Options: `json`, `xml`, `yaml` and `txt`

Response Formats (or just "Formats") are a way to get your data in a different file format.
Maybe your environment or language doesn't support JSON natively. In that case, JokeAPI is able to convert the JSON-formatted joke to a different format for you.

```javascript[index.js]
await JokeClient.formats({
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
await JokeClient.formats({
  lang: 'en'
})
```
