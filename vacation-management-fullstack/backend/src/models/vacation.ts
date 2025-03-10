import { AllowNull, BelongsToMany, Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";
import User from "./user";
import Follow from "./follow";

@Table({
    underscored: true
})
export default class Vacation extends Model {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string

    @AllowNull(false)
    @Column(DataType.STRING(100))
    destination: string

    @AllowNull(false)
    @Column(DataType.TEXT)
    description: string

    @AllowNull(false)
    @Column(DataType.DATE)
    startDate: Date

    @AllowNull(false)
    @Column(DataType.DATE)
    endDate: Date

    @AllowNull(false)
    @Column(DataType.INTEGER)
    price: number

    @Column(DataType.STRING(255))
    imageUrl: string

    @BelongsToMany(() => User, () => Follow, 'vacationId', 'userId')
    followers: User[]
}