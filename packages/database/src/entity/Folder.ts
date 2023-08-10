import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";

import { Image } from "./Image";
import { Library } from "./Library";

@Entity("folders")
export class Folder {
  /**
   * id = name，特殊情况 egale folder 有自己的id
   */
  @PrimaryColumn()
  id!: string;

  @Column({ unique: true })
  name!: string;

  /**
   * 图片
   */
  @ManyToMany(() => Image, (image) => image.folders)
  images!: Image[];

  /**
   * 图库
   */
  @ManyToOne(() => Library, (library) => library.folders)
  library!: Library;
}
