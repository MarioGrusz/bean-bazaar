import { useQuery } from 'react-query';
import { getAllCoffeeItems } from '../api/apiCoffeeData';
import { BASE_URL } from '../constant/apiConstants';

const useGetCoffeeItems = (params) => {
  console.log(`Sending request to: ${BASE_URL}/data?search=${params.search}&page=${params.page}&sort=${params.sort}&isNew=${params.isNew}`);
  return useQuery(['all coffee items', params], () => getAllCoffeeItems(params), {

    onSuccess: (data) => {
      console.log(data)
    }
  });
};

export default useGetCoffeeItems;