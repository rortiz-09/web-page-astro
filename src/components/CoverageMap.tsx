import { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

export default function CoverageMap() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

    useEffect(() => {
        if (!mapContainer.current) return;

        // Initialize Map (Centered on Ecuador)
        const map = L.map(mapContainer.current).setView([-1.8312, -78.1834], 7);

        // Add OpenStreetMap Tile Layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Custom Icon for Reitcom
        const icon = L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        // Click Handler
        map.on('click', (e) => {
            const { lat, lng } = e.latlng;
            setSelectedLocation({ lat, lng });

            // Remove existing markers
            map.eachLayer((layer) => {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });

            // Add new marker
            L.marker([lat, lng], { icon })
                .addTo(map)
                .bindPopup(`<b>Ubicación Seleccionada</b><br>Lat: ${lat.toFixed(4)}<br>Lng: ${lng.toFixed(4)}`)
                .openPopup();
        });

        // Cleanup
        return () => {
            map.remove();
        };
    }, []);

    return (
        <div className="w-full h-full relative group">
            <div
                ref={mapContainer}
                className="w-full h-full rounded-2xl z-0"
                style={{ isolation: 'isolate' }}
            />

            {selectedLocation && (
                <div className="absolute bottom-6 left-6 right-6 z-[1000] bg-surface/90 backdrop-blur-md border border-border p-4 rounded-2xl shadow-lg animate-fade-in-up">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Ubicación Seleccionada</p>
                            <div className="flex items-center gap-3 text-text-main font-mono text-sm">
                                <span>{selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}</span>
                            </div>
                        </div>
                        <span className="text-xs text-green-600 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full border border-green-200 dark:border-green-800 font-bold shadow-sm">
                            Cobertura Disponible
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
