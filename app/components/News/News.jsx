import './News.scss'


export const News = () =>{
    return(
        <div className="news">
            <div className="container">
                <h1 className="news__title">ПОСЛЕДНИЕ НОВОСТИ</h1>
                <div className="news__row">
                <div className="news__column">
                        <h2 className="news__card-title">Турнир по fifa</h2>
                        <img src="src/newspreview1.png" alt="" className="news__card-preview" />
                        <button className="news__card-button">
                            Принять участие
                        <img src="src/arrowButton.svg" alt="" className="news__card-button-arrow" />
                        </button>
                    </div>
                    <div className="news__column">
                        <h2 className="news__card-title">Участники предыдущего турнира </h2>
                        <img src="src/newspreview2.png" alt="" className="news__card-preview" />
                        <button className="news__card-button">
                            Узнать больше
                        <img src="src/arrowButton.svg" alt="" className="news__card-button-arrow" />
                        </button>
                    </div>
                    <div className="news__column">
                        <h2 className="news__card-title">Участники предыдущего турнира </h2>
                        <img src="src/newspreview2.png" alt="" className="news__card-preview" />
                        <button className="news__card-button">
                            Узнать больше
                        <img src="src/arrowButton.svg" alt="" className="news__card-button-arrow" />
                        </button>
                    </div>
                    <div className="news__column">
                        <h2 className="news__card-title">Участники предыдущего турнира </h2>
                        <img src="src/newspreview2.png" alt="" className="news__card-preview" />
                        <button className="news__card-button">
                            Узнать больше
                        <img src="src/arrowButton.svg" alt="" className="news__card-button-arrow" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}