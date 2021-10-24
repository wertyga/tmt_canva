const path = require('path');
const { getFiles, getPageName, getPagePath } = require('../service/utils');

const PAGES_PATH = path.join(process.cwd(), 'pages');

const getPagesEntries = () => {
  const files = getFiles(PAGES_PATH, /\.tsx/).map(file =>
    file.replace(PAGES_PATH, '')
  );
  return files.reduce((acc, filePath) => {
    const pageName = getPageName(filePath);
    const pagePath = getPagePath(filePath, true);
    return {
      ...acc,
      [pageName]: path.join(process.cwd(), pagePath.replace('../', '')),
    };
  }, {});
};

module.exports = {
  getPagesEntries,
};
