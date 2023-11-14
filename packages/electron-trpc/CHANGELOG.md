# electron-trpc

## 0.5.2

### Patch Changes

- [#149](https://github.com/jsonnull/electron-trpc/pull/149) [`3892db5`](https://github.com/jsonnull/electron-trpc/commit/3892db5342653e5c294477e3884b15c796fc26de) Thanks [@JoeHartzell](https://github.com/JoeHartzell)! - Update internal utils to use upstream tRPC shared helper.

- [#152](https://github.com/jsonnull/electron-trpc/pull/152) [`0e72fe9`](https://github.com/jsonnull/electron-trpc/commit/0e72fe93b7605636b80cb3b3e47b6992cb4c097a) Thanks [@jsonnull](https://github.com/jsonnull)! - Update dependencies.

## 0.5.1

### Patch Changes

- [#146](https://github.com/jsonnull/electron-trpc/pull/146) [`c43ae93`](https://github.com/jsonnull/electron-trpc/commit/c43ae93df4af397986c602c432fc32178d62796b) Thanks [@JoeHartzell](https://github.com/JoeHartzell)! - Fix `handleIPCMessage` only sending replies to Electron's main frame.

## 0.5.0

### Minor Changes

- [#138](https://github.com/jsonnull/electron-trpc/pull/138) [`68ddf63`](https://github.com/jsonnull/electron-trpc/commit/68ddf63ff6b3560626bf78d45ca2bf7ed2851f22) Thanks [@jsonnull](https://github.com/jsonnull)! - Rework how subscriptions are cleaned up.

## 0.4.5

### Patch Changes

- [#136](https://github.com/jsonnull/electron-trpc/pull/136) [`70d13e4`](https://github.com/jsonnull/electron-trpc/commit/70d13e400d8b0678a359c633511b419736ef4b5d) Thanks [@jsonnull](https://github.com/jsonnull)! - Update electron and trpc to latest.

## 0.4.4

### Patch Changes

- [#134](https://github.com/jsonnull/electron-trpc/pull/134) [`84d1139`](https://github.com/jsonnull/electron-trpc/commit/84d1139d6b6970b8863fdb1ba22a0aaa709045ec) Thanks [@jsonnull](https://github.com/jsonnull)! - Update dependencies to latest.

## 0.4.3

### Patch Changes

- [#125](https://github.com/jsonnull/electron-trpc/pull/125) [`1f601ee`](https://github.com/jsonnull/electron-trpc/commit/1f601ee985e1a969fa2cdacaf2ff20962a2edbd9) Thanks [@biw](https://github.com/biw)! - Fix transforms not running for subscriptions.

## 0.4.2

### Patch Changes

- [#118](https://github.com/jsonnull/electron-trpc/pull/118) [`cbae157`](https://github.com/jsonnull/electron-trpc/commit/cbae1570ddeab2405950806656c0d4fc19d72855) Thanks [@jsonnull](https://github.com/jsonnull)! - Fix crash when using subscriptions with some custom transformers.

## 0.4.1

### Patch Changes

- [#111](https://github.com/jsonnull/electron-trpc/pull/111) [`b73c1a8`](https://github.com/jsonnull/electron-trpc/commit/b73c1a89c77258bf4372991fda563d6fa0ba299f) Thanks [@jsonnull](https://github.com/jsonnull)! - Fix type of `createContext` in `createIPCHandler`

## 0.4.0

### Minor Changes

- [#108](https://github.com/jsonnull/electron-trpc/pull/108) [`3cd3649`](https://github.com/jsonnull/electron-trpc/commit/3cd3649a498a8cdb50f295ee2f032ca75eccc8b3) Thanks [@eslym](https://github.com/eslym)! - Send responses back to process which made the request.

## 0.3.2

### Patch Changes

- [#103](https://github.com/jsonnull/electron-trpc/pull/103) [`46d79ef`](https://github.com/jsonnull/electron-trpc/commit/46d79efde7ccc12cd1e99eb086413aa83bda29f8) Thanks [@jsonnull](https://github.com/jsonnull)! - Publish types for node TS resolution workaround.

## 0.3.1

### Patch Changes

- [#96](https://github.com/jsonnull/electron-trpc/pull/96) [`797e5ba`](https://github.com/jsonnull/electron-trpc/commit/797e5baa47f867a2f128ace3f8186dd21b57820d) Thanks [@jsonnull](https://github.com/jsonnull)! - Do not force projects to use node16 TS resolution.

- [#98](https://github.com/jsonnull/electron-trpc/pull/98) [`f92772a`](https://github.com/jsonnull/electron-trpc/commit/f92772a191a632f40c7a3cad46893d40a6715b48) Thanks [@jsonnull](https://github.com/jsonnull)! - Allow sync createContext to be passed.

- [#93](https://github.com/jsonnull/electron-trpc/pull/93) [`3cb91a7`](https://github.com/jsonnull/electron-trpc/commit/3cb91a71da9b7da84149ff2c586e5f7ce2032030) Thanks [@BeeeQueue](https://github.com/BeeeQueue)! - Use input serializer in ipcLink.

## 0.3.0

### Minor Changes

- [#88](https://github.com/jsonnull/electron-trpc/pull/88) [`b67f2a7`](https://github.com/jsonnull/electron-trpc/commit/b67f2a7a87cd77b88d337e6996d78c6507a9c187) Thanks [@jsonnull](https://github.com/jsonnull)! - Added support for subscriptions.

## 0.2.1

### Patch Changes

- [#78](https://github.com/jsonnull/electron-trpc/pull/78) [`c9031f5`](https://github.com/jsonnull/electron-trpc/commit/c9031f5b521095d3c648fc905b642471e875d86f) Thanks [@jsonnull](https://github.com/jsonnull)! - Include type declarations in publish package.

## 0.2.0

### Minor Changes

- [#71](https://github.com/jsonnull/electron-trpc/pull/71) [`006d01e`](https://github.com/jsonnull/electron-trpc/commit/006d01e73a995f756be622769192444bba3b4a87) Thanks [@jsonnull](https://github.com/jsonnull)! - Update electron-trpc to v10 release.

- [#71](https://github.com/jsonnull/electron-trpc/pull/71) [`c46f700`](https://github.com/jsonnull/electron-trpc/commit/c46f700b6171835a5b00d6d2c44061acdcd49874) Thanks [@jsonnull](https://github.com/jsonnull)! - Move to tRPC v10.

### Patch Changes

- [#71](https://github.com/jsonnull/electron-trpc/pull/71) [`231afea`](https://github.com/jsonnull/electron-trpc/commit/231afea9f21f0d4ba7f12c37fd781f22ca5d4141) Thanks [@jsonnull](https://github.com/jsonnull)! - Set minimum version for electron peer dependency.

- [#71](https://github.com/jsonnull/electron-trpc/pull/71) [`960999f`](https://github.com/jsonnull/electron-trpc/commit/960999f5c2fec8b70152cfdf6cadc737c60edd48) Thanks [@jsonnull](https://github.com/jsonnull)! - Updated API to be simpler and require fewer steps.

- [#71](https://github.com/jsonnull/electron-trpc/pull/71) [`3c76498`](https://github.com/jsonnull/electron-trpc/commit/3c76498c152e92fe1b084d3e7a5170d8f2c1dee3) Thanks [@jsonnull](https://github.com/jsonnull)! - Update tRPC to rc.7.

- [#71](https://github.com/jsonnull/electron-trpc/pull/71) [`7c7ee89`](https://github.com/jsonnull/electron-trpc/commit/7c7ee89b45c6c27527e26b0a6100fc0cb41d8ba6) Thanks [@jsonnull](https://github.com/jsonnull)! - Upgrade to tRPC v10 rc.1.

- [#71](https://github.com/jsonnull/electron-trpc/pull/71) [`ddc11cb`](https://github.com/jsonnull/electron-trpc/commit/ddc11cb1f1502568a028476acdefdb8d95d9562c) Thanks [@jsonnull](https://github.com/jsonnull)! - Fix transformer path.

- [#71](https://github.com/jsonnull/electron-trpc/pull/71) [`4615cf6`](https://github.com/jsonnull/electron-trpc/commit/4615cf63c382a0ea21781efb5093a531cc6378e6) Thanks [@jsonnull](https://github.com/jsonnull)! - Update tRPC to rc.2.

- [#71](https://github.com/jsonnull/electron-trpc/pull/71) [`42f2b09`](https://github.com/jsonnull/electron-trpc/commit/42f2b09efbaf322af42df176b74f72b972724f99) Thanks [@jsonnull](https://github.com/jsonnull)! - Fix server import from ipcLink.

- [#71](https://github.com/jsonnull/electron-trpc/pull/71) [`d2870a4`](https://github.com/jsonnull/electron-trpc/commit/d2870a4ef4429053c6a0d3e44bb204d0177adda9) Thanks [@jsonnull](https://github.com/jsonnull)! - Fix TypeScript type resolution. (Authored by @skyrpex, thanks!)

## 0.2.0-next.7

### Patch Changes

- [#62](https://github.com/jsonnull/electron-trpc/pull/62) [`169c47f`](https://github.com/jsonnull/electron-trpc/commit/169c47f325de8899784187af06140c29758b0c0a) Thanks [@renovate](https://github.com/apps/renovate)! - Update tRPC to rc.7.

## 0.2.0-next.6

### Patch Changes

- [#58](https://github.com/jsonnull/electron-trpc/pull/58) [`a2103c4`](https://github.com/jsonnull/electron-trpc/commit/a2103c4e9789741aa98aa057fcebf78e4f339d9b) Thanks [@jsonnull](https://github.com/jsonnull)! - Updated API to be simpler and require fewer steps.

## 0.2.0-next.5

### Patch Changes

- [#45](https://github.com/jsonnull/electron-trpc/pull/45) [`333197f`](https://github.com/jsonnull/electron-trpc/commit/333197fb3e567aa37f350af992d123f8f8ed6796) Thanks [@renovate](https://github.com/apps/renovate)! - Update tRPC to rc.2.

## 0.2.0-next.4

### Patch Changes

- [#41](https://github.com/jsonnull/electron-trpc/pull/41) [`6ff6963`](https://github.com/jsonnull/electron-trpc/commit/6ff696377187c19bc773153d17d8cba7bda25c50) Thanks [@jsonnull](https://github.com/jsonnull)! - Upgrade to tRPC v10 rc.1.

- [#39](https://github.com/jsonnull/electron-trpc/pull/39) [`702b9af`](https://github.com/jsonnull/electron-trpc/commit/702b9afc595630b1a272c48ba86fc84f67e97909) Thanks [@jsonnull](https://github.com/jsonnull)! - Fix TypeScript type resolution. (Authored by @skyrpex, thanks!)

## 0.2.0-next.3

### Patch Changes

- [#29](https://github.com/jsonnull/electron-trpc/pull/29) [`6d5ef0a`](https://github.com/jsonnull/electron-trpc/commit/6d5ef0a0265957f322b91daebdd3e851f61f1333) Thanks [@jsonnull](https://github.com/jsonnull)! - Fix transformer path.

## 0.2.0-next.2

### Patch Changes

- [#26](https://github.com/jsonnull/electron-trpc/pull/26) [`073eecb`](https://github.com/jsonnull/electron-trpc/commit/073eecb504917ad7e8865a8f904827ca0a4ca2ba) Thanks [@jsonnull](https://github.com/jsonnull)! - Fix server import from ipcLink.

## 0.2.0-next.1

### Patch Changes

- [#24](https://github.com/jsonnull/electron-trpc/pull/24) [`eba2b98`](https://github.com/jsonnull/electron-trpc/commit/eba2b98506bcf4590a3689397f445a0443fa9188) Thanks [@jsonnull](https://github.com/jsonnull)! - Set minimum version for electron peer dependency.

## 0.2.0-next.0

### Minor Changes

- [`d392431`](https://github.com/jsonnull/electron-trpc/commit/d39243176897dd7cd209d768db68dc90cab92c58) Thanks [@jsonnull](https://github.com/jsonnull)! - Move to tRPC v10.

## 0.1.0

### Minor Changes

- [#17](https://github.com/jsonnull/electron-trpc/pull/17) [`1dc8ac3`](https://github.com/jsonnull/electron-trpc/commit/1dc8ac3e3f54b471beb8bef6dea4fce4efafe5b4) Thanks [@jsonnull](https://github.com/jsonnull)! - Upgrade tRPC.

## 0.0.4

### Patch Changes

- [#14](https://github.com/jsonnull/electron-trpc/pull/14) [`e314c71`](https://github.com/jsonnull/electron-trpc/commit/e314c715f5b2734c357a564d23b5717089adb7ef) Thanks [@jsonnull](https://github.com/jsonnull)! - Make createContext param optional.

## 0.0.3

### Patch Changes

- [#10](https://github.com/jsonnull/electron-trpc/pull/10) [`357842e`](https://github.com/jsonnull/electron-trpc/commit/357842e81a8db0d089095a0cb91aa5b647c230d0) Thanks [@jsonnull](https://github.com/jsonnull)! - Update API for `exposeElectronTRPC`.

## 0.0.2

### Patch Changes

- [#8](https://github.com/jsonnull/electron-trpc/pull/8) [`50e4718`](https://github.com/jsonnull/electron-trpc/commit/50e4718d75803a5f2ed4675cfc42f713d3dff62b) Thanks [@jsonnull](https://github.com/jsonnull)! - Update docs and package description.

## 0.0.1

### Patch Changes

- [#2](https://github.com/jsonnull/electron-trpc/pull/2) [`693b1e0`](https://github.com/jsonnull/electron-trpc/commit/693b1e0e30d06c2cba6b1745967e1b3c38f3ed91) Thanks [@jsonnull](https://github.com/jsonnull)! - Initial version
