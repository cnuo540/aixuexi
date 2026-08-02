const DEFAULT_PRODUCTS = [
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

let products = DEFAULT_PRODUCTS.slice();

const DEFAULT_CONTENT = {
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
      cards: [
        { title: '网站定位', text: '分享个人常用软件、使用经验和教程文档。' },
        { title: '内容形式', text: '以软件列表和教程文章为主，保持页面简单清晰。' },
        { title: '后续扩展', text: '可以继续增加搜索、分类筛选、留言反馈和后台管理。' }
      ]
    }
  }
};

let siteContent = DEFAULT_CONTENT;

function escapeHtml(str) {
  return String(str).replace(/[&<>'"]/g, s => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[s]));
}

function normalizeProduct(item, index) {
  const steps = Array.isArray(item.steps) ? item.steps : String(item.steps || '').split('\n').map(s => s.trim()).filter(Boolean);
  return {
    id: item.id || `product-${index + 1}`,
    name: item.name || '',
    tag: item.tag || '',
    version: item.version || '',
    icon: item.icon || '',
    preview: item.preview || '',
    desc: item.desc || '',
    steps,
    password: item.password || '',
    url: item.url || ''
  };
}

async function loadProducts() {
  if (location.protocol === 'file:') {
    return DEFAULT_PRODUCTS.slice();
  }
  try {
    const response = await fetch('data/products.json', { cache: 'no-store' });
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length) {
        return data.map(normalizeProduct);
      }
    }
  } catch (error) {
    console.warn('Failed to load products.json', error);
  }
  return DEFAULT_PRODUCTS.slice();
}

async function loadContent() {
  if (location.protocol === 'file:') {
    return DEFAULT_CONTENT;
  }
  try {
    const response = await fetch('data/content.json', { cache: 'no-store' });
    if (response.ok) {
      const data = await response.json();
      if (data && data.pages) return data;
    }
  } catch (error) {
    console.warn('Failed to load content.json', error);
  }
  return DEFAULT_CONTENT;
}

function pageKey() {
  const current = location.pathname.split('/').pop() || 'index.html';
  return current.replace('.html', '') || 'index';
}

function valueByPath(path) {
  const parts = path.split('.');
  let target;
  if (parts[0] === 'common') {
    target = siteContent.common;
    parts.shift();
  } else {
    target = siteContent.pages?.[parts.shift()];
  }
  return parts.reduce((value, key) => value?.[key], target);
}

function renderSimpleCards(items) {
  return (items || []).map(item => `
    <div class="info-card"><h3>${escapeHtml(item.title || '')}</h3><p>${escapeHtml(item.text || '')}</p></div>
  `).join('');
}

function renderArticles(items) {
  return (items || []).map(item => `
    <article class="article-card"><h3>${escapeHtml(item.title || '')}</h3><p>${escapeHtml(item.text || '')}</p></article>
  `).join('');
}

function applyContent() {
  const key = pageKey();
  const page = siteContent.pages?.[key];
  if (page?.title) document.title = page.title;
  const meta = document.querySelector('meta[name="description"]');
  if (meta && page?.description) meta.setAttribute('content', page.description);

  document.querySelectorAll('[data-content]').forEach(el => {
    const value = valueByPath(el.dataset.content);
    if (typeof value === 'string') el.textContent = value;
  });
  document.querySelectorAll('[data-placeholder-content]').forEach(el => {
    const value = valueByPath(el.dataset.placeholderContent);
    if (typeof value === 'string') el.setAttribute('placeholder', value);
  });
  document.querySelectorAll('[data-info-cards]').forEach(box => {
    const cards = box.dataset.infoCards === 'about' ? siteContent.pages?.about?.cards : siteContent.pages?.index?.infoCards;
    box.innerHTML = renderSimpleCards(cards);
  });
  document.querySelectorAll('[data-articles]').forEach(box => {
    box.innerHTML = renderArticles(siteContent.pages?.tutorials?.articles);
  });
}

function productCard(product) {
  const steps = (product.steps || []).map(step => `<li>${escapeHtml(step)}</li>`).join('');
  return `
    <article class="product-card" id="${escapeHtml(product.id)}">
      <div class="product-meta">
        <img class="product-icon" src="${escapeHtml(product.icon)}" alt="${escapeHtml(product.name)} 图标">
        <div>
          <h3>${escapeHtml(product.name)}</h3>
          <span class="tag">${escapeHtml(product.tag)}</span>
          <div class="version">${escapeHtml(product.version)}</div>
        </div>
      </div>
      <div class="preview-wrap">
        <img class="preview-img" src="${escapeHtml(product.preview)}" alt="${escapeHtml(product.name)} 软件界面图">
      </div>
      <div class="instructions">
        <h4>使用说明</h4>
        <p>${escapeHtml(product.desc)}</p>
        <ul>${steps}</ul>
      </div>
      <div class="download-box" data-product-id="${escapeHtml(product.id)}">
        <h4>下载链接</h4>
        <label for="pwd-${escapeHtml(product.id)}">输入对应密码后显示下载链接</label>
        <div class="download-form">
          <input id="pwd-${escapeHtml(product.id)}" type="password" placeholder="输入密码" autocomplete="off">
          <button type="button" data-action="unlock">获取</button>
        </div>
        <div class="download-result" aria-live="polite"></div>
      </div>
    </article>`;
}

function renderProducts() {
  document.querySelectorAll('[data-products]').forEach(box => {
    const limit = Number(box.dataset.limit || products.length);
    const mode = box.dataset.products;
    const base = mode === 'featured' ? products.slice(0, limit) : products.slice(0, limit);
    const search = box.closest('.container')?.querySelector('[data-product-search]');
    const query = (search?.value || '').trim().toLowerCase();
    const list = query ? base.filter(product => [
      product.name,
      product.tag,
      product.version,
      product.desc,
      ...(product.steps || [])
    ].join(' ').toLowerCase().includes(query)) : base;
    const count = box.closest('.container')?.querySelector('[data-search-count]');
    if (count) count.textContent = query ? `找到 ${list.length} 个` : `共 ${base.length} 个`;
    box.innerHTML = list.map(productCard).join('') || '<div class="empty">暂无软件。</div>';
  });
}

function setupProductSearch() {
  document.querySelectorAll('[data-product-search]').forEach(input => {
    input.addEventListener('input', renderProducts);
  });
}

function setupDownloadUnlock() {
  document.addEventListener('click', event => {
    const btn = event.target.closest('[data-action="unlock"]');
    if (!btn) return;
    const box = btn.closest('.download-box');
    const product = products.find(item => item.id === box.dataset.productId);
    const input = box.querySelector('input');
    const result = box.querySelector('.download-result');
    const value = (input.value || '').trim();
    if (!product) return;
    if (value === product.password) {
      result.innerHTML = `<span class="success">验证成功：<a href="${escapeHtml(product.url)}" target="_blank" rel="noopener">点击下载 ${escapeHtml(product.name)}</a></span>`;
      input.setAttribute('aria-invalid', 'false');
    } else {
      result.innerHTML = '<span class="error">密码不正确，请重新输入。</span>';
      input.setAttribute('aria-invalid', 'true');
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Enter') return;
    if (event.target.matches('.download-box input')) {
      event.preventDefault();
      event.target.closest('.download-box').querySelector('[data-action="unlock"]').click();
    }
  });
}

function markActiveNav() {
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) a.classList.add('active');
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  siteContent = await loadContent();
  applyContent();
  products = await loadProducts();
  renderProducts();
  setupProductSearch();
  setupDownloadUnlock();
  markActiveNav();
});
