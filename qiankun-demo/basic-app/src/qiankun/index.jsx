import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'micro-app-one',
    entry: '//localhost:5175',    // 修改为实际项目的运行url
    container: '#MICRO-APP-ONE',
    activeRule: '/app-one',
    props: {
      msg: "micro-app-one需要的message"
    }
  },
  {
    name: 'micro-app-two',
    entry: '//localhost:5176',    // 修改为实际项目的运行url
    container: '#MICRO-APP-TWO',
    activeRule: '/app-two',
    props: {
      msg: "micro-app-two需要的message"
    }
  }
]);
// 启动 qiankun
start();