
import './Footer.scss'

export const Footer = () =>{
    return(
        <div className="footer">
            <div className="container">
                <div className="footer__row">
                    <address className="footer__address-block">
                        <p className='footer__address-place'>г. Челябинск, Комсомольский проспект, 113а</p>
                    <a className='footer__address-email' href="mailto:123@live.preco.ru">123@live.preco.ru</a>
                    <a className='footer__address-number' href="tel:+73512144111">+7 (351) 214-41-11</a>
                    </address>
                    <div className="footer__logos-block">
                        <img className="footer__logo" src="src/URKlogo.svg" alt="Логотип Уральского Регионального Колледжа" />
                        <img className="footer__logo" src="src/YUTYlogo.png" alt="Логотип Южно Уральского Технологического Университета"/>
                        <img className="footer__logo" src="src/huskyLogo.png" alt="Логотип команды Хаски"/>
                    </div>
                    <div className="footer__socials">
                        <a href="#"><img src="/src/telegram2.svg" alt="Telegram icon"></img></a>
                        <a href="#"><img src="/src/vk2.svg" alt="VK icon"></img></a>
                    </div>
                </div>
            </div>
        </div>
    );
}