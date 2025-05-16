const colorMap = {
  blue: 'bg-blue-500',
  gray: 'bg-slate-400',
  green: 'bg-green-500',
  red: 'bg-red-500',
}

type ColorMapKeys = keyof typeof colorMap

interface StandardButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined,
  color?: ColorMapKeys,
  text: string,
  onClick: () => void,
}

const StandardButton = ({
  type = 'button',
  color = 'gray',
  text,
  onClick,
}: StandardButtonProps) => {
  const bgColor = colorMap[color]

  return (
    <button
      type={type}
      className={`rounded-md px-4 py-2 max-h-[40px] font-semibold text-white opacity-100 cursor-pointer hover:opacity-90 ${bgColor}`}
      onClick={onClick}>
      {text}
    </button >
  )
}

export default StandardButton
