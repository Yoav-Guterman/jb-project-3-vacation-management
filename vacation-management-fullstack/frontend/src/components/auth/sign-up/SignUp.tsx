import './SignUp.css'
import { useForm } from 'react-hook-form'
import auth from '../../../services/auth'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../auth/Auth'
import Signup from '../../../models/user/Signup'
import axios from 'axios'
import { showToast } from '../../common/toast/Toast'

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
            showToast.success('account created successfully');
            navigate('/vacations')
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                showToast.error(err.response?.data || 'An error occurred');
            } else {
                showToast.error('An unexpected error occurred');
            }
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
                <h3 className='form-title'>Create an account</h3>
                <form onSubmit={handleSubmit(submit)}>
                    <div className="form-group">
                        <input
                            placeholder='first name'
                            {...register('firstName', {
                                required: 'First name is required',
                                minLength: {
                                    value: 2,
                                    message: 'first name must be at least 2 characters'
                                }
                            })}
                        />
                        {errors.firstName && <span className="error">{errors.firstName.message}</span>}
                    </div>

                    <div className="form-group">
                        <input
                            placeholder='last name'
                            {...register('lastName', {
                                required: 'last name is required',
                                minLength: {
                                    value: 2,
                                    message: 'last name must be at least 2 characters'
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
                                    message: 'password must be at least 4 characters'
                                }
                            })}
                        />
                        {errors.password && <span className="error">{errors.password.message}</span>}
                    </div>

                    <button disabled={isLoading}>
                        {isLoading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>
                <h6>Already have an account? Log in here</h6>
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