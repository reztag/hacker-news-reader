const getSiteHostname = siteUrl => {
  if (!siteUrl) {
    return '';
  }

  try {
    const normalizedUrl = siteUrl.includes('//') ? siteUrl : `http://${siteUrl}`;
    const { hostname } = new URL(normalizedUrl);
    return hostname.startsWith('www.') ? hostname.slice(4) : hostname;
  } catch {
    return '';
  }
};

export default getSiteHostname;
