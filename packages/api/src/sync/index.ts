import { EventEmitter } from "events";
import { join } from "path";
import { observable } from "@trpc/server/observable";
import { z } from "zod";

import type { Pending } from "@rao-pics/db";

import { router } from "../..";
import { t } from "../utils";
import { handleFolder } from "./folder";
import { createImage } from "./image";

const ee = new EventEmitter();

/**
 * 同步新增逻辑
 * 1. 同步文件夹
 * 1.2 对比文件夹，删除旧的，新增新的
 * 2. 开始同步图片
 * 2.1 检测图片是否需要更新 (checkedImage) 默认最后更新时间小于3秒不更新
 * 2.2 读取图片元数据 (readJson) metadata.json
 * 2.3 创建标签 (Tag)
 * 2.4 创建颜色 (Color)
 * 2.5 创建图片并关联创建的 Tag、Color、Folder
 * 2.6 删除 pending
 * 2.7 删除没有关联图片的标签、颜色
 */

/**
 * 同步删除/更新逻辑，更新拆分为 => 创建新的，删除旧的
 * ... 同步新增逻辑
 *
 * 2.3 读取该图片的标签
 * 2.4 对比标签，找出需要新增/更新/删除的标签
 * 2.5 对比颜色，找出需要新增/更新/删除的颜色
 * 2.6 更新图片，并关联/取消关联 Tag、Color、Folder
 * 2.7 删除 pending
 * 2.8 删除没有关联图片的标签、颜色
 */

export const sync = t.router({
  start: t.procedure
    .input(
      z.object({
        libraryPath: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const caller = router.createCaller({});
      const pendings = (await caller.pending.get()) as Pending[];

      try {
        // 同步文件夹
        const folders = handleFolder(join(input.libraryPath, "metadata.json"));
        await syncFolder(folders, caller);
      } catch (e) {
        // 每次同步首先同步文件夹，如果文件夹同步失败，直接返回
        return false;
      }

      await syncImage(pendings);

      return true;
    }),

  onStart: t.procedure.subscription(() => {
    interface T {
      status: "ok" | "completed" | "error";
      type: "folder" | "image";
      data?: { id: string; name: string };
      count: number;
      message?: string;
    }

    return observable<T>((emit) => {
      function onGreet(data: T) {
        emit.next(data);
      }

      ee.on("sync.start", onGreet);

      return () => {
        ee.off("sync.start", onGreet);
      };
    });
  }),
});

export const syncFolder = async (
  folders: ReturnType<typeof handleFolder>,
  caller: ReturnType<typeof router.createCaller>,
) => {
  let count = 0;
  for (const f of folders) {
    count++;
    await caller.folder.upsert(f);
    ee.emit("sync.start", { status: "ok", type: "folder", data: f, count });
  }

  ee.emit("sync.start", { status: "completed", type: "folder" });
};

export const syncImage = async (pendings: Pending[]) => {
  let count = 0;

  for (const p of pendings) {
    count++;
    try {
      switch (p.type) {
        case "create":
          await createImage(p);
          ee.emit("sync.start", { status: "ok", type: "image", count });
          break;
      }

      // 删除 pending
      await router.createCaller({}).pending.delete(p.path);
    } catch (e) {
      ee.emit("sync.start", {
        status: "error",
        type: "image",
        count,
        message: e,
      });

      const errorMsg = (e as Error).message.match(/\[(?<type>.*)\]/);
      const caller = router.createCaller({});
      if (errorMsg) {
        const type = errorMsg[0].replace(/\[|\]/g, "");
        await caller.log.upsert({
          path: p.path,
          type: type as never,
          message: (e as Error).message,
        });
      } else {
        await caller.log.upsert({
          path: p.path,
          type: "unknow",
          message: (e as Error).stack ?? JSON.stringify(e),
        });
      }

      await router.createCaller({}).pending.delete(p.path);
    }
  }

  ee.emit("sync.start", { status: "completed", type: "image", count });
};
