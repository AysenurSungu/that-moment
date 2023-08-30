import { Range, getTrackBackground } from 'react-range'

const Hour = ({ defaultValues, state, handleChange }) => {
  return (
    <Range
      step={defaultValues.STEP}
      min={defaultValues.MIN}
      max={defaultValues.MAX}
      values={state.values}
      onChange={(values) => handleChange({ values })}
      renderMark={({ props, index }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: '16px',
            width: '2px',
            backgroundColor:
              index * defaultValues.STEP < state.values[0]
                ? '#1A56DB'
                : '#E5E7EB',
          }}
        />
      )}
      renderTrack={({ props, children }) => (
        <div
          onMouseDown={props.onMouseDown}
          onTouchStart={props.onTouchStart}
          style={{
            ...props.style,
            height: '20px',
            display: 'flex',
            width: '100%',
          }}
        >
          <div
            ref={props.ref}
            style={{
              height: '5px',
              width: '100%',
              borderRadius: '4px',
              background: getTrackBackground({
                values: state.values,
                colors: ['#1A56DB', '#E5E7EB'],
                min: defaultValues.MIN,
                max: defaultValues.MAX,
              }),
              alignSelf: 'center',
            }}
          >
            {children}
          </div>
        </div>
      )}
      renderThumb={({ props, isDragged }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: '24px',
            width: '24px',
            borderRadius: '4px',
            backgroundColor: '#FFF',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0px 2px 12px rgba(0,0,0,0.12)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              bottom: '-24px',
              color: '#fff',
              fontWeight: 'medium',
              fontSize: '12px',
              padding: '3px 4px',
              borderRadius: '4px',
              backgroundColor: '#1A56DB',
            }}
          >
            {state.values[0]}
          </div>
          <div
            style={{
              height: '12px',
              width: '2px',
              backgroundColor: isDragged ? '#1A56DB' : '#E5E7EB',
            }}
          />
        </div>
      )}
    />
  )
}

export default Hour
