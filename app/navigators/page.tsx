'use client'

import React, { useState } from 'react'
import { Search, MapPin, Phone, Mail, Globe, Users, Award, ChevronDown, ChevronUp } from 'lucide-react'
import { useGetUsersQuery } from '../redux/services/userApi'
import { User } from '@/types/user'
import { chapterId } from '../lib/constants/api/chapterId'
import Picture from '../components/common/Picture'

const MembersShowcase = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('All')
  const [expandedMember, setExpandedMember] = useState(null) as any
  const { data } = useGetUsersQuery({ chapterId }) as { data: { users: User[] } }
  const members = data?.users ?? []

  const industries = ['All', ...new Set(members?.map?.((member) => member.industry))]

  const filteredMembers = members?.filter?.((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.interests.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesIndustry = selectedIndustry === 'All' || member.industry === selectedIndustry
    return matchesSearch && matchesIndustry
  })

  return (
    <div className="min-h-dvh bg-[#121212]">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Professional Network</h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Connect with trusted professionals in the Coastal Referral Exchange. Each member has been vetted for
            excellence and is committed to providing exceptional service to our shared client network.
          </p>
          <div className="flex items-center justify-center space-x-6 text-blue-100">
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              <span>{members?.length} Professional Members</span>
            </div>
            <div className="flex items-center">
              <Award className="w-5 h-5 mr-2" />
              <span>Vetted & Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, company, or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        {/* Results Counter */}
        <div className="mb-6">
          <p className="text-gray-300">
            Showing {filteredMembers?.length} of {members?.length} members
          </p>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMembers?.map((member) => (
            <div
              key={member.id}
              className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-700"
            >
              {/* Member Image */}
              <div className="h-48 bg-gradient-to-br from-blue-500 to-teal-500 relative overflow-hidden">
                <Picture
                  priority={false}
                  src={member.image!}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-slate-900">
                    {member.yearsInBusiness} years experience
                  </div>
                </div>
              </div>

              {/* Member Info */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-blue-400 font-medium">{member.title}</p>
                  <p className="text-gray-300">{member.company}</p>
                  <div className="flex items-center text-gray-400 mt-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{member.location}</span>
                  </div>
                </div>

                {/* Industry Badge */}
                <div className="mb-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">{member.industry}</span>
                </div>

                {/* Bio Preview */}
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{member.bio}</p>

                {/* Specialties */}
                <div className="mb-4">
                  <p className="text-white font-medium mb-2">Specialties:</p>
                  <div className="flex flex-wrap gap-2">
                    {member.interests.slice(0, 2).map((specialty, index) => (
                      <span key={index} className="bg-slate-700 text-gray-300 px-2 py-1 rounded text-xs">
                        {specialty}
                      </span>
                    ))}
                    {member.interests.length > 2 && (
                      <span className="bg-slate-700 text-gray-300 px-2 py-1 rounded text-xs">
                        +{member.interests.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Contact Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <div className="flex space-x-3">
                    <a href={`tel:${member.phone}`} className="text-blue-400 hover:text-blue-300 transition-colors">
                      <Phone className="w-5 h-5" />
                    </a>
                    <a href={`mailto:${member.email}`} className="text-blue-400 hover:text-blue-300 transition-colors">
                      <Mail className="w-5 h-5" />
                    </a>
                    <a
                      href={`https://${member.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Globe className="w-5 h-5" />
                    </a>
                  </div>
                  <button
                    onClick={() => setExpandedMember(expandedMember === member.id ? null : member.id)}
                    className="flex items-center text-blue-400 hover:text-blue-300 transition-colors text-sm"
                  >
                    {expandedMember === member.id ? (
                      <>
                        Less <ChevronUp className="w-4 h-4 ml-1" />
                      </>
                    ) : (
                      <>
                        More <ChevronDown className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>
                </div>

                {/* Expanded Content */}
                {expandedMember === member.id && (
                  <div className="mt-4 pt-4 border-t border-slate-700">
                    <div className="space-y-3">
                      <div>
                        <p className="text-white font-medium mb-1">Full Bio:</p>
                        <p className="text-gray-300 text-sm">{member.bio}</p>
                      </div>
                      <div>
                        <p className="text-white font-medium mb-1">All Specialties:</p>
                        <div className="flex flex-wrap gap-2">
                          {member.interests.map((specialty, index) => (
                            <span key={index} className="bg-slate-700 text-gray-300 px-2 py-1 rounded text-xs">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <div className="flex items-center text-gray-300">
                          <Phone className="w-4 h-4 mr-2 text-blue-400" />
                          <a href={`tel:${member.phone}`} className="hover:text-blue-400">
                            {member.phone}
                          </a>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <Mail className="w-4 h-4 mr-2 text-blue-400" />
                          <a href={`mailto:${member.email}`} className="hover:text-blue-400">
                            {member.email}
                          </a>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <Globe className="w-4 h-4 mr-2 text-blue-400" />
                          <a
                            href={`https://${member.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-400"
                          >
                            {member.website}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredMembers?.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Users className="w-16 h-16 mx-auto mb-4" />
              <p className="text-xl">No members found matching your criteria</p>
              <p className="text-sm mt-2">Try adjusting your search terms or filters</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MembersShowcase
