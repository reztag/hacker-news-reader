const FALLBACK_THUMBNAIL = 'https://miro.medium.com/max/1176/1*F9RzuXseG1VrTjFJd403gw.png';

const getStoryThumbnail = ({ url, link }) => {
  const targetUrl = url || link;

  if (!targetUrl) {
    return FALLBACK_THUMBNAIL;
  }

  return `https://www.google.com/s2/favicons?sz=256&domain_url=${encodeURIComponent(targetUrl)}`;
};

export { FALLBACK_THUMBNAIL };
export default getStoryThumbnail;
