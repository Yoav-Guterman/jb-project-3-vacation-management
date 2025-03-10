import { AllowNull, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import User from "./user";
import Vacation from "./vacation";

@Table({
    underscored: true
})
export default class Follow extends Model {

    @PrimaryKey
    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.UUID)
    userId: string

    @PrimaryKey
    @ForeignKey(() => Vacation)
    @AllowNull(false)
    @Column(DataType.UUID)
    vacationId: string
}