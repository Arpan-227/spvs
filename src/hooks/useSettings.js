// src/hooks/useSettings.js
// Usage: const { settings, loading } = useSettings()
// Then: settings.school.name, settings.contact.phone1, settings.admission.open

import { useState, useEffect } from 'react'
import { settingsAPI } from '../api'

var cache = null  // in-memory cache so multiple components don't re-fetch

export default function useSettings() {
  var [settings, setSettings] = useState(cache || {})
  var [loading,  setLoading]  = useState(!cache)

  useEffect(function() {
    if (cache) { setSettings(cache); setLoading(false); return }
    settingsAPI.getAll()
      .then(function(res){
        cache = res.data || {}
        setSettings(cache)
        setLoading(false)
      })
      .catch(function(){ setLoading(false) })
  }, [])

  return { settings, loading }
}