import React, { useEffect, useState } from 'react'

import * as Dom from '../../utils/dom'
import { THEME } from '../../constants'

const src = 'https://utteranc.es/client.js'
const branch = 'master'
const DARK_THEME = 'photon-dark'
const LIGHT_THEME = 'github-light'

export const Utterances = ({ repo }) => {
  const rootElm = React.createRef()
  const [isLoaded, setIsloaded] = useState(false)

  useEffect(() => {
    const isDarkTheme = Dom.hasClassOfBody(THEME.DARK)
    const utterances = document.createElement('script')
    const utterancesConfig = {
      src,
      repo,
      branch,
      theme: isDarkTheme ? DARK_THEME : LIGHT_THEME,
      label: 'comment',
      async: true,
      'issue-term': 'pathname',
      crossorigin: 'anonymous',
    }

    Object.keys(utterancesConfig).forEach(configKey => {
      utterances.setAttribute(configKey, utterancesConfig[configKey])
    })
    rootElm.current.appendChild(utterances)
  }, [])

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (rootElm.current && rootElm.current.offsetHeight > 100) {
        setIsloaded(true)
      }
    })
    observer.observe(rootElm.current)
  }, [])

  return (
    <div className="utterances" ref={rootElm}>
      {!isLoaded && (
        <p className="bounce-line" style={{ textAlign: 'center' }}>
          댓글 불러오는 중...!
        </p>
      )}
    </div>
  )
}
