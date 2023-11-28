import unittest
from service.raiting_service import calc_rating
from entity.rating import Rating

class TestRatingMethods(unittest.TestCase):

    def test_calc_raiting(self):
        raiting:Rating = Rating(bets=0,wins=0,rating=0)
        self.assertEqual(calc_rating(rating=raiting),0)

        raiting:Rating = Rating(bets=1,wins=1,rating=0)
        self.assertEqual(calc_rating(rating=raiting),100)

        raiting:Rating = Rating(bets=1,wins=0,rating=0)
        self.assertEqual(calc_rating(rating=raiting),0)

        raiting:Rating = Rating(bets=16,wins=4,rating=0)
        self.assertEqual(calc_rating(rating=raiting),25)

        raiting:Rating = Rating(bets=10,wins=4,rating=0)
        self.assertEqual(calc_rating(rating=raiting),40)

if __name__ == '__main__':
    unittest.main()