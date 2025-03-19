"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { toast } from "@/hooks/use-toast";
import type { ProductType } from "@/components/productcard/product-card";

export type CartItem = {
  product: ProductType;
  variantIndex: number;
  sizeIndex: number;
  quantity: number;
};

type CartContextType = {
  cart: {
    items: CartItem[];
    subtotal: number;
    total: number;
    discount: number;
    shipping: number;
  };
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartContextType["cart"]>({
    items: [],
    subtotal: 0,
    total: 0,
    discount: 0,
    shipping: 0,
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cart]);

  // Calculate totals whenever cart items change
  useEffect(() => {
    const subtotal = cart.items.reduce((total, item) => {
      const variant = item.product.variants[item.variantIndex];
      const size = variant.sizes[item.sizeIndex];
      return total + size.price * item.quantity;
    }, 0);

    // Apply discount if applicable (e.g., coupon code)
    const discount = 0; // This would be calculated based on applied coupons

    // Calculate shipping (free over ₹999)
    const shipping = subtotal > 999 ? 0 : 99;

    // Calculate total
    const total = subtotal - discount + shipping;

    setCart((prev) => ({
      ...prev,
      subtotal,
      discount,
      shipping,
      total,
    }));
  }, [cart.items]);

  const addToCart = (newItem: CartItem) => {
    setCart((prev) => {
      // Check if the item already exists in the cart
      const existingItemIndex = prev.items.findIndex(
        (item) =>
          item.product.id === newItem.product.id &&
          item.variantIndex === newItem.variantIndex &&
          item.sizeIndex === newItem.sizeIndex
      );

      let updatedItems;

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        updatedItems = [...prev.items];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
      } else {
        // Add new item if it doesn't exist
        updatedItems = [...prev.items, newItem];
      }

      toast({
        title: "Added to cart",
        description: `${newItem.product.name} has been added to your cart.`,
      });

      return {
        ...prev,
        items: updatedItems,
      };
    });
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => {
      const updatedItems = [...prev.items];
      const removedItem = updatedItems[index];
      updatedItems.splice(index, 1);

      toast({
        title: "Removed from cart",
        description: `${removedItem.product.name} has been removed from your cart.`,
      });

      return {
        ...prev,
        items: updatedItems,
      };
    });
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity < 1) return;

    setCart((prev) => {
      const updatedItems = [...prev.items];

      // Check if we have enough stock
      const item = updatedItems[index];
      const variant = item.product.variants[item.variantIndex];
      const size = variant.sizes[item.sizeIndex];

      if (quantity > size.stock) {
        toast({
          title: "Not enough stock",
          description: `Sorry, we only have ${size.stock} items in stock.`,
          variant: "destructive",
        });
        return prev;
      }

      updatedItems[index].quantity = quantity;
      return {
        ...prev,
        items: updatedItems,
      };
    });
  };

  const clearCart = () => {
    setCart({
      items: [],
      subtotal: 0,
      total: 0,
      discount: 0,
      shipping: 0,
    });

    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
