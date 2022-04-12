import Util from '../util.js';
const componentNameAnchor = '$$componentName';
const currentContextAnchor = '$$currentContent';
const repositoryAnchor = '$$repositoryName';
const template = `
export default class $$componentNameService {
  constructor({ repository: $$repositoryName }) {
    $$currentContent = $$repositoryName;
  }

  create(data) {
    return $$currentContent.create(data);
  }

  read(query) {
    return $$currentContent.read(query);
  }

  update(id, data) {
    return $$currentContent.update(id, data);
  }

  delete(id) {
    return $$currentContent.delete(id);
  }
}`;

export function serviceTemplate(componentName, repositoryName) {
  const currentContent = `this.${repositoryName}`;
  const txtFile = template
    .replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName))
    .replaceAll(currentContextAnchor, currentContent)
    .replaceAll(repositoryAnchor, repositoryName);

  return {
    fileName: `${componentName}Service`,
    template: txtFile,
  };
}
