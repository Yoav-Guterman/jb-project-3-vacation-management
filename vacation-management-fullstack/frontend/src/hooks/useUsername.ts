import { jwtDecode } from "jwt-decode"
import { useContext, useMemo } from "react"
import { AuthContext } from "../components/auth/auth/Auth"
import User from "../models/user/User"

export default function useUsername() {
    const { jwt } = useContext(AuthContext)!
    // const decoded = jwtDecode<User>(jwt)

    const firstName = useMemo(() => {
        const { firstName } = jwtDecode<User>(jwt)
        return firstName
    }, [jwt])

    return firstName
}