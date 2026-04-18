:root {
  --vestor-green: #2e7d32;
  --vestor-green-dark: #1b5e20;
  --vestor-bg: #fdfdfd;
  --vestor-card: #ffffff;
  --vestor-border: #d1d1d1;
  --vestor-text: #222222;
  --vestor-secondary: #555555;
  --font-main: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-main);
  background-color: var(--vestor-bg);
  color: var(--vestor-text);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4 {
  font-weight: bold;
  letter-spacing: -0.025em;
}

h2 {
  border-left: 4px solid var(--vestor-green);
  padding-left: 10px;
  margin-bottom: 16px;
  font-size: 1.25rem;
}

a {
  text-decoration: none;
  color: inherit;
}

button {
  font-family: inherit;
  border: none;
  background: none;
}

.container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Base Classes */
.card-flair {
  background-color: var(--vestor-card);
  border: 1px solid var(--vestor-border);
  padding: 20px;
  border-radius: 4px;
}

.btn-flair {
  background-color: var(--vestor-green);
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  display: inline-block;
  text-align: center;
}

.btn-flair:hover {
  background-color: var(--vestor-green-dark);
}

.btn-flair-outline {
  background-color: transparent;
  border: 1px solid var(--vestor-green);
  color: var(--vestor-green);
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-block;
  text-align: center;
}

.btn-flair-outline:hover {
  background-color: #e8f5e9;
}

.tag-flair {
  background-color: #e8f5e9;
  color: var(--vestor-green);
  padding: 2px 6px;
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 2px;
  display: inline-block;
}

.market-ticker {
  background-color: #f0f4f0;
  border: 1px solid #d0e0d0;
  padding: 10px;
  border-radius: 4px;
  font-size: 12px;
  display: flex;
  gap: 20px;
  font-family: monospace;
}

