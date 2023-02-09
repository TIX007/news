import './App.css';
import IndexRouter from './router/IndexRouter';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

function App() {
  return <ConfigProvider locale={zh_CN}>
    <IndexRouter />
  </ConfigProvider >
}

export default App;
