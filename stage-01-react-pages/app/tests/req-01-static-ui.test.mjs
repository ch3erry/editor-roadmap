import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const appTsx = readFileSync(resolve('src/App.tsx'), 'utf8')
const appCss = readFileSync(resolve('src/App.css'), 'utf8')
const indexCss = readFileSync(resolve('src/index.css'), 'utf8')

test('App.tsx matches the approved task copy from the .pen design', () => {
  assert.match(appTsx, /先把静态页面切成清晰区域，为 props 传值与组合组件做准备。/)
  assert.match(appTsx, /当前不接表单与完成状态切换，只保留可扩展的任务列表结构。/)
})

test('App.css uses the main layout values from the approved .pen design', () => {
  assert.match(appCss, /width:\s*min\(100%,\s*1200px\);/)
  assert.match(appCss, /\.app-container\s*{[^}]*padding:\s*40px;/s)
  assert.match(appCss, /\.app-container\s*{[^}]*gap:\s*24px;/s)
  assert.match(appCss, /\.header-section\s*{[^}]*align-items:\s*center;/s)
  assert.match(appCss, /\.header-section\s*{[^}]*padding:\s*28px;/s)
  assert.match(appCss, /\.filter-section\s*{[^}]*padding:\s*20px;/s)
  assert.match(appCss, /\.task-section\s*{[^}]*padding:\s*24px;/s)
  assert.match(appCss, /\.status-badge\s*{[^}]*font-size:\s*14px;/s)
})

test('index.css keeps the page background and root container aligned with the mockup shell', () => {
  assert.match(indexCss, /background-color:\s*var\(--bg-color\);/)
  assert.match(indexCss, /body\s*{[^}]*margin:\s*0;/s)
  assert.match(indexCss, /#root\s*{[^}]*width:\s*100%;/s)
})
