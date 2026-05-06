import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{"layout":"home","hero":{"name":"客户数据分析技术","text":"AI时代高职课程","tagline":"成为数据驱动的分析指挥官","actions":[{"theme":"brand","text":"开始学习","link":"/week01/"},{"theme":"alt","text":"课程大纲","link":"/syllabus"}]},"features":[{"icon":"📊","title":"阶段一：数据基础","details":"数据觉醒、数据清洗、客户画像与RFM分析、数据可视化 — 建立数据分析的基本功","link":"/week01/"},{"icon":"🔍","title":"阶段二：分析方法","details":"客户细分、CLV分析、流失预警、A/B测试 — 掌握洞察客户行为的核心方法","link":"/week05/"},{"icon":"🚀","title":"阶段三：商业应用","details":"精准营销、全渠道体验、会员体系、数据隐私 — 用数据驱动业务增长","link":"/week09/"},{"icon":"🤖","title":"阶段四：AI赋能与实战","details":"AI时代的分析、综合实战工作坊、数据叙事、成果展示 — 成为AI时代的分析指挥官","link":"/week13/"}]},"headers":[],"relativePath":"index.md","filePath":"index.md"}');
const _sfc_main = { name: "index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
