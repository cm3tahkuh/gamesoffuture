"use client";

// import "../../globals.scss";
import "./Header.scss";

import { usePathname } from "next/navigation";
import Link from "next/link";

export const Header = () => {
  const pathname = usePathname();

  return (
    <div className="header">
      <div className="container">
        <div className="header__row">
          
          {pathname === "/" ? (
            <img src="/src/logoHeader.svg" alt="HYSKY.PHY Logo"></img>
          ) : (
            <Link href="/">
              <img src="/src/logoHeader.svg" alt="HYSKY.PHY Logo"></img>
            </Link>
          )}

          <ul className="header__links__block">
            <li className="header__link">
              <Link href="/" className={`${pathname === "/" ? "active" : ""}`}>
                Об играх
              </Link>
            </li>
            <li className="header__link">
              <Link
                href="/viewers"
                className={`${pathname === "/viewers" ? "active" : ""}`}
              >
                Зрителям
              </Link>
            </li>
            <li className="header__link">
              <Link
                href="/organizators"
                className={`${pathname === "/organizators" ? "active" : ""}`}
              >
                Организаторы
              </Link>
            </li>
          </ul>
          <div className="header__socials">
            <a href="#">
              <img src="/src/telegram.svg" alt="Telegram icon"></img>
            </a>
            <a href="#">
              <img src="/src/vk.svg" alt="VK icon"></img>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
