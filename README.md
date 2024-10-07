This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Next Ecommerce 

## Project Description

This eCommerce application is built using Next.js, a powerful React framework that enables server-side rendering and static site generation for optimal performance. The project features a sleek and responsive design, allowing users to browse products seamlessly across various devices.

### Features

#### User Authentication: 
- **User Authentication:** Secure registration and login process with role-based access control. Admins can manage products while users can view and purchase items.
Product Management:** Admins can easily add, update, and delete products, including images, descriptions, prices, and categories (Men, Women, Kids).
- **Shopping Cart:** Users can add items to their cart,remove them, adjust quantities, and proceed to checkout with a straightforward user interface.
- **Password Management:** Users can change their passwords and reset them if forgotten.
- **Middleware/Policies:** Implement custom middleware for secure routes and accessing pages.
- **Category Filtering:** Users can filter products by category to quickly find items that interest them.
- **Responsive Design:** The application is optimized for all screen sizes, providing a user-friendly experience on desktops, tablets, and mobile devices.
- **Image Uploads:** Products can include images uploaded to the server, enhancing the shopping experience.


## INSTALLATION
1.📦 Install dependencies.
```
npm install
```
2.🛠️ run this script for generating an admin account in MongoDB.
```
node src/scripts/admin.js
```
3.🔑 Generate the env with secret email admin and pass.

3.🔑 Generate a secret key in auth/[...nextauth]/routejs.

4.📦 Set up your MongoDB database and configure the connection in your environment variables.

2.🛠️ run the project
```
npm run dev
```



## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
