import './Header.css'
import { useContext } from 'react'
import { AuthContext } from '../../auth/auth/Auth'

export default function Header() {

    const { logOut, user } = useContext(AuthContext)!

    function logMeOut() {
        logOut()
    }

    return (
        <div className='Header'>
            <div className='headerTitle'>
                yoav guterman - john bryce - vacation management project
            </div>
            <div>
                Hello {user?.firstName} | <button onClick={logMeOut}>logout</button>
            </div>
        </div>
    )
}