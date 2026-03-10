"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { MapPin, Users, ChevronLeft, ChevronRight, X, Loader2, Github, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { SubmissionDetail } from "@/components/submissions/submission-detail";
import { useRouter } from "next/navigation";

type MapSubmission = {
    id: string;
    appName: string;
    teamName: string;
    mosqueName: string;
    techStack: string[];
    featureImage: string;
    latitude: number;
    longitude: number;
    gitUrl: string | null;
    siteUrl: string | null;
};

interface AppSubmission {
    id: string;
    appName: string;
    description: string;
    teamName: string;
    teamMembers: string[];
    mosqueName: string;
    latitude: number;
    longitude: number;
    techStack: string[];
    featureImage: string;
    gitUrl: string | null;
    siteUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
}

const CARTO_DARK_STYLE = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

// Custom neon marker element
function createMarkerEl(active = false): HTMLDivElement {
    const el = document.createElement("div");
    el.className = "kd-marker";
    el.style.cssText = `
        width: ${active ? "28px" : "22px"};
        height: ${active ? "42px" : "33px"};
        cursor: pointer;
        transition: all 0.2s ease;
    `;
    el.innerHTML = `
        <svg viewBox="0 0 24 36" width="100%" height="100%" style="filter: drop-shadow(0 0 ${active ? "14px" : "8px"} rgba(57,255,20,${active ? "1" : "0.7"}));">
            <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="#39FF14"/>
            <circle cx="12" cy="12" r="4" fill="#050505"/>
        </svg>
    `;
    return el;
}

