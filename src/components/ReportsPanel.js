import React from 'react';
import { BarChart, Download, TrendingUp } from 'lucide-react';
import { exportComplaintsToCSV } from '../utils/csvExport';

const ReportsPanel = ({ complaints }) => {
  const stats = {
    total: complaints.length,
    pending: complaints.filter(c => c.status === 'Pending').length,
    inProgress: complaints.filter(c => c.status === 'In Progress').length,
    resolved: complaints.filter(c => c.status === 'Resolved').length,
    escalated: complaints.filter(c => c.status === 'Escalated').length
  };

  const resolvedComplaints = complaints.filter(c => c.status === 'Resolved' && c.acceptedAt);
  const avgResolutionTime = resolvedComplaints.length > 0 
    ? resolvedComplaints.reduce((acc, complaint) => {
        const acceptedTime = new Date(complaint.acceptedAt);
        const resolvedTime = new Date(); // Approximate, since we don't track actual resolution time
        return acc + ((resolvedTime - acceptedTime) / (1000 * 60)); // in minutes
      }, 0) / resolvedComplaints.length
    : 0;

  const maxCount = Math.max(stats.pending, stats.inProgress, stats.resolved, stats.escalated);

  const handleExport = () => {
    exportComplaintsToCSV(complaints);
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Complaints</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-full">
              <BarChart className="w-8 h-8 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Resolved</p>
              <p className="text-3xl font-bold text-green-600">{stats.resolved}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-3xl font-bold text-blue-600">{stats.inProgress}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <BarChart className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Escalated</p>
              <p className="text-3xl font-bold text-red-600">{stats.escalated}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <BarChart className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Chart and Metrics */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Status Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Complaints by Status</h3>
          <div className="space-y-4">
            {[
              { label: 'Pending', count: stats.pending, color: 'bg-yellow-500' },
              { label: 'In Progress', count: stats.inProgress, color: 'bg-blue-500' },
              { label: 'Resolved', count: stats.resolved, color: 'bg-green-500' },
              { label: 'Escalated', count: stats.escalated, color: 'bg-red-500' }
            ].map(item => (
              <div key={item.label} className="flex items-center">
                <div className="w-24 text-sm font-medium text-gray-700">{item.label}</div>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className={`h-4 rounded-full ${item.color} transition-all duration-500`}
                      style={{ width: `${maxCount > 0 ? (item.count / maxCount) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-12 text-right text-lg font-semibold text-gray-900">
                  {item.count}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Performance Metrics</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Resolution Rate</span>
                <span className="text-2xl font-bold text-green-600">
                  {stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="h-3 bg-green-500 rounded-full transition-all duration-500"
                  style={{ width: `${stats.total > 0 ? (stats.resolved / stats.total) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Escalation Rate</span>
                <span className="text-2xl font-bold text-red-600">
                  {stats.total > 0 ? Math.round((stats.escalated / stats.total) * 100) : 0}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="h-3 bg-red-500 rounded-full transition-all duration-500"
                  style={{ width: `${stats.total > 0 ? (stats.escalated / stats.total) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Avg. Resolution Time</div>
              <div className="text-2xl font-bold text-blue-600">
                {avgResolutionTime > 0 ? `${Math.round(avgResolutionTime)} min` : 'N/A'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Export Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Export Data</h3>
            <p className="text-gray-600 mt-1">Download complaint data as CSV file</p>
          </div>
          <button
            onClick={handleExport}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg flex items-center"
          >
            <Download className="w-5 h-5 mr-2" />
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsPanel;