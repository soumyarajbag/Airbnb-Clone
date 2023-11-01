import { categories } from "@/config/categories";
import Image from "next/image";
import React from "react";

const Categories = () => {
  return (
    <div className="flex justify-center items-center space-x-8 whitespace-nowrap px-10 my-3 overflow-x-auto pb-4">
      {categories.map((category , index) => {
        return (
          <div className="flex items-center flex-col" key={index}>
            <Image
              src={category.icon}
              alt={category.name}
              width={25}
              height={25}
              className="rounded-full"
            />
            <span className="">{category.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Categories;
