/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { NextResponse } from "next/server";
import axios from "axios";
import calculateDistance from "@/app/lib/calculateDistance";
import event from "../event.json";
import dbConnect from "@/app/lib/mongodb";
import Event from "@/app/models/event";

export async function POST(request: Request) {
  const { location, distance } = await request.json();

  try {
    // await dbConnect();
    // const event = await Event.find();

    const response1 = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          address: location,
          key: "AIzaSyD5SWtYvepl_a7bHPs9S2dUSCYVF6Whgmg",
        },
      }
    );
    
    const location1 = response1.data.results[0].geometry.location;

    const promises = (event as any).map(async (e: any, index: number) => {
      
      const response2 = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address: e.biodata.location,
            key: "AIzaSyD5SWtYvepl_a7bHPs9S2dUSCYVF6Whgmg",
          },
        }
      );
      
      const location2 = response2.data.results[0].geometry.location;
      // const location2 = event.location;
      const dis = calculateDistance(
        location1.lat,
        location1.lng,
        location2.lat,
        location2.lng
      );
      if (dis <= distance) {
        return e;
      } else {
        return undefined;
      }
    });

    const results = await Promise.all(promises);

    // Filter out undefined values (events that were not within distance)
    const _events = results.filter((e) => e !== undefined);

    return NextResponse.json({ message: JSON.stringify(_events) });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: `Hello, ${distance}!` });
  }
}
