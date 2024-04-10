import { Map, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react'

type DirectionsMapProps = {
    directions: google.maps.DirectionsResult
    routeIndex: number
}

export default function RouteMap({ directions, routeIndex }: DirectionsMapProps) {
    const map = useMap();
    const routesLibrary = useMapsLibrary('routes');
    const [directionsRenderer, setDirectionsRenderer] =
        useState<google.maps.DirectionsRenderer>();


    // Initialize directions service and renderer
    useEffect(() => {
        if (!routesLibrary || !map) return;
        setDirectionsRenderer(new routesLibrary.DirectionsRenderer({
            map,
            directions: directions,
            routeIndex: routeIndex,
            suppressMarkers: true,
            hideRouteList: true,
            suppressInfoWindows: true,
        }));
        return () => directionsRenderer?.setMap(null);
    }, [routesLibrary, map]);

    return null;
}