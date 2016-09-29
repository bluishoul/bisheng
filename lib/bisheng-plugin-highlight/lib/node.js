'use strict';

const hljs = require('highlight.js');
const JsonML = require('jsonml.js/lib/utils');

function getCode(node) {
  return JsonML.getChildren(
    JsonML.getChildren(node)[0] || ''
  )[0] || '';
}

function highlight(node) {
  if (!JsonML.isElement(node)) return;

  if (JsonML.getTagName(node) !== 'pre') {
    JsonML.getChildren(node).forEach(highlight);
    return;
  }
  const code = getCode(node);
  const highlighted = hljs.highlightAuto(code);
  JsonML.getAttributes(node).highlighted = highlighted.value;
  JsonML.getAttributes(node).language = highlighted.language;
}

module.exports = (markdownData/* , config*/) => {
  highlight(markdownData.content);
  return markdownData;
};
