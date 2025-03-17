import Signup from "./Signup";

export default interface User extends Signup {
    id: string,
    role: string,
}