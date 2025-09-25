import React from 'react';
import { Trophy, User, Award } from 'lucide-react';

const WorkersPanel = ({ workers, complaints }) => {
  const sortedWorkers = [...workers].sort((a, b) => b.credits - a.credits);

  const getWorkerStats = (workerId) => {
    const workerComplaints = complaints.filter(c => c.assignedWorkerId === workerId);
    return {
      total: workerComplaints.length,
      resolved: workerComplaints.filter(c => c.status === 'Resolved').length,
      inProgress: workerComplaints.filter(c => c.status === 'In Progress').length
    };
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Trophy className="w-8 h-8 mr-3 text-yellow-500" />
          Workers Leaderboard
        </h2>

        <div className="space-y-4">
          {sortedWorkers.map((worker, index) => {
            const stats = getWorkerStats(worker.id);
            return (
              <div
                key={worker.id}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-4 text-lg ${
                      index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-gray-400' : 
                      index === 2 ? 'bg-orange-600' : 'bg-blue-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl text-gray-900">{worker.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Total: {stats.total}</span>
                        <span className="text-green-600">Resolved: {stats.resolved}</span>
                        <span className="text-blue-600">In Progress: {stats.inProgress}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-2xl font-bold text-blue-600">
                      <Award className="w-6 h-6 mr-2" />
                      {worker.credits}
                    </div>
                    <p className="text-sm text-gray-500">credits earned</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Individual Worker Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {workers.map(worker => {
          const stats = getWorkerStats(worker.id);
          const assignedComplaints = complaints.filter(c => c.assignedWorkerId === worker.id);
          
          return (
            <div key={worker.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <User className="w-8 h-8 mr-3 text-gray-500" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{worker.name}</h3>
                  <p className="text-gray-600">ID: {worker.id}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{worker.credits}</div>
                  <div className="text-sm text-blue-700">Current Credits</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
                  <div className="text-sm text-green-700">Completed</div>
                </div>
              </div>

              {assignedComplaints.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Current Assignments:</h4>
                  <div className="space-y-2">
                    {assignedComplaints.slice(0, 3).map(complaint => (
                      <div key={complaint.id} className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">{complaint.id}</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          complaint.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                          complaint.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {complaint.status}
                        </span>
                      </div>
                    ))}
                    {assignedComplaints.length > 3 && (
                      <div className="text-sm text-gray-500">
                        +{assignedComplaints.length - 3} more assignments
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkersPanel;