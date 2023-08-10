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
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * library.dir + path => originalPath
   */
  @Column()
  path!: string;

  /**
   * UserData 缓存目录 + thumbnailPath => thumbnailPath
   */
  @Column({ nullable: true })
  thumbnailPath?: string;

  /**
   * 名字
   */
  @Column()
  name!: string;

  /**
   * 文件大小
   */
  @Column()
  size!: number;

  /**
   * 创建时间
   */
  @Column()
  createTime!: Date;

  /**
   * 修改时间
   */
  @Column()
  lastTime!: Date;

  /**
   * 扩展名
   */
  @Column()
  ext!: string;

  /**
   * 宽度
   */
  @Column()
  width!: number;

  /**
   * 高度
   */
  @Column()
  height!: number;

  /**
   * 视频时长
   */
  @Column({ nullable: true })
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
