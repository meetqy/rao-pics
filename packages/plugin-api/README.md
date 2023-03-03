# `@eagleuse/plugin-api`

## Image

- /image `POST`
- /image/:id `GET`

**Query**

| Params     | Description          | Example              | Default   |
| ---------- | -------------------- | -------------------- | --------- |
| `include`  | \_count,tags,folders | include=tags,folders | /         |
| `page`     | Pagination           | page=1               | 1         |
| `pageSize` | Pagination Size      | pageSize=50          | 50        |
| `orderBy`  | Sort                 | orderBy=btime,asc    | btime,asc |

## Folder

- /folder `POST`

## Tag

- /tag `POST`

## TagsGroups

- /tags-groups `POST`
