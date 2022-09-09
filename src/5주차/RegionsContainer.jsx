import { useSelector } from 'react-redux';

import Regions from './Regions';

import { get } from './utils';

export default function RegionsContainer({ onClick }) {
  const regions = useSelector(get('regions'));
  const filter = useSelector(get('filter'));

  // const { regions, filter } = useSelector((state) => ({
  //   regions: state.regions,
  //   filter: state.filter,
  // }));

  return (
    <Regions
      regions={regions}
      onClick={onClick}
      regionName={filter.regionName}
    />
  );
}
