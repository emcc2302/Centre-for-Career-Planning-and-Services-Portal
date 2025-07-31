import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext.jsx';
import useForgotPassword from '../../api/auth/useForgotPassword.js';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { setShowForgotPassword } = useAppContext();

    const { loading, forgotPassword } = useForgotPassword();

    const clickOnBackToLogin = () => {
        setShowForgotPassword(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await forgotPassword(email);
        setIsSubmitted(true);
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            return document.body.style.overflow = 'unset'
        }
    }, [])

    return (
        <section className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
            <form className='relative bg-white p-8 rounded-xl' key={isSubmitted} onSubmit={handleSubmit}>
                <h1 className='text-center text-2xl font-bold mb-1.5'>Forgot Password</h1>
                {!isSubmitted ?
                    <div>
                        <p className='text-center mb-5'>Enter your email and we'll send you a link to reset your password</p>

                        <div>
                            <label className="label p-2">
                                <span className='text-base label-text'>Email</span>
                            </label>
                            <input type="text" placeholder="Enter email" className="w-full input input-bordered h-10"
                                value={email} onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button disabled={loading} className="btn  btn-block btn-sm mt-2 bg-emerald-400 hover:bg-emerald-600 text-white">
                            {loading ? <span className='loading loading-spinner'></span> : 'Send Reset Link'}
                        </button>
                    </div>

                    :

                    <>
                        <div className='flex flex-col items-center justify-center gap-2 mt-3'>
                            <p className='text-sm sm:text-base w-96 text-center text-slate-500'>If account exists for {email}, you will receive a password reset link shortly</p>
                        </div>
                    </>
                }

                <p onClick={clickOnBackToLogin} className=' text-emerald-800 hover:underline hover:text-emerald-600 mt-2 inline-block cursor-pointer'>
                    Back to Login
                </p>

                <div onClick={() => setShowForgotPassword(false)} className='absolute top-5 right-5 cursor-pointer text-gray-500'>
                    X
                </div>

            </form>
        </section>
    )
}

export default ForgotPassword