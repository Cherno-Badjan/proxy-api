require('dotenv').config();
const { formatLocation, mungeWeather, mungeReview } = require('../lib/munge-functions.js');

const fakeRequest = require('supertest');
const app = require('../lib/app');


describe('app routes', () => {
  describe('routes', () => {
    let token;


    test('returns animals', async () => {

      const expectation = [{
        name: 'Luc Lac',
        image_url: 'https://s3-media1.fl.yelpcdn.com/bphoto/azr6sD6VeJbdaiO2aKvSsw/o.jpg',
        price: '$$',
        rating: 4.0,
        url: 'https://www.yelp.com/biz/luc-lac-portland-7?adjust_creative=W4-fw5orI81WMg21PQOASQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=W4-fw5orI81WMg21PQOASQ',
      }];

      const actualData = {
        businesses: [
          {
            "id": "Ys42wLKqrflqmtqkgqOXgA",
            "alias": "luc-lac-portland-7",
            "name": "Luc Lac",
            "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/azr6sD6VeJbdaiO2aKvSsw/o.jpg",
            "is_closed": false,
            "url": "https://www.yelp.com/biz/luc-lac-portland-7?adjust_creative=W4-fw5orI81WMg21PQOASQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=W4-fw5orI81WMg21PQOASQ",
            "review_count": 3205,
            "categories": [
              {
                "alias": "vietnamese",
                "title": "Vietnamese"
              },
              {
                "alias": "tapasmallplates",
                "title": "Tapas/Small Plates"
              },
              {
                "alias": "cocktailbars",
                "title": "Cocktail Bars"
              }
            ],
            "rating": 4.0,
            "coordinates": {
              "latitude": 45.516868,
              "longitude": -122.675447
            },
            "transactions": [
              "delivery",
              "pickup"
            ],
            "price": "$$",
            "location": {
              "address1": "835 SW 2nd Ave",
              "address2": null,
              "address3": "",
              "city": "Portland",
              "zip_code": "97204",
              "country": "US",
              "state": "OR",
              "display_address": [
                "835 SW 2nd Ave",
                "Portland, OR 97204"
              ]
            },
            "phone": "+15032220047",
            "display_phone": "(503) 222-0047",
            "distance": 1312.1776320869053
          }
        ]
      };

      const actual = mungeReview(actualData);


      expect(actual).toEqual(expectation);
    });
  });
});
