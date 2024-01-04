import { useQuery } from 'react-query';
import { getAllCoffeeItems } from '../api/apiCoffeeData';

const useGetCoffeeItems = (params) => {
  return useQuery(['all coffee items', params], () => getAllCoffeeItems(params), {

    onSuccess: (data) => {
      console.log(data)
    }
  });
};

export default useGetCoffeeItems;