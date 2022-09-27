import { render } from '@testing-library/react';

import Reviews from './Reviews';

import restaurantDetail from '../../../../fixtures/restaurantDetail';

describe('Reviews', () => {
  const reviews = restaurantDetail.reviews.reverse();

  context('with reviews', () => {
    it('renders title', () => {
      const { container } = render(<Reviews reviews={reviews} />);

      expect(container).toHaveTextContent('리뷰');
    });

    it('renders reviews', () => {
      const { getAllByRole } = render(<Reviews reviews={reviews} />);

      const reviewList = getAllByRole('listitem');

      reviewList.forEach((review, index) => {
        expect(review.textContent).toContain(reviews[index].name);
        expect(review.textContent).toContain(String(reviews[index].score));
        expect(review.textContent).toContain(reviews[index].description);
      });
    });
  });

  context('without reviews', () => {
    const noReviews = [[], null, undefined];

    noReviews.forEach((noReview) => {
      it('deoes\'t render anything', () => {
        const { container } = render(<Reviews reviews={noReview} />);

        expect(container.innerHTML).toBe('');
      });
    });
  });
});
