import { render, fireEvent } from '@testing-library/react';

import Regions from './Regions';

import regions from '../../../../fixtures/regions';

describe('Regions', () => {
  const handleClick = jest.fn();

  function rederRegions(regionName) {
    return render((
      <Regions
        regions={regions}
        onClick={handleClick}
        regionName={regionName}
      />
    ));
  }

  context('with selected region', () => {
    regions.forEach((region, index) => {
      it("renders 'V' button with equal region name", () => {
        const { getAllByRole } = rederRegions(region.name);

        expect(getAllByRole('button')[index].textContent).toContain('V');
      });
    });
  });

  context('without selected region', () => {
    it('renders regions', () => {
      const { getAllByRole } = rederRegions();

      regions.forEach((region, index) => {
        expect(getAllByRole('button')[index].textContent).toBe(region.name);
      });

      expect(getAllByRole('listitem')).toHaveLength(regions.length);
    });

    it('renders button to listent to click event', () => {
      const { getAllByRole } = rederRegions();

      const regionButtons = getAllByRole('button');

      expect(handleClick).not.toBeCalled();

      regionButtons.forEach((regionButton) => {
        fireEvent.click(regionButton);

        expect(handleClick).toBeCalledWith({
          field: 'regionName',
          content: regionButton.textContent,
        });
      });
    });
  });
});
