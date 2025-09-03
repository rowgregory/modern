const QuickActionButton = ({ title, icon: Icon, color, onClick }: any) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-3 w-full p-4 rounded-xl bg-gradient-to-r ${color} text-white font-medium hover:opacity-90 transition-opacity`}
  >
    <Icon className="w-5 h-5" />
    <span>{title}</span>
  </button>
)

export default QuickActionButton
