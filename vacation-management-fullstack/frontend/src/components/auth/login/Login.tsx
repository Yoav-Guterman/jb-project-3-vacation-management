import { useForm } from 'react-hook-form'
import './Login.css'
import auth from '../../../services/auth'
import { useContext, useState } from 'react'
import { AuthContext } from '../auth/Auth'
import LoginModel from '../../../models/user/Login'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { showToast } from '../../common/toast/Toast'
import LoadingButton from '../../common/loadingButton/LoadingButton'

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
            showToast.success('logged in successfully');
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

    function goToSignup() {
        navigate('/signUp')
    }

    return (
        <div className='Login'>
            <div className='auth-wrapper'>
                <div className='auth-header'>
                    <h1 className='auth-title'>Vacation Management Project - Yoav Guterman</h1>
                    <p className='auth-description'>
                        Discover and manage exciting vacation destinations around the world.
                        Track your favorite getaways and never miss an opportunity for your dream vacation.
                    </p>
                </div>

                <div className='auth-content'>
                    <div className='form-container'>
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

                            {isLoading ?
                                <LoadingButton message={'Logging in...'} /> :
                                <button
                                    type="submit"
                                >
                                    Login
                                </button>
                            }
                        </form>

                        <h6>Don't have an account? sign in here</h6>
                        <button
                            onClick={goToSignup}
                            className="btn btn-link">
                            signup
                        </button>
                    </div>
                </div>

                <div className='auth-footer'>
                    &copy; {new Date().getFullYear()} Vacation Management System - Yoav Guterman. All rights reserved.
                </div>
            </div>
        </div>
    )
}