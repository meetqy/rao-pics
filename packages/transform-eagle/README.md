# `@eagleuse/transform-eagle`

Watch eagle library to sqlite.

## Usage

```js
const TransformEagle = require("@eagleuse/transform-eagle");

TransformEagle({
  library: "xxx",
});
```

## Args

```ts
interface Args {
  // eagle app library address.
  library: string;
  // open nsfw
  plugin_nsfw?: boolean;
}
```
