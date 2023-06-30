import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { moveToCart } from "@/redux/store/cartSlice";
import { useState } from "react";

export function usePrevious(value) {
  const ref = useRef();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

export const useMoveToCart = () => {
  const dispatch = useDispatch();
  const dorequest = async () => {
    dispatch(moveToCart());
  };

  return { dorequest };
};

const useSticky = () => {
  const stickyRef = useRef(null);
  const [sticky, setSticky] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!stickyRef.current) {
      return;
    }
    setOffset(stickyRef.current.offsetTop);
  }, [stickyRef, setOffset]);

  useEffect(() => {
    const handleScroll = () => {
      if (!stickyRef.current) {
        return;
      }

      setSticky(window.scrollY > offset);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setSticky, stickyRef, offset]);
  return { stickyRef, sticky };
};

export default useSticky;
