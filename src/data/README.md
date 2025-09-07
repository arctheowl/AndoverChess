# Fixtures Data Structure

This directory contains the organized fixtures data for the Andover Chess Club website.

## Files

### `fixtures.ts`
The main fixtures file that exports the complete fixtures array. This file:
- Imports the simplified fixture data from `fixturesData.ts`
- Imports club address information from `clubAddresses.ts`
- Contains board results and match details for completed fixtures
- Provides utility functions for filtering and processing fixtures
- Maintains backward compatibility with the existing website

### `fixturesData.ts`
Contains the simplified fixture data organized by season and type:
- `completedFixtures2024_25`: Completed matches from the 2024-2025 season
- `upcomingTournaments2025_26`: Upcoming tournaments for 2025-2026
- `upcomingLeagueMatches2025_26`: Upcoming league matches for 2025-2026
- `allSimpleFixtures`: Combined array of all fixtures

Each fixture uses a `venueKey` to reference venue information stored in `clubAddresses.ts`.

### `clubAddresses.ts`
Contains venue information organized into two categories:
- `clubAddresses`: Chess club venues for league matches
- `tournamentVenues`: Special venues for tournaments and congresses

## Benefits of This Structure

1. **Easy Updates**: Club addresses and venue information are centralized and can be updated in one place
2. **Reduced Duplication**: No more repeated address information across fixtures
3. **Better Organization**: Fixtures are grouped by season and type for easier management
4. **Maintainable**: Clear separation of concerns makes the code easier to understand and modify
5. **Backward Compatible**: The existing website continues to work without changes
6. **Automatic Status Updates**: Fixture status is automatically calculated based on dates - past fixtures are marked as "completed" and future fixtures as "upcoming"

## Adding New Fixtures

### For League Matches:
1. Add the fixture to the appropriate season array in `fixturesData.ts`
2. Use the `venueKey` to reference a club in `clubAddresses.ts`
3. Set `status: "upcoming"` (it will be automatically updated based on the date)
4. If it's a completed match with board results, add the board results to `boardResultsData` in `fixtures.ts`

### For Tournaments:
1. Add the fixture to `upcomingTournaments2025_26` in `fixturesData.ts`
2. Use the `venueKey` to reference a venue in `tournamentVenues` in `clubAddresses.ts`
3. Set `status: "upcoming"` (it will be automatically updated based on the date)
4. Add the venue information to `tournamentVenues` if it's a new venue

### Adding New Venues:
1. Add the venue information to either `clubAddresses` or `tournamentVenues` in `clubAddresses.ts`
2. Use the key when referencing the venue in fixtures

## Example

```typescript
// In fixturesData.ts
{
  id: "new-match-1",
  homeTeam: "Andover A",
  awayTeam: "New Club B",
  date: "2025-04-15",
  time: "19:30",
  venue: "home",
  competition: "Southampton Chess League",
  isTournament: false,
  status: "upcoming", // Will be automatically updated based on date
  venueKey: "andover" // References clubAddresses['andover']
}

// In clubAddresses.ts
'andover': {
  name: 'Andover Central Club',
  location: 'Andover Central Club',
  address: 'Clare Ho/East St, Andover SP10 1EP',
  website: 'https://andoverchessclub.co.uk'
}
```

The system will automatically resolve the venue information when the fixture is processed.
