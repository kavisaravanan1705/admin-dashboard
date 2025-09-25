import React from 'react';
import { MapPin, Clock, User, Camera, RotateCcw } from 'lucide-react';
import { formatTimeAgo, formatTimer } from '../utils/csvExport';

const ComplaintCard = ({ 
  complaint, 
  workers,
  onAccept, 
  onResolve, 
  onViewPhotos,
  onReset 
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Escalated': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const assignedWorker = workers.find(w => w.id === complaint.assignedWorkerId);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{complaint.title}</h3>
            <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(complaint.status)}`}>
              {complaint.status}
            </div>
          </div>
          <img
            src={complaint.photoUrl}
            alt="Complaint"
            className="w-20 h-20 rounded-lg object-cover"
          />
        </div>

        <p className="text-gray-600 mb-4 text-lg">{complaint.shortDescription}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <MapPin className="w-5 h-5 mr-2" />
            <span className="text-lg">{complaint.location.text}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-5 h-5 mr-2" />
            <span className="text-lg">{formatTimeAgo(complaint.createdAt)}</span>
          </div>
          {assignedWorker && (
            <div className="flex items-center text-gray-600">
              <User className="w-5 h-5 mr-2" />
              <span className="text-lg">{assignedWorker.name}</span>
            </div>
          )}
        </div>

        {complaint.status === 'In Progress' && complaint.timerRemaining > 0 && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-blue-800 font-medium text-lg">Time Remaining:</span>
              <span className="text-blue-900 font-bold text-xl">{formatTimer(complaint.timerRemaining)}</span>
            </div>
            <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${(complaint.timerRemaining / 60) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {complaint.status === 'Escalated' && (
          <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
            <span className="text-red-800 font-medium text-lg">🚨 Escalated to Higher Authority</span>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          {complaint.status === 'Pending' && (
            <button
              onClick={() => onAccept(complaint.id)}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium text-lg"
            >
              Accept
            </button>
          )}

          {complaint.status === 'In Progress' && (
            <button
              onClick={() => onResolve(complaint.id)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
            >
              Resolve
            </button>
          )}

          {complaint.status === 'Escalated' && (
            <button
              className="bg-red-600 text-white px-6 py-3 rounded-lg cursor-not-allowed font-medium text-lg"
              disabled
            >
              Escalated (Auto)
            </button>
          )}

          <button
            onClick={() => onViewPhotos(complaint)}
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium text-lg flex items-center"
          >
            <Camera className="w-5 h-5 mr-2" />
            View Photos
          </button>

          <button
            onClick={() => onReset(complaint.id)}
            className="border border-orange-300 text-orange-700 px-6 py-3 rounded-lg hover:bg-orange-50 transition-colors font-medium text-lg flex items-center"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintCard;