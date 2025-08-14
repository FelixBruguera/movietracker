const TooltipWrapper = (props) => {
    const { isVisible, label } = props
    return (
    <div className="bg-stone-900 p-2 rounded-sm w-30" style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
      {isVisible && (
        <>
            <p className="font-bold">{label}</p>
            {props.children}
          </>
      )}
    </div>
  )
}

export default TooltipWrapper