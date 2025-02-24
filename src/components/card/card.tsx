import { Link } from 'react-router-dom';
import { CardProps, PageType } from '../../types';
import { AppRoute } from '../../const';
import { getRatingPercentage } from '../../utils';

const pagesOptions = {
  main: {name: 'cities'},
  offer: {name: 'near-places'},
  favorites: {name: 'favorites'},
} as const;

type PlaceCardProps = {
  offer: CardProps;
  pageType: PageType;
  handleCardHover: (offer?: CardProps) => void;
}

function PlaceCard({offer, pageType, handleCardHover}: PlaceCardProps): JSX.Element {
  const {isPremium, previewImage, price, rating, title, type} = offer;

  const className = pagesOptions[pageType].name;
  const hasFavoritesClass = pageType === 'favorites' ? 'favorites__card-info' : '';

  const handleMouseEnter = () => handleCardHover(offer);
  const handleMouseLeave = () => handleCardHover();

  const linkPath = `${AppRoute.Offer}/${offer.id}`;

  return (
    <article
      className={`${className}__card place-card`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {
        isPremium ?
          <div className="place-card__mark">
            <span>Premium</span>
          </div> : ''
      }
      <div className={`${className}__image-wrapper place-card__image-wrapper`}>
        <Link to={linkPath}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className={`${hasFavoritesClass} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${getRatingPercentage(rating)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={linkPath}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
