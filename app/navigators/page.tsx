'use client'

import React, { useState } from 'react'
import { Search, Users, Award } from 'lucide-react'
import { useGetUsersQuery } from '../redux/services/userApi'
import { User } from '@/types/user'
import { chapterId } from '../lib/constants/api/chapterId'
import NavigatorCard from '../components/navigators/NavigatorCard'

const Navigators = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('All')
  const [expandedMember, setExpandedMember] = useState(null) as any
  const { data } = useGetUsersQuery({ chapterId, membershipStatus: 'ACTIVE' }) as { data: { users: User[] } }
  const navigators = data?.users ?? []

  const industries = ['All', ...new Set(navigators?.map?.((navigator) => navigator.industry))]

  const filteredNavigators = navigators?.filter?.((navigator) => {
    const matchesSearch =
      navigator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      navigator.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      navigator.interests.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesIndustry = selectedIndustry === 'All' || navigator.industry === selectedIndustry
    return matchesSearch && matchesIndustry
  })

  return (
    <div className="min-h-dvh bg-gray-900">
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
              <span>{navigators?.length} Professional Members</span>
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
            {industries.map((industry, i) => (
              <option key={i} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        {/* Results Counter */}
        <div className="mb-6">
          <p className="text-gray-300">
            Showing {filteredNavigators?.length} of {navigators?.length} navigators
          </p>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNavigators?.map(
            (navigator, i) =>
              navigator.isPublic && (
                <NavigatorCard
                  key={i}
                  navigator={navigator}
                  setExpandedMember={setExpandedMember}
                  expandedMember={expandedMember}
                />
              )
          )}
        </div>

        {filteredNavigators?.length === 0 && (
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

export default Navigators
