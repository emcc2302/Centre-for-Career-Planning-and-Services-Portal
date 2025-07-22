import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useResetPassword from '../../api/auth/useResetPassword';

function ResetPasswordPage() {
    const { resetToken } = useParams();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { loading, resetPassword } = useResetPassword();
    const [show, setShow] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await resetPassword(password, confirmPassword, resetToken);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 px-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Reset Password - CCPS</h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                        </label>
                        <input
                            id="password"
                            type={show ? "text" : "password"}
                            placeholder="Enter new password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type={show ? "text" : "password"}
                            placeholder="Confirm new password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="showPassword"
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            onChange={() => setShow(!show)}
                        />
                        <label htmlFor="showPassword" className="text-sm text-gray-600">
                            Show Password
                        </label>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2 px-4 rounded-md font-semibold text-white ${
                                loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ResetPasswordPage;
