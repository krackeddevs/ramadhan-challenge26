"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icon in Leaflet + Next.js
const customIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

function ChangeView({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, 13);
    }, [center, map]);
    return null;
}

interface MapPreviewProps {
    lat: number;
    lng: number;
}

export default function MapPreview({ lat, lng }: MapPreviewProps) {
    const position: [number, number] = [lat, lng];

    return (
        <div className="h-[200px] w-full rounded-md overflow-hidden border border-[#222222]">
            <MapContainer
                center={position}
                zoom={13}
                scrollWheelZoom={false}
                className="h-full w-full"
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ChangeView center={position} />
                <Marker position={position} icon={customIcon} />
            </MapContainer>
            <div className="absolute bottom-2 right-2 z-[1000] bg-black/80 px-2 py-1 rounded text-[10px] text-gray-400 border border-[#222222] pointer-events-none">
                Preview: {lat.toFixed(4)}, {lng.toFixed(4)}
            </div>
        </div>
    );
}
