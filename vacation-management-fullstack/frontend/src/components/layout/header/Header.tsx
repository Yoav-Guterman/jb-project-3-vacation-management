import './Header.css'
import { useContext } from 'react'
import { AuthContext } from '../../auth/auth/Auth'
import useUsername from '../../../hooks/useUsername'

export default function Header() {

    const name = useUsername()

    const { logOut } = useContext(AuthContext)!

    function logMeOut() {
        logOut()
    }

    return (
        <div className='Header'>
            <div>
                Logo
            </div>
            <div>
                Hello {name} | <button onClick={logMeOut}>logout</button>
            </div>
        </div>
    )
}