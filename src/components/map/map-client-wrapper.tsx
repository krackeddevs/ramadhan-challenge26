"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const MapView = dynamic(() => import("@/components/map/map-view"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-[#050505]">
            <Loader2 className="h-8 w-8 text-primary animate-spin mb-3" />
            <span className="text-primary font-heading text-[10px] animate-pulse tracking-widest">LOADING MAP...</span>
        </div>
    ),
});

export function MapClientWrapper() {
    return <MapView />;
}
