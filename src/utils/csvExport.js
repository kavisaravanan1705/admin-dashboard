export const exportComplaintsToCSV = (complaints) => {
  const headers = [
    'ID',
    'Title', 
    'Location',
    'Status',
    'Created At',
    'Accepted At',
    'Assigned Worker'
  ];

  const csvContent = [
    headers.join(','),
    ...complaints.map(complaint => [
      complaint.id,
      `"${complaint.title}"`,
      `"${complaint.location.text}"`,
      complaint.status,
      new Date(complaint.createdAt).toLocaleString(),
      complaint.acceptedAt ? new Date(complaint.acceptedAt).toLocaleString() : 'Not Accepted',
      complaint.assignedWorkerId || 'Unassigned'
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `waste_complaints_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const formatTimeAgo = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)} hours ago`;
  } else {
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  }
};

export const formatTimer = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};