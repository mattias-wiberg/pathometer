import { Skeleton } from '@/components/ui/skeleton';
import { APIProvider, Map, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react'
import exampleDirections from '@/assets/exmaple-route.json'

type DirectionsMapProps = {
    origin: string
    destination: string
}

function RenderRoute() {
    const map = useMap();
    const routesLibrary = useMapsLibrary('routes');
    const [directionsRenderer, setDirectionsRenderer] =
        useState<google.maps.DirectionsRenderer>();


    // Initialize directions service and renderer
    useEffect(() => {
        if (!routesLibrary || !map) return;
        setDirectionsRenderer(new routesLibrary.DirectionsRenderer({
            map,
            directions: exampleDirections as unknown as google.maps.DirectionsResult,
            routeIndex: 0,
            suppressMarkers: true,
            hideRouteList: true,
            suppressInfoWindows: true,
        }));
        return () => directionsRenderer?.setMap(null);
    }, [routesLibrary, map]);

    return null;
}

export default function RouteMap(/* { origin = 'Gothenburg, Sweden', destination = 'Stockholm, Sweden' }: DirectionsMapProps */) {
    return (
        <>
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                <Map disableDefaultUI={true} mapId="afbad091e24bf165" className="w-full h-[200px]">
                    <RenderRoute />
                </Map>
            </APIProvider>

        </>
    )
}

/*
 
<iframe
hidden={loading}
onLoad={() => setLoading(false)}
width="100%"
height="200"
className="rounded-lg"
src={"https://www.google.com/maps/embed/v1/directions?key=" +
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY +
    "&origin=" + origin + "&destination=" + destination}
/>
*/