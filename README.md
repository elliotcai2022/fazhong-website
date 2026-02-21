# 法忠电子官网

东莞市法忠电子科技有限公司官方网站，基于产品宣传册内容构建。

## 使用说明

### 替换 Logo

当前使用 SVG 文字 Logo。如需使用宣传册中的原始 Logo：

1. 打开 `法忠宣传册.pdf`，导出第 1 页 Logo 为 PNG 或 SVG
2. 将文件命名为 `logo.png` 或 `logo.svg`，放入 `assets/images/` 目录
3. 在 `index.html` 中将 `assets/images/logo.svg` 替换为 `assets/images/logo.png`（如使用 PNG）

### 替换产品图片

宣传册第 5–10 页包含产品图片，可按以下步骤替换：

1. 从 PDF 中导出各产品图片为 PNG/JPG
2. 放入 `assets/images/` 目录，命名如：`metal-film.png`、`carbon-film.png` 等
3. 在 `index.html` 中更新对应产品卡片里的 `img src` 路径

### 本地预览

直接用浏览器打开 `index.html` 即可预览，或使用本地服务器：

```bash
# 使用 Python
python3 -m http.server 8000

# 使用 Node.js (需先安装 npx)
npx serve .
```

## 文件结构

```
法忠网站/
├── index.html          # 主页面
├── styles.css          # 样式
├── script.js           # 交互脚本
├── 法忠宣传册.pdf       # 原始宣传册（供提取素材）
├── assets/
│   └── images/
│       ├── logo.svg    # Logo
│       └── product-placeholder.svg  # 产品占位图
└── README.md
```
