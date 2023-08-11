import { Entity, ManyToMany, PrimaryColumn } from "typeorm";

import { Image } from "./Image";

@Entity("colors")
export class Color {
  @PrimaryColumn({ type: "int" })
  rgb!: number;

  /**
   * 图片
   */
  @ManyToMany(() => Image, (image) => image.colors)
  images!: Image[];
}
