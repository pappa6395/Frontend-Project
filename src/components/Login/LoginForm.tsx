import React, { useState } from 'react'
import { LoginFormProps } from '../../Utils/types';



const LoginForm: React.FC<LoginFormProps> = ({ 
    setShowLoginForm, 
    handleToggle, 
    handleSubmit, 
    isSignup,
    errors 
    }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        handleSubmit({ name, email, password, confirmPassword })
    }
    
  return (

    <div>
         <div 
            className='fixed inset-0 z-50 flex justify-center items-center
                min-h-screen bg-gray-600 bg-opacity-50'
                onClick={() => setShowLoginForm(false)}>
            <div 
                className='login-container mb-32 p-8 bg-green-50 rounded-lg 
                shadow-lg max-w-md mx-auto'
                onClick={(e) => e.stopPropagation()}>
                <h2 className='text-2xl font-semibold text-green-600 mb-6 text-center'>
                    {isSignup ? "Sign Up!" : "Welcome Back!"}
                </h2>
                <form className='space-y-4' onSubmit={onSubmit}>
                    {isSignup && (
                        <div>
                            <label 
                                htmlFor='name' 
                                className='font-semibold text-gray-500'
                                >Name:
                            </label>
                             <input 
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            className='w-full p-3 border border-green-300 
                            rounded-lg focus:outline-none focus:ring 
                            focus:ring-green-200'/>
                            {errors.name && <p className='text-red-500 text-xs'>{errors.name}</p>}
                        </div>
                    )}
                    <div>
                        <label 
                            htmlFor='email' 
                            className='font-semibold text-gray-500'
                            >Email:
                        </label>
                        <input 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className='w-full p-3 border border-green-300 
                            rounded-lg focus:outline-none focus:ring 
                            focus:ring-green-200'/>
                            {errors.email && <p className='text-red-500 text-xs'>{errors.email}</p>}
                    </div>
                    <div>
                        <label 
                            htmlFor='password' 
                            className='font-semibold text-gray-500'
                            >Password:
                        </label>
                        <input 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className='w-full p-3 border border-green-300 
                            rounded-lg focus:outline-none focus:ring 
                            focus:ring-green-200'/>
                            {errors.password && <p className='text-red-500 text-xs'>{errors.password}</p>}
                    </div>
                   
                    {isSignup && (
                        <div>
                            <label 
                                htmlFor='password' 
                                className='font-semibold text-gray-500'
                                >Confirm Password:
                            </label>
                             <input 
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => {setConfirmPassword(e.target.value)}}
                            placeholder="Confirm Password"
                            className='w-full p-3 border border-green-300 
                            rounded-lg focus:outline-none focus:ring 
                            focus:ring-green-200'/>
                            {errors.confirmPassword && <p className='text-red-500 text-xs'>{errors.confirmPassword}</p>}
                        </div>
                    )}
                    <button 
                        type="submit"
                        className='w-full bg-green-600 text-white py-3 
                        rounded-lg hover:bg-green-700 transition'
                        >{isSignup ? "Sign up" : "Login"}
                    </button>
                </form>
                <div>
                    {isSignup ? "Already have an account?" : "New user?"}{" "}
                    <button 
                        onClick={handleToggle} 
                        className='text-green-600 underline'>
                        {isSignup ? "Login Here" : "Sign up here"}
                    </button>
                </div>
            </div>
        </div>
    </div>

  )
}

export default LoginForm