import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useRef } from 'react'

type DirectionsMapProps = {
    directions: google.maps.DirectionsResult
    routeIndex: number
}

export default function RouteMap({ directions, routeIndex }: DirectionsMapProps) {
    const map = useMap();
    const routesLibrary = useMapsLibrary('routes');
    const directionsRendererRef = useRef<google.maps.DirectionsRenderer>();

    // Initialize directions service and renderer
    useEffect(() => {
        if (!routesLibrary || !map) return;
        if (!directionsRendererRef.current) {
            directionsRendererRef.current = new routesLibrary.DirectionsRenderer({
                map,
                directions: directions,
                routeIndex: routeIndex,
                suppressMarkers: true,
                hideRouteList: true,
                suppressInfoWindows: true,
            });
        } else {
            directionsRendererRef.current.setDirections(directions);
            directionsRendererRef.current.setRouteIndex(routeIndex);
        }
    }, [routesLibrary, map, directions, routeIndex]);

    return null;
}
