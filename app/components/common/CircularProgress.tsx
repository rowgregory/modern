const CircularProgress = ({ percentage, value, color = 'rgb(34, 197, 94)' }: any) => {
  const radius = 45
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = `${circumference} ${circumference}`
  const strokeDashoffset = circumference - ((percentage || 0) / 100) * circumference

  return (
    <div className="relative flex items-center justify-center">
      <svg className="transform -rotate-90" width="100" height="100">
        <circle cx="50" cy="50" r={radius} stroke="rgb(55, 65, 81)" strokeWidth="6" fill="transparent" />
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke={color}
          strokeWidth="6"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-xl font-bold text-white">{Number(value)?.toFixed(1)}%</div>
      </div>
    </div>
  )
}

export default CircularProgress
