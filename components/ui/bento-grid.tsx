import { cn } from "@/lib/utils";
import React from "react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-4",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  price,
  badge,
  image,
  footer,
  aspectRatio = "aspect-square",
  imagePosition = "center",
  objectFit = "cover",
  width,
  height,
  priority,
}: {
  className?: string;
  title?: string | React.ReactNode;
  price?: string | React.ReactNode;
  badge?: React.ReactNode;
  image?: string;
  footer?: React.ReactNode;
  aspectRatio?: string;
  imagePosition?: "top" | "center" | "bottom";
  objectFit?: "contain" | "cover" | "fill";
  width?: number;
  height?: number;
  priority?: boolean;
}) => {
  // Helper to convert imagePosition to object-position CSS value
  const getObjectPosition = () => {
    switch (imagePosition) {
      case "top":
        return "object-top";
      case "bottom":
        return "object-bottom";
      default:
        return "object-center";
    }
  };

  // Helper to convert objectFit to CSS classes
  const getObjectFit = () => {
    switch (objectFit) {
      case "contain":
        return "object-contain";
      case "fill":
        return "object-fill";
      default:
        return "object-cover";
    }
  };

  return (
    <div
      className={cn(
        "group/bento shadow-sm row-span-1 flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition duration-200 hover:shadow-md dark:border-white/[0.1] dark:bg-black dark:shadow-none",
        className
      )}
    >
      <div className="relative w-full overflow-hidden">
        {image && (
          <div className={cn("relative w-full overflow-hidden", aspectRatio)}>
            <img
              src={image}
              alt={typeof title === "string" ? title : "Product image"}
              className={cn(
                "h-full w-full transition-transform duration-500 group-hover/bento:scale-105",
                getObjectFit(),
                getObjectPosition()
              )}
              width={width}
              height={height}
              loading={priority ? "eager" : "lazy"}
            />
          </div>
        )}
        {badge && (
          <div className="absolute top-1.5 left-1.5 z-10 scale-90 sm:scale-100 sm:top-2 sm:left-2">
            {badge}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-2.5 sm:p-4">
        <div>
          {title && (
            <h3 className="text-xs sm:text-sm font-medium text-neutral-800 line-clamp-1 dark:text-neutral-200">
              {title}
            </h3>
          )}
          {price && (
            <div className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              {price}
            </div>
          )}
        </div>

        {footer && <div className="mt-2 pt-1 sm:mt-3 sm:pt-2">{footer}</div>}
      </div>
    </div>
  );
};
