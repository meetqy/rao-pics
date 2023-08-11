import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("configs")
export class Config {
  @PrimaryColumn({ type: "varchar" })
  id!: string;

  /**
   * 页面端口
   */
  @Column({ type: "int" })
  webPort!: number;

  /**
   * 资源端口
   */
  @Column({ type: "int" })
  assetsPort!: number;

  /**
   * IP地址
   */
  @Column({ type: "varchar" })
  ip!: string;
}
