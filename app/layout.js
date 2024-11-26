

export const metadata = {
  title: 'Игры будущего',
  description:
    'Игры будущего',
};

import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import './globals.scss';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <div className="page-container">
      <div className="content-wrap">
        <Header/>
        <Menu/>
        {children}
        </div>
        <Footer/>
        </div>
      </body>
    </html>
  );
}
