import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTriggerSimple, SelectValue } from '@/components/ui/select'
import { Minus, Plus } from 'lucide-react'
import { useState } from 'react';

export default function OdometerInput() {
    const vehiclesODO = {
        "CBA321": 1240,
        "ABC123": 2000
    }
    const [odometer, setOdometer] = useState(0);
    const [plate, setPlate] = useState<string | null>(null)

    const setVehicle = (value: string) => {
        setPlate(value)
        setOdometer(vehiclesODO[value as keyof typeof vehiclesODO])
    }

    const adjustOdometer = (amount: number) => {
        setOdometer((prev) => prev + amount)
    }

    const numberWithSpacers = (value: number, seperator: string = " "): string => {
        // Add , to every 3rd digit from the right
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, seperator);
    }
    return (
        <div className="p-4 pb-0">
            <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                    {plate ? numberWithSpacers(odometer) : '-'}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                    kilometers
                </div>
            </div>
            <div className="flex justify-center sm:justify-between mt-4 space-x-10">
                <div className="hidden sm:flex space-x-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 shrink-0 rounded-full"
                        onClick={() => adjustOdometer(-100)}
                        disabled={plate === null}
                    >
                        100
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 shrink-0 rounded-full"
                        onClick={() => adjustOdometer(-10)}
                        disabled={plate === null}
                    >
                        10
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 shrink-0 rounded-full"
                        onClick={() => adjustOdometer(-1)}
                        disabled={plate === null}
                    >
                        <Minus className="h-4 w-4" />
                        <span className="sr-only">Decrease</span>
                    </Button>
                </div>

                <Select onValueChange={setVehicle}>
                    <SelectTriggerSimple className="w-[180px] !m-0 max-w-[8rem]">
                        <SelectValue placeholder="Vehicle" />
                    </SelectTriggerSimple>
                    <SelectContent position="item-aligned">
                        <SelectGroup>
                            <SelectItem value="ABC123">ABC 123</SelectItem>
                            <SelectItem value="CBA321">CBA 321</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className="hidden sm:flex space-x-2 !m-0">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 shrink-0 rounded-full"
                        onClick={() => adjustOdometer(1)}
                        disabled={plate === null}
                    >
                        <Plus className="h-4 w-4" />
                        <span className="sr-only">Increase</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 shrink-0 rounded-full"
                        onClick={() => adjustOdometer(10)}
                        disabled={plate === null}
                    >
                        10
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 shrink-0 rounded-full"
                        onClick={() => adjustOdometer(100)}
                        disabled={plate === null}
                    >
                        100
                    </Button>
                </div>
            </div>
        </div>
    )
}