function isFunction(value) {
  if(value === null || value === undefined) return false

  const tag = {}.toString.call(value)
  return tag == '[object Function]' || tag == '[object AsyncFunction]' ||
    tag == '[object GeneratorFunction]' || tag == '[object Proxy]'
}

export const createActionCreator = (
  actionName,
  getPayload = args => args,
  metaCreator = () => ({})
) => {
  const actionCreator = data => {
    const meta = isFunction(metaCreator) ? metaCreator(data) : {}
    const payload = getPayload(data)
    
    let action = {
      type: actionName,
      meta
    }
    
    if (payload instanceof Promise || payload && isFunction(payload.then)) {
      action.payload = {
        promise: payload,
        data
      }
    } else if(isFunction(payload)) {
      action = payload
    } else {
      action.payload = payload
    }
    
    return action
  }
  
  actionCreator.type = actionName
  actionCreator.toString = function () {
    return actionName
  }
  
  return actionCreator
}

export default createActionCreator
