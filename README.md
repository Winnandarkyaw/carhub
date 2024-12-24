This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

1. Search Filters:
 Title: A textbox to search cars by title (partial or full match).
 Brand: A dropdown to filter cars by brand.
 Model: A dropdown that dynamically updates based on the selected brand
 Type: Radio buttons to filter by car type (All, Used, New).
 Status: Checkboxes to filter cars by status (Available, Sold-out, Reserved).
 Price Range: Two input boxes (Price range slider preferred) to specify minimum and 
maximum price.
2. Sorting:
 Price(low/high)
 Manufacture year(old/new)
3. Listing Display:
 Show car details: Title, Brand, Model, Type, Color, Manufacture Year, Price, Status.
 Add a grey ribbon at card for cars with the status "Sold-out."
 (OPTIONAL) Display a maximum of 5 cars per page, with pagination to navigate 
between pages.
4. No Results Found:
 Display a message "No data found" if no cars match the search criteria.