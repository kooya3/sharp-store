import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Products",
  type: "document",
  icon: TrolleyIcon,
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: "images",
        title: "Product Images",
        type: "array",
        of: [
          {
            type: "image",
            options: {
              hotspot: true,
            },
          },
        ],
        validation: (Rule) => Rule.min(1).required(), // Require at least one image
      }),
    defineField({
      name: "description",
      title: "Description",
      type: "blockContent",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    // New field for size ranges
    defineField({
        name: "sizes",
        title: "Available Sizes",
        type: "array",
        of: [
          {
            type: "object",
            fields: [
              defineField({
                name: "size",
                title: "Size",
                type: "string",
                options: {
                  list: [
                    { title: "Small", value: "S" },
                    { title: "Medium", value: "M" },
                    { title: "Large", value: "L" },
                    { title: "XLarge", value: "XL" },
                    { title: "XXLarge", value: "XXL" },
                    { title: "Plus Sizes", value: "Plus" },
                    { title: "Special Order", value: "Special" },
                  ],
                  layout: "dropdown", // Display as a dropdown for better UX
                },
                validation: (Rule) => Rule.required(),
              }),
              defineField({
                name: "stock",
                title: "Stock",
                type: "number",
                validation: (Rule) => Rule.min(0).required(),
              }),
              defineField({
                name: "price",
                title: "Price",
                type: "number",
                validation: (Rule) => Rule.min(0).required(),
              }),
            ],
          },
        ],
        validation: (Rule) => Rule.required().min(1), // At least one size must be selected
      }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
      price: "price",
    },
    prepare(select) {
      return {
        title: select.title,
        subtitle: `$${select.price}`,
        media: select.media,
      };
    },
  },
});