'use client'
import "./styles.scss"
import {useForm} from 'react-hook-form'
import {useRouter} from 'next/navigation'

const LoginPage = () => {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()

    const onSubmit = (data) => {
        const hardcodedEmail = 'admin@example.com'
        const hardcodedPassword = 'admin123'

        if (data.email === hardcodedEmail && data.password === hardcodedPassword) {
            console.log('Auth successful')
            router.push('/') // перекидываем на главную
        } else {
            alert('Неверный логин или пароль')
        }
    }

    return (
        <div className='login-page'>
            <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                <h2 className='login-form_title'>Login to your Account</h2>
                <h4 className='register'>
                    Login Now. Don't have an account? <a href="/register">Register here</a>
                </h4>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <br/>
                    <input
                        className='styles-for-inputs'
                        type="email"
                        id="email"
                        placeholder="Type e-mail"
                        {...register("email", {required: "Email is required"})}
                    />
                    {errors.email && <p className="error">{errors.email.message}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <br/>
                    <input
                        className='styles-for-inputs'
                        type="password"
                        id="password"
                        placeholder="Type password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                    />
                    {errors.password && <p className="error">{errors.password.message}</p>}
                </div>

                <a className="forgot-password" href="/forgot">Forgot Password?</a>

                <button type="submit" className='styles-for-button'>Login</button>
            </form>
        </div>
    )
}

export default LoginPage
