import './index.scss';
import { useQuery } from 'react-query';
import { getCoffeeOriginsHeaders, getRoasteriessHeaders } from '../../api/apiCoffeeData';
import { useEffect } from 'react';



const Filters = (props) => {

    const { filters, setFilters, roasteryValuesRef, originValuesRef, checkedItems, setCheckedItems } = props

    useEffect(() => {
        setCheckedItems([]); // Reset checkedItems to an empty array
        Object.values(filters).forEach((newArray) => {
            setCheckedItems(prevCheckedItems => [...prevCheckedItems, ...newArray]);
        });
    }, [filters])


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


    const onRoasteryChange = (e) => {
        if (e.target.checked) {
            roasteryValuesRef.current.push(e.target.value);
            setCheckedItems(prevCheckedItems => [...prevCheckedItems, e.target.value]);
        } else {
            roasteryValuesRef.current = roasteryValuesRef.current.filter(val => val !== e.target.value);
            setCheckedItems(prevCheckedItems => prevCheckedItems.filter(val => val !== e.target.value));
        }
    };
     

    const onOriginChange = (e) => {
        if (e.target.checked) {
            originValuesRef.current.push(e.target.value);
            setCheckedItems(prevCheckedItems => [...prevCheckedItems, e.target.value]);
        } else {
            originValuesRef.current = originValuesRef.current.filter(val => val !== e.target.value);
            setCheckedItems(prevCheckedItems => prevCheckedItems.filter(val => val !== e.target.value));
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
                                onChange={(e) => onRoasteryChange(e)}
                                checked={checkedItems.includes(roastery)}
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
                                onChange={(e) => onOriginChange(e)}
                                checked={checkedItems.includes(origin)}                               
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