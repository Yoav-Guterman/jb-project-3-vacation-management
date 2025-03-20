import User from "../user/User";
import BaseVacation from "./BaseVacation";

export default interface Vacation extends BaseVacation {
    id: string,
    imageUrl: string,
    followers: User[]
}
