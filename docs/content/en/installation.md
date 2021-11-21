---
title: Installation
description: 'Installing the wrapper/client'
position: 2
category: 'Getting Started'
---

Add `@qgisk/jokeapi-wrapper` to your project

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add @qgisk/jokeapi-wrapper
```

</code-block>
<code-block label="NPM">

```bash
npm install @qgisk/jokeapi-wrapper
```

</code-block>
</code-group>

then import `@qgisk/jokeapi-wrapper` in your main file and initiate the client

```javascript[index.js]
const JokeAPI = require('@qgisk/jokeapi-wrapper');
const client = new JokeAPI();
```
