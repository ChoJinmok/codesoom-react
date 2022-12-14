import { useSelector } from 'react-redux';

import Regions from './Regions';

import { get } from '../utils';

export default function RegionsContainer({ onClick }) {
  const regions = useSelector(get({
    page: 'restaurantsApp',
    key: 'regions',
  }));

  const { regionName } = useSelector(get({
    page: 'restaurantsApp',
    key: 'filter',
  }));

  // const { regions, filter } = useSelector((state) => ({
  //   regions: state.regions,
  //   filter: state.filter,
  // }));

  return (
    <Regions
      regions={regions}
      onClick={onClick}
      regionName={regionName}
    />
  );
}
