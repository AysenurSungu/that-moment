import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useDetectClickOutside } from 'react-detect-click-outside'
import Dropdown from './Dropdown'
import Input from './Input'

const TimePicker = ({
  id,
  placeholder,
  hour,
  setHour,
  minute,
  setMinute,
  disabled,
}) => {
  const [time, setTime] = useState(placeholder ?? '00:00')
  const [toggleDropdown, setToggleDropdown] = useState(false)

  const ref = useDetectClickOutside({
    onTriggered: () => setToggleDropdown(false),
  })

  useEffect(() => {
    setTime(`${hour ?? '00'}:${minute ?? '00'}`)
  }, [hour, minute])

  return (
    <div
      className={classNames('relative isolate z-20', {
        'pointer-events-none': disabled,
      })}
      ref={ref}
    >
      <Input
        id={id}
        state={time}
        setState={setTime}
        setHour={setHour}
        setMinute={setMinute}
        setToggleDropdown={setToggleDropdown}
      />
      {toggleDropdown && (
        <Dropdown
          hour={hour}
          setHour={setHour}
          minute={minute}
          setMinute={setMinute}
        />
      )}
    </div>
  )
}

export default TimePicker
