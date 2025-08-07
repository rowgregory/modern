const getInputStyles = (variant: string, hasError: boolean, disabled: boolean) => {
  const baseStyles =
    'w-full py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed'

  const variantStyles: any = {
    default: 'px-4 bg-gray-800/50 border border-gray-600 rounded-lg',
    filled: 'px-4 bg-gray-700/50 border-0 rounded-lg',
    outlined: 'px-4 bg-transparent border-2 border-gray-600 rounded-lg'
  }

  const errorStyles = hasError ? 'border-red-500 focus:border-red-500 focus:ring-red-400' : ''
  const disabledStyles = disabled ? 'bg-gray-800/30' : ''

  return `${baseStyles} ${variantStyles[variant]} ${errorStyles} ${disabledStyles}`
}

export default getInputStyles
