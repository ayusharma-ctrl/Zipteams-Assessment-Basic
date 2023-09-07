

const Navbar = ({ isAuthenticated, onLogout }: { isAuthenticated: boolean, onLogout: () => void }) => {
    return (
        <div className='flex justify-between items-center py-4 px-8 mb-16 bg-blue-200 border-b-2 shadow-md'>
            <h1 className='text-lg font-bold'>Donation</h1>
            {
                isAuthenticated &&
                <button
                    onClick={onLogout}
                    className='cursor-pointer bg-rose-400 px-2 py-1 rounded-md hover:opacity-80 transition text-sm'
                >
                    Logout
                </button>
            }
        </div>
    )
}

export default Navbar