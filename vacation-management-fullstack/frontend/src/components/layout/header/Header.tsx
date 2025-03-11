import { NavLink } from 'react-router-dom'
import './Header.css'
import { useContext } from 'react'
import { AuthContext } from '../../auth/auth/Auth'
import useUsername from '../../../hooks/useUsername'

export default function Header() {

    const name = useUsername()

    const { logOut, role } = useContext(AuthContext)!

    function logMeOut() {
        logOut()
    }

    return (
        <div className='Header'>
            <div>
                Logo
            </div>

            <div>
                <nav>
                    <NavLink to="/vacations">vacations</NavLink>
                    <NavLink to="/feed">feed</NavLink>
                </nav>
            </div>
            <div>
                Hello {name} {role} | <button onClick={logMeOut}>logout</button>
            </div>
        </div>
    )
}