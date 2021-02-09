export const browser = {
  isIOS() {
    return /(iPhone|iPod|iPad)/gi.test(window.navigator.userAgent)
  },

  isAndroid() {
    return /(Android|BlackBerry)/gi.test(window.navigator.userAgent)
  },

  isMobile() {
    return this.isIOS() || this.isAndroid()
  },

  getOrigin() {
    return window.location.origin
  },

  getUrlWithOrigin(url: string) {
    return `${window.location.origin}${url}`
  },

  getPathname() {
    return window.location.pathname
  },

  getSearch() {
    return window.location.hash.substring(1)
  },

  getUserAgent() {
    return window.navigator.userAgent
  },

  close() {
    return window.close()
  },

  navigateTo(url: string) {
    window.location.assign(url)
  },
}
