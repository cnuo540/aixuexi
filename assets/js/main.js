const products = [
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

function escapeHtml(str){
  return String(str).replace(/[&<>'"]/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[s]));
}

function productCard(product){
  const steps = product.steps.map(step => `<li>${escapeHtml(step)}</li>`).join('');
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

function renderProducts(){
  document.querySelectorAll('[data-products]').forEach(box => {
    const limit = Number(box.dataset.limit || products.length);
    const mode = box.dataset.products;
    const list = mode === 'featured' ? products.slice(0, limit) : products.slice(0, limit);
    box.innerHTML = list.map(productCard).join('') || '<div class="empty">暂无软件。</div>';
  });
}

function setupDownloadUnlock(){
  document.addEventListener('click', event => {
    const btn = event.target.closest('[data-action="unlock"]');
    if(!btn) return;
    const box = btn.closest('.download-box');
    const product = products.find(item => item.id === box.dataset.productId);
    const input = box.querySelector('input');
    const result = box.querySelector('.download-result');
    const value = (input.value || '').trim();
    if(!product) return;
    if(value === product.password){
      result.innerHTML = `<span class="success">验证成功：<a href="${escapeHtml(product.url)}" target="_blank" rel="noopener">点击下载 ${escapeHtml(product.name)}</a></span>`;
      input.setAttribute('aria-invalid', 'false');
    }else{
      result.innerHTML = '<span class="error">密码不正确，请重新输入。</span>';
      input.setAttribute('aria-invalid', 'true');
    }
  });
  document.addEventListener('keydown', event => {
    if(event.key !== 'Enter') return;
    if(event.target.matches('.download-box input')){
      event.preventDefault();
      event.target.closest('.download-box').querySelector('[data-action="unlock"]').click();
    }
  });
}

function markActiveNav(){
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if(href === current || (current === '' && href === 'index.html')) a.classList.add('active');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  setupDownloadUnlock();
  markActiveNav();
});
