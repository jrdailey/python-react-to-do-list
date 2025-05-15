import StandardButton from './StandardButton'

interface TaskActionsProps {
  isEditable: boolean,
  onTaskDelete: () => void,
  onTaskEdit: () => void,
  onTaskSave: () => void,
}

const TaskActions = ({
  isEditable,
  onTaskDelete,
  onTaskEdit,
  onTaskSave,
}: TaskActionsProps) => {
  return (
    <>
      {isEditable ?
        <StandardButton
          text="Save"
          color="green"
          onClick={onTaskSave}
        /> :
        <StandardButton
          text="Edit"
          color="gray"
          onClick={onTaskEdit}
        />
      }
      <StandardButton
        text='Delete'
        color='red'
        onClick={onTaskDelete}
      />
    </>
  )
}

export default TaskActions