export default function MapView() {
    const router = useRouter();
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const markersRef = useRef<Record<string, maplibregl.Marker>>({});
    const markerElsRef = useRef<Record<string, HTMLDivElement>>({});

    const [submissions, setSubmissions] = useState<MapSubmission[]>([]);
    const [loading, setLoading] = useState(true);
    const [introPhase, setIntroPhase] = useState<"init" | "text1" | "text2" | "text3" | "text4" | "flying" | "done">("init");
    const [panelOpen, setPanelOpen] = useState(false);
    const [activeId, setActiveId] = useState<string | null>(null);

    // Dialog State
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedSubmission, setSelectedSubmission] = useState<AppSubmission | null>(null);
    const [loadingDetail, setLoadingDetail] = useState(false);

    const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

    // Activate a marker (visually)
    const setActiveMarker = useCallback((id: string | null) => {
        // Reset all markers to default
        Object.entries(markerElsRef.current).forEach(([mid, el]) => {
            el.style.width = "22px";
            el.style.height = "33px";
            const svg = el.querySelector("svg");
            if (svg) svg.style.filter = "drop-shadow(0 0 8px rgba(57,255,20,0.7))";
        });
        // Activate the selected one
        if (id && markerElsRef.current[id]) {
            const el = markerElsRef.current[id];
            el.style.width = "28px";
            el.style.height = "42px";
            const svg = el.querySelector("svg");
            if (svg) svg.style.filter = "drop-shadow(0 0 14px rgba(57,255,20,1))";
        }
        setActiveId(id);
    }, []);

    // Fetch submissions
    useEffect(() => {
        async function fetchSubmissions() {
            try {
                const res = await fetch("/api/submissions");
                const json = await res.json();
                if (json.data) {
                    setSubmissions(json.data);
                }
            } catch (err) {
                console.error("Failed to fetch map data", err);
            } finally {
                setLoading(false);
            }
        }
        fetchSubmissions();
    }, []);

    // Intro animation sequence
    useEffect(() => {
        const t1 = setTimeout(() => setIntroPhase("text1"), 300);
        const t2 = setTimeout(() => setIntroPhase("text2"), 1100);
        const t3 = setTimeout(() => setIntroPhase("text3"), 1900);
        const t4 = setTimeout(() => setIntroPhase("text4"), 2700);
        const t5 = setTimeout(() => {
            setIntroPhase("flying");
            if (mapRef.current) {
                mapRef.current.flyTo({
                    center: [101.6869, 3.1390],
                    zoom: 11,
                    pitch: 50,
                    bearing: -10,
                    duration: 4000,
                    essential: true,
                    curve: 1.4,
                    speed: 0.6,
                });

                // Set done specifically after fly transition finishes
                mapRef.current.once("moveend", () => {
                    setIntroPhase("done");
                    setPanelOpen(true); // Open panel after landing

                    // Re-enable interactions once landed
                    if (mapRef.current) {
                        const map = mapRef.current;
                        map.dragPan.enable();
                        map.scrollZoom.enable();
                        map.boxZoom.enable();
                        map.dragRotate.enable();
                        map.keyboard.enable();
                        map.doubleClickZoom.enable();
                        map.touchZoomRotate.enable();
                    }
                });
            }
        }, 3600);

        return () => {
            clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5);
        };
    }, []);

    // Init MapLibre GL map
    useEffect(() => {
        if (!mapContainerRef.current || mapRef.current) return;

        const map = new maplibregl.Map({
            container: mapContainerRef.current,
            style: CARTO_DARK_STYLE,
            center: [101.35, 3.00], // Start at Straits of Malacca / Port Klang
            zoom: 7,
            pitch: 20,
            bearing: -40,
            interactive: false, // Initially locked during animation
        });

        // Add event listeners for dragging fade effect
        map.on("movestart", () => {
            mapContainerRef.current?.classList.add("map-dragging");
        });
        map.on("moveend", () => {
            mapContainerRef.current?.classList.remove("map-dragging");
        });

        map.addControl(new maplibregl.NavigationControl({ showCompass: true }), "bottom-right");
        map.addControl(new maplibregl.ScaleControl(), "bottom-left");

        mapRef.current = map;

        return () => {
            mapRef.current = null;
            map.remove();
        };
    }, []);

    // Add markers when submissions load
    useEffect(() => {
        const map = mapRef.current;
        if (!map || submissions.length === 0) return;

        const addMarkers = () => {
            // Clear old markers
            Object.values(markersRef.current).forEach(m => m.remove());
            markersRef.current = {};
            markerElsRef.current = {};

            submissions.forEach((sub) => {
                const el = createMarkerEl(false);
                markerElsRef.current[sub.id] = el;

                const popup = new maplibregl.Popup({
                    offset: [0, -36],
                    closeButton: false,
                    className: "kd-popup",
                    maxWidth: "200px",
                })
                    .setHTML(`
                        <div style="background:#111111;border:1px solid #222222;border-radius:8px;padding:8px 12px;color:white;font-family:sans-serif;">
                            <div style="color:#39FF14;font-weight:700;font-size:11px;margin-bottom:2px;">${sub.appName}</div>
                            <div style="color:#666666;font-size:10px;">${sub.mosqueName}</div>
                        </div>
                    `);

                const marker = new maplibregl.Marker({ element: el, anchor: "bottom" })
                    .setLngLat([sub.longitude, sub.latitude])
                    .setPopup(popup)
                    .addTo(map);

                el.addEventListener("click", () => handleMarkerClick(sub.id));
                el.addEventListener("mouseenter", () => marker.getPopup()?.addTo(map));
                el.addEventListener("mouseleave", () => marker.getPopup()?.remove());

                markersRef.current[sub.id] = marker;
            });
        };

        if (map.isStyleLoaded()) {
            addMarkers();
        } else {
            map.on("load", addMarkers);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submissions]);

    const flyToSubmission = useCallback((lat: number, lng: number) => {
        mapRef.current?.flyTo({
            center: [lng, lat],
            zoom: 14,
            pitch: 50,
            bearing: -10,
            duration: 1400,
            essential: true,
        });
    }, []);

    const handleMarkerClick = (id: string) => {
        const sub = submissions.find(s => s.id === id);
        if (!sub) return;

        setActiveMarker(id);
        setPanelOpen(true);
        flyToSubmission(sub.latitude, sub.longitude);

        // Scroll card into view
        setTimeout(() => {
            cardRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 400);
    };

    const handleCardClick = async (id: string) => {
        const sub = submissions.find(s => s.id === id);
        if (!sub) return;

        const isDesktop = window.innerWidth >= 640;
        setActiveMarker(id);
        flyToSubmission(sub.latitude, sub.longitude);

        if (!isDesktop) {
            router.push(`/submission/${id}`);
            return;
        }

        setDialogOpen(true);
        setLoadingDetail(true);
        setSelectedSubmission(null);

        try {
            const res = await fetch(`/api/submissions/${id}`);
            const json = await res.json();
            if (json.data) setSelectedSubmission(json.data);
        } catch (err) {
            console.error("Failed to fetch submission details:", err);
        } finally {
            setLoadingDetail(false);
        }
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-[#050505]">
            {/* Fullscreen Intro Cinematic Overlay */}
            <div className={cn(
                "absolute inset-0 z-[2000] bg-[#050505] flex items-center justify-center transition-opacity duration-1000",
                introPhase === "flying" || introPhase === "done" ? "opacity-0 pointer-events-none" : "opacity-100"
            )}>
                <div className="relative flex items-center justify-center font-heading text-primary text-3xl sm:text-5xl md:text-7xl tracking-widest uppercase">
                    <span className={cn("absolute transition-all duration-300 ease-out", introPhase === "text1" ? "opacity-100 scale-100" : "opacity-0 scale-90 blur-sm")}>Ramadhan</span>
                    <span className={cn("absolute transition-all duration-300 ease-out", introPhase === "text2" ? "opacity-100 scale-100" : "opacity-0 scale-90 blur-sm")}>Tiba</span>
                    <span className={cn("absolute transition-all duration-300 ease-out", introPhase === "text3" ? "opacity-100 scale-100" : "opacity-0 scale-90 blur-sm")}>Ramadhan</span>
                    <span className={cn("absolute transition-all duration-300 ease-out", introPhase === "text4" ? "opacity-100 scale-100" : "opacity-0 scale-90 blur-sm")}>Tiba</span>
                </div>
            </div>

            {/* MapLibre GL container */}
            <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" />

            {/* Fog of War Edge Blur */}
            <div
                className="pointer-events-none absolute inset-0 z-[10]"
                style={{
                    boxShadow: "inset 0 0 250px rgba(5,5,5,1)",
                    backdropFilter: "blur(24px)",
                    WebkitMaskImage: "radial-gradient(ellipse at 40% 50%, transparent 20%, black 80%)",
                    maskImage: "radial-gradient(ellipse at 40% 50%, transparent 20%, black 80%)",
                }}
            />

            {/* Custom popup / marker styles injected via global style tag */}
            <style>{`
                .map-dragging .kd-marker { opacity: 0 !important; pointer-events: none !important; transition: opacity 0.15s ease-out !important; }
                .kd-popup .maplibregl-popup-content { background: transparent !important; padding: 0 !important; box-shadow: none !important; }
                .kd-popup .maplibregl-popup-tip { display: none !important; }
                .maplibregl-ctrl-bottom-right { bottom: 24px !important; right: 16px !important; }
                .maplibregl-ctrl-bottom-left { bottom: 8px !important; left: 56px !important; }
                .maplibregl-ctrl-attrib { background: rgba(5,5,5,0.7) !important; color: #333 !important; font-size: 9px !important; }
                .maplibregl-ctrl-group { background: #111111 !important; border: 1px solid #222222 !important; border-radius: 8px !important; overflow: hidden !important; }
                .maplibregl-ctrl-group button { background: #111111 !important; border-color: #222222 !important; }
                .maplibregl-ctrl-group button:hover { background: rgba(57,255,20,0.1) !important; }
                .maplibregl-ctrl-icon { filter: invert(1) sepia(1) saturate(5) hue-rotate(60deg) !important; }
                .maplibregl-ctrl-scale { background: rgba(5,5,5,0.7) !important; border-color: #333 !important; color: #555 !important; font-size: 9px !important; }
            `}</style>

            {/* Loading overlay - only for pure map initialization behind intro overlay */}
            {loading && introPhase !== "done" && introPhase !== "flying" && (
                <div className="absolute inset-0 z-[100] flex items-center justify-center bg-[#050505] opacity-0 pointer-events-none" />
            )}

            {/* Floating Footer Logos */}
            <div className={cn(
                "absolute bottom-6 left-1/2 -translate-x-1/2 z-[400] flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-[10px] sm:text-xs text-[#888] font-bold tracking-wider uppercase transition-all duration-1000",
                introPhase === "done" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
            )}>
                <div className="flex items-center gap-2 bg-[#050505]/95 backdrop-blur-md px-4 py-2 rounded-full border border-[#222] shadow-[0_0_15px_rgba(57,255,20,0.1)] hover:border-primary/50 transition-colors">
                    <span>KD Project</span>
                    <Image src="/logos/kdlogo.png" alt="KD Logo" width={20} height={20} className="object-contain" />
                </div>
                <div className="flex items-center gap-3 bg-[#050505]/95 backdrop-blur-md px-4 py-2.5 rounded-full border border-[#222] shadow-[0_0_15px_rgba(57,255,20,0.1)] hover:border-primary/50 transition-colors">
                    <span>Supported By</span>
                    <Image src="/logos/lovable.png" alt="Lovable Logo" width={70} height={20} className="object-contain" />
                    <span className="w-px h-3 bg-[#444]" />
                    <Image src="/logos/google.png" alt="Google Logo" width={60} height={18} className="object-contain" />
                </div>
            </div>

            {/* Floating Submissions Panel */}
            <div
                className={cn(
                    "absolute top-4 bottom-4 right-4 z-[500] transition-transform duration-300 ease-in-out rounded-xl shadow-2xl flex flex-col",
                    panelOpen ? "translate-x-0" : "translate-x-[calc(100%+24px)]"
                )}
                style={{ width: "25vw", minWidth: "320px", maxWidth: "450px" }}
            >
                {/* Panel Toggle Tab */}
                <button
                    onClick={() => setPanelOpen(v => !v)}
                    className="absolute -left-10 top-1/2 -translate-y-1/2 w-10 h-28 bg-[#111111]/90 backdrop-blur-sm border border-[#252525] border-r-0 rounded-l-lg flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
                    aria-label="Toggle submissions panel"
                >
                    {panelOpen ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                </button>

                {/* Panel */}
                <div className="w-full h-full bg-[#080808]/95 backdrop-blur-xl border border-[#1a1a1a] rounded-xl flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-5 border-b border-[#151515] shrink-0">
                        <div>
                            <h2 className="font-heading text-xs text-white tracking-[0.2em] uppercase">Submissions</h2>
                            <p className="text-[11px] text-[#555] mt-1">{submissions.length} apps built for mosques</p>
                        </div>
                        <button onClick={() => setPanelOpen(false)} className="text-[#555] hover:text-white transition-colors sm:hidden">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* List */}
                    <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {loading ? (
                            <div className="flex items-center justify-center h-full">
                                <Loader2 className="h-6 w-6 text-primary animate-spin" />
                            </div>
                        ) : submissions.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center">
                                <MapPin className="h-10 w-10 text-[#333333]" />
                                <p className="text-base text-[#555555]">No submissions yet.</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2 p-3">
                                {submissions.map((sub) => (
                                    <div
                                        key={sub.id}
                                        ref={el => { cardRefs.current[sub.id] = el; }}
                                        onClick={() => handleCardClick(sub.id)}
                                        className={cn(
                                            "group flex gap-4 p-4 lg:p-5 cursor-pointer transition-all duration-150 rounded-2xl overflow-hidden",
                                            activeId === sub.id
                                                ? "bg-primary/10 border-l-4 border-l-primary"
                                                : "hover:bg-[#111111] border-l-4 border-l-transparent"
                                        )}
                                    >
                                        {/* Thumbnail */}
                                        <div className="relative w-24 h-24 lg:w-28 lg:h-28 shrink-0 rounded-[8px] overflow-hidden bg-[#151515]">
                                            {sub.featureImage ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={sub.featureImage}
                                                    alt={sub.appName}
                                                    className="w-full h-full object-cover rounded-[8px] transition-transform duration-300 group-hover:scale-105"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).style.display = "none";
                                                    }}
                                                />
                                            ) : null}
                                            {/* Fallback icon always behind */}
                                            <div className="absolute inset-0 flex items-center justify-center -z-10">
                                                <MapPin className="h-6 w-6 text-[#333333]" />
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div className="flex flex-col gap-1.5 min-w-0 flex-1 justify-center">
                                            <span className={cn(
                                                "font-heading text-xs lg:text-sm leading-snug truncate transition-colors",
                                                activeId === sub.id ? "text-primary" : "text-white group-hover:text-primary"
                                            )}>
                                                {sub.appName}
                                            </span>
                                            <span className="flex items-center gap-1.5 text-xs text-[#666] truncate font-semibold font-sans">
                                                <Users className="h-3.5 w-3.5 shrink-0" />
                                                {sub.teamName}
                                            </span>
                                            <span className="flex items-center gap-1.5 text-xs text-primary/70 truncate font-semibold font-sans">
                                                <MapPin className="h-3.5 w-3.5 shrink-0" />
                                                {sub.mosqueName}
                                            </span>
                                            <div className="flex flex-wrap gap-1.5 mt-1">
                                                {sub.techStack.slice(0, 2).map(tech => (
                                                    <Badge
                                                        key={tech}
                                                        variant="outline"
                                                        className="rounded-md border-primary/30 bg-primary/5 text-[10px] text-primary px-1.5 py-0 h-5"
                                                    >
                                                        {tech}
                                                    </Badge>
                                                ))}
                                                {sub.techStack.length > 2 && (
                                                    <span className="text-[10px] text-[#555] self-center font-bold">+{sub.techStack.length - 2}</span>
                                                )}
                                            </div>
                                            {(sub.gitUrl || sub.siteUrl) && (
                                                <div className="flex gap-2 mt-1">
                                                    {sub.gitUrl && (
                                                        <a
                                                            href={sub.gitUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={e => e.stopPropagation()}
                                                            className="flex items-center gap-1 text-[10px] font-bold text-[#888] hover:text-white transition-colors bg-[#1a1a1a] hover:bg-[#252525] px-2 py-1 rounded-sm border border-[#222]"
                                                        >
                                                            <Github className="w-3 h-3" />
                                                            Git
                                                        </a>
                                                    )}
                                                    {sub.siteUrl && (
                                                        <a
                                                            href={sub.siteUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={e => e.stopPropagation()}
                                                            className="flex items-center gap-1 text-[10px] font-bold text-primary/80 hover:text-primary transition-colors bg-primary/5 hover:bg-primary/10 px-2 py-1 rounded-sm border border-primary/20"
                                                        >
                                                            <Globe className="w-3 h-3" />
                                                            View
                                                        </a>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Detail Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="p-0 border-[#222222] bg-[#111111] w-full max-w-[95vw] sm:max-w-[800px] md:max-w-[800px] overflow-hidden gap-0">
                    <DialogTitle className="sr-only">Submission Details</DialogTitle>
                    <DialogDescription className="sr-only">Detailed view of the selected application submission</DialogDescription>
                    {loadingDetail ? (
                        <div className="flex items-center justify-center min-h-[400px]">
                            <div className="flex flex-col items-center gap-3">
                                <Loader2 className="h-6 w-6 text-primary animate-spin" />
                                <span className="text-primary font-heading text-[10px] animate-pulse">Loading...</span>
                            </div>
                        </div>
                    ) : selectedSubmission ? (
                        <SubmissionDetail submission={selectedSubmission} />
                    ) : (
                        <div className="flex items-center justify-center min-h-[400px] text-destructive text-sm">
                            Failed to load submission details.
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
