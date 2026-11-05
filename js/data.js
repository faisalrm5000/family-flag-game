// Country data for the Flag Game. Single source of truth for all question content.
// code: ISO 3166-1 alpha-2. difficulty: 1 = Level 1 (Oli), 2 = Level 2 (Gabi).
// M1 uses ~30 well-known countries with distinctive flags.
(function (root) {
  const COUNTRIES = [
    { code: 'GB', name: 'United Kingdom', continent: 'Europe', capital: 'London', difficulty: 1 },
    { code: 'US', name: 'United States', continent: 'North America', capital: 'Washington, D.C.', difficulty: 1 },
    { code: 'JP', name: 'Japan', continent: 'Asia', capital: 'Tokyo', difficulty: 1 },
    { code: 'CA', name: 'Canada', continent: 'North America', capital: 'Ottawa', difficulty: 1 },
    { code: 'BR', name: 'Brazil', continent: 'South America', capital: 'Brasília', difficulty: 1 },
    { code: 'FR', name: 'France', continent: 'Europe', capital: 'Paris', difficulty: 1 },
    { code: 'IT', name: 'Italy', continent: 'Europe', capital: 'Rome', difficulty: 1 },
    { code: 'IN', name: 'India', continent: 'Asia', capital: 'New Delhi', difficulty: 1 },
    { code: 'CN', name: 'China', continent: 'Asia', capital: 'Beijing', difficulty: 1 },
    { code: 'AU', name: 'Australia', continent: 'Oceania', capital: 'Canberra', difficulty: 1 },
    { code: 'ZA', name: 'South Africa', continent: 'Africa', capital: 'Pretoria', difficulty: 1 },
    { code: 'MX', name: 'Mexico', continent: 'North America', capital: 'Mexico City', difficulty: 1 },
    { code: 'DE', name: 'Germany', continent: 'Europe', capital: 'Berlin', difficulty: 1 },
    { code: 'ES', name: 'Spain', continent: 'Europe', capital: 'Madrid', difficulty: 1 },
    { code: 'KR', name: 'South Korea', continent: 'Asia', capital: 'Seoul', difficulty: 1 },
    { code: 'GR', name: 'Greece', continent: 'Europe', capital: 'Athens', difficulty: 1 },
    { code: 'SE', name: 'Sweden', continent: 'Europe', capital: 'Stockholm', difficulty: 1 },
    { code: 'CH', name: 'Switzerland', continent: 'Europe', capital: 'Bern', difficulty: 1 },
    { code: 'AR', name: 'Argentina', continent: 'South America', capital: 'Buenos Aires', difficulty: 1 },
    { code: 'EG', name: 'Egypt', continent: 'Africa', capital: 'Cairo', difficulty: 1 },
    { code: 'KE', name: 'Kenya', continent: 'Africa', capital: 'Nairobi', difficulty: 1 },
    { code: 'NG', name: 'Nigeria', continent: 'Africa', capital: 'Abuja', difficulty: 1 },
    { code: 'TR', name: 'Turkey', continent: 'Asia', capital: 'Ankara', difficulty: 1 },
    { code: 'IE', name: 'Ireland', continent: 'Europe', capital: 'Dublin', difficulty: 1 },
    { code: 'NL', name: 'Netherlands', continent: 'Europe', capital: 'Amsterdam', difficulty: 1 },
    { code: 'PT', name: 'Portugal', continent: 'Europe', capital: 'Lisbon', difficulty: 1 },
    { code: 'NO', name: 'Norway', continent: 'Europe', capital: 'Oslo', difficulty: 1 },
    { code: 'NZ', name: 'New Zealand', continent: 'Oceania', capital: 'Wellington', difficulty: 1 },
    { code: 'JM', name: 'Jamaica', continent: 'North America', capital: 'Kingston', difficulty: 1 },
    { code: 'PE', name: 'Peru', continent: 'South America', capital: 'Lima', difficulty: 1 },
  ];

  // Turns an ISO code like "FR" into its flag emoji. M1 uses emoji flags (they render
  // well on macOS); M3 swaps these for local SVG files.
  function flagEmoji(code) {
    return String.fromCodePoint(...[...code.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));
  }

  const api = { COUNTRIES, flagEmoji };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.FlagData = api;
})(typeof window !== 'undefined' ? window : globalThis);
