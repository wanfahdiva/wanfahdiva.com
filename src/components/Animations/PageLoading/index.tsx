import Router from 'next/router'
import NProgress from 'nprogress'

let timer: ReturnType<typeof setTimeout>
let state: string
let activeRequests = 0
const timeout = 15000 // 15 detik
let timedout: ReturnType<typeof setTimeout>
const delay = 500
function disable() {
  // To get the scroll position of current webpage
  const TopScroll = window.pageYOffset || document.documentElement.scrollTop
  const LeftScroll = window.pageXOffset || document.documentElement.scrollLeft
  // if scroll happens, set it to the previous value
  window.onscroll = function () {
    window.scrollTo(LeftScroll, TopScroll)
  }
}

function enable() {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  window.onscroll = function () {}
}

function load() {
  if (state === 'loading') {
    // remove error text
    document.getElementById('reloadNeededState')?.remove()
    // add new element if necessary
    timedout = setTimeout(() => {
      addElement()
    }, timeout)
    return
  }
  state = 'loading'

  timer = setTimeout(function () {
    NProgress.start()
    disable()
    document.body.style.overflow = 'hidden'
  }, delay) // only show progress bar if it takes longer than the delay
}

function addElement() {
  // create a new div element
  const errorElement = document.createElement('div')
  errorElement.innerHTML = `
    <small style="color:gray;">Terjadi kesalahan, muat ulang halaman.</small>
  `
  errorElement.setAttribute('id', 'reloadNeededState')
  // add the newly created element and its content into the DOM
  const currentDiv = document.getElementsByClassName('spinner')[0]
  currentDiv?.appendChild(errorElement)
}

function stop() {
  if (activeRequests > 0) {
    return
  }
  enable()
  document.body.style.overflow = 'visible'
  state = 'stop'
  clearTimeout(timer)
  clearTimeout(timedout)
  NProgress.done()
}

Router.events.on('routeChangeStart', load)
// Router.events.on('ro')
Router.events.on('routeChangeComplete', stop)
Router.events.on('routeChangeError', stop)

const originalFetch = window.fetch

window.fetch = async function (...args) {
  if (activeRequests === 0) {
    load()
  }
  activeRequests++
  try {
    const response = await originalFetch(...args)
    return response
  } catch (error) {
    return Promise.reject(error)
  } finally {
    activeRequests -= 1
    if (activeRequests === 0) {
      stop()
    }
  }
}

export default function LoadingPage() {
  return null
}
