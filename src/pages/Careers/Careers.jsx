// src/pages/Careers/Careers.jsx
import React, { useState } from 'react';
import { FaSearch, FaMapMarkerAlt, FaBriefcase, FaUsers, FaRegLightbulb, FaBalanceScale, FaHeart } from 'react-icons/fa';
import { MdWorkOutline, MdAttachMoney, MdEventAvailable } from 'react-icons/md';

const Careers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [expandedJob, setExpandedJob] = useState(null);

  const jobOpenings = [
    {
      id: 1,
      title: "Senior Frontend Developer (React)",
      location: "Remote",
      type: "Full-time",
      department: "Engineering",
      description: "We're looking for an experienced React developer to lead our frontend initiatives.",
      responsibilities: [
        "Develop and maintain our e-commerce platform using React.js",
        "Collaborate with UX designers to implement responsive interfaces",
        "Optimize applications for maximum performance across devices",
        "Mentor junior developers and conduct code reviews"
      ],
      requirements: [
        "5+ years of professional React experience",
        "Strong knowledge of TypeScript, Redux, and modern CSS",
        "Experience with performance optimization techniques",
        "Familiarity with CI/CD pipelines"
      ],
      benefits: [
        "Stock options",
        "Flexible hours",
        "Annual tech budget"
      ]
    },
    {
      id: 2,
      title: "Customer Support Specialist",
      location: "New York, NY",
      type: "Full-time",
      department: "Customer Success",
      description: "Provide exceptional service to our customers and help improve their experience.",
      responsibilities: [
        "Respond to customer inquiries via email, chat, and phone",
        "Troubleshoot and resolve order issues",
        "Document customer feedback and report to product team",
        "Help improve our knowledge base and support documentation"
      ],
      requirements: [
        "2+ years in customer support role",
        "Excellent communication skills",
        "Patience and empathy for customer concerns",
        "Technical aptitude to understand our products"
      ],
      benefits: [
        "Health insurance",
        "Commuter benefits",
        "Quarterly bonuses"
      ]
    },
    {
      id: 3,
      title: "UX/UI Designer",
      location: "San Francisco, CA",
      type: "Full-time",
      department: "Design",
      description: "Design beautiful and intuitive interfaces for our e-commerce platform.",
      responsibilities: [
        "Create wireframes, prototypes, and high-fidelity designs",
        "Conduct user research and usability testing",
        "Collaborate with product and engineering teams",
        "Maintain and evolve our design system"
      ],
      requirements: [
        "Portfolio showcasing UX/UI work",
        "3+ years of product design experience",
        "Proficiency in Figma and Adobe Creative Suite",
        "Understanding of frontend development principles"
      ],
      benefits: [
        "Annual conference budget",
        "Latest hardware",
        "Creative freedom"
      ]
    },
    {
      id: 4,
      title: "DevOps Engineer",
      location: "Remote",
      type: "Full-time",
      department: "Engineering",
      description: "Build and maintain our cloud infrastructure and deployment pipelines.",
      responsibilities: [
        "Manage AWS infrastructure using Terraform",
        "Implement CI/CD pipelines",
        "Monitor system performance and troubleshoot issues",
        "Ensure security best practices are followed"
      ],
      requirements: [
        "3+ years of DevOps experience",
        "Expertise with Docker and Kubernetes",
        "Knowledge of infrastructure as code",
        "Experience with monitoring tools"
      ],
      benefits: [
        "Remote work flexibility",
        "Certification reimbursement",
        "On-call compensation"
      ]
    }
  ];

  const locations = ['all', ...new Set(jobOpenings.map(job => job.location))];
  const departments = ['all', ...new Set(jobOpenings.map(job => job.department))];

  const filteredJobs = jobOpenings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === 'all' || job.location === locationFilter;
    const matchesDepartment = departmentFilter === 'all' || job.department === departmentFilter;
    
    return matchesSearch && matchesLocation && matchesDepartment;
  });

  const toggleJobExpansion = (jobId) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-purple-700 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Help us build the future of e-commerce while growing your career
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-12">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search jobs..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaMapMarkerAlt className="text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                {locations.map(location => (
                  <option key={location} value={location}>
                    {location === 'all' ? 'All Locations' : location}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaBriefcase className="text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                {departments.map(department => (
                  <option key={department} value={department}>
                    {department === 'all' ? 'All Departments' : department}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <MdWorkOutline className="mr-2 text-blue-600" />
            Current Openings ({filteredJobs.length})
          </h2>
          
          {filteredJobs.length > 0 ? (
            <div className="space-y-6">
              {filteredJobs.map(job => (
                <div key={job.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div 
                    className="p-6 cursor-pointer"
                    onClick={() => toggleJobExpansion(job.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold">{job.title}</h3>
                        <div className="flex items-center mt-2 space-x-4">
                          <span className="flex items-center text-gray-600">
                            <FaMapMarkerAlt className="mr-1" /> {job.location}
                          </span>
                          <span className="flex items-center text-gray-600">
                            <MdWorkOutline className="mr-1" /> {job.type}
                          </span>
                          <span className="flex items-center text-gray-600">
                            <FaUsers className="mr-1" /> {job.department}
                          </span>
                        </div>
                      </div>
                      <svg
                        className={`w-6 h-6 text-gray-500 transition-transform ${expandedJob === job.id ? 'transform rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  
                  {expandedJob === job.id && (
                    <div className="px-6 pb-6 border-t border-gray-100">
                      <div className="mt-6 grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2">
                          <h4 className="font-bold text-lg mb-4">Job Description</h4>
                          <p className="mb-6">{job.description}</p>
                          
                          <h4 className="font-bold text-lg mb-4">Responsibilities</h4>
                          <ul className="list-disc pl-5 space-y-2 mb-6">
                            {job.responsibilities.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                          
                          <h4 className="font-bold text-lg mb-4">Requirements</h4>
                          <ul className="list-disc pl-5 space-y-2">
                            {job.requirements.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <div className="bg-blue-50 rounded-lg p-6">
                            <h4 className="font-bold text-lg mb-4">Benefits</h4>
                            <ul className="space-y-3">
                              {job.benefits.map((benefit, i) => (
                                <li key={i} className="flex items-start">
                                  <FaHeart className="text-blue-600 mt-1 mr-2 flex-shrink-0" />
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                            
                            <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center">
                              Apply Now
                            </button>
                            
                            <button className="mt-3 w-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition flex items-center justify-center">
                              Save for Later
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <FaSearch className="mx-auto text-gray-400 text-4xl mb-4" />
              <h3 className="text-xl font-medium mb-2">No jobs match your search</h3>
              <p className="text-gray-600">Try adjusting your filters or check back later</p>
            </div>
          )}
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <FaRegLightbulb className="mr-2 text-yellow-500" />
            Why Join Us?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <MdAttachMoney className="text-blue-600 text-xl" />
              </div>
              <h3 className="font-bold text-lg mb-2">Competitive Compensation</h3>
              <p className="text-gray-600">
                We offer competitive salaries, bonuses, and equity packages to reward your contributions.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <MdEventAvailable className="text-purple-600 text-xl" />
              </div>
              <h3 className="font-bold text-lg mb-2">Flexible Work</h3>
              <p className="text-gray-600">
                Remote options, flexible hours, and unlimited PTO to support work-life balance.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <FaBalanceScale className="text-green-600 text-xl" />
              </div>
              <h3 className="font-bold text-lg mb-2">Growth Opportunities</h3>
              <p className="text-gray-600">
                Annual learning budgets, mentorship programs, and clear promotion paths.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <FaHeart className="text-red-600 text-xl" />
              </div>
              <h3 className="font-bold text-lg mb-2">Great Culture</h3>
              <p className="text-gray-600">
                Inclusive, diverse workplace with regular team events and community initiatives.
              </p>
            </div>
          </div>
        </div>

        {/* Culture Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 text-white">
              <h2 className="text-2xl font-bold mb-6">Our Culture</h2>
              <p className="mb-6 opacity-90">
                We believe in creating an environment where people can do their best work while being their authentic selves.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-white bg-opacity-20 rounded-full p-1 mr-3 mt-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Diversity and inclusion initiatives</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-white bg-opacity-20 rounded-full p-1 mr-3 mt-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Regular team retreats and events</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-white bg-opacity-20 rounded-full p-1 mr-3 mt-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Employee resource groups</span>
                </li>
              </ul>
            </div>
            <div className="hidden md:block bg-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c" 
                alt="Team working together" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Don't See Your Dream Job?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            We're always looking for talented people. Send us your resume and we'll contact you when a matching position opens.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition inline-flex items-center">
            Submit General Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default Careers;