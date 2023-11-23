import './index.scss'
import { RxCross1 } from "react-icons/rx";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import useDeleteWishlistItem from '../../reactQueryHooks/useDeleteWishlistItem';


const Wishlist = ({ wishlistItems, openWishlist, setOpenWishlist, handleHeartFill }) => {

    const { user } = UserAuth();

    const totalPrice = wishlistItems?.length > 0 ? 
        wishlistItems?.map(item => parseFloat(item.productPrice.replace(",", ".").replace(" €", "")))
        .reduce((total, currentValue) => total + currentValue, 0) : 0;



    return (
        <aside className={`wishlist ${openWishlist ? "open" : ""}`}>

        <header className='wishlist__header'>
            {user && <span>Welcome - {user.displayName}</span>} 
            <RxCross1
                className="wishlist__closing-pointer"
                onClick={() => setOpenWishlist(false)}
            />
        </header>

        <header className='wishlist__header'>
            <div className='wishlist__icon-title'>
            <AiOutlineHeart className='icon'/>
            <span className='title'>Wishlist ({wishlistItems.length})</span>
            <span className='title'> Total Price: {totalPrice} €</span>
            </div>
        </header>

        <div className='wishlist__products-container'>
            {wishlistItems && wishlistItems.length > 0 ? 
                wishlistItems.map((i, index) => <CartSingle key={index} data={i} handleHeartFill={handleHeartFill} />) 
                : 
                <p className='wishlist__empty-wishlist-message'>No items in wishlist</p>
            }
        </div>
        
        </aside>
    )
}


const CartSingle = ({ data }) => {

  const deleteWishlistItemMutation = useDeleteWishlistItem();
  const { token } = UserAuth();


  const handleRemoveItem = (event) => {

    const productElement = event.target.closest('.wishlist__product-wrapper');
    const productId = productElement ? productElement.id : null;
    if (productId) {
        performMutation(productId);
    }
         
  };

  const performMutation = (productId) => {
    deleteWishlistItemMutation.mutate({ id: productId, token: token })
  }

  return (

    <div className='wishlist__product-wrapper' id={data._id}>

        <div className='wishlist__product-image'>
        <img src={data.productImage} alt="product"></img>
        </div>

        <div className='wishlist__product-info'>
        <div className='wishlist__text-wrapper'>
            <div className='wishlist__text'>
            <h1>{data.productOrigin}</h1>
            <h1>{data.shopName}</h1>
            </div>

            <div className='wishlist__trash-button'>
            <button onClick={handleRemoveItem}>
                <svg role="presentation" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="5.5" y="5.5" width="13" height="16" stroke="black" fill="none"></rect>
                <path d="M2 5.5H22" stroke="black"></path>
                <path d="M9 9V18" stroke="black"></path>
                <path d="M12 9V18" stroke="black"></path>
                <path d="M15 9V18" stroke="black"></path>
                <path d="M12 5.5V2" stroke="black"></path>
                </svg>
            </button>
            </div>
        </div>  
        <div className='wishlist__price-link-wrapper'>
            <div className='wishlist__go-to-the-button-wrapper'>
                <button className='go-to-shop-btn'>
                    <Link to={data.productLink}>Go to the Shop</Link>
                </button>
            </div> 
            <div className='wishlist__price'>
            <span>{data.productPrice}</span>
            </div>
        </div>
        
        </div>
    </div>
  )
}

export default Wishlist