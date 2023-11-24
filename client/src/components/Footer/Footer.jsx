import './index.scss';
import { getYear } from '../../utils/getCurrentYear';
import { Link } from 'react-router-dom';

const Footer = () => {

    const currentYear = getYear();


    return (
        <footer className='footer'>
            <Link to='/contact'>
                <button>Contact Us</button>
            </Link>
            <div className='footer__copyright'>Copyright © {currentYear}. Bean Bazaar. All rights reserved.</div>
        </footer>
    )
}

export default Footer