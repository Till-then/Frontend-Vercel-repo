import { http } from '../lib/request';
import type { Venue } from '../data/mockData';

export interface VenueQuery {
  city?: string;
  keyword?: string;
}

export interface VenueStrategy {
  strategyId: string;
  title: string;
  type: string;
  content: string;
}

export interface VenueCatering {
  cateringId: string;
  name: string;
  type: string;
  isNightSnack: boolean;
}

export interface VenueAccommodation {
  accommId: string;
  name: string;
  address: string;
  priceRange: string;
}

function mapVenue(v: any): Venue {
  return {
    id: String(v.venueId ?? v.id),
    name: v.venueName ?? v.name ?? '',
    city: v.city ?? '',
    address: v.address ?? '',
    image: v.image ?? '',
    coordinates: v.location
      ? { lat: v.location.latitude, lng: v.location.longitude }
      : (v.coordinates ?? { lat: 0, lng: 0 }),
    transport: [v.metroInfo, v.busInfo].filter(Boolean).join('\n') || v.transport || '',
    notice: v.admissionRules ?? v.notice ?? '',
    facilities: v.facilities ?? [],
    lastBus: v.lastBus ?? '',
    capacity: v.capacity,
    description: v.description,
  };
}

export async function listVenues(query?: VenueQuery): Promise<Venue[]> {
  const res = await http.get<any>('/api/venues', query as Record<string, any>);
  const list = Array.isArray(res) ? res : (res?.list ?? res?.records ?? []);
  return list.map(mapVenue);
}

export async function getVenue(id: string): Promise<Venue | undefined> {
  const v = await http.get<any>(`/api/venues/${id}`);
  return v ? mapVenue(v) : undefined;
}

export async function getVenueStrategies(venueId: string): Promise<VenueStrategy[]> {
  return http.get<VenueStrategy[]>(`/api/venues/${venueId}/strategies`);
}

export async function getVenueCaterings(venueId: string, isNightSnack?: boolean): Promise<VenueCatering[]> {
  return http.get<VenueCatering[]>(`/api/venues/${venueId}/caterings`, isNightSnack !== undefined ? { isNightSnack } : undefined);
}

export async function getVenueAccommodations(venueId: string): Promise<VenueAccommodation[]> {
  return http.get<VenueAccommodation[]>(`/api/venues/${venueId}/accommodations`);
}

export async function createVenue(payload: Omit<Venue, 'id'>): Promise<Venue> {
  const v = await http.post<any>('/api/venues', mapToBackend(payload));
  return mapVenue(v);
}

export async function updateVenue(id: string, payload: Partial<Venue>): Promise<Venue> {
  const v = await http.put<any>(`/api/venues/${id}`, mapToBackend(payload));
  return mapVenue(v);
}

export async function deleteVenue(id: string): Promise<void> {
  return http.del<void>(`/api/venues/${id}`);
}

function mapToBackend(v: Partial<Venue>): Record<string, unknown> {
  return {
    venueName: v.name,
    city: v.city,
    address: v.address,
    transport: v.transport,
    notice: v.notice,
    image: v.image,
    capacity: v.capacity,
    description: v.description,
  };
}
