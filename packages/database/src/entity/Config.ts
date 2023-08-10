import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("configs")
export class Config {
  @PrimaryColumn()
  id!: string;

  /**
   * 页面端口
   */
  @Column()
  webPort!: number;

  /**
   * 资源端口
   */
  @Column()
  assetsPort!: number;

  /**
   * IP地址
   */
  @Column()
  ip!: string;
}
