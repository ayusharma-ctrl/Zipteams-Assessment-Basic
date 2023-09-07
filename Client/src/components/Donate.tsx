import React from 'react'

const Donate = ({ onDonate }: { onDonate: (description: string, amount: number) => void }) => {
    const [description, setDescription] = React.useState('');
    const [amount, setAmount] = React.useState('');
    // func to handle add/create donation process
    const handleDonate = (e: React.FormEvent) => {
        e.preventDefault();
        // validation
        if (!description || !amount) {
            return window.alert("Please enter valid email & password!")
        }
        // call api
        onDonate(description, Number(amount))
    };

    return (
        <form onSubmit={handleDonate}>
            <div className="space-y-12 w-[70vw] md:w-[40vw] mt-2">
                <div className="border-b border-gray-900/20 pb-12">

                    <div className="sm:col-span-4">
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Purpose:
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                placeholder='For Education'
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-4 mt-2">
                        <label
                            htmlFor="amount"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Amount:
                        </label>
                        <div className="mt-2">
                            <input
                                type="number"
                                id="amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                                placeholder='50000'
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <button type="submit" className='mt-6 py-2 px-4 bg-rose-400 rounded-md cursor-pointer hover:opacity-80 transition'>Donate</button>
                </div>
            </div>
        </form>
    )
}

export default Donate