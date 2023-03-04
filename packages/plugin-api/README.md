# `@eagleuse/plugin-api`

## Useage

```js
import PLUGIN_API from "@eagleuse/plugin-api";

PLUGIN_API({
  library,
  fastify,
  isListen,
});
```

| Args       | Desc                               | Type            |
| ---------- | ---------------------------------- | --------------- |
| `library`  | Images dir from Eagle App library. | string          |
| `fastify`  | Fastify object.                    | FastifyInstance |
| `isListen` | Open listen port.                  | boolean         |

## Image

- /image `POST`
- /image/:id `GET`

## Folder

- /folder `POST`

## Tag

- /tag `POST`

## TagsGroups

- /tags-groups `POST`
