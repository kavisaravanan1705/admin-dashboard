// Dummy data for waste management dashboard
export const initialComplaints = [
  {
    id: "WM-001",
    title: "Overflowing garbage bin on Main Street",
    shortDescription: "Large garbage bin overflowing with waste spillover",
    photoUrl: "https://images.pexels.com/photos/2827392/pexels-photo-2827392.jpeg?auto=compress&cs=tinysrgb&w=400",
    afterPhotoUrl: null,
    location: {
      lat: 40.7128,
      lng: -74.0060,
      text: "Main Street & 5th Avenue"
    },
    status: "Pending",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    acceptedAt: null,
    timerRemaining: 0,
    assignedWorkerId: null
  },
  {
    id: "WM-002", 
    title: "Broken garbage truck blocking road",
    shortDescription: "Garbage collection truck broken down, blocking traffic",
    photoUrl: "https://images.pexels.com/photos/1464025/pexels-photo-1464025.jpeg?auto=compress&cs=tinysrgb&w=400",
    afterPhotoUrl: null,
    location: {
      lat: 40.7589,
      lng: -73.9851,
      text: "Broadway & 42nd Street"
    },
    status: "Pending",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    acceptedAt: null,
    timerRemaining: 0,
    assignedWorkerId: null
  },
  {
    id: "WM-003",
    title: "Illegal dumping in park area",
    shortDescription: "Large pile of construction debris dumped illegally",
    photoUrl: "https://images.pexels.com/photos/2480807/pexels-photo-2480807.jpeg?auto=compress&cs=tinysrgb&w=400",
    afterPhotoUrl: null,
    location: {
      lat: 40.7831,
      lng: -73.9712,
      text: "Central Park East Entrance"
    },
    status: "Pending",
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    acceptedAt: null,
    timerRemaining: 0,
    assignedWorkerId: null
  },
  {
    id: "WM-004",
    title: "Recycling bins not collected for weeks",
    shortDescription: "Multiple recycling bins overflowing, not collected",
    photoUrl: "https://images.pexels.com/photos/3850512/pexels-photo-3850512.jpeg?auto=compress&cs=tinysrgb&w=400",
    afterPhotoUrl: null,
    location: {
      lat: 40.7505,
      lng: -73.9934,
      text: "Times Square Commercial District"
    },
    status: "Pending",
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    acceptedAt: null,
    timerRemaining: 0,
    assignedWorkerId: null
  },
  {
    id: "WM-005",
    title: "Hazardous waste containers leaking",
    shortDescription: "Chemical containers leaking unknown substances",
    photoUrl: "https://images.pexels.com/photos/2827480/pexels-photo-2827480.jpeg?auto=compress&cs=tinysrgb&w=400",
    afterPhotoUrl: null,
    location: {
      lat: 40.7282,
      lng: -74.0776,
      text: "Industrial District West Side"
    },
    status: "Pending",
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
    acceptedAt: null,
    timerRemaining: 0,
    assignedWorkerId: null
  },
  {
    id: "WM-006",
    title: "Street cleaning equipment malfunction",
    shortDescription: "Street sweeper broken down, debris accumulating",
    photoUrl: "https://images.pexels.com/photos/2827798/pexels-photo-2827798.jpeg?auto=compress&cs=tinysrgb&w=400",
    afterPhotoUrl: null,
    location: {
      lat: 40.7614,
      lng: -73.9776,
      text: "Madison Avenue & 52nd Street"
    },
    status: "Pending",
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 minutes ago
    acceptedAt: null,
    timerRemaining: 0,
    assignedWorkerId: null
  }
];

export const initialWorkers = [
  {
    id: "worker-1",
    name: "Worker A",
    credits: 200,
    initialCredits: 200
  },
  {
    id: "worker-2", 
    name: "Worker B",
    credits: 300,
    initialCredits: 300
  },
  {
    id: "worker-3",
    name: "Worker C", 
    credits: 100,
    initialCredits: 100
  },
  {
    id: "worker-4",
    name: "Worker D",
    credits: 250,
    initialCredits: 250
  }
];