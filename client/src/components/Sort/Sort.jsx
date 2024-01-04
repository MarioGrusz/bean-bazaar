import './index.scss';


const Sort = ({ sort, setSort, isNew, setIsNew }) => {


    const handleButtonClick = () => {
        setIsNew(!isNew)
    };

    const onAscendingSort = () => {
        setSort('asc');
    };

    const onDescendingSort = () => {
        setSort('desc');
    };


    return (
        <div className='sort-container'>
            <p className='sort-container__sort-by'>Sort by :</p>
            <div className='sort-container__btns-wrapper'>
                <button className={`sort-btn ${isNew ? 'active' : ''}`} onClick={handleButtonClick}>New Arrivals</button>
                <button className='sort-btn' onClick={onAscendingSort}>Price low to high</button>
                <button className='sort-btn' onClick={onDescendingSort}>Price high to low</button>
            </div>
        </div>
    )
}

export default Sort;