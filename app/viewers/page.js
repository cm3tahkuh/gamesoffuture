import './viewers.scss'


const Viewers = () =>{
    return(
        <main>
            <div className='viewers'>
                <div className='container'>
                    <div className='viewers__row'>
                        <div className='viewers__column'>
                            <div className='viewers__background'>
                                <img className="viewers__image" src='src/bgViewers.png' alt="Background Image"/>
                            </div>
                        </div>
                        <div className='viewers__column'>
                        <div className='viewers__title'><span className='viewers__subtitle'>Что такое</span> игры будущего?</div>
                            <div className='viewers__cards'>
                                <div className='viewers__card'>
                                    <img className="viewers__card-image" src='src/viewers1.png' alt="Card Image"/>
                                    <p className='viewers__card-description'>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>
                                </div>
                                <div className='viewers__card'>
                                    <img className="viewers__card-image" src='src/viewers2.png' alt="Card Image"/>
                                    <p className='viewers__card-description'>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>
                                </div>
                                <div className='viewers__card'>
                                    <img className="viewers__card-image" src='src/viewers1.png' alt="Card Image"/>
                                    <p className='viewers__card-description'>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>
                                </div>
                                <div className='viewers__card'>
                                    <img className="viewers__card-image" src='src/viewers2.png' alt="Card Image"/>
                                    <p className='viewers__card-description'>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Viewers;