import React, { useEffect } from 'react'
import axios from 'axios'
import Donate from './Donate';
import moment from 'moment';


type Donation = {
    _id: string;
    description: string;
    user: string;
    amount: number;
    createdAt: string;
    __v: number;
};

type ArrayType = Donation[];


const Dashboard = () => {
    const [specialMessage, setSpecialMessage] = React.useState("");
    const [donationsCount, setDonationsCount] = React.useState(0);
    const [pastDonations, setPastDonations] = React.useState<ArrayType>([]);
    // fetch special message
    const getSpecialMessage = async () => {
        try {
            const { data } = await axios.get('/api/donate/thankyou');
            if (data.success) {
                setSpecialMessage(data.message)
                setDonationsCount(data.totalDonations)
            }
        } catch (error) {
            console.log(error)
        }
    }
    // fetch past donations data by a user
    const getPastDonations = async () => {
        try {
            const { data } = await axios.get('/api/donate/donations');
            if (data.success) {
                setPastDonations(data.donation)
            }
        } catch (error) {
            console.log(error)
        }
    }
    // api call to add new donation to database
    const onDonate = async (description: string, amount: number) => {
        try {
            const { data } = await axios.post("/api/donate/donations",
                { description, amount },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            if (data.success) {
                window.alert(data.message);
                getPastDonations();
            } else {
                console.log(data.message)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getSpecialMessage()
        getPastDonations()
    }, [])

    return (
        <div className='flex flex-col gap-8'>
            <div className='text-center bg-rose-100 py-2 italic text-sm'>
                {specialMessage}
            </div>
            <div className='px-4'>
                Want to donate?
                <div className='flex justify-center'>
                    <Donate onDonate={onDonate} />
                </div>
            </div>
            <div className='px-4'>
                Your Past Donations: {donationsCount}
                <div className='mt-4'>
                    <ul>
                        {
                            pastDonations && pastDonations.length > 0 && pastDonations.map((donation, index) =>
                                <li key={index}>
                                    <div className='flex justify-between items-center flex-wrap'>
                                        <span>{donation.description}</span>
                                        <span>{donation.amount}</span>
                                        <span>{moment(donation.createdAt).format('LLL')}</span>
                                    </div>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Dashboard