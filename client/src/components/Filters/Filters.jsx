import './index.scss';
import { useQuery } from 'react-query';
import { getCoffeeOriginsHeaders, getRoasteriessHeaders } from '../../api/apiCoffeeData';


const Filters = (props) => {


    const { origin, setOrigin, roastery, setRoastery, filterCount, setFilterCount } = props


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
        if(input.checked){
            const state = [...roastery, input.value]
            setRoastery(state);
            setFilterCount(filterCount + 1);
        } else {
            const state = roastery.filter((val) => val !== input.value);
            setRoastery(state);
            setFilterCount(filterCount - 1);
        }
    };

    const onOriginChange = ({ currentTarget: input }) => {
        if(input.checked){
            const state = [...origin, input.value]
            setOrigin(state);
            setFilterCount(filterCount + 1);
        } else {
            const state = origin.filter((val) => val !== input.value);
            setOrigin(state);
            setFilterCount(filterCount - 1);
        }
    };

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