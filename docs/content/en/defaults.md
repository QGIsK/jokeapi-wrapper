---
title: Configuration
description: 'Configure the client with default params'
position: 3
category: 'Getting Started'
---

You can configure the client when initiating the client

```javascript[index.js]
const JokeAPI = require('@qgisk/jokeapi-wrapper');
const Client = new JokeAPI({
    // Your configuration
});

```

Parameters take priority over default configuration so when key is supplied in both, parmameters will be used.

## Properties

### `apiKey`

- Type: `String`
- Default: `Undefined`

This api key will be set as a Authorization(Header) `Bearer` for every request

```javascript[index.js]
new JokeAPI({
  apiKey: 'your-api-key'
}
```

### `safemode`

- Type: `Boolean`
- Default: `false`

When `true` the api wont serve any joke that is considered explicit in any way, jokes from the `Dark` category are generally marked as unsafe. Note: this filter is really fine but that doesn't mean human error is out of the question.

```javascript[index.js]
new JokeAPI({
  safemode: true
}
```

### `format`

- Type: `String`
- Default: `json`
- Options: `json`, `xml`, `yaml` and `txt`

Response Formats (or just "Formats") are a way to get your data in a different file format.
Maybe your environment or language doesn't support JSON natively. In that case, JokeAPI is able to convert the JSON-formatted joke to a different format for you.

```javascript[index.js]
new JokeAPI({
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
new JokeAPI({
  blacklistFlags: ['nsfw', 'religious']
})
```

### `lang`

- Type: `String`
- Default: `Undefined`
- Supported system languages: `cs`, `de`, `en`, `it` and `ru`
- Supported joke languages: `cs`, `de`, `en`, `es`, `fr` and `pt`

This parameter can be used on every endpoint, but it is possible that no translations or jokes exist yet for your language.

```javascript[index.js]
new JokeAPI({
  lang: 'en'
})
```
