// Club addresses and venue information
export interface ClubInfo {
  name: string;
  location: string;
  address: string;
  website?: string;
  contact?: string;
}

export const clubAddresses: Record<string, ClubInfo> = {
  // Andover Chess Club
  'andover': {
    name: 'Andover Central Club',
    location: 'Andover Central Club',
    address: 'Clare Ho/East St, Andover SP10 1EP',
    website: 'https://andoverchessclub.co.uk'
  },

  // Basingstoke Chess Club
  'basingstoke': {
    name: 'Basingstoke Chess Club',
    location: 'Basingstoke Bridge and Chess Club',
    address: 'Basingstoke Bridge and Chess Club, Sherborne Road, RG215TG'
  },

  // Southampton University Chess Club
  'southampton-university': {
    name: 'Southampton University Chess Club',
    location: 'University of Southampton',
    address: ''
  },

  // Winchester Chess Club
  'winchester': {
    name: 'Winchester Chess Club',
    location: 'Badger Farm Community Centre,',
    address: 'Badger Farm Road, Winchester, SO22 4QB'
  },

  // Chandlers Ford Chess Club
  'chandlers-ford': {
    name: 'Chandlers Ford Chess Club',
    location: 'Chandlers Ford Central Club',
    address: '2 Winchester Road, Chandlers Ford, Eastleigh, Hampshire SO53 2FZ. '
  },

  // Salisbury Chess Club
  'salisbury': {
    name: 'Salisbury Chess Club',
    location: 'Stratford Social Club, ',
    address: 'Stratford Rd, Salisbury SP1 3JP'
  },

  // Hamble Chess Club
  'hamble': {
    name: 'Hamble Chess Club',
    location: 'Hamble Club',
    address: 'Beaulieu Rd, Hamble-le-Rice, Southampton SO31 4JL'
  },

  // Southampton Chess Club
  'southampton': {
    name: 'Southampton Chess Club',
    location: 'St. Denys Community Centre ',
    address: 'Priory Road, St. Denys, Southampton, SO17 2JZ.'
  },

  // Fareham Chess Club
  'fareham': {
    name: 'Fareham Chess Club',
    location: 'The Duke of Connaught\'s Own Club',
    address: '74 Western Road, Fareham, PO16 0NS'
  },

  // Ringwood Chess Club
  'ringwood': {
    name: 'Ringwood Chess Club',
    location: 'Greyfriars Community Centre',
    address: '44 Christchurch Rd, Ringwood BH24 1DW'
  }
};

// Tournament venues
export const tournamentVenues: Record<string, ClubInfo> = {
  'barton-peveril': {
    name: 'Barton Peveril 6th Form College',
    location: 'Barton Peveril 6th Form College',
    address: 'Chestnut Avenue, Eastleigh, SO50 5ZA'
  },
  'kennington-village-hall': {
    name: 'Kennington Village Hall',
    location: 'Kennington Village Hall',
    address: 'Kennington Road, Kennington, OX1 5PG'
  },
  'ryde-esplanade-hotel': {
    name: 'Ryde Esplanade Hotel',
    location: 'Ryde Esplanade Hotel',
    address: '16 Esplanade, Ryde PO33 2ED, UK'
  },
  'badger-farm-community-centre': {
    name: 'Badger Farm Community Centre',
    location: 'Badger Farm Community Centre',
    address: '2 Badger Farm Road Winchester Hampshire'
  },
  'lysses-house-hotel': {
    name: 'Lysses House Hotel',
    location: 'Lysses House Hotel',
    address: '51 High Street Fareham East, Fareham, Hampshire. PO16 7BQ'
  },
  'reading-students-union': {
    name: 'Reading Students\' Union',
    location: 'Reading Students\' Union',
    address: 'Whiteknights Campus, Reading, RG6 6UR'
  },
  'oxford-leonardo-hotel': {
    name: 'The Oxford Leonardo Hotel',
    location: 'The Oxford Leonardo Hotel, Godstow Road',
    address: 'Wolvercote, OX2 8AL'
  }
};

// Helper function to get club info by team name
export const getClubInfo = (teamName: string): ClubInfo | null => {
  const lowerTeamName = teamName.toLowerCase();
  
  // Check for specific club matches
  if (lowerTeamName.includes('basingstoke')) return clubAddresses['basingstoke'];
  if (lowerTeamName.includes('southampton university') || lowerTeamName.includes('southampton univesrity')) return clubAddresses['southampton-university'];
  if (lowerTeamName.includes('winchester')) return clubAddresses['winchester'];
  if (lowerTeamName.includes('chandlers ford')) return clubAddresses['chandlers-ford'];
  if (lowerTeamName.includes('salisbury')) return clubAddresses['salisbury'];
  if (lowerTeamName.includes('hamble')) return clubAddresses['hamble'];
  if (lowerTeamName.includes('southampton') && !lowerTeamName.includes('university')) return clubAddresses['southampton'];
  if (lowerTeamName.includes('fareham')) return clubAddresses['fareham'];
  if (lowerTeamName.includes('ringwood')) return clubAddresses['ringwood'];
  if (lowerTeamName.includes('andover')) return clubAddresses['andover'];
  
  return null;
};

// Helper function to get tournament venue info
export const getTournamentVenue = (venueName: string): ClubInfo | null => {
  const lowerVenueName = venueName.toLowerCase();
  
  if (lowerVenueName.includes('barton peveril')) return tournamentVenues['barton-peveril'];
  if (lowerVenueName.includes('kennington')) return tournamentVenues['kennington-village-hall'];
  if (lowerVenueName.includes('ryde esplanade')) return tournamentVenues['ryde-esplanade-hotel'];
  if (lowerVenueName.includes('badger farm')) return tournamentVenues['badger-farm-community-centre'];
  if (lowerVenueName.includes('lysses house')) return tournamentVenues['lysses-house-hotel'];
  if (lowerVenueName.includes('reading')) return tournamentVenues['reading-students-union'];
  if (lowerVenueName.includes('oxford leonardo')) return tournamentVenues['oxford-leonardo-hotel'];
  
  return null;
};
