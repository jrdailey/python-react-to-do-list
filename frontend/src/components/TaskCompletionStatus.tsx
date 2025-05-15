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
      {isEditable ?
        <label>
          <input type="checkbox" onChange={onChange} checked={!!completedAt} />
          &nbsp;Complete
        </label> :
        completedAt && <span className="h-full font-light lg:h-auto">Completed at {completedAt.toLocaleString()}</span>
      }
    </>
  )
}

export default TaskCompletionStatus
