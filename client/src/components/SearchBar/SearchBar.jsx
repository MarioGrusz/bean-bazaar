import './index.scss'


const SearchBar = ( {setSearch} ) => {

    return (

        <div className='search-bar'>
        
            <span className='search-bar__icon-container'>
                {/* <img src='/assets/loupe.png' alt="lupe" /> ADD ICON LATER */}
            </span>
            <input
                type='text'
                className='search'
                placeholder='Search'
                onChange={({ currentTarget: input }) => setSearch(input.value) }
            />
        
        </div>
      
    )

};

export default SearchBar