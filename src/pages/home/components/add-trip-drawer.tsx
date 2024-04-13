import { Button } from '@/components/ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'

import OdometerInput from './odometer-input';
import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import DirectionsMap from './directions-map';
import TripForm from './trip-form';
import { Trip } from '../types/Trip';

function AddTripDrawer() {
    const [step, setStep] = useState(0)
    const [trip, setTrip] = useState<Trip>()
    const steps: Map<number,
        {
            title: string,
            description: string,
            disabled: boolean,
            element: JSX.Element
        }> = useMemo(() => {
            return new Map([
                [0, {
                    title: "Current Odometer",
                    description: "Set your starting odometer value.",
                    disabled: false,
                    element: <OdometerInput />
                }],
                [1, {
                    title: "Add trip",
                    description: "Enter where the trip is from and to",
                    disabled: trip === undefined || trip.origin === undefined || trip.destination === undefined,
                    element: <TripForm setTrip={setTrip} />,
                }],
                [2, {
                    title: "Pick route",
                    description: "This is the route the distance and time will be calculated from.",
                    disabled: false,
                    element: <DirectionsMap trip={trip} />,
                }],
            ])
        }, [trip]
        )

    const nextStep = () => {
        setStep((prev) => prev + 1)
    }

    const prevStep = () => {
        setStep((prev) => prev - 1)
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button><Plus /> Add trip</Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-md">
                    <DrawerHeader className='px-0'>
                        <DrawerTitle>{steps.get(step)?.title}</DrawerTitle>
                        <DrawerDescription>{steps.get(step)?.description}</DrawerDescription>
                    </DrawerHeader>
                    {steps.get(step)?.element}
                    <DrawerFooter className='px-0'>
                        {
                            step === steps.size - 1 ?
                                <DrawerClose asChild>
                                    <Button>Add trip</Button>
                                </DrawerClose>
                                :
                                <Button onClick={nextStep} disabled={steps.get(step)?.disabled}>Next</Button>
                        }
                        {
                            step > 0 ? <Button variant="outline" onClick={prevStep}>Previous</Button> :
                                <DrawerClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DrawerClose>
                        }
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default AddTripDrawer