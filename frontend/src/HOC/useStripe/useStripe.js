import React from 'react'

import {useScript} from './useScript'

let cache = {}

export const useStripe = (locale) => {
  const {isLoaded, error} = useScript('https://js.stripe.com/v3/')
  const [stripe, setStripe] = React.useState(cache[locale])

  React.useEffect(() => {
    if (isLoaded && !error && !cache[locale]) {
      cache[locale] = window.Stripe("fake-key", {locale})
      setStripe(cache[locale])
    }
  }, [isLoaded, error, locale])

  return {
    stripe,
    error,
  }
}