import './index.scss';

const RemoveButton = () => (
   <svg className='svg-remove-btn' viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M12 4.81885L4 12.8188M12 12.8188L4 4.81885" stroke="#292929" strokeMiterlimit={10} strokeLinecap="round"></path>
   </svg>
);

const DisplaySelectedFilters = (props) => {

    const { filters, setFilters, roasteryValuesRef, originValuesRef, setCheckedItems } = props

    const removeFilter = (itemName) => {
        // Remove the item from the filters object
        const newFilters = { ...filters };
        Object.keys(newFilters).forEach(key => {
            newFilters[key] = newFilters[key].filter(item => item !== itemName);
        });
      
        //Remove the item from the refs
        roasteryValuesRef.current = roasteryValuesRef.current.filter(val => val !== itemName);
        originValuesRef.current = originValuesRef.current.filter(val => val !== itemName);
      
        // Update the filters
        setFilters(newFilters);
        //Update checkboxes
        setCheckedItems(prevCheckedItems => prevCheckedItems.filter(item => item !== itemName));

    };
      

    return (
        Object.values(filters).map((filterArray, index) => {
            return (
               <>
                    {filterArray.map((filterItem, itemIndex) => (
                        filterItem === 0 ? null : (
                            <span key={filterItem} className='used-filter-btn__wrapper'>
                                <p className='used-filter-btn__title'>{filterItem}</p>
                                <button id={filterItem} onClick={() => removeFilter(filterItem)} className='used-filter-btn__remove'>
                                    <RemoveButton />
                                </button>
                            </span> 
                        )
                    ))}
                </>
            );
        })
    );
}

export default DisplaySelectedFilters;