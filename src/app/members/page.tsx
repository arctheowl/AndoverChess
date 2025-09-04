'use client';

import { useState } from 'react';
import { getMembers, getCommitteeMembers, getRegularMembers, Member } from '@/data/members';

export default function MembersPage() {
  const [filter, setFilter] = useState<'all' | 'committee' | 'members'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const allMembers = getMembers();
  const committeeMembers = getCommitteeMembers();
  const regularMembers = getRegularMembers();

  const filteredMembers = allMembers.filter(member => {
    const roleMatch = filter === 'all' || 
      (filter === 'committee' && member.isCommittee) ||
      (filter === 'members' && !member.isCommittee);
    
    const searchMatch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       member.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    return roleMatch && searchMatch;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Members</h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Meet the talented players who make up the Andover Chess Club community. 
              From beginners to masters, we're proud of our diverse membership.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-emerald-800 mb-2">{allMembers.length}</div>
              <p className="text-gray-600">Active Members</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-800 mb-2">{committeeMembers.length}</div>
              <p className="text-gray-600">Committee Members</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-800 mb-2">15+</div>
              <p className="text-gray-600">Years Average Experience</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-800 mb-2">50+</div>
              <p className="text-gray-600">Tournament Wins</p>
            </div>
          </div>
        </div>
      </section>

      {/* Committee Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Club Committee</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated volunteers who keep our club running smoothly and ensure 
              we provide the best chess experience for all members.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {committeeMembers.map((member) => (
              <div key={member.id} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-emerald-800 text-2xl">{member.avatar}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-emerald-800 font-medium mb-2">{member.role}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 mb-3">{member.description}</p>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">Key Achievements:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {member.achievements.slice(0, 3).map((achievement, index) => (
                        <li key={index} className="flex items-center">
                          <span className="text-emerald-600 mr-2">•</span>
                          {achievement}
                        </li>
                      ))}
                      {member.achievements.length > 3 && (
                        <li className="text-gray-500 text-xs">+{member.achievements.length - 3} more</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Members Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">All Members</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our complete membership directory and discover the diverse 
              community that makes our club special.
            </p>
          </div>

          {/* Filters and Search */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                All Members
              </button>
              <button
                onClick={() => setFilter('committee')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'committee'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Committee
              </button>
              <button
                onClick={() => setFilter('members')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'members'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Regular Members
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    {member.avatar ? (
                      <span className="text-emerald-800 text-2xl">{member.avatar}</span>
                    ) : (
                      <span className="text-emerald-800 text-lg font-bold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-emerald-800 font-medium text-sm mb-2">{member.role}</p>
                  {member.rating && (
                    <p className="text-sm text-gray-600">Rating: {member.rating}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-gray-600">Member since {member.joinDate}</p>
                  {member.achievements && member.achievements.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-gray-900 mb-1">Achievements:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {member.achievements.slice(0, 2).map((achievement, index) => (
                          <li key={index} className="flex items-center">
                            <span className="text-emerald-600 mr-1">•</span>
                            {achievement}
                          </li>
                        ))}
                        {member.achievements.length > 2 && (
                          <li className="text-gray-500">+{member.achievements.length - 2} more</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No members found matching your search criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Join Section */}
      <section className="py-16 bg-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Ready to become part of the Andover Chess Club? We welcome players of all skill levels 
            and would love to have you join our friendly community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-emerald-800 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="/about"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-800 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
