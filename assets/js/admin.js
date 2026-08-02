const STORAGE_KEY = 'ai-share-site-products-draft';
const CONTENT_STORAGE_KEY = 'ai-share-site-content-draft';
const GITHUB_SETTINGS_KEY = 'ai-share-site-github-settings';
const GITHUB_TOKEN_KEY = 'ai-share-site-github-token';
const GITHUB_REMEMBER_TOKEN_KEY = 'ai-share-site-github-remember-token';
const AUTH_KEY = 'ai-share-site-admin-auth';
const ADMIN_PASSWORD = 'aifenxiang';
const IMAGE_UPLOAD_DIR = 'assets/images';
const pendingImageUploads = new Map();

const SAMPLE_PRODUCTS = [
  {
    id: 'writer',
    name: '智能写作助手',
    tag: '文案 / 摘要 / 改写',
    version: 'v2.1',
    icon: 'assets/img/icons/writer.svg',
    preview: 'assets/img/previews/writer.svg',
    desc: '适合日常写作、文章摘要、标题生成和内容润色。',
    steps: ['下载并解压软件包', '按照教程填写基础配置', '打开软件即可开始生成内容'],
    password: 'ai123',
    url: 'https://example.com/download/ai-writer'
  },
  {
    id: 'image',
    name: 'AI 绘图工具',
    tag: '图片生成 / 素材制作',
    version: 'v1.8',
    icon: 'assets/img/icons/image.svg',
    preview: 'assets/img/previews/image.svg',
    desc: '用于快速生成封面图、头像、网页配图和产品展示素材。',
    steps: ['安装运行环境', '导入提示词模板', '选择尺寸后开始生成'],
    password: 'pic888',
    url: 'https://example.com/download/ai-image'
  },
  {
    id: 'office',
    name: '办公自动化助手',
    tag: '表格 / 文档 / 批处理',
    version: 'v3.0',
    icon: 'assets/img/icons/office.svg',
    preview: 'assets/img/previews/office.svg',
    desc: '帮助整理表格、批量处理文档、生成日报周报，提高办公效率。',
    steps: ['下载后阅读说明文档', '把文件放到 input 文件夹', '点击开始批量处理'],
    password: 'office66',
    url: 'https://example.com/download/office-helper'
  },
  {
    id: 'video',
    name: '视频处理工具箱',
    tag: '剪辑 / 转码 / 字幕',
    version: 'v1.5',
    icon: 'assets/img/icons/video.svg',
    preview: 'assets/img/previews/video.svg',
    desc: '支持常见视频格式转换、字幕提取、片段裁剪和批量压缩。',
    steps: ['选择视频文件或文件夹', '设置输出格式与清晰度', '开始处理并查看输出目录'],
    password: 'video99',
    url: 'https://example.com/download/video-box'
  },
  {
    id: 'prompt',
    name: '提示词管理器',
    tag: 'Prompt / 模板库',
    version: 'v1.2',
    icon: 'assets/img/icons/prompt.svg',
    preview: 'assets/img/previews/prompt.svg',
    desc: '用于收藏、分类和快速调用常用提示词，适合知识分享和内容创作。',
    steps: ['导入内置模板库', '按场景新建分类', '一键复制提示词到 AI 工具'],
    password: 'prompt5',
    url: 'https://example.com/download/prompt-manager'
  }
];

let products = [];
let siteContent = {};

const SAMPLE_CONTENT = {
  common: {
    brand: 'AI分享',
    footer: '© 2026 AI分享 · 个人软件分享与知识记录平台'
  },
  pages: {
    index: {
      title: '首页 - AI分享',
      description: 'AI分享个人软件分享平台首页',
      eyebrow: '好用软件 · 实用教程 · 免费分享',
      heading: '把我常用的 AI 软件和教程整理给你',
      lead: '这里是个人软件分享平台。每个软件都按一行展示，包含软件图标、界面图、使用说明，以及需要输入对应密码才能查看的下载链接。',
      primaryAction: '查看软件列表',
      secondaryAction: '阅读使用教程',
      featuredTitle: '精选软件',
      featuredText: '先放 3 个常用工具，后续可以继续添加。',
      allSoftwareButton: '全部软件',
      qrImage: '',
      qrText: '',
      infoCards: [
        { title: '一行一个产品', text: '图标、界面预览、使用说明、下载入口都放在同一行，查找更直观。' },
        { title: '密码查看链接', text: '输入对应密码后，页面才会显示下载链接，适合简单分享。' },
        { title: '纯静态网站', text: 'HTML、CSS、JS 即可运行，双击 index.html 就能本地预览。' }
      ]
    },
    software: {
      title: 'AI软件 - AI分享',
      description: 'AI分享软件列表页面',
      eyebrow: 'AI软件',
      heading: '软件列表',
      lead: '所有软件按照横向卡片排列。需要修改内容时，打开“网站管理”页面即可逐项编辑。',
      sectionTitle: '全部软件',
      sectionText: '输入正确密码后显示对应软件下载地址。',
      searchPlaceholder: '搜索软件名称、分类、说明'
    },
    tutorials: {
      title: '教程文档 - AI分享',
      description: 'AI分享软件教程页面',
      eyebrow: '教程文档',
      heading: '软件使用教程',
      lead: '这里可以放安装教程、配置教程、常见问题和使用技巧。',
      articles: [
        { title: '01 · 如何下载软件', text: '在软件列表中找到对应软件，输入分享密码，验证成功后点击下载链接。' },
        { title: '02 · 如何安装运行', text: '下载压缩包后先解压，再查看软件目录中的 README 或使用说明。' },
        { title: '03 · 常见问题处理', text: '如果打不开软件，请检查运行环境、杀毒软件拦截和文件路径是否包含特殊字符。' },
        { title: '04 · 软件更新说明', text: '软件版本更新后，会在软件列表中同步显示版本号和新的使用说明。' }
      ]
    },
    download: {
      title: '下载须知 - AI分享',
      description: 'AI分享下载须知与下载入口页面',
      eyebrow: '下载须知',
      heading: '下载前请先阅读',
      lead: '本页面说明下载规则，也保留一份可解锁的软件下载区域，方便用户集中获取资源。',
      notice: '当前是纯静态网站演示版，密码校验在前端 JS 中完成；如果以后要做真正安全的私密下载，可以再接入后端接口或网盘权限。',
      sectionTitle: '下载入口',
      sectionText: '每个软件都有独立密码。',
      searchPlaceholder: '搜索要下载的软件'
    },
    about: {
      title: '关于我 - AI分享',
      description: '关于 AI分享 个人网站',
      eyebrow: '关于我',
      heading: '关于 AI分享',
      lead: 'AI分享是一个个人知识分享和软件资源整理平台，用来记录我觉得实用的 AI 工具、办公软件、使用教程和下载说明。',
      qrImage: '',
      qrText: '',
      cards: [
        { title: '网站定位', text: '分享个人常用软件、使用经验和教程文档。' },
        { title: '内容形式', text: '以软件列表和教程文章为主，保持页面简单清晰。' },
        { title: '后续扩展', text: '可以继续增加搜索、分类筛选、留言反馈和后台管理。' }
      ]
    }
  }
};

