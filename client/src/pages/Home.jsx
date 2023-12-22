import ItemCard from '../components/ItemCard/ItemCard';
import SearchBar from '../components/SearchBar/SearchBar';
import Filters from '../components/Filters/Filters';
import DisplaySelectedFilters from '../components/DisplaySelectedFilters/DisplaySelectedFilters';
import Header from '../components/Header/Header';
import Sort from '../components/Sort/Sort';
import SidebarHeader from '../components/SidebarHeader/SidebarHeader';
import SidebarFooter from '../components/SidebarFooter/SidebarFooter';
import Footer from '../components/Footer/Footer';
import Pagination from '../components/Pagination/Pagination';
import { UserAuth } from '../context/AuthContext';
import useGetCoffeeItems from '../reactQueryHooks/useGetCoffeeItems';
import useGetWishlistItems from '../reactQueryHooks/useGetWishlistItems';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';


const Home = () => {

    const { user, token } = UserAuth();
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
        const storedPage = localStorage.getItem('currentPage');
        storedPage !== null ? setPage(parseInt(storedPage)) : setPage(1)     
    }, [])


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
      
    const { data: wishlistData, isLoading: isLoadingWishlistItems } = useGetWishlistItems(token, user);


    const coffeeItems = data?.data.docs || [];
    const wishlistItems = wishlistData?.data || [];


    const limit = data?.data.limit || null;
    const total = data?.data.totalDocs || null;

    const renderContent = () => {

        if(isLoadingCoffeeItems) {
            return <div className='loading'>Wait! We roasting now...</div>
        };

        if(coffeeItems.length === 0) {
            return <div className='no-products'>No Products Found! Try again!</div>
        };


        return <ItemCard 
            coffeeItems={coffeeItems} 
            wishlistItems={wishlistItems} 
            heartFill={heartFill}
            setHeartFill={setHeartFill}
        />
    };

    return (

        <main>

            <Header 
            toggleFilterNavbar={toggleFilterNavbar} 
            wishlistItems={wishlistItems} 
            />  
            {/* <Marquee /> */}
            <SearchBar search={search} setSearch={(search) => setSearch(search)} /> 

            <section className='display-used-filters'>
                
                {filters.roastery.length > 0 || filters.origin.length > 0 ? <h1>Selected Filters :</h1> : '' }

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

                    <header className='header-container'>
                        <SidebarHeader toggleFilterNavbar={toggleFilterNavbar} />
                    </header> 

                    <div className='filter-wrapper'>   

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

                    <footer className='footer-container'>
                        <SidebarFooter
                         filters={filters} 
                         setFilters={setFilters}
                         roasteryValuesRef={roasteryValuesRef}
                         originValuesRef={originValuesRef}
                         setShowFilterSidebar={setShowFilterSidebar}
                        />
                    </footer>     

                </aside>  

            </section>
     
            <section className='content'>
                {renderContent()}
            </section>

            <Pagination
              
              coffeeItems={coffeeItems}
              page={page}
              limit={limit ? limit : 0}
              total={total ? total : 0}
              setPage={(page) => setPage(page)}
             
            />

            <Footer />

        </main>
    )
}

export default Home