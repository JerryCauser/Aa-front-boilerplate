export const createActionCreator = (
  actionName,
  getPayload = args => args,
  metaCreator = () => ({})
) => {
  const actionCreator = data => {
    const meta = metaCreator instanceof Function ? metaCreator(data) : {}
    const payload = getPayload(data)
    
    let action = {
      type: actionName,
      meta
    }
    
    if (payload instanceof Promise || payload && payload.then instanceof Function) {
      action.payload = {
        promise: payload,
        data
      }
    } else if(payload instanceof Function) {
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
