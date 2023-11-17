import './index.scss';
import { useQuery } from 'react-query';
import { getCoffeeOriginsHeaders, getRoasteriessHeaders } from '../../api/apiCoffeeData';


const Filters = (props) => {


    const { filters, setFilters, filterCount, setFilterCount } = props


    const { data: coffeeOrigins, isLoading: isLoadingOrigins} = useQuery({
        queryKey: ['coffeeOrigins'],
        queryFn: () => getCoffeeOriginsHeaders(),
    });

    const { data: roasteries, isLoading: isLoadingRoasteries} = useQuery({
        queryKey: ['roasteries'],
        queryFn: () => getRoasteriessHeaders(),
    });


    const roasteriesNames = roasteries?.data || [];
    const originsNames = coffeeOrigins?.data || [];

    const onRoasteryChange = ({ currentTarget: input }) => {
        const newFilters = { ...filters, roastery: input.checked ? [...filters.roastery, input.value] : filters.roastery.filter(val => val !== input.value) };
        setFilters(newFilters);
      
    };
    
    const onOriginChange = ({ currentTarget: input }) => {
        const newFilters = { ...filters, origin: input.checked ? [...filters.origin, input.value] : filters.origin.filter(val => val !== input.value) };
        setFilters(newFilters);
    };

    // const applyFilters = (filters) => {
    //     console.log('filters', filters)
    // };
       
    // const resetFilters = () => {
    //     setFilters({
    //         roastery: [],
    //         origin: [],
    //     });
    //     console.log(filters)
    // };
       
       

    return (
        <div className='filters-container'>
            <h1  className='filters-container__heading'>Filter by Roastery</h1>
            <div className='filters-container__items-wrapper '>

                {roasteriesNames.map((roastery) => {
                    return (
                        <div className='filters-container__item-row' key={roastery}>
                            <input
                            className='input'
                            type={'checkbox'}
                            value={roastery}
                            onChange={onRoasteryChange}
                            />
                            <p className='label'>{roastery}</p>
                    </div>
                    )
                })}
            </div>

            <button onClick={() => applyFilters(filters)}>Apply Filters</button>
            <button onClick={() => resetFilters()}>Reset Filters</button>


            <h1  className='filters-container__heading'>Filter by Origin</h1>
            <div className='filters-container__items-wrapper'>

                {originsNames.map((origin) => {
                    return (
                        <div className='filters-container__item-row' key={origin}>
                            <input
                            className='input'
                            type={'checkbox'}
                            value={origin}
                            onChange={onOriginChange}
                            />
                            <p className='label'>{origin}</p>
                    </div>
                    )
                })}
            </div>             
        </div>
    )
}

export default Filters