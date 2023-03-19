# `@raopics/plugin-api`

## Useage

```js
import PLUGIN_API from "@raopics/plugin-api";

PLUGIN_API({
  library: "/Users/qymeet/Pictures/rao.library",
});
```

## Args

```ts
interface Args {
  library: string;
  port?: number;
  registerCallback?: (fastify: FastifyInstance) => void;
}
```

## Random

Get a random image.

- /api/r `GET`
- /api/random `GET`
- /random `GET`
- /r `GET`

## Image

- /image `POST`
- /image/:id `GET`

## Folder

- /folder `POST`

## Tag

- /tag `POST`

## TagsGroups

- /tags-groups `POST`
