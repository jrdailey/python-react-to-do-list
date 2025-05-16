interface TaskCompletionStatusProps {
  completedAt: Date | undefined,
  isEditable: boolean,
  onChange: () => void,
}

const TaskCompletionStatus = ({
  completedAt,
  isEditable,
  onChange,
}: TaskCompletionStatusProps) => {
  return (
    <>
      {isEditable || !completedAt ?
        <label className="cursor-pointer">
          <input type="checkbox" className="cursor-pointer" onChange={onChange} checked={!!completedAt} />
          &nbsp;Completed
        </label> :
        <span className="h-full font-light lg:h-auto">Completed at {new Date(completedAt).toLocaleString()}</span>
      }
    </>
  )
}

export default TaskCompletionStatus
