import { useEffect, useState } from "react";

const useScrollDownHeight = (height) => {
  const [scrolledDown, setScrolledDown] = useState(false);

  const handleScrollDown = () => {
    if (window !== undefined) {
      let windowHeight = Math.floor(window.scrollY);
      // window height changed for the demo
      console.log(windowHeight);
      windowHeight >= height ? setScrolledDown(true) : setScrolledDown(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScrollDown);
    return () => window.removeEventListener("scroll", handleScrollDown);
  }, []);

  return scrolledDown;
};

export default useScrollDownHeight;