function isAuthenticated() {
  return sessionStorage.getItem(AUTH_KEY) === 'ok';
}

function setAuthenticated(value) {
  if (value) {
    sessionStorage.setItem(AUTH_KEY, 'ok');
  } else {
    sessionStorage.removeItem(AUTH_KEY);
  }
}

function showAdminContent() {
  document.querySelector('[data-login-panel]').hidden = true;
  document.querySelector('[data-admin-content]').hidden = false;
}

function showLogin(message = '尚未验证', type = '') {
  document.querySelector('[data-login-panel]').hidden = false;
  document.querySelector('[data-admin-content]').hidden = true;
  const status = document.querySelector('[data-login-status]');
  status.textContent = message;
  status.dataset.type = type;
}

async function unlockAdmin() {
  if (!isAuthenticated()) return;
  showAdminContent();
  await loadInitialProducts();
  await loadInitialContent();
}

function escapeHtml(str) {
  return String(str).replace(/[&<>'"]/g, s => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[s]));
}

function normalizeProduct(item, index) {
  const steps = Array.isArray(item.steps) ? item.steps : String(item.steps || '').split('\n').map(s => s.trim()).filter(Boolean);
  const previewImages = Array.isArray(item.previewImages) && item.previewImages.length
    ? item.previewImages.filter(Boolean)
    : [item.preview].filter(Boolean);
  const links = Array.isArray(item.links) && item.links.length
    ? item.links.slice(0, 2).map((link, linkIndex) => ({
        label: link.label || `下载链接 ${linkIndex + 1}`,
        url: link.url || ''
      }))
    : [{ label: '下载链接 1', url: item.url || '' }, { label: '备用链接', url: '' }];
  while (links.length < 2) links.push({ label: links.length === 0 ? '下载链接 1' : '备用链接', url: '' });
  return {
    id: item.id || `product-${index + 1}`,
    name: item.name || '',
    tag: item.tag || '',
    version: item.version || '',
    icon: item.icon || '',
    preview: item.preview || previewImages[0] || '',
    previewImages,
    desc: item.desc || '',
    steps,
    password: item.password || '',
    url: item.url || links[0]?.url || '',
    links
  };
}

function makeEmptyProduct() {
  const id = `product-${Date.now().toString(36)}`;
  return {
    id,
    name: '新软件',
    tag: '分类 / 标签',
    version: 'v1.0',
    icon: 'assets/img/icons/writer.svg',
    preview: 'assets/img/previews/writer.svg',
    previewImages: ['assets/img/previews/writer.svg'],
    desc: '',
    steps: ['第一步', '第二步', '第三步'],
    password: '',
    url: '',
    links: [
      { label: '下载链接 1', url: '' },
      { label: '备用链接', url: '' }
    ]
  };
}

function setStatus(message, type = '') {
  const box = document.querySelector('[data-status]');
  box.textContent = message;
  box.dataset.type = type;
}

function setGithubStatus(message, type = '') {
  const box = document.querySelector('[data-github-status]');
  if (!box) return;
  box.textContent = message;
  box.dataset.type = type;
}

function updateCount() {
  document.querySelector('[data-count]').textContent = products.length;
}

async function fetchProducts() {
  if (location.protocol === 'file:') {
    return SAMPLE_PRODUCTS.map(normalizeProduct);
  }
  const response = await fetch('data/products.json', { cache: 'no-store' });
  if (!response.ok) throw new Error('products.json 读取失败');
  const data = await response.json();
  if (!Array.isArray(data)) throw new Error('products.json 格式不正确');
  return data.map(normalizeProduct);
}

function cloneContent(content) {
  return JSON.parse(JSON.stringify(content || SAMPLE_CONTENT));
}

function normalizeContent(content) {
  const merged = cloneContent(SAMPLE_CONTENT);
  const incoming = content || {};
  merged.common = { ...merged.common, ...(incoming.common || {}) };
  Object.keys(merged.pages).forEach(key => {
    merged.pages[key] = { ...merged.pages[key], ...(incoming.pages?.[key] || {}) };
  });
  return merged;
}

async function fetchContent() {
  if (location.protocol === 'file:') {
    return cloneContent(SAMPLE_CONTENT);
  }
  const response = await fetch('data/content.json', { cache: 'no-store' });
  if (!response.ok) throw new Error('content.json 读取失败');
  const data = await response.json();
  if (!data || !data.pages) throw new Error('content.json 格式不正确');
  return normalizeContent(data);
}

async function loadInitialContent() {
  const draft = localStorage.getItem(CONTENT_STORAGE_KEY);
  if (draft) {
    siteContent = normalizeContent(JSON.parse(draft));
    renderContentEditor();
    return;
  }
  try {
    siteContent = await fetchContent();
  } catch (error) {
    siteContent = cloneContent(SAMPLE_CONTENT);
  }
  renderContentEditor();
}

async function loadInitialProducts() {
  const draft = localStorage.getItem(STORAGE_KEY);
  if (draft) {
    products = JSON.parse(draft).map(normalizeProduct);
    setStatus('已载入浏览器草稿。', 'ok');
    renderEditor();
    return;
  }
  try {
    products = await fetchProducts();
    setStatus('已载入当前软件数据。', 'ok');
  } catch (error) {
    products = SAMPLE_PRODUCTS.map(normalizeProduct);
    setStatus('未能读取 products.json，已载入示例数据。', 'warn');
  }
  renderEditor();
}

function getContentPath(path) {
  return path.split('.').reduce((target, key) => target?.[key], siteContent);
}

function setContentPath(path, value) {
  const parts = path.split('.');
  const key = parts.pop();
  let target = siteContent;
  parts.forEach(part => {
    if (!target[part]) target[part] = {};
    target = target[part];
  });
  target[key] = value;
}

function contentInput(label, path, rows = 1) {
  const value = getContentPath(path) || '';
  if (rows > 1) {
    return `
      <label class="admin-field full">
        <span>${label}</span>
        <textarea rows="${rows}" data-content-key="${path}">${escapeHtml(value)}</textarea>
      </label>`;
  }
  return `
    <label class="admin-field">
      <span>${label}</span>
      <input type="text" value="${escapeHtml(value)}" data-content-key="${path}">
    </label>`;
}

function contentImageField(label, path) {
  const value = getContentPath(path) || '';
  return `
    <div class="admin-image-field">
      <div class="admin-image-preview-wrap">
        ${value ? `<img class="admin-image-preview" src="${escapeHtml(value)}" alt="${escapeHtml(label)}预览">` : '<div class="empty">暂无图片</div>'}
      </div>
      <div class="admin-image-controls">
        <label class="admin-field">
          <span>${label}路径</span>
          <input type="text" value="${escapeHtml(value)}" data-content-key="${path}">
        </label>
        <label class="admin-file-button">
          <span>选择本地图片</span>
          <input type="file" accept="image/*" data-content-image-key="${path}">
        </label>
        <button class="admin-small-button" type="button" data-action="clear-content-image" data-content-image-key="${path}">清除图片</button>
      </div>
    </div>`;
}

function contentList(label, path, items) {
  const rows = (items || []).map((item, index) => `
    <div class="admin-list-row">
      <label class="admin-field">
        <span>标题</span>
        <input type="text" value="${escapeHtml(item.title || '')}" data-list-path="${path}" data-list-index="${index}" data-list-key="title">
      </label>
      <label class="admin-field">
        <span>内容</span>
        <textarea rows="2" data-list-path="${path}" data-list-index="${index}" data-list-key="text">${escapeHtml(item.text || '')}</textarea>
      </label>
      <button class="admin-small-button" type="button" data-action="delete-content-item" data-list-path="${path}" data-list-index="${index}">删除</button>
    </div>
  `).join('');
  return `
    <div class="admin-field full">
      <span>${label}</span>
      <div class="admin-list-editor">${rows || '<div class="empty">暂无内容项。</div>'}</div>
      <button class="admin-small-button add-row" type="button" data-action="add-content-item" data-list-path="${path}">添加一项</button>
    </div>`;
}

function renderContentCard(title, fields) {
  return `
    <article class="admin-card">
      <div class="admin-card-head">
        <div>
          <span class="tag">页面内容</span>
          <h3>${title}</h3>
        </div>
      </div>
      <div class="admin-fields">${fields}</div>
    </article>`;
}

function renderContentEditor() {
  const editor = document.querySelector('[data-content-editor]');
  if (!editor) return;
  editor.innerHTML = [
    renderContentCard('公共内容', `
      ${contentInput('网站名称', 'common.brand')}
      ${contentInput('页脚文字', 'common.footer')}
    `),
    renderContentCard('首页内容编辑', `
      ${contentInput('网页标题', 'pages.index.title')}
      ${contentInput('网页描述', 'pages.index.description')}
      ${contentInput('眉标', 'pages.index.eyebrow')}
      ${contentInput('主标题', 'pages.index.heading')}
      ${contentInput('主说明', 'pages.index.lead', 3)}
      ${contentInput('主按钮文字', 'pages.index.primaryAction')}
      ${contentInput('副按钮文字', 'pages.index.secondaryAction')}
      ${contentInput('精选区标题', 'pages.index.featuredTitle')}
      ${contentInput('精选区说明', 'pages.index.featuredText')}
      ${contentInput('全部软件按钮', 'pages.index.allSoftwareButton')}
      ${contentImageField('首页二维码图片', 'pages.index.qrImage')}
      ${contentInput('二维码下方文字', 'pages.index.qrText', 2)}
      ${contentList('首页信息卡片', 'pages.index.infoCards', siteContent.pages.index.infoCards)}
    `),
    renderContentCard('AI软件内容编辑', `
      ${contentInput('网页标题', 'pages.software.title')}
      ${contentInput('网页描述', 'pages.software.description')}
      ${contentInput('眉标', 'pages.software.eyebrow')}
      ${contentInput('主标题', 'pages.software.heading')}
      ${contentInput('主说明', 'pages.software.lead', 3)}
      ${contentInput('列表标题', 'pages.software.sectionTitle')}
      ${contentInput('列表说明', 'pages.software.sectionText')}
      ${contentInput('搜索框提示', 'pages.software.searchPlaceholder')}
    `),
    renderContentCard('教程文档内容编辑', `
      ${contentInput('网页标题', 'pages.tutorials.title')}
      ${contentInput('网页描述', 'pages.tutorials.description')}
      ${contentInput('眉标', 'pages.tutorials.eyebrow')}
      ${contentInput('主标题', 'pages.tutorials.heading')}
      ${contentInput('主说明', 'pages.tutorials.lead', 3)}
      ${contentList('教程文章', 'pages.tutorials.articles', siteContent.pages.tutorials.articles)}
    `),
    renderContentCard('下载须知内容编辑', `
      ${contentInput('网页标题', 'pages.download.title')}
      ${contentInput('网页描述', 'pages.download.description')}
      ${contentInput('眉标', 'pages.download.eyebrow')}
      ${contentInput('主标题', 'pages.download.heading')}
      ${contentInput('主说明', 'pages.download.lead', 3)}
      ${contentInput('说明文字', 'pages.download.notice', 3)}
      ${contentInput('下载区标题', 'pages.download.sectionTitle')}
      ${contentInput('下载区说明', 'pages.download.sectionText')}
      ${contentInput('搜索框提示', 'pages.download.searchPlaceholder')}
    `),
    renderContentCard('关于我内容编辑', `
      ${contentInput('网页标题', 'pages.about.title')}
      ${contentInput('网页描述', 'pages.about.description')}
      ${contentInput('眉标', 'pages.about.eyebrow')}
      ${contentInput('主标题', 'pages.about.heading')}
      ${contentInput('主说明', 'pages.about.lead', 3)}
      ${contentImageField('关于我二维码图片', 'pages.about.qrImage')}
      ${contentInput('二维码下方文字', 'pages.about.qrText', 2)}
      ${contentList('关于页卡片', 'pages.about.cards', siteContent.pages.about.cards)}
    `)
  ].join('');
}

function field(label, index, key, value, type = 'text') {
  return `
    <label class="admin-field">
      <span>${label}</span>
      <input type="${type}" value="${escapeHtml(value)}" data-index="${index}" data-key="${key}">
    </label>`;
}

function imageField(label, index, key, value) {
  return `
    <div class="admin-image-field">
      <div class="admin-image-preview-wrap">
        <img class="admin-image-preview" src="${escapeHtml(value)}" alt="${escapeHtml(label)}预览">
      </div>
      <div class="admin-image-controls">
        <label class="admin-field">
          <span>${label}路径</span>
          <input type="text" value="${escapeHtml(value)}" data-index="${index}" data-key="${key}">
        </label>
        <label class="admin-file-button">
          <span>选择本地图片</span>
          <input type="file" accept="image/*" data-index="${index}" data-image-key="${key}">
        </label>
        <button class="admin-small-button" type="button" data-action="clear-image" data-index="${index}" data-image-key="${key}">清除图片</button>
      </div>
    </div>`;
}

function previewImagesField(index, images) {
  const rows = (images || []).map((src, imageIndex) => `
    <div class="admin-list-row preview-row">
      <div class="admin-image-preview-wrap">
        <img class="admin-image-preview" src="${escapeHtml(src)}" alt="界面图片 ${imageIndex + 1}">
      </div>
      <label class="admin-field">
        <span>界面图片 ${imageIndex + 1}</span>
        <input type="text" value="${escapeHtml(src)}" data-index="${index}" data-preview-index="${imageIndex}" data-preview-key="src">
      </label>
      <button class="admin-small-button" type="button" data-action="delete-preview-image" data-index="${index}" data-preview-index="${imageIndex}">删除</button>
    </div>
  `).join('');
  return `
    <div class="admin-field full">
      <span>界面图片组</span>
      <div class="admin-list-editor">${rows || '<div class="empty">暂无界面图片。</div>'}</div>
      <label class="admin-file-button add-row">
        <span>添加界面图片</span>
        <input type="file" accept="image/*" data-index="${index}" data-preview-upload="true">
      </label>
    </div>`;
}

function linksField(index, links) {
  const safeLinks = (links || []).slice(0, 2);
  while (safeLinks.length < 2) safeLinks.push({ label: safeLinks.length === 0 ? '下载链接 1' : '备用链接', url: '' });
  return safeLinks.map((link, linkIndex) => `
    <div class="admin-list-row link-row">
      <label class="admin-field">
        <span>链接 ${linkIndex + 1} 名称</span>
        <input type="text" value="${escapeHtml(link.label || '')}" data-index="${index}" data-link-index="${linkIndex}" data-link-key="label">
      </label>
      <label class="admin-field">
        <span>链接 ${linkIndex + 1} 地址</span>
        <input type="url" value="${escapeHtml(link.url || '')}" data-index="${index}" data-link-index="${linkIndex}" data-link-key="url">
      </label>
      <button class="admin-small-button" type="button" data-action="clear-download-link" data-index="${index}" data-link-index="${linkIndex}">清空</button>
    </div>
  `).join('');
}

function renderCard(product, index) {
  return `
    <article class="admin-card">
      <div class="admin-card-head">
        <div>
          <span class="tag">第 ${index + 1} 项</span>
          <h3>${escapeHtml(product.name || '未命名软件')}</h3>
        </div>
        <div class="admin-card-actions">
          <button type="button" data-action="move-up" data-index="${index}">上移</button>
          <button type="button" data-action="move-down" data-index="${index}">下移</button>
          <button type="button" data-action="duplicate" data-index="${index}">复制</button>
          <button class="danger" type="button" data-action="delete" data-index="${index}">删除</button>
        </div>
      </div>
      <div class="admin-fields">
        ${field('ID', index, 'id', product.id)}
        ${field('软件名称', index, 'name', product.name)}
        ${field('分类标签', index, 'tag', product.tag)}
        ${field('版本号', index, 'version', product.version)}
        ${imageField('软件图标', index, 'icon', product.icon)}
        ${previewImagesField(index, product.previewImages)}
        ${field('下载密码', index, 'password', product.password)}
        <div class="admin-field full">
          <span>下载链接</span>
          <div class="admin-list-editor">${linksField(index, product.links)}</div>
        </div>
        <label class="admin-field full">
          <span>软件说明</span>
          <textarea rows="3" data-index="${index}" data-key="desc">${escapeHtml(product.desc)}</textarea>
        </label>
        <label class="admin-field full">
          <span>使用步骤</span>
          <textarea rows="4" data-index="${index}" data-key="steps">${escapeHtml((product.steps || []).join('\n'))}</textarea>
        </label>
      </div>
    </article>`;
}

function renderEditor() {
  const editor = document.querySelector('[data-editor]');
  editor.innerHTML = products.map(renderCard).join('') || '<div class="empty">暂无软件，点击“添加软件”开始。</div>';
  updateCount();
}

function collectFromInput(input) {
  const index = Number(input.dataset.index);
  const key = input.dataset.key;
  if (!products[index] || !key) return;
  products[index][key] = key === 'steps'
    ? input.value.split('\n').map(s => s.trim()).filter(Boolean)
    : input.value.trim();
}

function readImageFile(file, onLoad) {
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    setStatus('请选择图片文件。', 'error');
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    setStatus('图片不能超过 5 MB，请先压缩后再上传。', 'error');
    return;
  }
  const reader = new FileReader();
  reader.addEventListener('load', () => onLoad(reader.result));
  reader.readAsDataURL(file);
}

function imageExtensionFromFile(file) {
  const byType = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/svg+xml': 'svg'
  };
  const ext = byType[file?.type] || String(file?.name || '').split('.').pop() || 'png';
  return ext.toLowerCase().replace(/[^a-z0-9]/g, '') || 'png';
}

function safeImagePrefix(value) {
  return String(value || 'image')
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48) || 'image';
}

function imageUploadPath(file, prefix) {
  const stamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
  const random = Math.random().toString(36).slice(2, 7);
  const name = safeImagePrefix(prefix || file?.name);
  return `${IMAGE_UPLOAD_DIR}/${name}-${stamp}-${random}.${imageExtensionFromFile(file)}`;
}

function queueImageDataUrl(file, dataUrl, prefix) {
  const path = imageUploadPath(file, prefix);
  pendingImageUploads.set(path, { dataUrl, name: file?.name || path });
  return path;
}

function productImagePrefix(product, kind) {
  return `${safeImagePrefix(product?.id || product?.name || 'product')}-${safeImagePrefix(kind)}`;
}

function contentImagePrefix(path) {
  return safeImagePrefix(path.replace(/^pages\./, '').replace(/\./g, '-'));
}

function isDataImage(value) {
  return typeof value === 'string' && value.startsWith('data:image/');
}

function dataUrlBase64(dataUrl) {
  return String(dataUrl || '').split(',')[1] || '';
}

function dataUrlMime(dataUrl) {
  return String(dataUrl || '').match(/^data:([^;]+);base64,/)?.[1] || 'image/png';
}

function downloadJson() {
  const json = `${JSON.stringify(products.map(normalizeProduct), null, 2)}\n`;
  const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'products.json';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
  setStatus('已导出 products.json。', 'ok');
}

