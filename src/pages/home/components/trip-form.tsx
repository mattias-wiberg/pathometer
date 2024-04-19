import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import AddressInput from './address-input';
import { Trip } from '../types/Trip';

interface TripFormProps {
    setTrip: Dispatch<SetStateAction<Trip | undefined>>
}

function TripForm({ setTrip }: TripFormProps) {
    const [origin, setOrigin] = useState<google.maps.Place>()
    const [destination, setDestination] = useState<google.maps.Place>()

    useEffect(() => {
        setTrip({ origin, destination })
    }, [origin, destination, setTrip])

    return (
        <div className='flex flex-col space-y-2'>
            <AddressInput onPlace={setOrigin} label="From" inputIcon="arrow-up-from-dot" />
            <AddressInput onPlace={setDestination} label="To" inputIcon="arrow-down-to-dot" />
        </div>
    )
}

export default TripForm
