import './index.scss';
import { useState } from 'react';


const Sort = ({ sort, setSort, isNew, setIsNew }) => {

    const [isActive, setIsActive] = useState(false);

    const handleButtonClick = () => {
        setIsActive(!isActive);
        showNewArrivals()
    };

    const onAscendingSort = () => {
        setSort('asc');
    }

    const onDescendingSort = () => {
        setSort('desc');
    }

    const showNewArrivals = () => {
        setIsNew(!isNew)
    }


    return (
        <div className='sort-container'>
            <p className='sort-container__sort-by'>Sort by :</p>
            <div className='sort-container__btns-wrapper'>
                <button className={`sort-btn ${isActive ? 'active' : ''}`} onClick={handleButtonClick}>New Arrivals</button>
                <button className='sort-btn' onClick={onAscendingSort}>Price low to high</button>
                <button className='sort-btn' onClick={onDescendingSort}>Price high to low</button>
            </div>
        </div>
    )
}

export default Sort;