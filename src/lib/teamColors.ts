// Centralized team color configuration
// Change colors here to update across the entire website

export interface TeamColorScheme {
  primary: string;
  secondary: string;
  light: string;
  dark: string;
  border: string;
  text: string;
  bg: string;
  hover: string;
}

export const teamColors: Record<string, TeamColorScheme> = {
  A: {
    primary: 'emerald',
    secondary: 'emerald-600',
    light: 'emerald-50',
    dark: 'emerald-900',
    border: 'emerald-200',
    text: 'emerald-800',
    bg: 'emerald-100',
    hover: 'emerald-700'
  },
  B: {
    primary: 'sky',
    secondary: 'sky-600',
    light: 'sky-50',
    dark: 'sky-900',
    border: 'sky-200',
    text: 'sky-800',
    bg: 'sky-100',
    hover: 'sky-700'
  },
  C: {
    primary: 'violet',
    secondary: 'violet-600',
    light: 'violet-50',
    dark: 'violet-900',
    border: 'violet-200',
    text: 'violet-800',
    bg: 'violet-100',
    hover: 'violet-700'
  },
  // Additional color schemes for future use
  D: {
    primary: 'amber',
    secondary: 'amber-600',
    light: 'amber-50',
    dark: 'amber-900',
    border: 'amber-200',
    text: 'amber-800',
    bg: 'amber-100',
    hover: 'amber-700'
  },
  E: {
    primary: 'rose',
    secondary: 'rose-600',
    light: 'rose-50',
    dark: 'rose-900',
    border: 'rose-200',
    text: 'rose-800',
    bg: 'rose-100',
    hover: 'rose-700'
  }
};

// Helper functions to get team colors
export const getTeamColor = (team: string): TeamColorScheme => {
  return teamColors[team] || teamColors.A; // Default to A team colors
};

export const getTeamColorClasses = (team: string, type: keyof TeamColorScheme): string => {
  const colors = getTeamColor(team);
  return colors[type];
};

// Specific utility functions for common use cases
export const getTeamBorderClass = (team: string): string => {
  return `border-${getTeamColorClasses(team, 'border')}`;
};

export const getTeamBgClass = (team: string): string => {
  return `bg-${getTeamColorClasses(team, 'bg')}`;
};

export const getTeamTextClass = (team: string): string => {
  return `text-${getTeamColorClasses(team, 'text')}`;
};

export const getTeamHoverClass = (team: string): string => {
  return `hover:bg-${getTeamColorClasses(team, 'hover')}`;
};

// For gradient backgrounds
export const getTeamGradientClass = (team: string): string => {
  const colors = getTeamColor(team);
  return `bg-gradient-to-br from-${colors.light} to-${colors.bg}`;
};

// For dark mode gradients
export const getTeamDarkGradientClass = (team: string): string => {
  const colors = getTeamColor(team);
  return `dark:from-${colors.dark}/20 dark:to-${colors.secondary}/20`;
};
