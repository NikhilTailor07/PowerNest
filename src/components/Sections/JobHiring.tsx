// src/components/JobHiringSection.jsx
import React, { useState, useEffect } from 'react';

const JobHiring = () => {
  const [jobApplicants, setJobApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // In a real application, replace this with your actual API endpoint
  // For example: const API_ENDPOINT = 'https://api.yourwebsite.com/jobs/applicants';
  const API_ENDPOINT = 'https://api.example.com/job-applicants'; // Placeholder

  useEffect(() => {
    const fetchJobApplicants = async () => {
      setLoading(true);
      setError(null); // Clear any previous errors

      try {
        // --- Simulate API Call ---
        // In a real app, you would use:
        // const response = await fetch(API_ENDPOINT);
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }
        // const data = await response.json();

        // Using setTimeout to simulate network delay and data fetching
        const simulatedData = [
          {
            id: 1,
            name: 'Alex Morgan',
            role: 'UI/UX Designer',
            date: '02 Jan 2025',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          },
          {
            id: 2,
            name: 'Jordan Lee',
            role: 'Web Developer',
            date: '02 Jan 2025',
            avatar: 'https://randomuser.me/api/portraits/men/47.jpg',
          },
          {
            id: 3,
            name: 'Tim Smith',
            role: 'JavaScript Engineer',
            date: '02 Jan 2025',
            avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
          },
          {
            id: 4,
            name: 'Casey Jordan',
            role: 'React Developer',
            date: '02 Jan 2025',
            avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
          },
          {
            id: 5,
            name: 'Samantha Grey',
            role: 'Product Manager',
            date: '05 Jan 2025',
            avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
          },
        ];

        setTimeout(() => {
          setJobApplicants(simulatedData);
          setLoading(false);
        }, 1500); // Simulate 1.5 seconds loading time

      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobApplicants();
  }, []); // Empty dependency array means this effect runs only once after the initial render

  if (loading) {
    return (
      <div className="p-6 bg-black text-white font-sans rounded-lg shadow-xl max-w-lg mx-auto my-10 text-center">
        <p className="text-blue-400">Loading job applicants...</p>
        <div className="mt-4 animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-black text-white font-sans rounded-lg shadow-xl max-w-lg mx-auto  text-center">
        <p className="text-red-500">Error: {error}</p>
        <p className="text-gray-400">Could not load job applicants. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-black text-white font-sans rounded-lg shadow-xl max-w-lg mx-auto my-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Job Hiring</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-200">
          Post a job
        </button>
      </div>

      {/* Applicant List */}
      <div className="space-y-2">
        {jobApplicants.length > 0 ? (
          jobApplicants.map((applicant) => (
            <div key={applicant.id} className="flex items-center py-3 border-b border-gray-800 last:border-b-0">
              <img
                src={applicant.avatar}
                alt={applicant.name}
                className="w-10 h-10 rounded-full mr-4 object-cover"
              />
              <div className="flex-grow">
                <p className="font-semibold text-sm">{applicant.name}</p>
                <p className="text-gray-400 text-sm">{applicant.role}</p>
              </div>
              <span className="text-gray-400 text-sm">{applicant.date}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center py-8">No job applicants found.</p>
        )}
      </div>
    </div>
  );
};

export default JobHiring;