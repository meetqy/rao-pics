# `@eagleuse/transform-eagle`

Watch eagle library to sqlite.

## Install

```zsh
pnpm i prisma @prisma/client @eagleuse/transform-eagle

# mac || linux
ln -s node_modules/@eagleuse/transform-eagle/prisma

# windows
mklink /j ./prisma ./node_modules/@eagleuse/transform-eagle/prisma
```

### Init prisma

```zsh
# 构建 PrismaClient
npx prisma generate
```

## Usage

**js**

```js
const { transformEagle } = require("@eagleuse/transform-eagle");

transfromEagle();
```
