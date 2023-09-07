import React from 'react'

interface LoginComponentProps {
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
    onLogin: (email: string, password: string) => void;
}

const Login: React.FC<LoginComponentProps> = ({ setIsLogin, onLogin }) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    // func to handle login process
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // validation
        if (!email || !password) {
            return window.alert("Please enter valid email & password!")
        }
        // Call the onLogin function with the email and password
        onLogin(email, password);
    };

    return (
        <div className='flex flex-col items-center gap-8'>
            <h2 className='text-lg font-semibold italic'>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="space-y-12 w-[70vw] md:w-[40vw]">
                    <div className="border-b border-gray-900/20 pb-12">

                        <div className="sm:col-span-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Email:
                            </label>
                            <div className="mt-2">
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder='test@mail.com'
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4 mt-2">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Password:
                            </label>
                            <div className="mt-2">
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder='*****'
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <button type="submit" className='mt-6 py-2 px-4 bg-rose-400 rounded-md cursor-pointer hover:opacity-80 transition'>Login</button>
                    </div>
                </div>
            </form>
            <div>
                Do you want to create an account? <span onClick={() => setIsLogin(false)} className='text-blue-500 cursor-pointer'>Signup!</span>
            </div>
        </div>
    )
}

export default Login