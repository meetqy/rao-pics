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

| Args      | Desc                                                       | Type             |
| --------- | ---------------------------------------------------------- | ---------------- |
| `library` | Images dir from Eagle App library.                         | string           |
| `fastify` | Fastify instance.                                          | FastifyInstance? |
| `port`    | Undefined: Don't start server. Use other fastify instance. | number?          |

## Image

- /image `POST`
- /image/:id `GET`

## Folder

- /folder `POST`

## Tag

- /tag `POST`

## TagsGroups

- /tags-groups `POST`
