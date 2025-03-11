import Signup from "./Signup";

export default interface User extends Signup {
    id: string,
    role: string,
    // Add JWT-specific fields
    exp?: number;
    iat?: number;
}