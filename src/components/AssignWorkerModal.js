import React, { useState } from 'react';
import { X, Search } from 'lucide-react';

const AssignWorkerModal = ({ isOpen, onClose, workers, onAssignWorker }) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredWorkers = workers.filter(worker =>
    worker.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssign = (worker) => {
    onAssignWorker(worker);
    setSearchTerm('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-semibold">Assign Worker</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search workers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </div>
          
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {filteredWorkers.map(worker => (
              <button
                key={worker.id}
                onClick={() => handleAssign(worker)}
                className="w-full p-4 text-left border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-lg">{worker.name}</span>
                  <span className="text-blue-600 font-semibold">{worker.credits} credits</span>
                </div>
              </button>
            ))}
          </div>
          
          {filteredWorkers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg">No workers found</p>
              <p className="text-sm">Try adjusting your search term</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignWorkerModal;