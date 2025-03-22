import { useForm } from 'react-hook-form'
import './Login.css'
import auth from '../../../services/auth'
import { useContext, useState } from 'react'
import { AuthContext } from '../auth/Auth'
import LoginModel from '../../../models/user/Login'
import { useNavigate } from 'react-router-dom'

export default function Login(): JSX.Element {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginModel>()
    const navigate = useNavigate()
    // Add loading state
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { newLogin } = useContext(AuthContext)!

    async function submit(login: LoginModel) {
        try {
            setIsLoading(true)
            const jwt = await auth.login(login)
            newLogin(jwt)
            navigate('/vacations') // Assuming you want to navigate to vacations after login
        } catch (e) {
            console.error('Login failed:', e)
            alert('Invalid email or password. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    function goToSignup() {
        navigate('/signUp')
    }

    return (
        <div className='Login'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(submit)}>
                <div className="form-group">
                    <input
                        type='email'
                        placeholder='email'
                        {...register('email', {
                            required: 'email is required'
                        })}
                    />
                    {errors.email && <span className="error">{errors.email.message}</span>}
                </div>

                <div className="form-group">
                    <input
                        placeholder='password'
                        type="password"
                        {...register('password', {
                            required: 'password is required',
                            minLength: {
                                value: 4,
                                message: 'Password must be at least 4 characters'
                            }
                        })}
                    />
                    {errors.password && <span className="error">{errors.password.message}</span>}
                </div>

                <button disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            <h6>Don't have an account? sign in here</h6>
            <button
                onClick={goToSignup}
                className="btn btn-link">
                signup
            </button>
        </div>
    )
}