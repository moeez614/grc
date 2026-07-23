import {
    MapContainer,
    TileLayer,
    Polyline,
    Marker,
    Tooltip,
} from "react-leaflet";


export default function RouteMap({ coordinates }) {

    if (!coordinates || coordinates.length === 0) {
        return <p>No route available.</p>;
    }


    const routeCoordinates = coordinates
        .map((point) => {

            const [lat, lng] = point
                .split(",")
                .map((v) => Number(v.trim()));

            return [lat, lng];

        })
        .filter(
            ([lat, lng]) =>
                !isNaN(lat) &&
                !isNaN(lng)
        );


    if (routeCoordinates.length === 0) {
        return <p>Invalid route coordinates.</p>;
    }


    return (

        <MapContainer

            center={routeCoordinates[0]}

            zoom={14}

            scrollWheelZoom={true}

            style={{
                width: "100%",
                height: "450px",
                borderRadius: "15px",
                overflow: "hidden"
            }}

        >

            <TileLayer

                attribution='&copy; OpenStreetMap contributors'

                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

            />


            {/* Running Route */}

            <Polyline

                positions={routeCoordinates}

                pathOptions={{
                    color:"#ED2974",
                    weight:5
                }}

            />


            {/* Start Point */}

            <Marker

                position={routeCoordinates[0]}

            >

                <Tooltip
                    permanent
                    direction="top"
                    offset={[0,-10]}
                >

                    🏁 Start Point

                </Tooltip>

            </Marker>



            {/* Finish Point */}

            <Marker

                position={
                    routeCoordinates[
                        routeCoordinates.length - 1
                    ]
                }

            >

                <Tooltip

                    permanent

                    direction="top"

                    offset={[0,-10]}

                >

                    🏆 Finish Point

                </Tooltip>

            </Marker>


        </MapContainer>

    );
}