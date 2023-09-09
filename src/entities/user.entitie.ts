import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn, 
    DeleteDateColumn,
    OneToMany, 
    BeforeInsert, 
    BeforeUpdate 
} from "typeorm";
import * as bcrypt from 'bcryptjs';
import Schedule from "./schedules.entity";

@Entity("users")
class User{
    @PrimaryGeneratedColumn("increment")
    id: number;
    @Column({type: "varchar", length: 48})
    name: string;
    @Column({type: "varchar", length: 45, unique: true})
    email: string;
    @Column({type: "boolean", default: false})
    admin: boolean;
    @Column({type: "varchar", length: 120})
    password: string;
    @CreateDateColumn({type: "date"})
    createdAt: string | Date;
    @UpdateDateColumn({type: "date"})
    updatedAt: string | Date;
    @DeleteDateColumn({type: "date", nullable: true})
    deletedAt: string | Date | null | undefined;
    @OneToMany(() => Schedule, (schedule) => schedule.user)
    schedules: Schedule[];
    @BeforeInsert()
    hashPassawordUser(){
        this.password = bcrypt.hashSync(this.password, 8)
    }

    @BeforeUpdate()
    hashPassword(){
        const isEncripted: number = bcrypt.getRounds(this.password);
        if(!isEncripted){
            this.password = bcrypt.hashSync(this.password, 10);
        }
    }
}

export default User;