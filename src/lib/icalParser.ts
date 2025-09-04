export interface ICalEvent {
  uid: string;
  summary: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  dtstamp: Date;
}

export interface ParsedICal {
  events: ICalEvent[];
  timezone: string;
  version: string;
  prodid: string;
}

/**
 * Parse an iCal file content and extract events
 */
export function parseICal(icalContent: string): ParsedICal {
  const lines = icalContent.split('\n').map(line => line.trim());
  const events: ICalEvent[] = [];
  let currentEvent: Partial<ICalEvent> = {};
  let inEvent = false;
  let timezone = 'Europe/London';
  let version = '2.0';
  let prodid = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Handle line continuation (lines starting with space or tab)
    let fullLine = line;
    while (i + 1 < lines.length && (lines[i + 1].startsWith(' ') || lines[i + 1].startsWith('\t'))) {
      i++;
      fullLine += lines[i].substring(1);
    }

    if (fullLine === 'BEGIN:VEVENT') {
      inEvent = true;
      currentEvent = {};
    } else if (fullLine === 'END:VEVENT') {
      if (inEvent && currentEvent.uid && currentEvent.summary && currentEvent.startDate) {
        events.push(currentEvent as ICalEvent);
      }
      inEvent = false;
      currentEvent = {};
    } else if (inEvent) {
      const [key, ...valueParts] = fullLine.split(':');
      const value = valueParts.join(':');
      
      switch (key) {
        case 'UID':
          currentEvent.uid = value;
          break;
        case 'SUMMARY':
          currentEvent.summary = value;
          break;
        case 'DESCRIPTION':
          currentEvent.description = value;
          break;
        case 'LOCATION':
          currentEvent.location = value;
          break;
        case 'DTSTART':
        case 'DTSTART;TZID=Europe/London':
          currentEvent.startDate = parseICalDate(value);
          break;
        case 'DTEND':
        case 'DTEND;TZID=Europe/London':
          currentEvent.endDate = parseICalDate(value);
          break;
        case 'DTSTAMP':
          currentEvent.dtstamp = parseICalDate(value);
          break;
      }
    } else if (fullLine.startsWith('VERSION:')) {
      version = fullLine.split(':')[1];
    } else if (fullLine.startsWith('PRODID:')) {
      prodid = fullLine.split(':')[1];
    } else if (fullLine.startsWith('TZID:')) {
      timezone = fullLine.split(':')[1];
    }
  }

  return {
    events,
    timezone,
    version,
    prodid
  };
}

/**
 * Parse iCal date format (YYYYMMDDTHHMMSSZ or YYYYMMDDTHHMMSS)
 */
function parseICalDate(dateString: string): Date {
  // Remove timezone info if present
  const cleanDate = dateString.replace(/;TZID=Europe\/London/, '');
  
  // Handle different date formats
  if (cleanDate.endsWith('Z')) {
    // UTC format: YYYYMMDDTHHMMSSZ
    const year = parseInt(cleanDate.substring(0, 4));
    const month = parseInt(cleanDate.substring(4, 6)) - 1; // Month is 0-indexed
    const day = parseInt(cleanDate.substring(6, 8));
    const hour = parseInt(cleanDate.substring(9, 11));
    const minute = parseInt(cleanDate.substring(11, 13));
    const second = parseInt(cleanDate.substring(13, 15));
    
    return new Date(Date.UTC(year, month, day, hour, minute, second));
  } else {
    // Local time format: YYYYMMDDTHHMMSS
    const year = parseInt(cleanDate.substring(0, 4));
    const month = parseInt(cleanDate.substring(4, 6)) - 1;
    const day = parseInt(cleanDate.substring(6, 8));
    const hour = parseInt(cleanDate.substring(9, 11));
    const minute = parseInt(cleanDate.substring(11, 13));
    const second = parseInt(cleanDate.substring(13, 15));
    
    // Create date in local timezone (Europe/London)
    return new Date(year, month, day, hour, minute, second);
  }
}

/**
 * Extract team matches from iCal events
 */
export function extractTeamMatches(events: ICalEvent[]): TeamMatch[] {
  const matches: TeamMatch[] = [];
  
  for (const event of events) {
    const match = parseMatchFromEvent(event);
    if (match) {
      matches.push(match);
    }
  }
  
  return matches.sort((a, b) => a.date.getTime() - b.date.getTime());
}

export interface TeamMatch {
  id: string;
  date: Date;
  homeTeam: string;
  awayTeam: string;
  division: string;
  location: string;
  isHome: boolean;
  team: 'A' | 'B' | 'C';
}

/**
 * Parse a match from an iCal event
 */
function parseMatchFromEvent(event: ICalEvent): TeamMatch | null {
  const summary = event.summary;
  const description = event.description;
  
  // Extract team information from summary
  // Format examples:
  // "Andover B Vs Winchester B"
  // "Ringwood A Vs Andover A"
  // "Chandlers Ford E Vs Andover C"
  
  // Try different patterns to match Andover teams
  let andoverMatch = summary.match(/(\w+(?:\s+\w+)*)\s+Vs\s+Andover\s+([ABC])/i);
  let team: 'A' | 'B' | 'C';
  let homeTeam: string;
  let awayTeam: string;
  let isHome: boolean;
  
  if (andoverMatch) {
    // Format: "Opponent Vs Andover X"
    team = andoverMatch[2] as 'A' | 'B' | 'C';
    homeTeam = andoverMatch[1];
    awayTeam = `Andover ${team}`;
    isHome = false;
  } else {
    // Try: "Andover X Vs Opponent"
    andoverMatch = summary.match(/Andover\s+([ABC])\s+Vs\s+(\w+(?:\s+\w+)*)/i);
    if (andoverMatch) {
      team = andoverMatch[1] as 'A' | 'B' | 'C';
      homeTeam = `Andover ${team}`;
      awayTeam = andoverMatch[2];
      isHome = true;
    } else {
      return null;
    }
  }
  
  return {
    id: event.uid,
    date: event.startDate,
    homeTeam,
    awayTeam,
    division: description || 'Unknown Division',
    location: event.location,
    isHome,
    team
  };
}

/**
 * Get upcoming matches for a specific team
 */
export function getUpcomingMatchesForTeam(matches: TeamMatch[], team: 'A' | 'B' | 'C', limit?: number): TeamMatch[] {
  const now = new Date();
  const teamMatches = matches
    .filter(match => match.team === team && match.date >= now)
    .sort((a, b) => a.date.getTime() - b.date.getTime());
  
  return limit ? teamMatches.slice(0, limit) : teamMatches;
}

/**
 * Get completed matches for a specific team
 */
export function getCompletedMatchesForTeam(matches: TeamMatch[], team: 'A' | 'B' | 'C', limit?: number): TeamMatch[] {
  const now = new Date();
  const teamMatches = matches
    .filter(match => match.team === team && match.date < now)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
  
  return limit ? teamMatches.slice(0, limit) : teamMatches;
}
