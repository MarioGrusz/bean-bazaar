import './index.scss'
import loupe from '../../assets/loupe.png'


const SearchBar = ({ setSearch }) => {


    return (
        <div className='search-bar'>
        
            <span className='search-bar__icon-container'>
                <img src={loupe} alt="lupe" />
            </span>
            <input
                type='text'
                className='search'
                placeholder='Search'
                onChange={({ currentTarget: input }) => setSearch(input.value) }
            />
        
        </div>
      
    )

}

export default SearchBar