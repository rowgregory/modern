import React, { FC } from 'react'
import Picture from '../common/Picture'
import { ChevronDown, ChevronUp, Globe, Mail, MapPin, Phone } from 'lucide-react'

interface INavigatorCard {
  navigator: any
  setExpandedMember: (expandedMember: any) => void
  expandedMember: any
}

const NavigatorCard: FC<INavigatorCard> = ({ navigator, setExpandedMember, expandedMember }) => {
  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-700">
      {/* Member Image */}
      <div className="h-48 bg-gradient-to-br from-blue-500 to-teal-500 relative overflow-hidden">
        <Picture
          priority={false}
          src={navigator?.profileImage}
          alt={navigator?.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <div className="bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-slate-900">
            {navigator?.yearsInBusiness} years experience
          </div>
        </div>
      </div>

      {/* Member Info */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white mb-1">{navigator?.name}</h3>
          <p className="text-blue-400 font-medium">{navigator?.title}</p>
          <p className="text-gray-300">{navigator?.company}</p>
          <div className="flex items-center text-gray-400 mt-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{navigator?.location}</span>
          </div>
        </div>

        {/* Industry Badge */}
        <div className="mb-4">
          <span className="bg-gradient-to-r from-cyan-600  via-blue-600 to-teal-600 text-white px-3 py-1 rounded-full text-sm">
            {navigator?.industry}
          </span>
        </div>

        {/* Bio Preview */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">{navigator?.bio}</p>

        {/* Specialties */}
        <div className="mb-4">
          <p className="text-white font-medium mb-2">Specialties:</p>
          <div className="flex flex-wrap gap-2">
            {navigator?.interests.slice(0, 2).map((specialty: string, i: number) => (
              <span key={i} className="bg-slate-700 text-gray-300 px-2 py-1 rounded text-xs">
                {specialty}
              </span>
            ))}
            {navigator?.interests.length > 2 && (
              <span className="bg-slate-700 text-gray-300 px-2 py-1 rounded text-xs">
                +{navigator?.interests.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Contact Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-700">
          <div className="flex space-x-3">
            <a href={`tel:${navigator?.phone}`} className="text-blue-400 hover:text-blue-300 transition-colors">
              <Phone className="w-5 h-5" />
            </a>
            <a href={`mailto:${navigator?.email}`} className="text-blue-400 hover:text-blue-300 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
            <a
              href={`https://${navigator?.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              <Globe className="w-5 h-5" />
            </a>
          </div>
          <button
            onClick={() => setExpandedMember(expandedMember === navigator?.id ? null : navigator?.id)}
            className="flex items-center text-blue-400 hover:text-blue-300 transition-colors text-sm"
          >
            {expandedMember === navigator?.id ? (
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
        {expandedMember === navigator?.id && (
          <div className="mt-4 pt-4 border-t border-slate-700">
            <div className="space-y-3">
              <div>
                <p className="text-white font-medium mb-1">Full Bio:</p>
                <p className="text-gray-300 text-sm">{navigator?.bio}</p>
              </div>
              <div>
                <p className="text-white font-medium mb-1">All Specialties:</p>
                <div className="flex flex-wrap gap-2">
                  {navigator?.interests.map((interest: string, i: number) => (
                    <span key={i} className="bg-slate-700 text-gray-300 px-2 py-1 rounded text-xs">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex items-center text-gray-300">
                  <Phone className="w-4 h-4 mr-2 text-blue-400" />
                  <a href={`tel:${navigator?.phone}`} className="hover:text-blue-400">
                    {navigator?.phone}
                  </a>
                </div>
                <div className="flex items-center text-gray-300">
                  <Mail className="w-4 h-4 mr-2 text-blue-400" />
                  <a href={`mailto:${navigator?.email}`} className="hover:text-blue-400">
                    {navigator?.email}
                  </a>
                </div>
                <div className="flex items-center text-gray-300">
                  <Globe className="w-4 h-4 mr-2 text-blue-400" />
                  <a
                    href={`https://${navigator?.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400"
                  >
                    {navigator?.website}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NavigatorCard
