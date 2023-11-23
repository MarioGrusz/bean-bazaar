import './index.scss'
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import filterIcon from '../../assets/icon-mobile-filters.svg'
import Wishlist from '../Wishlist/Wishlist';


const Header = ({ wishlistItems, toggleFilterNavbar }) => {

    const { user, logOut, showSnackbar } = UserAuth();
    const navbarRef = useRef(null);
    const [isGlassmorphism, setIsGlassmorphism] = useState(false);
    const [openWishlist, setOpenWishlist] = useState(false);
    const navigate = useNavigate()


    const handleLogout = async () => {
        try {
          await logOut();
          showSnackbar( 'Logged out successfully' , 'success' );
        } catch (error) {
          console.log(error.message);
          showSnackbar( 'An error occured. Try again' , 'error' );
        }
    };

    const handleWishListAccess = () => {

        if(user) {
            setOpenWishlist(prevOpenWishlist => !prevOpenWishlist);
        } else {
            navigate('/login')
        }
    };
   

    useEffect(() => {
        const navbar = navbarRef.current;


        const navbarEffect = () => {
            const scrollHeight = window.scrollY;
            const navHeight = navbar.getBoundingClientRect().height;

            if (scrollHeight > navHeight) {
                setIsGlassmorphism(true);     
            } else {
                setIsGlassmorphism(false);
            }

        }

        window.addEventListener("scroll", navbarEffect);

        return () => {
            window.removeEventListener("scroll", navbarEffect);
        };

    }, []);


    return (
        <header  ref={navbarRef} className={`header ${isGlassmorphism ? 'glassmorphism' : ''}`}>

            <div className='header__title-wrapper'>                
                <h1 className='header__title-link'>Bean Searcher</h1>            
            </div>

            <div className='header__buttons-wrapper'>

                <button onClick={toggleFilterNavbar} className='header__button'>
                    <span className='header__button-title'>FILTER</span>
                </button>  

                <button onClick={handleWishListAccess} className='header__button'>
                    <span className='header__button-title'>WISHLIST</span>
                </button>


                {/* Mobile Icons */}

                <button onClick={toggleFilterNavbar} className='header__button header__icon-filters'>
                    <img src={filterIcon} alt="icon-filter" />
                </button>
            
                <button onClick={handleWishListAccess} className='header__button header__icon-heart'>
                    <svg className='heart-svg' width={16} height={16} viewBox="0 0 16 16" fill="none">
                        <path
                            d="M14.39 1.743h0c.348.4.627.877.82 1.408.19.53.29 1.1.29 1.677s-.1 1.148-.29 1.678a4.426 4.426 0 01-.82 1.407h0l-.812.93L8 15.24 2.422 8.844l-.812-.93C.905 7.104.5 5.996.5 4.827c0-1.168.405-2.277 1.11-3.085C2.313.937 3.25.5 4.21.5c.961 0 1.899.437 2.602 1.243l.811.93.377.432.377-.432.811-.93h0c.348-.4.758-.712 1.204-.924.445-.211.92-.319 1.397-.319s.951.108 1.397.32c.445.211.855.524 1.203.923z"
                            stroke="#000"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>

                {user ? <button onClick={handleLogout} className='header__button'>
                            <span className='header__button-title'>LOGOUT</span>
                        </button> : 

                    <Link className='header__button' to="/login">
                       <span className='header__button-title'>LOGIN</span>
                    </Link>

                }

                {/* wishlist sidebar */}
                <Wishlist 
                wishlistItems={wishlistItems}
                openWishlist={openWishlist}
                setOpenWishlist={(openWishlist) => setOpenWishlist(openWishlist)}
                />

            </div>
        
        </header>
    );
};
  
export default Header;