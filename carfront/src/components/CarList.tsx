import axios from 'axios';
import { CarResponse } from '../types';
import { useQuery } from '@tanstack/react-query';

function CarList() {
  const getCars = async (): Promise<CarResponse[]> => {
    const response = await axios.get('http://localhost:8080/api/cars');

    return response.data._embedded.cars;
  };

  const { data, error, isSuccess } = useQuery({
    queryKey: ['cars'],
    queryFn: getCars,
  });

  if (!isSuccess) {
    return <span>Loading...</span>;
  }
  if (error) {
    return <span>자동차 들을 불러오는데 실패했습니다. </span>;
  } else {
    return (
      <table>
        <tbody>
          {data.map((car: CarResponse) => (
            <tr key={car._links.self.href}>
              <td>{car.brand}</td>
              <td>{car.model}</td>
              <td>{car.color}</td>
              <td>{car.registrationNumber}</td>
              <td>{car.modelYear}</td>
              <td>{car.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default CarList;
