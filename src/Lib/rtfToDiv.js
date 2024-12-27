import highlight from './highlight';

const stringToArrayBuffer = (string) => {
  const buffer = new ArrayBuffer(string.length);
  const bufferView = new Uint8Array(buffer);
  for (let i = 0; i < string.length; i += 1) {
    bufferView[i] = string.charCodeAt(i);
  }
  return buffer;
};

const createHtml = async (el, text, query) => {
  const { RTFJS } = await import('rtf.js');
  RTFJS.loggingEnabled(false);

  const doc = new RTFJS.Document(stringToArrayBuffer(text), {});
  const html = await doc.render();
  html.forEach((info) => {
    let content = info.innerHTML;
    const { style } = info;

    // Replace top numbers with barcode
    if (content.includes('>*')) {
      content = content.replace('>', "class='CCode'>");
    }

    // Remove color attribute
    content = content.replaceAll(/color:\s*[^;]+;/g, '');

    // Reset font-size attribute to 12pt
    content = content.replaceAll(/font-size: \d{0,2}pt;/g, 'font-size: 12pt');

    // Rebuild the parent node with its styles
    const div = document.createElement('div');
    for (let i = 0; i < style.length; i += 1) {
      const property = style[i];
      div.style.setProperty(property, style.getPropertyValue(property));
      div.style.setProperty('text-align', 'justify');
    }
    div.innerHTML = content;

    el.appendChild(div);
  });

  el.innerHTML = highlight(el.innerHTML, query);

  return el;
};

const rtfToHtml = async (rtfText, query) => {
  let el = document.createElement('div');
  el.setAttribute('id', 'el');

  if (!rtfText) {
    return el;
  }

  el = await createHtml(el, rtfText, query);

  // delete auxiliary node
  el.remove();

  return el;
};

const rtfToDiv = async (rtfText, query) => {
  const html = await rtfToHtml(rtfText, query);

  const div = document.createElement('div');
  if (!html) {
    div.innerHTML =
      '<p style="text-align: center;margin-bottom: 2rem">No hay texto para esta acordada</p>';
    return div;
  }

  div.appendChild(html);

  return div;
};
export default rtfToDiv;
