"use client";
import { useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Location() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const city = localStorage.getItem('city')
    const state = localStorage.getItem('state')
    if(city && state) {
      const params = new URLSearchParams(searchParams);
      params.set("city", city);
          params.set("state", state)
          replace(`${pathname}?${params.toString()}`);
    } else {
      window.navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          (async function () {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`
            );
            const data = await response.json();
          
            const params = new URLSearchParams(searchParams);
            params.set("city", data.address.town);
            params.set("state", data.address.state)
            replace(`${pathname}?${params.toString()}`);
            localStorage.setItem('city', data.address.town)
            localStorage.setItem('state', data.address.state)
          })();
        },
        (error) => console.log(error)
      );

    }
  }, []);


  //console.log(location)
  //console.log(city)
  return (
    <>
    </>
  );
}
