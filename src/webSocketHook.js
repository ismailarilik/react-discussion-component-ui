import { useState, useEffect } from 'react'

// Small utility that we need to handle JSON messages
const formatMessage = data => {
  try {
    const parsed = JSON.parse(data)
    return parsed
  } catch (e) {
    return data
  }
}

// Get epoch timestamp
const getTimestamp = () => {
  return new Date().getTime()
}

// Define a custom hook
// @param socketUrl: Accept the URL to connect to
// @param defaultRetry: Number of times the hook should retry a connection
// @param retryInterval: The interval between retries
const useWebSocket = ({ socketUrl, defaultRetry = 3, retryInterval = 1500 } = {}) => {
  // Message and timestamp
  const [data, setData] = useState()
  // Send function
  const [send, setSend] = useState(() => () => undefined)
  // State of our connection
  const [retry, setRetry] = useState(defaultRetry)
  // Retry counter
  const [readyState, setReadyState] = useState(false)

  useEffect(() => {
    const ws = new WebSocket(socketUrl)
    ws.onopen = () => {
      console.log('Connected to socket')
      setReadyState(true)

      // Function to send messages
      setSend(() => {
        return data => {
          try {
            const d = JSON.stringify(data)
            ws.send(d)
            return true
          } catch (e) {
            return false;
          }
        }
      })

      // Receive messages
      ws.onmessage = event => {
        const msg = formatMessage(event.data)
        setData({ message: msg, timestamp: getTimestamp() })
      }
    }

    // On close, we should update connection state and retry connection
    ws.onclose = () => {
      setReadyState(false)
      // Retry logic
      if (retry > 0) {
        setTimeout(() => {
          setRetry(retry => retry - 1)
        }, retryInterval)
      }
    }

    return () => {
      // Do somethings on unmount
    }
  }, [retry, socketUrl, retryInterval])

  return { send, data, readyState }
}

export default useWebSocket
