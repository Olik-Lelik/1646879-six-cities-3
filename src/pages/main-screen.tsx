import { NavLink } from 'react-router-dom';
import PlaceCard from '../components/card/card';
import Header from '../components/header/header';
import { CardProps } from '../types';
import { CITIES } from '../const';
import { useActiveOffer } from '../utils';

type MainScreenProps = {
  offers: CardProps[];
}

function MainScreen({offers}: MainScreenProps): JSX.Element {
  const {handleCardHover} = useActiveOffer();

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {
                CITIES.map((city, index) => {
                  const key = index;

                  return (
                    <li className="locations__item" key={key}>
                      <NavLink className='locations__item-link tabs__item' to="#">
                        <span>{city}</span>
                      </NavLink>
                    </li>
                  );
                })
              }
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">312 places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                Popular
                  <svg className="places__sorting-arrow" width={7} height={4}>
                    <use xlinkHref="#icon-arrow-select" />
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                {offers.map((offer) => (
                  <PlaceCard
                    key={offer.id}
                    offer={offer}
                    pageType='main'
                    handleCardHover={handleCardHover}
                  />
                ))};
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
