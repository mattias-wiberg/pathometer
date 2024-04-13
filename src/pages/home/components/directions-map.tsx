import { Button } from '@/components/ui/button';
import { Map, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react'
import { Trip } from '../types/Trip';


function DirectionsMap({ trip }: { trip: Trip | undefined }) {
    const [routeIndex, setRouteIndex] = useState(0);
    const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);

    if (!trip) return null;

    return (
        <>
            <div className='flex flex-col m-2 space-y-2'>
                {routes.map((route, index) => (
                    <Button
                        variant={index === routeIndex ? "outline" : "ghost"}
                        key={index}
                        value={index.toString()}
                        className='w-full items-center justify-between border-sky-600'
                        onClick={() => setRouteIndex(index)}
                    >
                        <span>{route.summary}</span>
                        <span className='text-xs text-muted-foreground'>
                            {route.legs[0].distance?.text || '- km'}  ({route.legs[0].duration?.text || '- min'})
                        </span>
                    </Button>
                ))}
            </div>
            <Map disableDefaultUI={true} className="w-full h-[200px]">
                <Directions trip={trip} setRoutes={setRoutes} routeIndex={routeIndex} />
            </Map>
        </>
    )
}

type DirectionsProps = {
    trip: Trip
    setRoutes: (routes: google.maps.DirectionsRoute[]) => void
    routeIndex: number
}

function Directions({ trip: { origin, destination }, setRoutes, routeIndex }: DirectionsProps) {
    const map = useMap();
    const routesLibrary = useMapsLibrary('routes');
    const [directionsService, setDirectionsService] =
        useState<google.maps.DirectionsService>();
    const [directionsRenderer, setDirectionsRenderer] =
        useState<google.maps.DirectionsRenderer>();
    // Initialize directions service and renderer
    useEffect(() => {
        if (!routesLibrary || !map) return;
        setDirectionsService(new routesLibrary.DirectionsService());
        setDirectionsRenderer(new routesLibrary.DirectionsRenderer({
            map,
            suppressMarkers: true,
        }));
    }, [routesLibrary, map]);

    // Use directions service
    useEffect(() => {
        if (!directionsService || !directionsRenderer) return;

        directionsService
            .route({
                origin: origin || 'Berlin',
                destination: destination || 'Hamburg',
                travelMode: google.maps.TravelMode.DRIVING,
                provideRouteAlternatives: true
            })
            .then(response => {
                directionsRenderer.setDirections(response);
                setRoutes(response.routes);
            });

        return () => directionsRenderer.setMap(null);
    }, [directionsService, directionsRenderer, setRoutes, origin, destination]);

    // Update direction route
    useEffect(() => {
        if (!directionsRenderer) return;
        directionsRenderer.setRouteIndex(routeIndex);
    }, [routeIndex, directionsRenderer]);

    return null;
}

export default DirectionsMap