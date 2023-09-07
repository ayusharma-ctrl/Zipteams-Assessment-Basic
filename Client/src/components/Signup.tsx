import React from 'react'

interface SignupComponentProps {
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
    onRegister: (name: string, email: string, password: string) => void;
}

const Signup: React.FC<SignupComponentProps> = ({ setIsLogin, onRegister }) => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    // function to handle signup process
    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        // validation
        if (!name || !email || !password || !confirmPassword) {
            return window.alert("Please enter valid email & password!")
        }

        if(password !== confirmPassword){
            return window.alert("New Password & Confirm Password should be same!")
        }
        // Call the onLogin function with the email and password
        onRegister(name, email, password);
    };

    return (
        <div className='flex flex-col items-center gap-8'>
            <h2 className='text-lg font-semibold italic'>Login</h2>
            <form onSubmit={handleSignup}>
                <div className="space-y-12 w-[70vw] md:w-[40vw]">
                    <div className="border-b border-gray-900/20 pb-12">

                        {/* Name */}
                        <div className="sm:col-span-4 mt-2">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Name:
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    placeholder='John Doe'
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="sm:col-span-4 mt-2">
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

                        {/* Password */}
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

                        {/* Confirm Password */}
                        <div className="sm:col-span-4 mt-2">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                               Confirm Password:
                            </label>
                            <div className="mt-2">
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    placeholder='*****'
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/* Submit button */}
                        <button type="submit" className='mt-6 py-2 px-4 bg-rose-400 rounded-md cursor-pointer hover:opacity-80 transition'>Register</button>
                    </div>
                </div>
            </form>
            <div>
                Aleady have an account? <span onClick={() => setIsLogin(true)} className='text-blue-500 cursor-pointer'>Login</span>
            </div>
        </div>
    )
}

export default Signup