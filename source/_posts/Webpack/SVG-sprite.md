---
title: 优雅的使用 SVG ICON
date: 2017-12-13 20:17:44
tags:
    - Webpack
---
# 优雅的使用 SVG ICON

## 创建 `Icon` 组件

index.jsx

```jsx
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cs from 'classnames'

import styles from './style.module.css'
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('RESOURCES/icons/svg', false, /\.svg$/)
requireAll(req)

class Icon extends PureComponent {
  render () {
    const { name, className } = this.props
    return (
      <svg
        className={cs(
          className,
          styles['svg-icon']
        )}
        aria-hiidden="true"
      >
        <use xlinkHref={`#icon-${name}`} />
      </svg>
    )
  }
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.object
}

export default Icon
```

style.module.css

```css
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
```

## 使用 `svg-sprite`

安装 `svg-sprite-loader`，这是一个 `webpack loader` ，可以将多个 `svg` 打包成 `svg-sprite`

```bash
npm install svg-sprite-loader --save-dev
```

配置 `webpack.config.js`

```javascript
...
{
  test: /\.svg$/,
  loader: 'svg-sprite-loader',
  include: [svgPath],
  options: {
    symbolId: 'icon-[name]'
  }
},
{
  test: /\.(png|jpe?g|gif|svg)$/,
  loader: 'url-loader',
  exclude: [svgPath],
  options: {
    ...
  }
}
...
```

## 更进一步优化 SVG

安装 [svgo](https://github.com/svg/svgo)

```bash
npm install svgo --save-dev
```

修改 `package.json`

```json
{
  "svgo": "node ./node_modules/svgo/bin/svgo src/**/*.svg"

}
```