import React, { useState, useEffect } from 'react';
import { Trash2, Users, BarChart3, RotateCcw, Award } from 'lucide-react';
import { initialComplaints, initialWorkers } from './data';
import ComplaintTable from './components/ComplaintTable';
import WorkersPanel from './components/WorkersPanel';
import ReportsPanel from './components/ReportsPanel';
import PhotoModal from './components/PhotoModal';
import AssignWorkerModal from './components/AssignWorkerModal';

function App() {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [workers, setWorkers] = useState(initialWorkers);
  const [activeTab, setActiveTab] = useState('complaints');
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [assignWorkerModalOpen, setAssignWorkerModalOpen] = useState(false);
  const [complaintToAssign, setComplaintToAssign] = useState(null);

  // Timer management
  useEffect(() => {
    const timer = setInterval(() => {
      setComplaints(prevComplaints => 
        prevComplaints.map(complaint => {
          if (complaint.status === 'In Progress' && complaint.timerRemaining > 0) {
            const newTimeRemaining = complaint.timerRemaining - 1;
            if (newTimeRemaining <= 0) {
              // Auto-escalate
              return {
                ...complaint,
                status: 'Escalated',
                timerRemaining: 0
              };
            }
            return {
              ...complaint,
              timerRemaining: newTimeRemaining
            };
          }
          return complaint;
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const totalCredits = workers.reduce((sum, worker) => sum + worker.credits, 0);

  const handleAcceptComplaint = (complaintId) => {
    setComplaintToAssign(complaintId);
    setAssignWorkerModalOpen(true);
  };

  const handleAssignWorker = (worker) => {
    setComplaints(prevComplaints =>
      prevComplaints.map(complaint =>
        complaint.id === complaintToAssign
          ? {
              ...complaint,
              status: 'In Progress',
              acceptedAt: new Date().toISOString(),
              assignedWorkerId: worker.id,
              timerRemaining: 60 // 60 seconds for demo
            }
          : complaint
      )
    );
  };

  const handleResolveComplaint = (complaintId) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const afterPhotoUrl = e.target.result;
          
          setComplaints(prevComplaints =>
            prevComplaints.map(complaint => {
              if (complaint.id === complaintId) {
                // Award credits to assigned worker
                if (complaint.assignedWorkerId) {
                  setWorkers(prevWorkers =>
                    prevWorkers.map(worker =>
                      worker.id === complaint.assignedWorkerId
                        ? { ...worker, credits: worker.credits + 200 }
                        : worker
                    )
                  );
                }
                
                return {
                  ...complaint,
                  status: 'Resolved',
                  afterPhotoUrl,
                  timerRemaining: 0
                };
              }
              return complaint;
            })
          );
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };

  const handleViewPhotos = (complaint) => {
    setSelectedComplaint(complaint);
    setPhotoModalOpen(true);
  };

  const handleResetComplaint = (complaintId) => {
    setComplaints(prevComplaints =>
      prevComplaints.map(complaint =>
        complaint.id === complaintId
          ? {
              ...complaint,
              status: 'Pending',
              acceptedAt: null,
              assignedWorkerId: null,
              timerRemaining: 0,
              afterPhotoUrl: null
            }
          : complaint
      )
    );
  };

  const handleGlobalReset = () => {
    setComplaints(prevComplaints =>
      prevComplaints.map(complaint => ({
        ...complaint,
        status: 'Pending',
        acceptedAt: null,
        assignedWorkerId: null,
        timerRemaining: 0,
        afterPhotoUrl: null
      }))
    );
    
    setWorkers(prevWorkers =>
      prevWorkers.map(worker => ({
        ...worker,
        credits: worker.initialCredits
      }))
    );
  };

  const navItems = [
    { id: 'complaints', label: 'Complaints', icon: Trash2 },
    { id: 'workers', label: 'Workers & Credits', icon: Users },
    { id: 'reports', label: 'Reports', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Waste Management Admin Dashboard
              </h1>
              <div className="flex items-center mt-2 text-lg">
                <Award className="w-6 h-6 mr-2 text-blue-600" />
                <span className="text-blue-600 font-semibold">Credits Earned: {totalCredits}</span>
              </div>
            </div>
            <button
              onClick={handleGlobalReset}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium text-lg flex items-center"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Global Reset
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <nav className="lg:w-64 space-y-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-left text-lg font-medium rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-6 h-6 mr-3" />
                  {item.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1">
            {activeTab === 'complaints' && (
              <ComplaintTable
                complaints={complaints}
                workers={workers}
                onAccept={handleAcceptComplaint}
                onResolve={handleResolveComplaint}
                onViewPhotos={handleViewPhotos}
                onReset={handleResetComplaint}
              />
            )}

            {activeTab === 'workers' && (
              <WorkersPanel 
                workers={workers} 
                complaints={complaints}
              />
            )}

            {activeTab === 'reports' && (
              <ReportsPanel complaints={complaints} />
            )}
          </main>
        </div>
      </div>

      {/* Modals */}
      <PhotoModal
        isOpen={photoModalOpen}
        onClose={() => setPhotoModalOpen(false)}
        complaint={selectedComplaint}
      />

      <AssignWorkerModal
        isOpen={assignWorkerModalOpen}
        onClose={() => setAssignWorkerModalOpen(false)}
        workers={workers}
        onAssignWorker={handleAssignWorker}
      />
    </div>
  );
}

export default App;