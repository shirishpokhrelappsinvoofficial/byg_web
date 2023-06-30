import Homepage from "@components/homepage/Homepage";
import { Suspense } from "react";
import LoadingServerData from "@components/loader/LoadingServerData";
import { getHomapageData } from "@apis/get";
import { cookies, headers } from "next/headers";
import { v4 as uuidv4 } from "uuid";

// export const dynamic = "force-dynamic";

export default async function Home(props) {
  let cookie =
    cookies().get("Device_id")?.value || headers().get("Device_id") || uuidv4();

  let token = cookies().get("byg_tk")?.value;

  const homePageData = await getHomapageData({}, token, cookie);

  return (
    <Suspense fallback={<LoadingServerData />}>
      <Homepage data={homePageData} />
    </Suspense>
  );
}
