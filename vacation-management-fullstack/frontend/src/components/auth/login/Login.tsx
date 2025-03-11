import { useForm } from 'react-hook-form'
import './Login.css'
import auth from '../../../services/auth'
import { useContext } from 'react'
import { AuthContext } from '../auth/Auth'
import LoginModel from '../../../models/user/Login'
import { useNavigate } from 'react-router-dom'

export default function Login(): JSX.Element {

    const { register, handleSubmit } = useForm<LoginModel>()
    const navigate = useNavigate()


    const { newLogin } = useContext(AuthContext)!

    async function submit(login: LoginModel) {
        const jwt = await auth.login(login)
        // here i need to code something that will set the JWT in the AuthContext state
        newLogin(jwt)
    }

    function goToSignup() {
        navigate('/signUp')
    }


    return (
        <div className='Login'>
            <form onSubmit={handleSubmit(submit)}>
                <input placeholder='email' {...register('email')} />
                <input placeholder='password' type="password" {...register('password')} />
                <button>Login</button>
            </form>

            <h6>don't have an account? sign in here</h6>
            <button
                onClick={goToSignup}
                className="btn btn-link">
                signup
            </button>
        </div>
    )
}