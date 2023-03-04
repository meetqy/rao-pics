# `@eagleuse/plugin-api`

## Useage

```js
import PLUGIN_API from "@eagleuse/plugin-api";

PLUGIN_API({
  library,
  fastify,
  port,
});
```

| Args               | Desc                               | Type                                  |
| ------------------ | ---------------------------------- | ------------------------------------- |
| `library`          | Images dir from Eagle App library. | string                                |
| `registerCallback` | Register Callback.                 | ((fastify: FastifyInstance) => void)? |
| `port`             | Port                               | number?                               |
| `host`             | Host                               | string?                               |

## Image

- /image `POST`
- /image/:id `GET`

## Folder

- /folder `POST`

## Tag

- /tag `POST`

## TagsGroups

- /tags-groups `POST`
