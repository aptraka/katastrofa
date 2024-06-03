const UrlParser = {
  parseActiveUrlWithCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    const splitedUrl = this.asUrlSplitter(url);
    return this.asUrlCombiner(splitedUrl);
  },

  parseActiveUrlWithOutCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    return this.asUrlSplitter(url);
  },

  asUrlSplitter(url) {
    const urlsSplits = url.split('/');
    return {
      resource: urlsSplits[1] || null,
      id: urlsSplits[2] || null,
      verb: urlsSplits[3] || null,
    };
  },

  asUrlCombiner(splitedUrl) {
    return (splitedUrl.resource ? `/${splitedUrl.resource}` : '/')
          + (splitedUrl.id ? '/:id' : '')
          + (splitedUrl.verb ? `/${splitedUrl.verb}` : '');
  },
};

export default UrlParser;
