"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  Eye,
  Check,
  Plus,
  Minus,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Type definitions
export type ProductVariant = {
  color: string;
  colorName: string;
  colorCode: string;
  sizes: {
    name: string;
    price: number;
    stock: number;
  }[];
  images: string[];
};

export type ProductType = {
  id: number;
  name: string;
  basePrice: number;
  category: string;
  description: string;
  badges?: {
    text: string;
    color: string;
  }[];
  variants: ProductVariant[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  discount?: number;
  rating?: number;
  reviewCount?: number;
};

// Helper function to format price in Indian Rupees
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};

interface ProductCardProps {
  product: ProductType;
  variant?: "default" | "horizontal" | "compact";
  featuredIndex?: number;
}

export default function ProductCard({
  product,
  variant = "default",
  featuredIndex = 0,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Default to first variant if none selected
  const currentVariant = product.variants[selectedVariant];
  const currentImages = currentVariant.images;

  // Find selected size
  const sizeInfo = selectedSize
    ? currentVariant.sizes.find((s) => s.name === selectedSize)
    : currentVariant.sizes[0];

  // Calculate the current price
  const price = sizeInfo?.price || product.basePrice;
  const hasDiscount = product.discount && product.discount > 0;
  const discountedPrice = hasDiscount
    ? Math.round(price - (price * (product.discount as number)) / 100)
    : price;

  // Check stock availability
  const inStock = sizeInfo ? sizeInfo.stock > 0 : false;

  // Handle add to cart
  const handleAddToCart = () => {
    if (!selectedSize) {
      setSelectedSize(currentVariant.sizes[0].name);
    }

    // Only allow adding to cart if in stock
    if (inStock) {
      setIsAddedToCart(true);
      // Here you would typically dispatch to a cart context/store

      // Reset after animation
      setTimeout(() => {
        setIsAddedToCart(false);
      }, 2000);
    }
  };

  // Increment/decrement quantity
  const incrementQuantity = () => {
    if (sizeInfo && quantity < sizeInfo.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Function to change image in quick view
  const changeImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Navigate through images
  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === currentImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? currentImages.length - 1 : prev - 1
    );
  };

  // Class names for the card based on variant
  const cardClasses = {
    default:
      "group relative overflow-hidden rounded-lg transition-all duration-300 bg-white hover:shadow-lg hover:-translate-y-1",
    horizontal:
      "group relative overflow-hidden rounded-lg transition-all duration-300 bg-white hover:shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4",
    compact:
      "group relative overflow-hidden rounded-lg transition-all duration-300 bg-white hover:shadow-lg",
  };

  return (
    <>
      <div
        className={cardClasses[variant]}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transitionDelay: featuredIndex ? `${featuredIndex * 100}ms` : "0ms",
        }}
      >
        {/* Product Image */}
        <div
          className={cn(
            "relative overflow-hidden",
            variant === "default"
              ? "aspect-[3/4]"
              : variant === "horizontal"
              ? "aspect-square h-full"
              : "aspect-square"
          )}
        >
          <Image
            src={currentImages[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className={cn(
              "object-cover transition-transform duration-500",
              isHovered ? "scale-110" : "scale-100"
            )}
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {hasDiscount && (
              <Badge className="bg-red-500 text-white hover:bg-red-600">
                {product.discount}% OFF
              </Badge>
            )}

            {product.badges?.map((badge, idx) => (
              <Badge key={idx} className={cn(badge.color, "text-white")}>
                {badge.text}
              </Badge>
            ))}

            {product.isNew && (
              <Badge className="bg-secondary text-white hover:bg-secondary/90">
                NEW
              </Badge>
            )}

            {product.isBestSeller &&
              !product.badges?.some((b) => b.text === "Best Seller") && (
                <Badge className="bg-primary text-white hover:bg-primary/90">
                  BEST SELLER
                </Badge>
              )}
          </div>

          {/* Hover Overlay with Actions */}
          <div
            className={cn(
              "absolute inset-0 bg-black/5 flex items-center justify-center gap-2 transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full bg-white/80 text-black hover:bg-white transform hover:scale-110 transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleAddToCart();
                    }}
                  >
                    <ShoppingBag className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to Cart</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="secondary"
                    className={cn(
                      "rounded-full bg-white/80 text-black hover:bg-white transform hover:scale-110 transition-all",
                      isWishlist ? "text-red-500 bg-red-50" : ""
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setIsWishlist(!isWishlist);
                    }}
                  >
                    <Heart
                      className={cn(
                        "h-5 w-5",
                        isWishlist ? "fill-red-500" : ""
                      )}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {isWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Dialog open={quickViewOpen} onOpenChange={setQuickViewOpen}>
                    <DialogTrigger asChild>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full bg-white/80 text-black hover:bg-white transform hover:scale-110 transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                        }}
                      >
                        <Eye className="h-5 w-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                        {/* Product Images */}
                        <div className="relative h-[400px] md:h-[600px] bg-gray-100">
                          <Image
                            src={
                              currentImages[currentImageIndex] ||
                              "/placeholder.svg"
                            }
                            alt={product.name}
                            fill
                            className="object-cover"
                          />

                          {/* Image Navigation */}
                          <Button
                            size="icon"
                            variant="ghost"
                            className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 hover:bg-white w-10 h-10 rounded-full"
                            onClick={prevImage}
                          >
                            <ChevronUp className="h-6 w-6 -rotate-90" />
                          </Button>

                          <Button
                            size="icon"
                            variant="ghost"
                            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 hover:bg-white w-10 h-10 rounded-full"
                            onClick={nextImage}
                          >
                            <ChevronUp className="h-6 w-6 rotate-90" />
                          </Button>

                          {/* Thumbnail Navigation */}
                          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                            {currentImages.map((img, idx) => (
                              <button
                                key={idx}
                                className={cn(
                                  "w-12 h-12 border-2 transition-all",
                                  idx === currentImageIndex
                                    ? "border-primary"
                                    : "border-white/50 hover:border-white"
                                )}
                                onClick={() => changeImage(idx)}
                              >
                                <Image
                                  src={img || "/placeholder.svg"}
                                  alt={`Thumbnail ${idx}`}
                                  width={48}
                                  height={48}
                                  className="object-cover w-full h-full"
                                />
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="p-6 flex flex-col h-[400px] md:h-[600px] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-bold">
                              {product.name}
                            </DialogTitle>
                            <DialogDescription>
                              <div className="flex items-center gap-2 mt-1">
                                {product.rating && (
                                  <div className="flex items-center">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <svg
                                        key={i}
                                        className={cn(
                                          "w-4 h-4",
                                          i <
                                            Math.floor(product.rating as number)
                                            ? "text-yellow-400 fill-yellow-400"
                                            : "text-gray-300 fill-gray-300"
                                        )}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                      </svg>
                                    ))}
                                    <span className="ml-1 text-sm text-gray-600">
                                      {product.rating} ({product.reviewCount}{" "}
                                      reviews)
                                    </span>
                                  </div>
                                )}
                              </div>
                            </DialogDescription>
                          </DialogHeader>

                          <div className="mt-4">
                            <p className="text-gray-600">
                              {product.description}
                            </p>
                          </div>

                          <div className="mt-6">
                            <h3 className="text-lg font-medium mb-2">Color</h3>
                            <div className="flex gap-2 mb-4">
                              {product.variants.map((variant, idx) => (
                                <button
                                  key={idx}
                                  className={cn(
                                    "w-8 h-8 rounded-full transition-all border-2",
                                    selectedVariant === idx
                                      ? "border-primary"
                                      : "border-transparent"
                                  )}
                                  style={{ background: variant.colorCode }}
                                  onClick={() => {
                                    setSelectedVariant(idx);
                                    setCurrentImageIndex(0);
                                  }}
                                  title={variant.colorName}
                                />
                              ))}
                            </div>

                            <h3 className="text-lg font-medium mb-2">Size</h3>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {currentVariant.sizes.map((size) => (
                                <button
                                  key={size.name}
                                  className={cn(
                                    "px-3 py-1 border rounded transition-all",
                                    selectedSize === size.name
                                      ? "border-primary bg-primary/10 text-primary"
                                      : "border-gray-300 hover:border-gray-400",
                                    size.stock === 0 &&
                                      "opacity-50 cursor-not-allowed"
                                  )}
                                  onClick={() =>
                                    size.stock > 0 && setSelectedSize(size.name)
                                  }
                                  disabled={size.stock === 0}
                                >
                                  {size.name}
                                  {size.stock === 0 && " (Out of Stock)"}
                                </button>
                              ))}
                            </div>

                            <div className="flex items-center justify-between mb-6">
                              <div>
                                {hasDiscount ? (
                                  <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold">
                                      {formatPrice(discountedPrice)}
                                    </span>
                                    <span className="text-gray-500 line-through">
                                      {formatPrice(price)}
                                    </span>
                                    <span className="text-red-500 text-sm font-medium">
                                      ({product.discount}% off)
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-2xl font-bold">
                                    {formatPrice(price)}
                                  </span>
                                )}
                              </div>

                              {sizeInfo && (
                                <div className="text-sm text-gray-600">
                                  {sizeInfo.stock > 10
                                    ? "In Stock"
                                    : sizeInfo.stock > 0
                                    ? `Only ${sizeInfo.stock} left`
                                    : "Out of Stock"}
                                </div>
                              )}
                            </div>

                            <div className="flex flex-col gap-4 mt-auto">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center border rounded">
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-10 w-10 rounded-none"
                                    onClick={decrementQuantity}
                                    disabled={quantity <= 1}
                                  >
                                    <Minus className="h-3 w-3" />
                                    <span className="sr-only">Decrease</span>
                                  </Button>
                                  <span className="w-12 text-center">
                                    {quantity}
                                  </span>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-10 w-10 rounded-none"
                                    onClick={incrementQuantity}
                                    disabled={
                                      !sizeInfo || quantity >= sizeInfo.stock
                                    }
                                  >
                                    <Plus className="h-3 w-3" />
                                    <span className="sr-only">Increase</span>
                                  </Button>
                                </div>

                                <Button
                                  className="flex-1 gap-2"
                                  size="lg"
                                  disabled={!inStock}
                                  onClick={handleAddToCart}
                                >
                                  {isAddedToCart ? (
                                    <>
                                      <Check className="h-4 w-4" />
                                      Added to Cart
                                    </>
                                  ) : (
                                    <>
                                      <ShoppingBag className="h-4 w-4" />
                                      Add to Cart
                                    </>
                                  )}
                                </Button>

                                <Button
                                  size="icon"
                                  variant="outline"
                                  className={cn(
                                    "rounded-full size-12",
                                    isWishlist
                                      ? "text-red-500 border-red-200 bg-red-50"
                                      : ""
                                  )}
                                  onClick={() => setIsWishlist(!isWishlist)}
                                >
                                  <Heart
                                    className={cn(
                                      "h-5 w-5",
                                      isWishlist ? "fill-red-500" : ""
                                    )}
                                  />
                                  <span className="sr-only">
                                    Add to wishlist
                                  </span>
                                </Button>
                              </div>
                            </div>
                          </div>

                          <Tabs defaultValue="description" className="mt-8">
                            <TabsList className="grid grid-cols-3">
                              <TabsTrigger value="description">
                                Description
                              </TabsTrigger>
                              <TabsTrigger value="details">Details</TabsTrigger>
                              <TabsTrigger value="shipping">
                                Shipping
                              </TabsTrigger>
                            </TabsList>
                            <TabsContent
                              value="description"
                              className="text-sm text-gray-600 mt-4"
                            >
                              <p>{product.description}</p>
                              <p className="mt-2">
                                Experience premium quality and comfort with our
                                exclusive collection designed for the modern
                                man.
                              </p>
                            </TabsContent>
                            <TabsContent
                              value="details"
                              className="text-sm text-gray-600 mt-4"
                            >
                              <ul className="list-disc pl-5 space-y-1">
                                <li>Premium quality materials</li>
                                <li>Comfortable fit</li>
                                <li>Easy care instructions</li>
                                <li>Modern design</li>
                                <li>Versatile styling options</li>
                              </ul>
                            </TabsContent>
                            <TabsContent
                              value="shipping"
                              className="text-sm text-gray-600 mt-4"
                            >
                              <p>
                                Free standard shipping on all orders over ₹999.
                              </p>
                              <p className="mt-2">
                                Estimated delivery time: 3-5 business days.
                              </p>
                            </TabsContent>
                          </Tabs>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Quick View</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Add to Cart Overlay */}
          <div
            className={cn(
              "absolute inset-0 bg-white/90 flex flex-col items-center justify-center transition-all duration-300",
              isAddedToCart ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            <Check className="h-8 w-8 text-primary mb-2" />
            <p className="text-center font-medium">Added to Cart!</p>
          </div>

          {/* Color Options */}
          {variant !== "compact" && (
            <div className="absolute bottom-2 left-2 flex gap-1">
              {product.variants.map((variant, idx) => (
                <button
                  key={idx}
                  className={cn(
                    "w-5 h-5 rounded-full transition-transform border",
                    selectedVariant === idx
                      ? "border-gray-700 scale-125"
                      : "border-gray-300 scale-100"
                  )}
                  style={{ background: variant.colorCode }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedVariant(idx);
                  }}
                  title={variant.colorName}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div
          className={cn(
            "p-4",
            variant === "horizontal" && "flex flex-col justify-center"
          )}
        >
          <div className="text-sm text-muted-foreground mb-1">
            {product.category}
          </div>

          <Link
            href={`/product/${product.id}`}
            className="font-medium hover:underline block"
          >
            {product.name}
          </Link>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              {hasDiscount ? (
                <>
                  <span className="font-semibold">
                    {formatPrice(discountedPrice)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(price)}
                  </span>
                </>
              ) : (
                <span className="font-semibold">{formatPrice(price)}</span>
              )}
            </div>

            {product.rating && variant !== "compact" && (
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={cn(
                      "w-3 h-3",
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300 fill-gray-300"
                    )}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
                {product.reviewCount && variant === "horizontal" && (
                  <span className="text-xs text-gray-500 ml-1">
                    ({product.reviewCount})
                  </span>
                )}
              </div>
            )}
          </div>

          {variant === "horizontal" && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 line-clamp-2">
                {product.description}
              </p>

              <div className="flex gap-2 mt-4">
                <Button
                  className="gap-2"
                  size="sm"
                  onClick={handleAddToCart}
                  disabled={!inStock}
                >
                  <ShoppingBag className="h-4 w-4" />
                  Add to Cart
                </Button>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Quick View
                    </Button>
                  </DialogTrigger>
                  {/* Dialog content would be the same as above */}
                </Dialog>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
