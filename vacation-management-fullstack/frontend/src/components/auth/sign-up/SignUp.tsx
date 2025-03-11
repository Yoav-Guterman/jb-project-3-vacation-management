import './SignUp.css'
import { useForm } from 'react-hook-form'
import auth from '../../../services/auth'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../auth/Auth'
import Signup from '../../../models/user/Signup'

export default function SignUp(): JSX.Element {

    const { register, handleSubmit } = useForm<Signup>()
    const navigate = useNavigate()
    const { newLogin } = useContext(AuthContext)!


    async function submit(signUp: Signup) {
        try {
            const jwt = await auth.signUp(signUp)
            newLogin(jwt)
            navigate('/profile')
        } catch (e) {
            console.log(e)
        }
    }

    function goToLogIn() {
        navigate('/login')
    }

    return (
        <div className='SignUp'>
            <div className='form-container'>
                <h3 className='form-title'>create an account</h3>
                <form onSubmit={handleSubmit(submit)}>
                    <input placeholder='first name' {...register('firstName')} />
                    <input placeholder='lastName' {...register('lastName')} />
                    <input placeholder='email' type='email' {...register('email')} />
                    <input placeholder='password' type="password" {...register('password')} />
                    <button>Sign Up</button>
                </form>
                <h6>already have an account? Log in here</h6>
                <button
                    onClick={goToLogIn}
                    className="btn btn-link">
                    login
                </button>
            </div>
        </div>
    )
}