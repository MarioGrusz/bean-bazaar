import './index.scss';



const SidebarFooter = (props) => {


    const {filters, setFilters, roasteryValuesRef, originValuesRef, setShowFilterSidebar } = props


    const applyFilters = () => {
        setFilters({
            roastery: roasteryValuesRef.current,
            origin: originValuesRef.current
        });
        setShowFilterSidebar(false)
    };

             
    const resetFilters = () => {
        setFilters({
            roastery: [],
            origin: [],
        });
        roasteryValuesRef.current = [];
        originValuesRef.current = [];
        setShowFilterSidebar(false)
    };

    
    return (
        <div className='filter-btn-container'>
            <button className='filter-btn' onClick={() => resetFilters()}>Reset Filters</button>
            <button className='filter-btn' onClick={() => applyFilters(filters)}>Apply Filters</button>
        </div>
    )
}

export default SidebarFooter