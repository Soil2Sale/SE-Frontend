"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L, { LeafletMouseEvent, DragEndEvent } from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix broken default marker icons (webpack bundling issue with leaflet)
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)
  ._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface MapPickerProps {
  lat: number;
  lng: number;
  onChange: (lat: number, lng: number) => void;
}

// Flies to the given coordinates on initial mount (handles edit mode)
function FlyToOnMount({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    if (lat !== 0 && lng !== 0) {
      map.flyTo([lat, lng], 13, { animate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

// Handles map click → drops marker
function ClickHandler({
  onChange,
}: {
  onChange: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e: LeafletMouseEvent) {
      onChange(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

const INDIA_CENTER: [number, number] = [20.5937, 78.9629];

export default function MapPicker({ lat, lng, onChange }: MapPickerProps) {
  const [mounted, setMounted] = useState(false);
  // Stable unique key per instance — guarantees a fresh DOM node for Leaflet
  // and prevents "Map container is being reused" in React Strict Mode
  const [mapKey] = useState(() => `map-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hasPosition = lat !== 0 || lng !== 0;

  if (!mounted) {
    return (
      <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
        <div
          style={{ height: "280px" }}
          className="bg-gray-100 animate-pulse"
        />
        <div className="bg-gray-50 px-3 py-2 text-xs text-gray-400">
          Loading map...
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
      <MapContainer
        key={mapKey}
        center={INDIA_CENTER}
        zoom={hasPosition ? 13 : 5}
        style={{ height: "280px", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {hasPosition && <FlyToOnMount lat={lat} lng={lng} />}
        <ClickHandler onChange={onChange} />
        {hasPosition && (
          <Marker
            position={[lat, lng]}
            draggable={true}
            eventHandlers={{
              dragend(e: DragEndEvent) {
                const pos = (e.target as L.Marker).getLatLng();
                onChange(pos.lat, pos.lng);
              },
            }}
          />
        )}
      </MapContainer>
      <div className="bg-gray-50 px-3 py-2 text-xs text-gray-500 flex items-center gap-1">
        <span className="text-gray-400">📍</span>
        {hasPosition ? (
          <span>
            <span className="font-semibold text-gray-700">
              {lat.toFixed(6)}, {lng.toFixed(6)}
            </span>
            <span className="ml-1">— click or drag to adjust</span>
          </span>
        ) : (
          <span>Click on the map to select a location</span>
        )}
      </div>
    </div>
  );
}
