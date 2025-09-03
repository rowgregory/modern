const TopPerformerItem = ({ name, subtitle, amount, rank, color }: any) => (
  <div className="flex items-center justify-between p-3 bg-gray-800/20 rounded-xl border border-gray-700/30 hover:border-gray-600/30 transition-colors">
    <div className="flex items-center space-x-3">
      <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white font-bold text-sm`}>
        {name.charAt(0)}
      </div>
      <div>
        <p className="text-white font-medium text-sm">{name}</p>
        <p className="text-gray-400 text-xs">{subtitle}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-green-400 font-bold text-sm">{amount}</p>
      <p className="text-yellow-400 text-xs">#{rank}</p>
    </div>
  </div>
)

export default TopPerformerItem
