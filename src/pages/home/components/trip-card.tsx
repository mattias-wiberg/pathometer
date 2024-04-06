import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronDown, ChevronUp, MoveRight } from 'lucide-react'
import { useState } from 'react'
import DirectionsMap from './directions-map'
import RouteMap from './route-map'

type TripCardProps = {
    from: string
    to: string
    distance: number
}

function TripCard({ from, to, distance }: TripCardProps) {
    const [expanded, setExpanded] = useState(false);

    return (
        <Card>
            <CardHeader
                className="flex flex-row items-center justify-between space-y-0 pb-2 cursor-pointer"
                onClick={() => setExpanded((prev) => !prev)}
            >
                <CardTitle className="text-sm font-medium">
                    <div className="flex flex-row space-x-2">
                        <span>{from}</span>
                        <MoveRight />
                        <span>{to}</span>
                    </div>
                </CardTitle>
                <div className="flex flex-row items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{distance} km</span>
                    {
                        expanded ?
                            <ChevronUp className="h-4 w-4 text-muted-foreground all-transitions" />
                            : <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    }
                </div>
            </CardHeader>
            <CardContent>
                {
                    expanded && <RouteMap origin='Gothenburg+Sweden' destination='Stockholm+Sweden' />
                }
            </CardContent>
        </Card>
    )
}

export default TripCard