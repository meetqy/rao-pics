import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { z } from "zod";

import { Library } from "./Library";

const type = ["trash", "json-error", "ext"] as const;
export const FailType = z.enum(type);

@Entity("fails")
export class Fail {
  @PrimaryColumn()
  path!: string;

  /**
   * 图库
   */
  @ManyToOne(() => Library, (library) => library.fails)
  library!: Library;

  @Column()
  libraryId!: number;

  /**
   * trash 回收站
   * json-error json 格式错误
   * ext  扩展名不支持
   */
  @Column({ type: "varchar" })
  type?: z.infer<typeof FailType>;
}
