export declare class CreateTravelPostDto {
    fromCountry: string;
    fromCity: string;
    fromArea?: string;
    fromLongitude?: number;
    fromLatitude?: number;
    toCountry: string;
    toCity: string;
    toArea?: string;
    toLongitude?: number;
    toLatitude?: number;
    transportPreference: string;
    preferredGender?: string;
    travelDate: string;
    timeRangeStart?: string;
    timeRangeEnd?: string;
    interests: string[];
    reason: string;
}
