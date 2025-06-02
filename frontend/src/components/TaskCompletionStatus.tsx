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
  // Render a checkbox when the task hasn't been completed or when it is in edit mode
  if (isEditable || !completedAt) {
    return (
      <label className="flex flex-row gap-2 items-center cursor-pointer text-[18px]">
        Completed
        <input
          data-testid="task-completion-checkbox"
          type="checkbox"
          name="task-completion-checkbox"
          className="cursor-pointer h-[20px] w-[20px]"
          onChange={onChange}
          defaultChecked={!!completedAt}
        />
      </label>
    )
  } else {
    // Otherwise, render task completion date
    return (
      <span
        data-testid="task-completion-text"
        className="h-full font-light lg:h-auto"
      >
        Completed at {new Date(completedAt).toLocaleString()}
      </span>
    )
  }
}

export default TaskCompletionStatus
