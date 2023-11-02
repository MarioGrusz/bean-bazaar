import '../styles/main.scss';
import { useState } from 'react';
import ItemCard from '../components/ItemCard/ItemCard';
import { useEffect } from 'react';
import useGetCoffeeItems from '../reactQueryHooks/useGetCoffeeItems';
import useGetWishlistItems from '../reactQueryHooks/useGetWishlistItems';


import SearchBar from '../components/SearchBar/SearchBar';
import Filters from '../components/Filters/Filters';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

//custom query hooks https://www.phind.com/search?cache=khd1trmv0gmtlpn0lfuq1i4d

const Home = () => {

    const { logOut, token } = UserAuth();
    const navigate = useNavigate();


    const [page, setPage] = useState(1);
    const [sort, setSort] = useState('');
    const [roastery, setRoastery] = useState([]);
    const [origin, setOrigin] = useState([]);
    const [search, setSearch] = useState('');
    const [isNew, setIsNew] = useState(false);
    const [showFilterSidebar, setShowFilterSidebar] = useState(false);
    const [filterCount, setFilterCount] = useState(0);
    const [heartFill, setHeartFill] = useState(false);


    const handleSignout = async (formData) => {
        try{
            await logOut();
            navigate("/login");
        } catch (error) {

            console.log(error.message);
        }
    } 

  
    const { data, isLoading: isLoadingCoffeeItems, isFetching: isFetchingCoffeeItems, refetch: refetchCoffeeItems } = useGetCoffeeItems({ search, page, origin, roastery, sort, isNew });

      
    useEffect(() => {
        refetchCoffeeItems();
    }, [search, page, origin, roastery, sort, isNew, refetchCoffeeItems]);
    
       
    //const { data: wishlistData, isLoading: isLoadingWishlistItems } = useGetWishlistItems(token);


    const coffeeItems = data?.data.docs || [];
    //const wishlistItems = wishlistData?.data || [];

    //console.log('Wishlist', wishlistItems)

   


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

            <header className='header'>
                {/* <h1>Coffee Beans Searcher</h1>
                <h1>You have {filterCount} filters in use!!!</h1>
                <h1>You filter by:</h1> {roastery?.map((item, index) => (<div key={index}>{item}</div>))} */}
                {/* <SearchBar setSearch={setSearch}/> */}
                <button onClick={handleSignout}>LOGOUT</button>
            </header>

            <aside className='sidebar'>
                {<h1>PageNumber : {page}</h1>}
                <Filters 
                    origin={origin} setOrigin={setOrigin} 
                    roastery={roastery} setRoastery={setRoastery} 
                    filterCount={filterCount} setFilterCount={setFilterCount} 
                />
            </aside>

            <section>
                {renderContent()}
                <button onClick={() => setPage(page - 1)}>Previous</button>
                <button onClick={() => setPage(page + 1)}>Next</button>
            </section>

        </main>
    )
}

export default Home