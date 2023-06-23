Based on: https://github.com/cawa-93/vite-electron-builder
The tRPC over IPC code is based on [the electron-trpc package](https://github.com/jsonnull/electron-trpc), adapted to support tRPC v10 by using [tRPC source](https://github.com/trpc/trpc/tree/next).

## Running locally

- Run `npm run bootstrap`.
  This installs the dependencies and sets up the database.

- Run `npm run dev`
  This starts a development watch process using `vite`.
  It hot reloads on changes to `renderer/`
  It reloads the web page on changes to `preload/`
  It fully reloads the Electron app on changes to `main/`

## Packaging the app

`electron-builder` is used to compile this codebase into an executable.

- Run `npm run compile`

This executes the `scripts/compile.ts` file.
It uses the `electron-builder` programmatic API.

If you want to compile an installable executable, change `dir` to `false` in the call to `build()`.

[`electron-builder` API docs](https://www.electron.build/api/electron-builder)

## Notes

The `resolve.alias` stuff in `vite.config.ts` files is needed because https://github.com/vitejs/vite/issues/6828

By default, the Content-Security-Policy allows inline `<style>` tags.
If you use a different method of applying CSS, change the relevant line in `renderer/index.html`.
eg:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self'; style-src 'self'"
/>
```
