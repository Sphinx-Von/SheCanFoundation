import React, { useEffect, useState } from 'react';
import { Trophy, Copy, TrendingUp, Gift, Calendar, DollarSign, Award, Activity } from 'lucide-react';
import { InternData, LeaderboardEntry, ApiResponse } from '../types';
import { ApiService } from '../services/api';
import { LoadingSpinner } from './LoadingSpinner';
import { Header } from './Header';

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [internData, setInternData] = useState<InternData | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [internResponse, leaderboardResponse] = await Promise.all([
          ApiService.getInternData() as Promise<ApiResponse<InternData>>,
          ApiService.getLeaderboard() as Promise<ApiResponse<LeaderboardEntry[]>>
        ]);

        if (internResponse.success && internResponse.data) {
          setInternData(internResponse.data);
        }

        if (leaderboardResponse.success && leaderboardResponse.data) {
          setLeaderboard(leaderboardResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const copyReferralCode = async () => {
    if (internData?.referralCode) {
      await navigator.clipboard.writeText(internData.referralCode);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!internData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Failed to load data</h2>
          <p className="text-gray-600">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  const unlockedAchievements = internData.achievements.filter(a => a.unlocked);
  const nextAchievement = internData.achievements.find(a => !a.unlocked);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={{ name: internData.name, avatar: internData.avatar }} 
        onLogout={onLogout} 
      />

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {internData.name.split(' ')[0]}!</h1>
          <p className="mt-2 text-gray-600">Here's your fundraising overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Raised</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(internData.totalDonations)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Achievements</p>
                <p className="text-2xl font-bold text-gray-900">{unlockedAchievements.length}/{internData.achievements.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Trophy className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Leaderboard Rank</p>
                <p className="text-2xl font-bold text-gray-900">#{leaderboard.find(l => l.name === internData.name)?.rank || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Days Active</p>
                <p className="text-2xl font-bold text-gray-900">{Math.floor((new Date().getTime() - new Date(internData.joinDate).getTime()) / (1000 * 60 * 60 * 24))}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Referral Code Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Your Referral Code
              </h2>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Share this code to earn donations:</p>
                    <p className="text-2xl font-mono font-bold text-blue-600">{internData.referralCode}</p>
                  </div>
                  <button
                    onClick={copyReferralCode}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                    <span>{copySuccess ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Recent Activity
              </h2>
              <div className="space-y-4">
                {internData.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    {activity.type === 'donation' ? (
                      <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Award className="h-5 w-5 text-yellow-600" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      {activity.type === 'donation' ? (
                        <>
                          <p className="text-sm font-medium text-gray-900">
                            New donation of {formatCurrency(activity.amount!)} from {activity.donor}
                          </p>
                          <p className="text-sm text-gray-500">{formatDate(activity.date)}</p>
                        </>
                      ) : (
                        <>
                          <p className="text-sm font-medium text-gray-900">
                            Achievement unlocked: {activity.title}
                          </p>
                          <p className="text-sm text-gray-500">{formatDate(activity.date)}</p>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Gift className="h-5 w-5 mr-2" />
                Achievements
              </h2>
              <div className="space-y-3">
                {internData.achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      achievement.unlocked
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <span className="text-2xl">{achievement.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${
                        achievement.unlocked ? 'text-green-900' : 'text-gray-500'
                      }`}>
                        {achievement.title}
                      </p>
                      <p className={`text-xs ${
                        achievement.unlocked ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Trophy className="h-5 w-5 mr-2" />
                Leaderboard
              </h2>
              <div className="space-y-3">
                {leaderboard.map((entry) => (
                  <div
                    key={entry.id}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      entry.name === internData.name
                        ? 'bg-blue-50 border border-blue-200'
                        : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className={`text-sm font-bold w-6 text-center ${
                        entry.rank <= 3 ? 'text-yellow-600' : 'text-gray-500'
                      }`}>
                        #{entry.rank}
                      </span>
                      <span className={`text-sm font-medium ${
                        entry.name === internData.name ? 'text-blue-900' : 'text-gray-900'
                      }`}>
                        {entry.name}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {formatCurrency(entry.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};