import { jwtDecode } from "jwt-decode"
import { useContext, useMemo } from "react"
import { AuthContext } from "../components/auth/auth/Auth"
import User from "../models/user/User"

export default function useUser() {
    const { jwt } = useContext(AuthContext)!
    // const decoded = jwtDecode<User>(jwt)

    const user = useMemo(() => {
        const decodedUser = jwtDecode<User>(jwt)
        return decodedUser
    }, [jwt])

    return user
}