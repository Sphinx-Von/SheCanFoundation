export interface User {
  id: number;
  name: string;
  email: string;
}

export interface InternData {
  id: number;
  name: string;
  email: string;
  referralCode: string;
  totalDonations: number;
  joinDate: string;
  avatar: string;
  achievements: Achievement[];
  recentActivity: Activity[];
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  unlocked: boolean;
  icon: string;
}

export interface Activity {
  id: number;
  type: 'donation' | 'achievement';
  amount?: number;
  date: string;
  donor?: string;
  title?: string;
}

export interface LeaderboardEntry {
  id: number;
  name: string;
  amount: number;
  rank: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}