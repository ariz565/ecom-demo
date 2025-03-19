"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Eye, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export type ProductVariant = {
  color: string;
  colorName: string;
  sizes: {
    name: string;
    price: number;
    stock: number;
  }[];
  image: string;
};

export type Product = {
  id: number;
  name: string;
  basePrice: number;
  category: string;
  badge?: {
    text: string;
    color: string;
  };
  variants: ProductVariant[];
  description: string;
  rating: number;
  reviewCount: number;
};

type EnhancedProductCardProps = {
  product: Product;
  className?: string;
};

export default function EnhancedProductCard({
  product,
  className,
}: EnhancedProductCardProps) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(
    product.variants[0].sizes[0].name
  );
  const [isHovered, setIsHovered] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const selectedVariant = product.variants[selectedVariantIndex];
  const selectedSizeInfo = selectedVariant.sizes.find(
    (size) => size.name === selectedSize
  );
  const currentPrice = selectedSizeInfo
    ? selectedSizeInfo.price
    : product.basePrice;
  const currentStock = selectedSizeInfo ? selectedSizeInfo.stock : 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <Card
      className={cn(
        "group border-none shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={selectedVariant.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className={cn(
            "object-cover transition-transform duration-500",
            isHovered ? "scale-105" : "scale-100"
          )}
        />

        {product.badge && (
          <div
            className={cn(
              "absolute top-2 left-2 text-xs font-medium px-2 py-1 rounded text-white",
              product.badge.color
            )}
          >
            {product.badge.text}
          </div>
        )}

        <div
          className={cn(
            "absolute right-2 top-2 flex flex-col gap-2 transition-all duration-300",
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
          )}
        >
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full bg-white/80 text-black hover:bg-white w-9 h-9"
            onClick={handleWishlist}
          >
            <Heart
              className={cn(
                "h-5 w-5",
                isWishlisted ? "fill-red-500 text-red-500" : ""
              )}
            />
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full bg-white/80 text-black hover:bg-white w-9 h-9"
              >
                <Eye className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>Quick View</DialogTitle>
                <DialogDescription>{product.name}</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="relative aspect-square">
                  <Image
                    src={selectedVariant.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={cn(
                            "w-4 h-4",
                            i < product.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300 fill-gray-300"
                          )}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({product.reviewCount} reviews)
                    </span>
                  </div>
                  <p className="text-2xl font-bold">
                    {formatPrice(currentPrice)}
                  </p>
                  <p className="text-muted-foreground">{product.description}</p>

                  <div>
                    <p className="text-sm font-medium mb-2">
                      Color: {selectedVariant.colorName}
                    </p>
                    <div className="flex gap-2">
                      {product.variants.map((variant, index) => (
                        <button
                          key={variant.color}
                          className={cn(
                            "w-8 h-8 rounded-full transition-all",
                            selectedVariantIndex === index
                              ? "ring-2 ring-offset-2 ring-primary"
                              : ""
                          )}
                          style={{ backgroundColor: variant.color }}
                          onClick={() => setSelectedVariantIndex(index)}
                          aria-label={`Select color ${variant.colorName}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Size:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedVariant.sizes.map((size) => (
                        <button
                          key={size.name}
                          className={cn(
                            "px-3 py-1 border rounded text-sm transition-all",
                            selectedSize === size.name
                              ? "bg-primary text-white border-primary"
                              : "border-gray-300 hover:border-primary",
                            size.stock === 0 && "opacity-50 cursor-not-allowed"
                          )}
                          onClick={() =>
                            size.stock > 0 && setSelectedSize(size.name)
                          }
                          disabled={size.stock === 0}
                        >
                          {size.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="text-sm">
                    <span
                      className={cn(
                        "font-medium",
                        currentStock < 5 ? "text-red-500" : "text-green-600"
                      )}
                    >
                      {currentStock > 0
                        ? `${currentStock} in stock`
                        : "Out of stock"}
                    </span>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      className="flex-1"
                      onClick={handleAddToCart}
                      disabled={currentStock === 0}
                    >
                      Add to Cart
                    </Button>
                    <Button variant="outline" onClick={handleWishlist}>
                      {isWishlisted
                        ? "Remove from Wishlist"
                        : "Add to Wishlist"}
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm py-3 px-4 transition-all duration-300",
            isHovered
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          )}
        >
          <Button
            className="w-full"
            size="sm"
            onClick={handleAddToCart}
            disabled={currentStock === 0}
          >
            {isAddedToCart ? (
              <span className="flex items-center">
                <Check className="mr-2 h-4 w-4" /> Added to Cart
              </span>
            ) : (
              <span className="flex items-center">
                <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart
              </span>
            )}
          </Button>
        </div>
      </div>

      <CardContent className="pt-4">
        <div className="text-sm text-muted-foreground mb-1">
          {product.category}
        </div>
        <Link
          href={`/product/${product.id}`}
          className="font-medium hover:underline line-clamp-1"
        >
          {product.name}
        </Link>

        <div className="flex items-center gap-2 mt-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={cn(
                  "w-3 h-3",
                  i < product.rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300 fill-gray-300"
                )}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>
      </CardContent>

      <CardFooter className="pt-0 flex justify-between items-center">
        <div>
          <span className="font-semibold">{formatPrice(currentPrice)}</span>
          {selectedSizeInfo && selectedSizeInfo.price !== product.basePrice && (
            <span className="text-xs text-muted-foreground ml-2">
              Base: {formatPrice(product.basePrice)}
            </span>
          )}
        </div>

        <div className="flex gap-1">
          {product.variants.map((variant, index) => (
            <button
              key={variant.color}
              className={cn(
                "w-3 h-3 rounded-full transition-all",
                selectedVariantIndex === index
                  ? "ring-1 ring-offset-1 ring-black"
                  : ""
              )}
              style={{ backgroundColor: variant.color }}
              onClick={() => setSelectedVariantIndex(index)}
              aria-label={`Select color ${variant.colorName}`}
            />
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
