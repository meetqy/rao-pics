import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { z } from "zod";

import { Fail } from "./Fail";
import { Folder } from "./Folder";
import { Image } from "./Image";
import { Pending } from "./Pending";
import { Tag } from "./Tag";

const type = ["eagle", "billfish", "pixcall"] as const;
export const LibraryType = z.enum(type);

@Entity("libraries")
export class Library {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ unique: true, type: "varchar" })
  dir!: string;

  /**
   * eagle | billfish | pixcall
   */
  @Column({ type: "varchar" })
  type!: z.infer<typeof LibraryType>;

  /**
   * 最后一次同步时间
   */
  @Column({ nullable: true, type: "date" })
  lastSyncTime?: Date;

  /**
   * 已同步
   */
  @OneToMany(() => Image, (image) => image.library)
  images!: Image[];

  /**
   * 同步失败的文件路径（包含不支持的扩展名）
   */
  @OneToMany(() => Fail, (fail) => fail.library)
  fails!: Fail[];

  /**
   * 等待同步的 image
   */
  @OneToMany(() => Pending, (pending) => pending.library)
  pendings!: Pending[];

  /**
   * 文件夹
   */
  @OneToMany(() => Folder, (folder) => folder.library)
  folders!: Folder[];

  /**
   * 标签
   */
  @OneToMany(() => Tag, (tag) => tag.library)
  tags!: Tag[];
}
