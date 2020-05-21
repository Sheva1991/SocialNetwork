import React, { useState, useEffect, ChangeEvent } from 'react';

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)
    // тоже самое только расписанное, без деструктированнного присваивания
    // let editMode = useState(false)
    // let editMode = stateWithSetState[0]
    // let setEditMode = stateWithSetState[1]
    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    return (
        <div>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status || '----'}</span>
                </div >
            }
            {editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode}
                        type="text" value={status} />
                </div >
            }
        </div >
    )
}

export default ProfileStatusWithHooks;