import { useState } from 'react';
import './index.scss';
import useAddToWishlist from '../../reactQueryHooks/useAddToWishlist';
import useDeleteWishlistItem from '../../reactQueryHooks/useDeleteWishlistItem';
import { UserAuth } from '../../context/AuthContext';


//Protected route https://www.phind.com/search?cache=g20alba3nnubprds3pk4oiiy


const AddToWishlistBtn = ({ heartFill, setHeartFill }) => {

    const addToWishlistMutation = useAddToWishlist();
    const deleteWishlistItemMutation = useDeleteWishlistItem();
    const { token } = UserAuth();



    const handleClick = (event) => {
        const productElement = event.target.closest('.coffee-table__product');
        const productId = productElement ? productElement.id : null;
    
        if (productId) {
            performMutation(productId);
            setHeartFill(!heartFill);
        }
    }
    

    const performMutation = (productId) => {
        return heartFill ? deleteWishlistItemMutation.mutate({ id: productId, token: token }) : addToWishlistMutation.mutate({ id: productId, token: token });
    }
     
    


    return (
        <>

        <article className="add-to-wishlist">
            
            <button onClick={handleClick} className="add-to-wishlist-btn">

                <i className={`${heartFill ? "" : "enabled"}`}>
                    <svg className='heart-svg' width={16} height={16} viewBox="0 0 16 16" fill="none">
                    <path
                        d="M14.39 1.743h0c.348.4.627.877.82 1.408.19.53.29 1.1.29 1.677s-.1 1.148-.29 1.678a4.426 4.426 0 01-.82 1.407h0l-.812.93L8 15.24 2.422 8.844l-.812-.93C.905 7.104.5 5.996.5 4.827c0-1.168.405-2.277 1.11-3.085C2.313.937 3.25.5 4.21.5c.961 0 1.899.437 2.602 1.243l.811.93.377.432.377-.432.811-.93h0c.348-.4.758-.712 1.204-.924.445-.211.92-.319 1.397-.319s.951.108 1.397.32c.445.211.855.524 1.203.923z"
                        stroke="#000"
                        strokeLinecap="round"
                    />
                    </svg>
                </i>

                <i className={`filled ${heartFill ? "enabled" : ""}`}>
                    <svg className='heart-svg' width={16} height={16} viewBox="0 0 16 16" fill="none">
                        <path
                        d="M14.766 1.415A4.223 4.223 0 0013.4.368 3.748 3.748 0 0011.79 0c-.553 0-1.1.125-1.612.368-.51.242-.975.598-1.366 1.047L8 2.345l-.812-.93C6.398.509 5.328 0 4.211 0 3.094 0 2.023.51 1.233 1.415S0 3.548 0 4.828c0 1.28.444 2.509 1.233 3.414l.812.93L8 16l5.955-6.828.811-.93c.391-.448.702-.98.913-1.566.212-.586.321-1.214.321-1.848 0-.634-.109-1.262-.32-1.847a4.927 4.927 0 00-.914-1.566z"
                        fill="#D64B59"
                        />
                    </svg>
                </i>
                
            </button>

        </article>

        </>
    )
}

export default AddToWishlistBtn