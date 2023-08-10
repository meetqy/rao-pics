import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { z } from "zod";

import { Library } from "./Library";

const type = ["create", "delete", "update"] as const;
export const PendingType = z.enum(type);

@Entity("pendings")
export class Pending {
  @PrimaryColumn()
  path!: string;

  /**
   * create | delete | update
   */
  @Column({
    type: "enum",
    enum: type,
  })
  type!: z.infer<typeof PendingType>;

  /**
   * 图库
   */
  @ManyToOne(() => Library, (library) => library.pendings)
  library!: Library;

  @Column()
  libraryId!: number;
}
