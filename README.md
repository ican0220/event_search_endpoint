# Event Search Endpoint
An endpoint to get all events matched from certain location and distance.

## Frameworks, libraries and third parties.
- framework: Next.js and TailwindCSS
- third parties: Google Map API.

## Deploy on Vercel
https://event-search-endpoint.onrender.com/

## DB structure
```
events collection
export interface IEvent extends Document {
  user_id: string;
  username: string;
  address: string;
  location: {
    lng: number;
    lat: number;
  };
}
```

-  create an index for performance. For example, create hash, B+ free index in id.
 
## Endpoint Request and Response.
- URI: /api/events
- Request Method: Post
- Payload: { address: 'San Francisco, CA, USA', distance: 3 }
``` 
Response: [
    {_id: 'xxx', user_id: 'xxxx', username: 'xxxx', address: 'San Francisco, CA, USA', location: {lat: 'xxx', lng: 'xxx'}},
    {_id: 'yyy', user_id: 'yyy'', username: 'yyy', address: 'San Francisco, CA, USA', location: {lat: 'yyy', lng: 'yyy'}}
]
```

## Deploy on AWS
https://main.dd1q7rjjbjuwd.amplifyapp.com/

