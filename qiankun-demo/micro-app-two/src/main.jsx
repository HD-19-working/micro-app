import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

const initQianKun = () => {
  renderWithQiankun({
    bootstrap() {   //bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap
      console.log('react app bootstraped');
    },
    mount(props) {   // 每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
      render(props.container, props)
    },
    unmount(props) {   // 每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
      unmountDom(props.container)
    },
    update(props) {   //仅使用 loadMicroApp 方式加载微应用时生效
      console.log('update props', props);
    }
  })
}

const render = (container, props) => {
  const appDom = container ? container : document.getElementById('root')
  ReactDOM.createRoot(appDom).render(
    <React.StrictMode>
      <App mainAppProps={props} />
    </React.StrictMode>
  )
}

const unmountDom = (container) => {
  const appDom = container ? container : document.getElementById('root')
  ReactDOM.unmountComponentAtNode(appDom)
}

// 主应用环境：挂载到主应用中; 独立环境：挂载到自身的index.html的#root上
qiankunWindow.__POWERED_BY_QIANKUN__ ? initQianKun() : render()