/* Layout Utilities (Plain CSS equivalents of Tailwind) */
.grid { display: grid; }
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.flex { display: flex; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.justify-center { justify-content: center; }
.flex-col { flex-direction: column; }
.flex-wrap { flex-wrap: wrap; }
.flex-1 { flex: 1 1 0%; }
.gap-1 { gap: 4px; }
.gap-1\.5 { gap: 6px; }
.gap-2 { gap: 8px; }

.text-9px { font-size: 9px; }
.text-10px { font-size: 10px; }
.text-11px { font-size: 11px; }

.bg-white { background-color: white; }
.bg-gray-50 { background-color: #f9fafb; }
.bg-gray-100 { background-color: #f3f4f6; }
.bg-yellow-50 { background-color: #fffbeb; }

.border-gray-100 { border-color: #f3f4f6; }
.border-gray-200 { border-color: #e5e7eb; }
.border-gray-300 { border-color: #d1d5db; }
.border-yellow-100 { border-color: #fef3c7; }
.border-yellow-200 { border-color: #fde68a; }

.hover\:border-gray-300:hover { border-color: #d1d5db; }
.hover\:underline:hover { text-decoration: underline; }

.shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }

.cursor-pointer { cursor: pointer; }
.gap-3 { gap: 12px; }
.gap-4 { gap: 16px; }
.gap-6 { gap: 24px; }
.gap-8 { gap: 32px; }
.gap-10 { gap: 40px; }
.space-y-1\.5 > * + * { margin-top: 6px; }
.space-y-2 > * + * { margin-top: 8px; }
.space-y-4 > * + * { margin-top: 16px; }
.space-y-6 > * + * { margin-top: 24px; }
.space-y-8 > * + * { margin-top: 32px; }
.space-y-10 > * + * { margin-top: 40px; }
.space-y-12 > * + * { margin-top: 48px; }
.w-full { width: 100%; }
.max-w-sm { max-width: 24rem; }
.max-w-md { max-width: 28rem; }
.max-w-lg { max-width: 32rem; }
.max-w-xl { max-width: 36rem; }
.max-w-4xl { max-width: 56rem; }
.max-w-6xl { max-width: 72rem; }
.mx-auto { margin-left: auto; margin-right: auto; }
.text-center { text-align: center; }
.font-bold { font-weight: bold; }
.font-black { font-weight: 900; }
.font-medium { font-weight: 500; }
.uppercase { text-transform: uppercase; }
.italic { font-style: italic; }
.text-xs { font-size: 12px; }
.text-sm { font-size: 14px; }
.text-base { font-size: 16px; }
.text-lg { font-size: 18px; }
.text-xl { font-size: 20px; }
.text-2xl { font-size: 24px; }
.text-3xl { font-size: 30px; }
.text-4xl { font-size: 36px; }
.text-5xl { font-size: 48px; }
.text-vestor-green { color: var(--vestor-green); }
.text-vestor-text { color: var(--vestor-text); }
.text-vestor-secondary { color: var(--vestor-secondary); }
.ml-2\.5 { margin-left: 10px; }
.mt-8 { margin-top: 32px; }
.pt-6 { padding-top: 24px; }

.text-gray-100 { color: #f3f4f6; }
.text-gray-200 { color: #e5e7eb; }
.text-gray-300 { color: #d1d5db; }
.text-gray-400 { color: #9ca3af; }
.text-gray-500 { color: #6b7280; }
.text-gray-600 { color: #4b5563; }
.text-gray-700 { color: #374151; }
.text-gray-900 { color: #111827; }
.text-white { color: white; }
.text-danger { color: #b91c1c; }
.m-0 { margin: 0; }
.mb-1 { margin-bottom: 4px; }
.mb-2 { margin-bottom: 8px; }
.mb-3 { margin-bottom: 12px; }
.mb-4 { margin-bottom: 16px; }
.mb-6 { margin-bottom: 24px; }
.mb-8 { margin-bottom: 32px; }
.mt-2 { margin-top: 8px; }
.mt-4 { margin-top: 16px; }
.p-2\.5 { padding: 10px; }
.p-3 { padding: 12px; }
.p-4 { padding: 16px; }
.p-5 { padding: 20px; }
.p-6 { padding: 24px; }

.group:hover .group-hover\:text-vestor-green {
  color: var(--vestor-green);
}

.accent-vestor-green {
  accent-color: var(--vestor-green);
}

input[type="checkbox"] {
  accent-color: var(--vestor-green);
}

.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.p-8 { padding: 32px; }
.p-10 { padding: 40px; }

.shrink-0 { flex-shrink: 0; }
.p-12 { padding: 48px; }
.py-3 { padding-top: 12px; padding-bottom: 12px; }
.py-4 { padding-top: 16px; padding-bottom: 16px; }
.py-6 { padding-top: 24px; padding-bottom: 24px; }
.py-10 { padding-top: 40px; padding-bottom: 40px; }
.py-20 { padding-top: 80px; padding-bottom: 80px; }
.px-3 { padding-left: 12px; padding-right: 12px; }
.px-8 { padding-left: 32px; padding-right: 32px; }
.px-10 { padding-left: 40px; padding-right: 40px; }
.pt-4 { padding-top: 16px; }
.pt-6 { padding-top: 24px; }
.pb-4 { padding-bottom: 16px; }
.pb-6 { padding-bottom: 24px; }
.pb-20 { padding-bottom: 80px; }
.pl-3 { padding-left: 12px; }
.pl-9 { padding-left: 36px; }
.pr-4 { padding-right: 16px; }
.rounded { border-radius: 4px; }
.rounded-full { border-radius: 9999px; }
.border { border: 1px solid var(--vestor-border); }
.border-b { border-bottom: 1px solid var(--vestor-border); }
.border-t { border-top: 1px solid var(--vestor-border); }
.border-r { border-right: 1px solid var(--vestor-border); }
.relative { position: relative; }
.absolute { position: absolute; }
.fixed { position: fixed; }
.inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
.z-10 { z-index: 10; }
.z-50 { z-index: 50; }
.top-0 { top: 0; }
.top-1\/2 { top: 50%; }
.left-3 { left: 12px; }
.right-16 { right: 64px; }
.-translate-y-1\/2 { transform: translateY(-50%); }
.overflow-hidden { overflow: hidden; }
.block { display: block; }
.inline-block { display: inline-block; }
.inline-flex { display: inline-flex; }
.tracking-tight { letter-spacing: -0.025em; }
.tracking-widest { letter-spacing: 0.1em; }
.leading-tight { line-height: 1.25; }
.leading-relaxed { line-height: 1.625; }
.animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.app-wrapper {
  min-height: 100vh;
}

.pt-8 { padding-top: 32px; }
.pb-12 { padding-bottom: 48px; }
.ml-1 { margin-left: 4px; }
.mr-1 { margin-right: 4px; }
.mr-2 { margin-right: 8px; }
.hidden { display: none; }

@media (min-width: 768px) {
  .md\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .md\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .md\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .md\:flex-row { flex-direction: row; }
  .md\:flex { display: flex; }
  .md\:items-end { align-items: flex-end; }
  .md\:hidden { display: none; }
  .md\:table-cell { display: table-cell; }
  .md\:pt-0 { padding-top: 0; }
  .md\:text-left { text-align: left; }
  .md\:w-80 { width: 20rem; }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-\[280px_1fr\] { grid-template-columns: 280px 1fr; }
  .lg\:grid-cols-\[300px_1fr\] { grid-template-columns: 300px 1fr; }
}

/* Category Pill Styling */
.category-pill {
  padding: 5px 11px;
  border-radius: 9999px;
  font-size: 10.5px;
  white-space: nowrap;
  font-weight: 600;
  border: 1.5px solid #e5e7eb;
  background-color: transparent;
  color: #4b5563;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  text-transform: capitalize;
}

.category-pill:hover {
  border-color: #d1d5db;
  background-color: #f9fafb;
  transform: translateY(-1px);
}

.category-pill.active {
  background-color: var(--vestor-green);
  border-color: var(--vestor-green);
  color: white;
  box-shadow: 0 4px 6px -1px rgba(46, 125, 50, 0.2);
}

.category-pill.active:hover {
  background-color: var(--vestor-green-dark);
  border-color: var(--vestor-green-dark);
}
.nav-bar {
  background-color: white;
  border-bottom: 2px solid var(--vestor-green);
  position: sticky;
  top: 0;
  z-index: 50;
}

.nav-inner {
  height: 70px;
}

.brand-text {
  font-size: 28px;
  font-weight: bold;
  letter-spacing: -0.05em;
}

.nav-link {
  margin-left: 25px;
  height: 100%;
  font-size: 15px;
  font-weight: 500;
  color: var(--vestor-text);
  transition: color 0.2s;
}

.nav-link:hover {
  color: var(--vestor-green);
}

.nav-link.active {
  color: var(--vestor-green);
  border-bottom: 2px solid var(--vestor-green);
}

.nav-count {
  background-color: var(--vestor-green);
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 2px;
  font-weight: bold;
}

.nav-mobile-icon {
  position: relative;
  padding: 8px;
}

/* Modal & Tools */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 100;
}

.modal-content {
  border-top: 8px solid var(--vestor-green);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
}

.border-b { border-bottom: 1px solid var(--vestor-border); }
.border-t { border-top: 1px solid var(--vestor-border); }
.border-r { border-right: 1px solid var(--vestor-border); }

.min-h-12 { min-height: 48px; }

.quiz-option {
  border: 1px solid var(--vestor-border);
  background-color: white;
  transition: all 0.2s;
}

.quiz-option:hover {
  background-color: #f9fafb;
  border-color: var(--vestor-green);
}

.quiz-success-icon {
  width: 64px;
  height: 64px;
  background-color: #e8f5e9;
  border-radius: 50%;
}

.tool-input {
  background-color: white;
  border: 1px solid var(--vestor-border);
  border-radius: 4px;
  outline: none;
}

.tool-input:focus {
  border-color: var(--vestor-green);
}

.tool-result {
  background-color: #e8f5e9;
  color: var(--vestor-green);
  border: 1px solid #c8e6c9;
}

.border-t-green {
  border-top: 4px solid var(--vestor-green);
}

.profile-avatar {
  background-color: #f3f4f6;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ProductCard Styling */
.product-card {
  overflow: hidden;
  transition: all 0.2s;
}

.product-image-wrapper {
  height: 160px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.focus\:ring-vestor-green:focus {
  outline: 2px solid var(--vestor-green);
  outline-offset: 2px;
}

.risk-badge {
  display: inline-flex;
  align-items: center;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: -0.025em;
  border: 1px solid transparent;
  border-radius: 2px;
}

.risk-badge-sm {
  padding: 2px 6px;
  font-size: 10px;
}

.risk-badge-lg {
  padding: 4px 8px;
  font-size: 12px;
}

.risk-low {
  background-color: #e8f5e9;
  color: var(--vestor-green);
  border-color: rgba(46, 125, 50, 0.2);
}

.risk-medium {
  background-color: #fffbeb;
  color: #b45309;
  border-color: #fde68a;
}

.risk-high {
  background-color: #fef2f2;
  color: #b91c1c;
  border-color: #fecaca;
}

.product-info {
  line-height: 1.1;
}

.product-return-label {
  letter-spacing: normal;
}

.adding-success {
  background-color: #1b5e20 !important;
}

.w-4 { width: 16px; }
.h-4 { height: 16px; }
.w-5 { width: 20px; }
.h-5 { height: 20px; }
.w-6 { width: 24px; }
.h-6 { height: 24px; }
.w-8 { width: 32px; }
.h-8 { height: 32px; }
.w-10 { width: 40px; }
.h-10 { height: 40px; }
.w-24 { width: 96px; }
.h-24 { height: 96px; }
.h-fit { height: fit-content; }
.top-24 { top: 96px; }

.flex-1 { flex: 1; }
.relative { position: relative; }
.overflow-hidden { overflow: hidden; }
.h-full { height: 100%; }
.shrink-0 { flex-shrink: 0; }
.opacity-40 { opacity: 0.4; }
.opacity-90 { opacity: 0.9; }

.absolute { position: absolute; }
.top-2 { top: 8px; }
.right-2 { right: 8px; }

/* Listing Styling */
.search-input {
  background-color: white;
  border: 1px solid var(--vestor-border);
  border-radius: 4px;
  outline: none;
  transition: all 0.2s;
}

.search-input:focus {
  border-color: var(--vestor-green);
}

.skeleton-card {
  height: 256px;
  background-color: #f9fafb;
  border: 1px solid #f3f4f6;
  border-radius: 4px;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: .5; }
}

.shadow-none { box-shadow: none; }
.flex-grow { flex-grow: 1; }
.py-20 { padding-top: 80px; padding-bottom: 80px; }
.mx-auto { margin-left: auto; margin-right: auto; }
.max-w-xs { max-width: 320px; }
.min-h-screen { min-height: 100vh; }

/* Detail Styling */
.back-btn:hover {
  text-decoration: underline;
}

.detail-img-box {
  background-color: white;
}

.intel-card {
  background-color: #f0f4f0;
  border-color: rgba(46, 125, 50, 0.2);
}

.detail-input {
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  outline: none;
  transition: all 0.2s;
}

.detail-input:focus {
  border-color: var(--vestor-green);
}

.range-input {
  height: 6px;
  background-color: #f3f4f6;
  border-radius: 8px;
  appearance: none;
  accent-color: var(--vestor-green);
}

.projection-box {
  background-color: #f9fafb;
  border-color: #f3f4f6;
}

.detail-badges .tag-flair {
  padding: 4px 10px;
}

.sticky-sidebar {
  position: sticky;
  top: 96px;
}

/* Portfolio Styling */
.empty-icon-box {
  width: 96px;
  height: 96px;
}

.risk-bar {
  background-color: #f3f4f6;
  height: 8px;
}

.alert-card {
  border-radius: 8px;
}

.asset-table {
  border-collapse: collapse;
}

.table-head {
  background-color: #f9fafb;
  text-transform: uppercase;
  font-size: 10px;
  letter-spacing: 0.1em;
  color: #9ca3af;
}

.asset-row {
  border-top: 1px solid #f3f4f6;
  transition: all 0.2s;
}

.asset-icon-box {
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.asset-icon-box img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.allocation-input {
  border: 1px solid var(--vestor-green);
  border-radius: 4px;
}

.allocation-val {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-weight: bold;
}

.asset-actions {
  display: flex;
}

.hover-bg-gray:hover {
  background-color: #f9fafb;
}

/* Recommendations Styling */
.warning-icon-box {
  width: 96px;
  height: 96px;
}

.expert-banner {
  background-color: #111827;
  color: white;
}

.banner-title {
  color: white;
}

.banner-text {
  color: #9ca3af;
}

.white-btn {
  background-color: white;
  border: 1px solid white;
  cursor: pointer;
  transition: all 0.2s;
}

.white-btn:hover {
  background-color: #f3f4f6;
}

/* Profile Styling */
.sync-badge.synced {
  background-color: #e8f5e9;
  color: var(--vestor-green);
  border-color: var(--vestor-green);
}

.sync-badge.action-required {
  background-color: #fef2f2;
  color: #b91c1c;
  border-color: #fecaca;
  letter-spacing: 0.1em;
}

.radio-label {
  background-color: white;
  border: 1px solid #e5e7eb;
}

.radio-label:hover {
  border-color: #d1d5db;
}

.radio-label.selected {
  background-color: #f0f4f0;
  border-color: var(--vestor-green);
}

.radio-bullet {
  accent-color: var(--vestor-green);
}

.form-input, .form-select {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  outline: none;
  transition: all 0.2s;
}

.form-input:focus, .form-select:focus {
  border-color: var(--vestor-green);
}

.form-select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

.error-text {
  color: #b91c1c;
}

.sync-status {
  transition: opacity 0.5s;
}

/* Page Transitions */
.page-fade-enter {
  opacity: 0;
  transform: translateX(20px);
}
.page-fade-active {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 300ms, transform 300ms;
}

/* Hover Reveal */
.hover-reveal-overlay {
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}
.group:hover .hover-reveal-overlay {
  opacity: 1;
  pointer-events: auto;
}

/* Stagger entrance utility */
@keyframes slideUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-slide-up {
  animation: slideUp 0.3s ease forwards;
}
