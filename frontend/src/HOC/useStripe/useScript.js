import React from 'react'

let cache = []
const isCached = src => cache.includes(src)

export const useScript = src => {
  const [state, setState] = React.useState({
    isLoaded: isCached(src),
    hasError: false,
  })

  React.useEffect(() => {
    if (!src || isCached(src)) {
      return
    }

    cache.push(src)

    const script = document.createElement('script')
    script.src = src
    script.async = true

    const onScriptLoad = () => {
      setState(s => ({...s, isLoaded: true, hasError: false}))
    }
    const onScriptError = () => {
      const index = cache.indexOf(src)
      if (index >= 0) {
        cache.splice(index, 1)
      }
      script.remove()
      setState(s => ({...s, hasError: true, isLoaded: true}))
    }

    script.addEventListener('load', onScriptLoad)
    script.addEventListener('error', onScriptError)

    document.body.appendChild(script)

    return () => {
      script.removeEventListener('load', onScriptLoad)
      script.removeEventListener('error', onScriptError)
    }
  }, [src])

  return state
}