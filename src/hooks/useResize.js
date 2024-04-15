import { useEffect } from "react";
import debounce from "lodash/debounce";

const useResize = ({ onResize }) => {
  useEffect(() => {
    const handleResize = debounce(() => onResize(), 200);

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useResize;
