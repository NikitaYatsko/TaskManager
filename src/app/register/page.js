'use client';
import {useForm} from "react-hook-form";
import "./styles.scss";

export default function RegisterPage() {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors, isSubmitting, isSubmitSuccessful},
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Registration error");
            }

            const result = await response.json();
            console.log(result);

            reset(); // Clear form
        } catch (error) {
            console.error(error);
        }
    };

    const password = watch("password");

    return (
        <div className="register-page">
            <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="register-form_title">Registration</h2>

                <div className="form-group">
                    <label>Username</label>
                    <input
                        {...register("username", {required: "Enter your username"})}
                        type="text"
                        placeholder="Enter your username"
                    />
                    {errors.username && <span className="error">{errors.username.message}</span>}
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        {...register("email", {
                            required: "Enter your email",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Invalid email address",
                            },
                        })}
                        type="email"
                        placeholder="example@mail.com"
                    />
                    {errors.email && <span className="error">{errors.email.message}</span>}
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        {...register("password", {
                            required: "Enter your password",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                        type="password"
                        placeholder="Enter your password"
                    />
                    {errors.password && <span className="error">{errors.password.message}</span>}
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                        {...register("confirmPassword", {
                            required: "Confirm your password",
                            validate: (value) => value === password || "Passwords do not match",
                        })}
                        type="password"
                        placeholder="Repeat your password"
                    />
                    {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
                </div>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Registering..." : "Register"}
                </button>

                {isSubmitSuccessful && <p className="success-message">Registration successful!</p>}
                <div className='login'>
                    <p>Already have an account? <a href="/login">Login Here</a></p>
                </div>
            </form>
        </div>
    );
}
