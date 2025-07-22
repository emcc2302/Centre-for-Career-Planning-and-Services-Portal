import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext.jsx';

import useLogin from '../../api/auth/useLogin.js';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { loading, login } = useLogin();
    const {setShowForgotPassword } = useAppContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    }

    const clickOnForgotPassword = () => {
        setShowForgotPassword(true);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-md">
                <h1 className="text-3xl font-bold text-center mb-6">Login CCPS
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                        <input 
                            type="email"
                            placeholder="Enter email"
                            className="w-full input input-bordered h-10"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            className="w-full input input-bordered h-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        
                        <div className="flex items-center mt-2">
                            <input
                                type="checkbox"
                                id="show-password"
                                className="w-4 h-4 mr-2"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                            />
                            <label htmlFor="show-password" className="text-sm text-gray-700">
                                Show Password
                            </label>
                        </div>

                    </div>
                    
                    <div className="text-right mb-4">
                        <p 
                            onClick={clickOnForgotPassword} className=' text-blue-400 hover:underline hover:text-blue-600 mt-2 inline-block cursor-pointer'
                        >
                            Forgot Password?
                        </p>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-block btn-sm bg-blue-500 hover:bg-blue-600 text-white"
                        disabled={loading}
                    >
                        {loading ? <span className="loading loading-spinner"></span> : "Login"}
                    </button>

                    <div className="text-center mt-4 text-sm">
                        Don’t have an account?{' '}
                        <Link to="/signup" className="text-blue-500 hover:underline">
                            Sign up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
