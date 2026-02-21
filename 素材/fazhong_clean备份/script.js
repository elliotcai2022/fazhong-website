// 法忠电子 - 网站交互与多语言

document.addEventListener('DOMContentLoaded', () => {
  let currentLang = localStorage.getItem('fazhong-lang') || 'zh';

  // 获取嵌套对象值，支持 "key1.key2.key3" 和 "key1.key2.0.key3"
  function getNestedValue(obj, path) {
    return path.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : null), obj);
  }

  // 应用语言
  function applyLanguage(lang) {
    const t = translations[lang];
    if (!t) return;

    currentLang = lang;
    localStorage.setItem('fazhong-lang', lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

    // 更新 data-i18n 文本
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = getNestedValue(t, key);
      if (val != null) el.textContent = val;
    });

    // 更新 data-i18n-html
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      const val = getNestedValue(t, key);
      if (val != null) el.innerHTML = val;
    });

    // 更新 history timeline years（年份保持数字格式）
    document.querySelectorAll('.timeline-content .timeline-year').forEach((el, i) => {
      const items = t.history?.items;
      if (items && items[i]) el.textContent = items[i].year;
    });

    // 更新认证列表
    const instrumentsList = document.getElementById('cert-instruments');
    const standardsList = document.getElementById('cert-standards');
    if (instrumentsList && t.certification?.instrumentList) {
      instrumentsList.innerHTML = t.certification.instrumentList.map(item => `<li>${item}</li>`).join('');
    }
    if (standardsList && t.certification?.standardList) {
      standardsList.innerHTML = t.certification.standardList.map(item => `<li>${item}</li>`).join('');
    }

    // 更新网址链接
    const websiteLink = document.getElementById('website-link');
    if (websiteLink && t.contact?.websiteUrl) {
      websiteLink.href = t.contact.websiteUrl;
    }

    // 语言按钮状态
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  // 语言切换
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      applyLanguage(btn.dataset.lang);
    });
  });

  // 初始化语言
  applyLanguage(currentLang);

  // Banner 轮播
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  let carouselIndex = 0;
  let carouselTimer;

  function showSlide(index) {
    carouselIndex = (index + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle('active', i === carouselIndex));
    dots.forEach((d, i) => d.classList.toggle('active', i === carouselIndex));
  }

  function nextSlide() {
    showSlide(carouselIndex + 1);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSlide(i);
      clearInterval(carouselTimer);
      carouselTimer = setInterval(nextSlide, 5000);
    });
  });

  carouselTimer = setInterval(nextSlide, 5000);

  // 移动端导航切换
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  navToggle?.addEventListener('click', () => {
    navLinks?.classList.toggle('active');
  });

  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks?.classList.remove('active');
    });
  });

  // 滚动时导航栏样式
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    header?.classList.toggle('scrolled', currentScroll > 100);
  });

  // 平滑滚动锚点
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});
