"use client";
import {
   createContext,
   useContext,
   useState,
   useCallback,
   ReactNode,
} from "react";

interface WishlistContextType {
   refreshWishlist: () => void;
   wishlistVersion: number;
}

const WishlistContext = createContext<WishlistContextType>({
   refreshWishlist: () => {},
   wishlistVersion: 0,
});

export const useWishlist = () => useContext(WishlistContext);

interface WishlistProviderProps {
   children: ReactNode;
}

export const WishlistProvider = ({ children }: WishlistProviderProps) => {
   const [wishlistVersion, setWishlistVersion] = useState(0);

   const refreshWishlist = useCallback(() => {
      setWishlistVersion((prev) => prev + 1);
   }, []);

   return (
      <WishlistContext.Provider value={{ refreshWishlist, wishlistVersion }}>
         {children}
      </WishlistContext.Provider>
   );
};

export default WishlistContext;
