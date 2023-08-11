import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Color } from "./Color";
import { Folder } from "./Folder";
import { Library } from "./Library";
import { Tag } from "./Tag";

@Entity("images")
export class Image {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  /**
   * library.dir + path => originalPath
   */
  @Column({ unique: true, type: "varchar" })
  path!: string;

  /**
   * UserData 缓存目录 + thumbnailPath => thumbnailPath
   */
  @Column({ nullable: true, type: "varchar" })
  thumbnailPath?: string;

  /**
   * 名字
   */
  @Column({ type: "varchar" })
  name!: string;

  /**
   * 文件大小
   */
  @Column({ type: "int" })
  size!: number;

  /**
   * 创建时间
   */
  @Column({ type: "date" })
  createTime!: Date;

  /**
   * 修改时间
   */
  @Column({ type: "date" })
  lastTime!: Date;

  /**
   * 扩展名
   */
  @Column({ type: "varchar" })
  ext!: string;

  /**
   * 宽度
   */
  @Column({ type: "int" })
  width!: number;

  /**
   * 高度
   */
  @Column({ type: "int" })
  height!: number;

  /**
   * 视频时长
   */
  @Column({ nullable: true, type: "int" })
  duration?: number;

  /**
   * 文件夹
   */
  @ManyToMany(() => Folder)
  @JoinTable()
  folders!: Folder[];

  /**
   * 标签
   */
  @ManyToMany(() => Tag)
  @JoinTable()
  tags!: Tag[];

  /**
   * 颜色
   */
  @ManyToMany(() => Color)
  @JoinTable()
  colors!: Color[];

  /**
   * 图库
   */
  @ManyToOne(() => Library, (library) => library.images)
  library!: Library;
}
