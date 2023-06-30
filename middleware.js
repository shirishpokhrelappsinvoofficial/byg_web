import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
export function middleware(request) {
  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API
  let cookie = request.cookies.get("Device_id")?.value;

  //   const allCookies = request.cookies.getAll();

  //   request.cookies.has("nextjs"); // => true
  //   request.cookies.delete("nextjs");
  //   request.cookies.has("nextjs"); // => false

  // Setting cookies on the response using the `ResponseCookies` API
  const response = NextResponse.next();

  response.cookies.set({
    name: "Device_id",
    value: cookie ? cookie : uuidv4(),
  });

  cookie = response.cookies.get("Device_id");

  // The outgoing response will have a `Set-Cookie:vercel=fast;path=/test` header.

  return response;
}
