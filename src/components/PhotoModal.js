import React from 'react';
import { X } from 'lucide-react';

const PhotoModal = ({ isOpen, onClose, complaint }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-semibold">Photo Verification - {complaint?.id}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium mb-3 text-gray-800">Before Photo</h4>
              <div className="border rounded-lg overflow-hidden">
                <img
                  src={complaint?.photoUrl}
                  alt="Before"
                  className="w-full h-64 object-cover"
                />
              </div>
              <p className="mt-2 text-sm text-gray-600">Original complaint photo</p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-3 text-gray-800">After Photo</h4>
              <div className="border rounded-lg overflow-hidden bg-gray-50">
                {complaint?.afterPhotoUrl ? (
                  <>
                    <img
                      src={complaint.afterPhotoUrl}
                      alt="After"
                      className="w-full h-64 object-cover"
                    />
                    <p className="mt-2 text-sm text-green-600">Verification photo uploaded</p>
                  </>
                ) : (
                  <div className="w-full h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📷</div>
                      <p>Verification photo not uploaded</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h5 className="font-medium mb-2">Complaint Details</h5>
            <p className="text-gray-700">{complaint?.shortDescription}</p>
            <p className="text-sm text-gray-600 mt-2">
              Location: {complaint?.location.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;