import './index.scss';
import { Link } from 'react-router-dom';
import AddToWishlistBtn from '../AddToWishlistBtn/AddToWishlistBtn';
import { UserAuth } from '../../context/AuthContext';

const ItemCard = (props) => {

  const { coffeeItems, wishlistItems, heartFill, setHeartFill} = props;
  const { user } = UserAuth();

  return (
    <section className='coffee-table'>

      {coffeeItems.length > 0 && (
        <div className='coffee-table__items'>

          {coffeeItems.map((product) => (

            <article className='coffee-table__item-row' key={product._id}>
              <div className='coffee-table__product' id={product._id}>
                <div className='image-wrapper'>

                  {product.class === 'new' && (
                    <div className='coffee-table__badge'>
                      <div className='badge-circle'>
                        <span>NEW</span>
                      </div>
                    </div>
                  )}

                  <img src={product.productImage} alt="product" />
  
                  <AddToWishlistBtn
                    heartFill={user && Array.isArray(wishlistItems) && wishlistItems.length > 0 && wishlistItems.some(item => item._id === product._id)}

                    setHeartFill={setHeartFill}
                    coffeeItems={coffeeItems}
                  />

                </div>

                <div className='product-info-wrapper'>
                  <div className='product-info col'>
                    <div className='product-origin-word'>ORIGIN</div>
                    <div className='product-origin'>{product.productOrigin}</div>
                  </div>
                  <div className='product-price col'>
                    <div className='product-price-word'>PRICE</div>
                    <div className='product-price'>{product.productPrice}</div>
                  </div>
                  <div className='product-roastery col'>
                    <div className='product-roastery-word'>ROASTERY</div>
                    <div className='product-roastery'>{product.shopName}</div>
                  </div>
                  <div className='button-wrapper'>
                    <button className='go-to-shop-btn'>
                      <Link to={product.productLink} target="_blank" rel="noopener noreferrer">
                        GO TO THE SHOP
                      </Link>
                    </button>
                  </div>
                </div>

              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default ItemCard;