function downloadContentJson() {
  const json = `${JSON.stringify(normalizeContent(siteContent), null, 2)}\n`;
  const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'content.json';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
  setStatus('已导出 content.json。', 'ok');
}

function productsJsonText() {
  return `${JSON.stringify(products.map(normalizeProduct), null, 2)}\n`;
}

function contentJsonText() {
  return `${JSON.stringify(normalizeContent(siteContent), null, 2)}\n`;
}

function utf8ToBase64(text) {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.slice(i, i + chunkSize));
  }
  return btoa(binary);
}

function cleanPath(path) {
  return String(path || '').replace(/^\/+|\/+$/g, '');
}

function joinRepoPath(basePath, filePath) {
  const base = cleanPath(basePath);
  const file = cleanPath(filePath);
  return base ? `${base}/${file}` : file;
}

function githubFields() {
  const rememberedToken = localStorage.getItem(GITHUB_TOKEN_KEY) || '';
  return {
    owner: document.querySelector('#github-owner')?.value.trim() || '',
    repo: document.querySelector('#github-repo')?.value.trim() || '',
    branch: document.querySelector('#github-branch')?.value.trim() || 'main',
    basePath: document.querySelector('#github-base-path')?.value.trim() || '',
    rememberToken: document.querySelector('#github-remember-token')?.checked || false,
    token: document.querySelector('#github-token')?.value.trim() || sessionStorage.getItem(GITHUB_TOKEN_KEY) || rememberedToken,
    message: document.querySelector('#github-commit-message')?.value.trim() || '更新网站内容'
  };
}

