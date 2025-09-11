import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const SystemOverview = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDocuments: 0,
    totalVerified: 0,
    verifiedCount: 0,
    fraudCount: 0,
    activeUploaders: 0,
    activeVerifiers: 0
  });

  // Mock data for charts
  const monthlyData = [
    { month: 'Jan', verified: 120, fraud: 8 },
    { month: 'Feb', verified: 150, fraud: 12 },
    { month: 'Mar', verified: 180, fraud: 15 },
    { month: 'Apr', verified: 200, fraud: 10 },
    { month: 'May', verified: 220, fraud: 18 },
    { month: 'Jun', verified: 250, fraud: 14 }
  ];

  const institutionData = [
    { name: 'MIT', fraud: 5, verified: 45 },
    { name: 'Stanford', fraud: 3, verified: 38 },
    { name: 'Harvard', fraud: 7, verified: 52 },
    { name: 'Berkeley', fraud: 4, verified: 41 },
    { name: 'Caltech', fraud: 2, verified: 28 }
  ];

  const pieData = [
    { name: 'Verified', value: 85, color: '#10B981' },
    { name: 'Fraud', value: 15, color: '#EF4444' }
  ];

  useEffect(() => {
    // Simulate API call
    const loadStats = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStats({
        totalDocuments: 1250,
        totalVerified: 1062,
        verifiedCount: 1062,
        fraudCount: 188,
        activeUploaders: 45,
        activeVerifiers: 12
      });
      setIsLoading(false);
    };

    loadStats();
  }, []);

  const StatCard = ({ title, value, icon, color, change, changeType }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
              {changeType === 'positive' ? '↗' : '↘'} {change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-4 h-4 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <p className="text-gray-600">Loading system overview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">System Overview</h1>
        <p className="text-gray-600">Monitor system performance and key metrics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Documents"
          value={stats.totalDocuments.toLocaleString()}
          icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>}
          color="bg-blue-500"
          change="+12%"
          changeType="positive"
        />
        <StatCard
          title="Verified Documents"
          value={stats.totalVerified.toLocaleString()}
          icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>}
          color="bg-green-500"
          change="+8%"
          changeType="positive"
        />
        <StatCard
          title="Fraud Detected"
          value={stats.fraudCount.toLocaleString()}
          icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>}
          color="bg-red-500"
          change="+3%"
          changeType="negative"
        />
        <StatCard
          title="Active Uploaders"
          value={stats.activeUploaders}
          icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>}
          color="bg-purple-500"
        />
        <StatCard
          title="Active Verifiers"
          value={stats.activeVerifiers}
          icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>}
          color="bg-indigo-500"
        />
        <StatCard
          title="Success Rate"
          value="85%"
          icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>}
          color="bg-yellow-500"
          change="+2%"
          changeType="positive"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Verification Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Verification Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="verified" stroke="#10B981" strokeWidth={2} name="Verified" />
              <Line type="monotone" dataKey="fraud" stroke="#EF4444" strokeWidth={2} name="Fraud" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Fraud by Institution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Fraud Detection by Institution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={institutionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="fraud" fill="#EF4444" name="Fraud" />
              <Bar dataKey="verified" fill="#10B981" name="Verified" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Success vs Failure Ratio */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Success vs Failure Ratio</h3>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default SystemOverview;
