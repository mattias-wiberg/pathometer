import { Button } from '@/components/ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import PlacesInput from './places-input';
import OdometerInput from './odometer-input';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import DirectionsMap from './directions-map';

function AddTripDrawer() {
    const [step, setStep] = useState(0)
    const steps: Map<number, { title: string, description: string, element: JSX.Element }> = new Map([
        [0, {
            title: "Current Odometer",
            description: "Set your starting odometer value.",
            element: <OdometerInput />
        }],
        [1, {
            title: "Add trip",
            description: "Enter the trip details",
            element: <PlacesInput />
        }],
        [2, {
            title: "Pick route",
            description: "This is the route the distance and time will be calculated from.",
            element: <DirectionsMap origin='Gothenburg, Sweden' destination='Stockholm, Sweden' />
        }],
    ])

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
                    <DrawerHeader>
                        <DrawerTitle>{steps.get(step)?.title}</DrawerTitle>
                        <DrawerDescription>{steps.get(step)?.description}</DrawerDescription>
                    </DrawerHeader>
                    {steps.get(step)?.element}
                    <DrawerFooter>
                        {
                            step === steps.size - 1 ?
                                <DrawerClose asChild>
                                    <Button>Add trip</Button>
                                </DrawerClose>
                                :
                                <Button onClick={nextStep}>Next</Button>
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