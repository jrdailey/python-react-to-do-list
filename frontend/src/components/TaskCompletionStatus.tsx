interface TaskCompletionStatusProps {
  completedAt?: Date | string | undefined,
  isEditable: boolean,
  onChange?: () => void,
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
          <input
            data-testid="task-completion-checkbox"
            type="checkbox"
            className="cursor-pointer"
            onChange={onChange}
            defaultChecked={!!completedAt}
          />
          &nbsp;Completed
        </label> :
        <span
          data-testid="task-completion-text"
          className="h-full font-light lg:h-auto"
        >
          Completed at {new Date(completedAt).toLocaleString()}
        </span>
      }
    </>
  )
}

export default TaskCompletionStatus
