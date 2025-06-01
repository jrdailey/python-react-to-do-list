interface ErrorDisplayProps {
  errorMessage: string,
}

const ErrorDisplay = ({
  errorMessage,
}: ErrorDisplayProps) => {
  return (
    <div role="alert" className="my-2 p-2 font-semibold text-white text-center rounded-md bg-red-400 border-2 border-red-800">
      {errorMessage}
    </div>
  )
}

export default ErrorDisplay