function saveGithubSettings() {
  const { owner, repo, branch, basePath, message, token, rememberToken } = githubFields();
  localStorage.setItem(GITHUB_SETTINGS_KEY, JSON.stringify({ owner, repo, branch, basePath, message }));
  localStorage.setItem(GITHUB_REMEMBER_TOKEN_KEY, rememberToken ? '1' : '');
  if (token) {
    sessionStorage.setItem(GITHUB_TOKEN_KEY, token);
    if (rememberToken) {
      localStorage.setItem(GITHUB_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(GITHUB_TOKEN_KEY);
    }
  }
}

function loadGithubSettings() {
  const saved = JSON.parse(localStorage.getItem(GITHUB_SETTINGS_KEY) || '{}');
  const rememberToken = localStorage.getItem(GITHUB_REMEMBER_TOKEN_KEY) === '1';
  const token = sessionStorage.getItem(GITHUB_TOKEN_KEY) || (rememberToken ? localStorage.getItem(GITHUB_TOKEN_KEY) || '' : '');
  document.querySelector('#github-owner').value = saved.owner || 'cnuo540';
  document.querySelector('#github-repo').value = saved.repo || '';
  document.querySelector('#github-branch').value = saved.branch || 'main';
  document.querySelector('#github-base-path').value = saved.basePath || '';
  document.querySelector('#github-commit-message').value = saved.message || '更新网站内容';
  document.querySelector('#github-token').value = token;
  document.querySelector('#github-remember-token').checked = rememberToken;
}

function ensureGithubConfig() {
  const config = githubFields();
  const missing = [];
  if (!config.owner) missing.push('GitHub 用户名或组织');
  if (!config.repo) missing.push('仓库名称');
  if (!config.branch) missing.push('分支');
  if (!config.token) missing.push('Token');
  if (missing.length) {
    throw new Error(`请填写：${missing.join('、')}`);
  }
  saveGithubSettings();
  return config;
}

async function githubRequest(config, path, options = {}) {
  const url = `https://api.github.com/repos/${encodeURIComponent(config.owner)}/${encodeURIComponent(config.repo)}/contents/${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${config.token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(options.headers || {})
    }
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : {};
  if (!response.ok) {
    throw new Error(data.message || `GitHub 请求失败：${response.status}`);
  }
  return data;
}

async function getGithubFile(config, path) {
  return githubRequest(config, `${path}?ref=${encodeURIComponent(config.branch)}`);
}

async function putGithubFile(config, path, text, message) {
  let sha = '';
  try {
    const current = await getGithubFile(config, path);
    sha = current.sha || '';
  } catch (error) {
    if (!String(error.message).includes('Not Found')) throw error;
  }
  return githubRequest(config, path, {
    method: 'PUT',
    body: JSON.stringify({
      message,
      content: utf8ToBase64(text),
      branch: config.branch,
      ...(sha ? { sha } : {})
    })
  });
}

async function putGithubBase64File(config, path, base64Content, message) {
  let sha = '';
  try {
    const current = await getGithubFile(config, path);
    sha = current.sha || '';
  } catch (error) {
    if (!String(error.message).includes('Not Found')) throw error;
  }
  return githubRequest(config, path, {
    method: 'PUT',
    body: JSON.stringify({
      message,
      content: base64Content,
      branch: config.branch,
      ...(sha ? { sha } : {})
    })
  });
}

async function uploadQueuedImages(config) {
  let count = 0;
  for (const [path, upload] of pendingImageUploads.entries()) {
    const repoPath = joinRepoPath(config.basePath, path);
    await putGithubBase64File(config, repoPath, dataUrlBase64(upload.dataUrl), `${config.message} - ${path}`);
    pendingImageUploads.delete(path);
    count += 1;
  }
  return count;
}

async function convertDataUrlImage(config, dataUrl, prefix, cache) {
  if (!isDataImage(dataUrl)) return dataUrl;
  if (cache.has(dataUrl)) return cache.get(dataUrl);
  const mime = dataUrlMime(dataUrl);
  const ext = imageExtensionFromFile({ type: mime, name: `${prefix}.png` });
  const fakeFile = { type: mime, name: `${safeImagePrefix(prefix)}.${ext}` };
  const path = imageUploadPath(fakeFile, prefix);
  await putGithubBase64File(config, joinRepoPath(config.basePath, path), dataUrlBase64(dataUrl), `${config.message} - ${path}`);
  cache.set(dataUrl, path);
  return path;
}

async function convertDataUrlImages(config) {
  const cache = new Map();
  let count = 0;
  for (const product of products) {
    const prefix = productImagePrefix(product, 'image');
    if (isDataImage(product.icon)) {
      product.icon = await convertDataUrlImage(config, product.icon, `${prefix}-icon`, cache);
      count += 1;
    }
    if (isDataImage(product.preview)) {
      product.preview = await convertDataUrlImage(config, product.preview, `${prefix}-preview`, cache);
      count += 1;
    }
    if (Array.isArray(product.previewImages)) {
      for (let i = 0; i < product.previewImages.length; i += 1) {
        if (isDataImage(product.previewImages[i])) {
          product.previewImages[i] = await convertDataUrlImage(config, product.previewImages[i], `${prefix}-preview-${i + 1}`, cache);
          count += 1;
        }
      }
      product.preview = product.previewImages[0] || product.preview || '';
    }
  }
  for (const key of ['index', 'about']) {
    const page = siteContent.pages?.[key];
    if (isDataImage(page?.qrImage)) {
      page.qrImage = await convertDataUrlImage(config, page.qrImage, `${key}-qr`, cache);
      count += 1;
    }
  }
  return count;
}

async function testGithubConnection() {
  const config = ensureGithubConfig();
  setGithubStatus('正在测试 GitHub 连接...', 'warn');
  const path = joinRepoPath(config.basePath, 'data/products.json');
  await getGithubFile(config, path);
  setGithubStatus('连接成功，已找到 data/products.json。', 'ok');
}

async function pushToGithub() {
  const config = ensureGithubConfig();
  setGithubStatus('\u6b63\u5728\u4e0a\u4f20\u56fe\u7247\u5e76\u4fdd\u5b58\u5230 GitHub\uff0c\u8bf7\u7a0d\u7b49...', 'warn');
  const productsPath = joinRepoPath(config.basePath, 'data/products.json');
  const contentPath = joinRepoPath(config.basePath, 'data/content.json');
  const convertedCount = await convertDataUrlImages(config);
  const uploadedCount = await uploadQueuedImages(config);
  await putGithubFile(config, productsPath, productsJsonText(), `${config.message} - products.json`);
  await putGithubFile(config, contentPath, contentJsonText(), `${config.message} - content.json`);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products.map(normalizeProduct)));
  localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(normalizeContent(siteContent)));
  const imageCount = convertedCount + uploadedCount;
  const imageText = imageCount ? `\uff0c\u5e76\u5df2\u4e0a\u4f20 ${imageCount} \u4e2a\u56fe\u7247\u6587\u4ef6` : '';
  setGithubStatus(`\u5df2\u4fdd\u5b58\u5230 GitHub${imageText}\u3002GitHub Pages \u901a\u5e38\u4f1a\u5728\u51e0\u5341\u79d2\u5230\u51e0\u5206\u949f\u5185\u66f4\u65b0\u3002`, 'ok');
}

function saveDraft() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products.map(normalizeProduct)));
  localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(normalizeContent(siteContent)));
  setStatus('软件和页面内容草稿已保存到当前浏览器。', 'ok');
}

async function importJson(file) {
  const text = await file.text();
  const data = JSON.parse(text);
  if (!Array.isArray(data)) throw new Error('JSON 根节点必须是数组');
  products = data.map(normalizeProduct);
  renderEditor();
  setStatus('已导入 JSON。', 'ok');
}

async function importContentJson(file) {
  const text = await file.text();
  const data = JSON.parse(text);
  siteContent = normalizeContent(data);
  renderContentEditor();
  setStatus('已导入 content.json。', 'ok');
}

function moveItem(index, direction) {
  const target = index + direction;
  if (target < 0 || target >= products.length) return;
  const [item] = products.splice(index, 1);
  products.splice(target, 0, item);
  renderEditor();
}

function setupActions() {
  document.querySelector('[data-login-form]').addEventListener('submit', async event => {
    event.preventDefault();
    const input = document.querySelector('#admin-password');
    if (input.value === ADMIN_PASSWORD) {
      setAuthenticated(true);
      input.value = '';
      await unlockAdmin();
    } else {
      showLogin('密码不正确，请重新输入。', 'error');
      input.select();
    }
  });

  document.addEventListener('input', event => {
    if (event.target.matches('[data-key]')) collectFromInput(event.target);
    if (event.target.matches('[data-preview-key]')) {
      const index = Number(event.target.dataset.index);
      const imageIndex = Number(event.target.dataset.previewIndex);
      if (products[index]?.previewImages?.[imageIndex] !== undefined) {
        products[index].previewImages[imageIndex] = event.target.value.trim();
        products[index].preview = products[index].previewImages[0] || '';
      }
    }
    if (event.target.matches('[data-link-key]')) {
      const index = Number(event.target.dataset.index);
      const linkIndex = Number(event.target.dataset.linkIndex);
      const key = event.target.dataset.linkKey;
      if (products[index]?.links?.[linkIndex] && key) {
        products[index].links[linkIndex][key] = event.target.value.trim();
        products[index].url = products[index].links[0]?.url || '';
      }
    }
    if (event.target.matches('#github-owner, #github-repo, #github-branch, #github-base-path, #github-commit-message, #github-token, #github-remember-token')) {
      saveGithubSettings();
    }
    if (event.target.matches('[data-content-key]')) {
      setContentPath(event.target.dataset.contentKey, event.target.value);
    }
    if (event.target.matches('[data-list-path]')) {
      const list = getContentPath(event.target.dataset.listPath);
      const index = Number(event.target.dataset.listIndex);
      const key = event.target.dataset.listKey;
      if (Array.isArray(list) && list[index] && key) {
        list[index][key] = event.target.value;
      }
    }
  });

  document.addEventListener('change', event => {
    const input = event.target;
    if (input.matches('[data-key="icon"], [data-key="preview"]')) {
      collectFromInput(input);
      renderEditor();
      return;
    }
    if (input.matches('[data-content-image-key]')) {
      const file = input.files[0];
      const path = input.dataset.contentImageKey;
      readImageFile(file, dataUrl => {
        const uploadPath = queueImageDataUrl(file, dataUrl, contentImagePrefix(path));
        setContentPath(path, uploadPath);
        renderContentEditor();
        setStatus('\u4e8c\u7ef4\u7801\u56fe\u7247\u5df2\u52a0\u5165\u4e0a\u4f20\u961f\u5217\uff0c\u4fdd\u5b58\u5230 GitHub \u540e\u4f1a\u751f\u6210\u72ec\u7acb\u56fe\u7247\u6587\u4ef6\u3002', 'ok');
      });
      input.value = '';
      return;
    }
    if (input.matches('[data-preview-upload]')) {
      const file = input.files[0];
      const index = Number(input.dataset.index);
      if (!products[index]) return;
      readImageFile(file, dataUrl => {
        products[index].previewImages = products[index].previewImages || [];
        const uploadPath = queueImageDataUrl(file, dataUrl, productImagePrefix(products[index], `preview-${products[index].previewImages.length + 1}`));
        products[index].previewImages.push(uploadPath);
        products[index].preview = products[index].previewImages[0] || '';
        renderEditor();
        setStatus('\u5df2\u6dfb\u52a0\u4e00\u5f20\u754c\u9762\u56fe\u7247\uff0c\u4fdd\u5b58\u5230 GitHub \u540e\u4f1a\u751f\u6210\u72ec\u7acb\u56fe\u7247\u6587\u4ef6\u3002', 'ok');
      });
      input.value = '';
      return;
    }
    if (!input.matches('[data-image-key]')) return;
    const file = input.files[0];
    const index = Number(input.dataset.index);
    const key = input.dataset.imageKey;
    if (!file || !products[index] || !key) return;
    readImageFile(file, dataUrl => {
      const uploadPath = queueImageDataUrl(file, dataUrl, productImagePrefix(products[index], key));
      products[index][key] = uploadPath;
      renderEditor();
      setStatus(`${key === 'icon' ? '\u8f6f\u4ef6\u56fe\u6807' : '\u754c\u9762\u56fe\u7247'}\u5df2\u52a0\u5165\u4e0a\u4f20\u961f\u5217\uff0c\u4fdd\u5b58\u5230 GitHub \u540e\u4f1a\u751f\u6210\u72ec\u7acb\u56fe\u7247\u6587\u4ef6\u3002`, 'ok');
    });
    input.value = '';
  });

  document.addEventListener('click', async event => {
    const action = event.target.closest('[data-action]')?.dataset.action;
    if (!action) return;
    const index = Number(event.target.closest('[data-index]')?.dataset.index);

    if (action === 'add') {
      products.push(makeEmptyProduct());
      renderEditor();
      setStatus('已添加一个软件条目。', 'ok');
    }
    if (action === 'save-draft') saveDraft();
    if (action === 'export') downloadJson();
    if (action === 'export-content') downloadContentJson();
    if (action === 'test-github') {
      try {
        await testGithubConnection();
      } catch (error) {
        setGithubStatus(`连接失败：${error.message}`, 'error');
      }
    }
    if (action === 'push-github') {
      try {
        await pushToGithub();
      } catch (error) {
        setGithubStatus(`保存失败：${error.message}`, 'error');
      }
    }
    if (action === 'clear-github-token') {
      sessionStorage.removeItem(GITHUB_TOKEN_KEY);
      localStorage.removeItem(GITHUB_TOKEN_KEY);
      localStorage.removeItem(GITHUB_REMEMBER_TOKEN_KEY);
      document.querySelector('#github-token').value = '';
      document.querySelector('#github-remember-token').checked = false;
      setGithubStatus('Token \u5df2\u6e05\u9664\u3002', 'ok');
    }
    if (action === 'reload') {
      localStorage.removeItem(STORAGE_KEY);
      products = await fetchProducts();
      renderEditor();
      setStatus('已重新读取线上数据。', 'ok');
    }
    if (action === 'reload-content') {
      localStorage.removeItem(CONTENT_STORAGE_KEY);
      siteContent = await fetchContent();
      renderContentEditor();
      setStatus('已重新读取页面内容。', 'ok');
    }
    if (action === 'import') document.querySelector('#json-import').click();
    if (action === 'import-content') document.querySelector('#content-import').click();
    if (action === 'delete' && Number.isInteger(index)) {
      products.splice(index, 1);
      renderEditor();
      setStatus('已删除软件条目。', 'ok');
    }
    if (action === 'duplicate' && Number.isInteger(index)) {
      products.splice(index + 1, 0, { ...products[index], id: `${products[index].id}-copy` });
      renderEditor();
      setStatus('已复制软件条目。', 'ok');
    }
    if (action === 'move-up' && Number.isInteger(index)) moveItem(index, -1);
    if (action === 'move-down' && Number.isInteger(index)) moveItem(index, 1);
    if (action === 'clear-image' && Number.isInteger(index)) {
      const key = event.target.closest('[data-image-key]').dataset.imageKey;
      products[index][key] = '';
      renderEditor();
      setStatus(`${key === 'icon' ? '软件图标' : '界面图片'}已清除。`, 'ok');
    }
    if (action === 'delete-preview-image' && Number.isInteger(index)) {
      const imageIndex = Number(event.target.dataset.previewIndex);
      products[index].previewImages.splice(imageIndex, 1);
      products[index].preview = products[index].previewImages[0] || '';
      renderEditor();
      setStatus('已删除界面图片。', 'ok');
    }
    if (action === 'clear-download-link' && Number.isInteger(index)) {
      const linkIndex = Number(event.target.dataset.linkIndex);
      if (products[index].links?.[linkIndex]) {
        products[index].links[linkIndex] = { label: linkIndex === 0 ? '下载链接 1' : '备用链接', url: '' };
        products[index].url = products[index].links[0]?.url || '';
        renderEditor();
        setStatus('已清空下载链接。', 'ok');
      }
    }
    if (action === 'clear-content-image') {
      const path = event.target.dataset.contentImageKey;
      setContentPath(path, '');
      renderContentEditor();
      setStatus('二维码图片已清除。', 'ok');
    }
    if (action === 'add-content-item') {
      const path = event.target.dataset.listPath;
      const list = getContentPath(path);
      if (Array.isArray(list)) {
        list.push({ title: '新标题', text: '新内容' });
        renderContentEditor();
        setStatus('已添加页面内容项。', 'ok');
      }
    }
    if (action === 'delete-content-item') {
      const path = event.target.dataset.listPath;
      const list = getContentPath(path);
      const listIndex = Number(event.target.dataset.listIndex);
      if (Array.isArray(list) && Number.isInteger(listIndex)) {
        list.splice(listIndex, 1);
        renderContentEditor();
        setStatus('已删除页面内容项。', 'ok');
      }
    }
    if (action === 'logout') {
      setAuthenticated(false);
      products = [];
      document.querySelector('[data-editor]').innerHTML = '';
      document.querySelector('[data-content-editor]').innerHTML = '';
      updateCount();
      showLogin('已退出管理。', 'ok');
    }
  });

  document.querySelector('#json-import').addEventListener('change', async event => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      await importJson(file);
    } catch (error) {
      setStatus(`导入失败：${error.message}`, 'error');
    } finally {
      event.target.value = '';
    }
  });

  document.querySelector('#content-import').addEventListener('change', async event => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      await importContentJson(file);
    } catch (error) {
      setStatus(`导入失败：${error.message}`, 'error');
    } finally {
      event.target.value = '';
    }
  });
}

function markActiveNav() {
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  markActiveNav();
  setupActions();
  loadGithubSettings();
  if (isAuthenticated()) {
    unlockAdmin();
  } else {
    showLogin();
  }
});
