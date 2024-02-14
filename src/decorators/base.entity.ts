import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export class Base {
  @CreateDateColumn({ name: "create_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "update_at", type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp" })
  deletedAt: Date;
}
