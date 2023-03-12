const sheetUrl = document.getElementById('sheetUrl')
const itemNum = document.getElementById('itemNum')

sheetUrl.addEventListener('keyup', () => {
  chrome.storage.local.set({ sheetUrlValue: sheetUrl.value })
})

itemNum.addEventListener('keyup', () => {
  chrome.storage.local.set({ itemNumValue: itemNum.value })
})

chrome.storage.local.get(['sheetUrlValue', 'itemNumValue'], ({ sheetUrlValue, itemNumValue }) => {
  sheetUrl.value = sheetUrlValue || ''
  itemNum.value = itemNumValue || ''
})
