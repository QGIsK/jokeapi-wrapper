---
title: Language Code
description: 'This endpoint returns the ISO 639-1 language code of a provided language. It is searched with a fuzzy search, so you just have to provide the approximate language name.'
position: 8
category: 'Methods'
---

## Simple Usage

This endpoint returns the ISO 639-1 language code of a provided language. It is searched with a fuzzy search, so you just have to provide the approximate language name.

```javascript[index.js]
await JokeClient.langcode({language: 'engwish`});
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
await JokeClient.langcode({
  format: 'xml'
})
```
