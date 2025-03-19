import './SignUp.css'
import { useForm } from 'react-hook-form'
import auth from '../../../services/auth'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../auth/Auth'
import Signup from '../../../models/user/Signup'

export default function SignUp(): JSX.Element {
    // Use formState to access errors
    const { register, handleSubmit, formState: { errors } } = useForm<Signup>()
    const navigate = useNavigate()
    const { newLogin } = useContext(AuthContext)!
    // Add loading state
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function submit(signUp: Signup) {
        try {
            setIsLoading(true)
            const jwt = await auth.signUp(signUp)
            newLogin(jwt)
            navigate('/vacations')
        } catch (e) {
            console.error('Signup failed:', e)
            alert('Registration failed. Please try again.')
        } finally {
            setIsLoading(false)
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
                    <div className="form-group">
                        <input
                            placeholder='first name'
                            {...register('firstName', {
                                required: 'First name is required',
                                minLength: {
                                    value: 2,
                                    message: 'First name must be at least 2 characters'
                                }
                            })}
                        />
                        {errors.firstName && <span className="error">{errors.firstName.message}</span>}
                    </div>

                    <div className="form-group">
                        <input
                            placeholder='lastName'
                            {...register('lastName', {
                                required: 'Last name is required',
                                minLength: {
                                    value: 2,
                                    message: 'Last name must be at least 2 characters'
                                }
                            })}
                        />
                        {errors.lastName && <span className="error">{errors.lastName.message}</span>}
                    </div>

                    <div className="form-group">
                        <input
                            placeholder='email'
                            type='email'
                            {...register('email', {
                                required: 'Email is required'
                            })}
                        />
                        {errors.email && <span className="error">{errors.email.message}</span>}
                    </div>

                    <div className="form-group">
                        <input
                            placeholder='password'
                            type="password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 4,
                                    message: 'Password must be at least 4 characters'
                                }
                            })}
                        />
                        {errors.password && <span className="error">{errors.password.message}</span>}
                    </div>

                    <button disabled={isLoading}>
                        {isLoading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>
                <h6>already have an account? Log in here</h6>
                <button
                    onClick={goToLogIn}
                    className="btn btn-link"
                    disabled={isLoading}>
                    login
                </button>
            </div>
        </div>
    )
}