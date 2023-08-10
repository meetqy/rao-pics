import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";

import { Image } from "./Image";
import { Library } from "./Library";

@Entity("tags")
export class Tag {
  @PrimaryColumn()
  name!: string;

  /**
   * 图片
   */
  @ManyToMany(() => Image, (image) => image.tags)
  images!: Image[];

  /**
   * 图库
   */
  @ManyToOne(() => Library, (library) => library.tags)
  library!: Library;

  @Column()
  libraryId!: number;
}
