import './index.scss';
import { Link } from 'react-router-dom';

const ReturnArrow = ({ to, topPostion, leftPosition }) => {

    const style = {
        top: topPostion,
        left: leftPosition
    }

    return (
    <Link style={style} to={to} className='return-arrow'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 31">
        <polygon points="31.41 15.21 30.7 14.5 30.71 14.5 16.21 0 14.79 1.41 27.59 14.21 0 14.21 0 16.21 27.59 16.21 14.79 29 16.21 30.41 30.71 15.91 30.7 15.91 31.41 15.21"></polygon>
        </svg>
    </Link>
    );
};

export default ReturnArrow;
