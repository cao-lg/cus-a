const IMG_STYLE = [
    'width: 100%;',
    'border-radius: 16px;',
    'margin-top: 5px;',
    'margin-bottom: 5px;',
    'position: relative;',
    'min-width: 48px;,',
    'min-height: 48px;',
    'background-color: rgb(39,43, 59);',
].join('');
const UL_STYLE = ['padding-left: 16px;'].join('');
const P_STYLE = ['margin: 0;'].join('');
const A_STYLE = [' text-decoration: underline;'].join('');
const DIV_STYLE = [
    'font-size: 16px;',
    'font-weight: 400;',
    'line-height: 22px;',
    'color:#FFF;',
].join('');
const BLOCKQUOTE_STYLE = [
    'padding: 0 14px;',
    'margin: 10px 0;',
    'border-left: 2px solid #d0d7de;',
].join('');
const PRE_STYLE = [
    'padding: 10px;',
    'margin: 0;',
    'border-radius: 10px;',
    'background-color: #171717;',
].join('');
const BR_STYLE = ['margin:0;', 'padding:0;', 'height:0;'].join('');
const DEL_STYLE = [].join('');
export const markdownRevert = (html) => [
    `<div style="${DIV_STYLE}">`,
    html
        .replaceAll('<img ', `<img style="${IMG_STYLE}" `)
        .replaceAll('<ul>', `<ul style="${UL_STYLE}" >`)
        .replaceAll('<p>', `<p style="${P_STYLE}" >`)
        .replaceAll('<a>', `<a style="${A_STYLE}" >`)
        .replaceAll('\n', `<p style="${BR_STYLE}"></p>`)
        .replaceAll('<pre>', `<pre style="${PRE_STYLE}" >`)
        .replace(/~~([^~<<>\/]*)~~/g, `<del style="${DEL_STYLE}" >$1</del>`)
        .replaceAll('<blockquote>', `<blockquote style="${BLOCKQUOTE_STYLE}" >`),
    '</div>',
].join('');
//# sourceMappingURL=markdown-revert.js.map