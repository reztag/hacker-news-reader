chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type !== 'FETCH_PREVIEW_HTML' || !message.url) {
    return false;
  }

  fetch(message.url, {
    redirect: 'follow',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Preview request failed with status ${response.status}`);
      }

      return response.text();
    })
    .then(html => sendResponse({ ok: true, html }))
    .catch(error => sendResponse({ ok: false, error: error.message }));

  return true;
});
