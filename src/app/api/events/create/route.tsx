/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { NextResponse } from "next/server";
import axios from "axios";
import calculateDistance from "@/app/lib/calculateDistance";
import dbConnect from "@/app/lib/mongodb";
import Event from "@/app/models/event";

export async function POST(request: Request) {
  const { address } = await request.json();

  const user_id = '6045a129942e3152658dea5d';
  const username = "Kevin M. Dougherty-GPX";
  try {
     await dbConnect();
    // const event = await Event.find();

    const response1 = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          address: address,
          key: "AIzaSyD5SWtYvepl_a7bHPs9S2dUSCYVF6Whgmg",
        },
      }
    );
    
    const location = response1.data.results[0].geometry.location;
    console.log('location=====', location)
    const _event = { user_id: user_id, username: username, address: address, location: { lat: location.lat, lng: location.lng}};
    console.log('event=======', _event)
    const event = new Event(_event)
    await event.save();
    

    return NextResponse.json({ message: 'success' });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: `failed!` });
  }
}
