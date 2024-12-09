

export const metadata = {
  title: 'Игры будущего',
  description:
    'Игры будущего',
};

import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import { ScrollButton } from "./components/ScrollButton/ScrollButton";
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
        <ScrollButton/>
        <Footer/>
        </div>
      </body>
    </html>
  );
}
