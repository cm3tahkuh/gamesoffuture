export const metadata = {
  title: "Игры будущего",
  description: "Игры будущего от Уральского Регионального колледжа - Новости, регистрация на турнир",
};

import Footer from "./components/layout/Footer/Footer";
import Header from "./components/layout/Header/Header";
import Menu from "./components/common/Menu/Menu";
import ScrollButton from "./components/common/ScrollButton/ScrollButton";
import './styles/globals.scss';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="page-container">
          <div className="content-wrap">
            <Header />
            <Menu />
            {children}
          </div>
          <ScrollButton />
          <Footer />
        </div>
      </body>
    </html>
  );
}
