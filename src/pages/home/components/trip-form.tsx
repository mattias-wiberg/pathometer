import { useState, useMemo, Dispatch, SetStateAction } from 'react';
import AddressInput from './address-input';
import { Trip } from '../types/Trip';
//{ setTrip }: { setTrip: Dispatch<SetStateAction<Trip | undefined>> }
interface TripFormProps {
    setTrip: Dispatch<SetStateAction<Trip | undefined>>
}
function TripForm({ setTrip }: TripFormProps) {
    const [origin, setOrigin] = useState<google.maps.Place>()
    const [destination, setDestination] = useState<google.maps.Place>()

    useMemo(() => {
        setTrip({ origin, destination })
        console.log('trip', { origin, destination })
        console.log('disabling button', origin !== undefined && destination !== undefined)
    }, [origin, destination, setTrip])

    return (
        <div className='flex flex-col space-y-2'>
            <AddressInput onPlace={setOrigin} label="From" inputIcon="arrow-up-from-dot" />
            <AddressInput onPlace={setDestination} label="To" inputIcon="arrow-down-to-dot" />
        </div>
    )
    //<AddressInput setPlace = { setDestination } />
}

export default TripForm