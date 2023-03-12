chrome.tabs.onCreated.addListener(function(tab) {
  if (!tab.index) init()
})

async function init () {
  chrome.storage.local.get(['sheetUrlValue', 'itemNumValue'], async ({ sheetUrlValue, itemNumValue }) => {
    if (!sheetUrlValue) return
    const sheetID = sheetUrlValue.replace(/.+\/d\/|\/.+/g, '')
    try {
      const json = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/配置!A2:D?key=AIzaSyD8toAK7am_TNK2qCQ9HfzCCftzlmnoY9I`).then(json => json.json())
      for (const x of json.values) {
        if (x[0] == itemNumValue) {
          if (x[3] == 'TRUE') resize([x[2].split('x'), x[1].split('x')].flat())
        }
      }
    } catch {
      setTimeout(function () {
        init()
      }, 1000)
    }
  })
}

async function resize (data) {
  const [getDisplay, xAxis, yAxis, width, height] = data.map(x => Number(x))
  chrome.system.display.getInfo(function (info) {
    const targetDisplay = info[getDisplay - 1]
    const left = targetDisplay.bounds.left + xAxis
    const top = targetDisplay.bounds.top + yAxis
    chrome.windows.getCurrent((window) => {
      chrome.windows.update(window.id, { left, top, width, height })
    })
  })
}
