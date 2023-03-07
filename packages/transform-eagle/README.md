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

## Init prisma

```zsh
# Exist Sqlite Database DB
npx prisma generate

# Nonexistent Sqlite Database DB
npx prisma init
```

## Usage

```js
const { transformEagle } = require("@eagleuse/transform-eagle");

transfromEagle();
```

## Options

.env

```sh
# "Eagle App" library directory.
LIBRARY=/Users/qymeet/Pictures/test.library

# Sqlite data directory.
DATABASE_URL=file:/Users/qymeet/Pictures/test.library/eagleuse.db?connection_limit=1

# Open checked "NSFW", You need install '@eagleuse/plugin-nsfw' package.
# @default false
PLUGIN_NSFW=true
```

## Notice

If sqlite database exist in you local, please use `pnpm run db:push`.
