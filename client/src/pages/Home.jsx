import ItemCard from '../components/ItemCard/ItemCard';
import SearchBar from '../components/SearchBar/SearchBar';
import Filters from '../components/Filters/Filters';
import DisplaySelectedFilters from '../components/DisplaySelectedFilters/DisplaySelectedFilters';
import Header from '../components/Header/Header';
import Sort from '../components/Sort/Sort';
import SidebarHeader from '../components/SidebarHeader/SidebarHeader';
import SidebarFooter from '../components/SidebarFooter/SidebarFooter';
import { UserAuth } from '../context/AuthContext';
import useGetCoffeeItems from '../reactQueryHooks/useGetCoffeeItems';
import useGetWishlistItems from '../reactQueryHooks/useGetWishlistItems';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';


const Home = () => {

    const { user, logOut, token } = UserAuth();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState('');   
    const [search, setSearch] = useState('');
    const [isNew, setIsNew] = useState(false);
    const [showFilterSidebar, setShowFilterSidebar] = useState(false);
    const [heartFill, setHeartFill] = useState(false);
    const roasteryValuesRef = useRef([]);
    const originValuesRef = useRef([]);
    const [checkedItems, setCheckedItems] = useState([]);
    const [filters, setFilters] = useState({
        roastery: [],
        origin: [],
    });

    useEffect(() => {
        if (showFilterSidebar) {
          document.body.classList.add('hide-scrollbar');
        } else {
          document.body.classList.remove('hide-scrollbar');
        }
    }, [showFilterSidebar]);

    const toggleFilterNavbar = () => {
        setShowFilterSidebar(!showFilterSidebar)
    }

    const { 
        data, isLoading: isLoadingCoffeeItems, 
        isFetching: isFetchingCoffeeItems, 
        refetch: refetchCoffeeItems 
    } = useGetCoffeeItems({ search, page, filters, sort, isNew });

      
    useEffect(() => {
        refetchCoffeeItems();
    }, [search, page, filters, sort, isNew, refetchCoffeeItems]);
      
    const { data: wishlistData, isLoading: isLoadingWishlistItems } = useGetWishlistItems(token);

    const coffeeItems = data?.data.docs || [];
    const wishlistItems = wishlistData?.data || [];

    const renderContent = () => {

        if(coffeeItems.length === 0) {
            return <div>No Coffee Items Yet</div>
        };

        return <ItemCard 
            products={coffeeItems} 
            // wishlistItems={wishlistItems} 
            heartFill={heartFill}
            setHeartFill={setHeartFill}
        />
    };

    // const content = coffeeItems.length === 0 ? <div>No Coffee Items Yet</div> : (
    //     <ItemCard products={coffeeItems} wishlistItems={wishlistItems} heartFill={heartFill} setHeartFill={setHeartFill} />
    // );
      

    return (

        <main>

            <Header toggleFilterNavbar={toggleFilterNavbar} />  
            <SearchBar search={search} setSearch={(search) => setSearch(search)} /> 

            <section className='display-used-filters'>
                <h1>Selected Filters :</h1>

                <DisplaySelectedFilters 
                    filters={filters} 
                    setFilters={setFilters}
                    roasteryValuesRef={roasteryValuesRef}
                    originValuesRef={originValuesRef}
                    checkedItems={checkedItems}
                    setCheckedItems={setCheckedItems}
                />

            </section>   

            <section className={`filter-section-overlay ${showFilterSidebar ? 'active' : ''}`}>
                <aside className={`filter-section-container ${showFilterSidebar ? 'active' : ''}`}>
                    <div className='filter-wrapper'>

                        <SidebarHeader toggleFilterNavbar={toggleFilterNavbar} />

                        <Sort 
                        sort={sort} setSort={(sort) => setSort(sort)}
                        isNew={isNew} setIsNew={(isNew) => setIsNew(isNew)}
                        />

                        <Filters 
                            filters={filters} 
                            setFilters={setFilters}
                            roasteryValuesRef={roasteryValuesRef}
                            originValuesRef={originValuesRef}
                            checkedItems={checkedItems}
                            setCheckedItems={setCheckedItems}
                        />
                    </div>

                    <div className='footer-container'>
                        <SidebarFooter
                         filters={filters} 
                         setFilters={setFilters}
                         roasteryValuesRef={roasteryValuesRef}
                         originValuesRef={originValuesRef}
                         setShowFilterSidebar={setShowFilterSidebar}
                        />
                    </div>     

                </aside>  
            </section>
     
            <section className='content'>
                {renderContent()}
                <button onClick={() => setPage(page - 1)}>Previous</button>
                <button onClick={() => setPage(page + 1)}>Next</button>
            </section>

        </main>
    )
}

export default Home