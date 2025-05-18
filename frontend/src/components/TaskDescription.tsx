import { ChangeEvent } from 'react'

interface TaskDescriptionProps {
  description: string,
  isEditable: boolean,
  onUpdate?: (event: ChangeEvent<HTMLInputElement>) => void,
}

const TaskDescription = ({
  description,
  isEditable,
  onUpdate,
}: TaskDescriptionProps) => {
  return (
    <>
      {isEditable ?
        <input
          className="w-full outline rounded-sm p-1"
          type="text"
          value={description}
          autoFocus={true}
          onChange={onUpdate}
        /> :
        <span
          className="w-full h-full p-0.5 break-normal font-medium lg:h-auto">
          {description}
        </span>
      }
    </>
  )
}

export default TaskDescription
