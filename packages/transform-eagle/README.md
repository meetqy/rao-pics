# `@eagleuse/transform-eagle`

Watch eagle library to sqlite.

### Install

```shell
pnpm i prisma @prisma/client @eagleuse/transform-eagle

# mac || linux
ln -s node_modules/@eagleuse/transform-eagle/prisma

# windows
mklink /j ./prisma ./node_modules/@eagleuse/transform-eagle/prisma
```

### Usage

**js**

```js
const { transfromEagle } = require("@eagleuse/transform-eagle");

transfromEagle();
```

**esm**

```ts
import { transfromEagle } from "@eagleuse/transform-eagle";

transfromEagle();
```
