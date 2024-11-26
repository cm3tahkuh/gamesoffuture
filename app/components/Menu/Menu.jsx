"use client";

import "./Menu.scss";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Menu = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="burger-container">
      <button className="burger-button" onClick={toggleMenu}>
        ☰
      </button>

      {isMenuOpen && (
        <div className="menu">
          <ul>
            <li>
              <Link href="/">Об играх</Link>
            </li>
            <li>
              <Link href="/viewers">Зрителям</Link>
            </li>
            <li>
              <Link href="/organizators">Организаторы</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Menu;
