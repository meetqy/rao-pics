# EagleUse

EagleUse is a back-end management system for "material management apps," which allows for the rapid creation of web-based image galleries, private image repositories, and self-hosted image hosting services.

## Getting Started

To get started with EagleUse, follow these steps:

1. Clone the repository:

```bash
git clone -b example https://github.com/rao-pics/core.git
```

2. Install the dependencies:

```sh
pnpm i
```

3. Rename the .env.example file to .env and fill in the DATABASE_URL field with the correct information.

4. Start the server:

```sh
node index.mjs
```

## Custom Installation

To perform a custom installation of EagleUse, follow these steps:

1. Install the required dependencies:

```java
pnpm i @raopics/use prisma @prisma/client
```

2. Add the following to the package.json file:

```json
{
  "prisma": {
    "schema": "@raopics/prisma-client/prisma/schema.prisma"
  }
}
```

3. Add the following scripts to the package.json file:

```json
{
  "scripts": {
    "db:init": "prisma migrate dev --name init --skip-seed",
    "db:preview": "prisma studio",
    "db:push": "prisma db push",
    "db:generate": "prisma generate"
  }
}
```

4. Create a new .env file and fill in the DATABASE_URL field.

5. Create a new index.mjs file and add the following:

```js
import EagleUse from "@raopics/use";

EagleUse({
  plugin_api: true,
  plugin_nsfw: true,
  transform_eagle: true,
  port: 3002,
});
```

6. Start the server:

```sh
# Initialize the database
pnpm db:init

# Start the server
node index.mjs
```

## Themes

EagleUse includes a default theme called Rua, which can be found here.

1. [Default Theme Rua](https://github.com/rao-pics/rua)

| Light                                                             | Dark                                                              |
| ----------------------------------------------------------------- | ----------------------------------------------------------------- |
| ![](https://github.com/rao-pics/rua/raw/main/readme/preview1.jpg) | ![](https://github.com/rao-pics/rua/raw/main/readme/preview2.jpg) |

Supported Apps

- [Eagle App](https://eagle.cool)

## License

EagleUse is licensed under the MIT License.

> This document by ChatGPT.
