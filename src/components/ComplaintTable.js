import React, { useState } from 'react';
import { Search, Filter, SortDesc } from 'lucide-react';
import ComplaintCard from './ComplaintCard';

const ComplaintTable = ({ 
  complaints, 
  workers,
  onAccept, 
  onResolve, 
  onViewPhotos,
  onReset 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');

  const filteredAndSortedComplaints = complaints
    .filter(complaint => {
      const matchesSearch = complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          complaint.location.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          complaint.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || complaint.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'Oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'Newest':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by ID or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg appearance-none bg-white"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Escalated">Escalated</option>
            </select>
          </div>

          <div className="relative">
            <SortDesc className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg appearance-none bg-white"
            >
              <option value="Newest">Newest First</option>
              <option value="Oldest">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600 text-lg">
          Showing {filteredAndSortedComplaints.length} of {complaints.length} complaints
        </p>
      </div>

      {/* Complaint Cards Grid */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAndSortedComplaints.map(complaint => (
          <ComplaintCard
            key={complaint.id}
            complaint={complaint}
            workers={workers}
            onAccept={onAccept}
            onResolve={onResolve}
            onViewPhotos={onViewPhotos}
            onReset={onReset}
          />
        ))}
      </div>

      {filteredAndSortedComplaints.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No complaints found</h3>
          <p className="text-gray-600 text-lg">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default ComplaintTable;