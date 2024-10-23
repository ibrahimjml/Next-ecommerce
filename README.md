This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Next Ecommerce 
![schooldash-dahboard-page](https://i.postimg.cc/Y0VrMnTp/Screenshot-2024-10-23-162711.png)
![schooldash-dahboard-page](https://i.postimg.cc/8CtVTXrq/Screenshot-2024-10-23-163035.png)
![schooldash-dahboard-page](https://i.postimg.cc/j2VT1wf5/Screenshot-2024-10-23-163700.png)
![schooldash-dahboard-page](https://i.postimg.cc/C5Vy7yyn/Screenshot-2024-10-23-163226.png)
## Project Description

This eCommerce application is built using Next.js, a powerful React framework that enables server-side rendering and static site generation for optimal performance. The project features a sleek and responsive design, allowing users to browse products seamlessly across various devices.

### Features

#### User Authentication: 
- **User Authentication:** Secure registration and login process with reset password option. Admins can manage products while users can view and purchase items.
- **Product Management:** Admin can easily add, update, and delete products, including images, descriptions, prices, and categories.
- **Backend APIs:** All APIs secured with JWT it authorized only for admin.
- **Shopping Cart:** Users can add items to their cart,remove them, adjust quantities, and proceed to checkout with a straightforward user interface.
- **Middleware:** Implement custom middleware for secure routes.
- **Category Filtering:** Users can filter products by category to quickly find items that interest them.
- **Darkmode:** Users can toggle Dark/Light mode with smooth transition for better experience.
- **Responsive Design:** The application is optimized for all screen sizes, providing a user-friendly experience on desktops, tablets, and mobile devices.
- **Image Uploads:** Products can include images uploaded to the server, enhancing the shopping experience.


## INSTALLATION
1.📦 Install dependencies.
```
npm install
```
2.📦 Set up your MongoDB database and configure the connection in your environment variables.

3.🛠️ run this script for generating an admin account in MongoDB.
```
node src/scripts/admin.js
```
4.🔑 Generate the env with secret email admin and pass.

5.🔑 Generate a secret key in auth/[...nextauth]/routejs.

6.🛠️ run the project
```
npm run dev
```

## RESTful APIs for this project

only admin role  can perform these CRUD.

`Login`
- `POST /api/signin` - login to get JWT token access.
  
`products`
- `GET /api/getproducts` - Get all products.No authentication required.
- `GET /api/getOneproduct` - Get single product send id in params.No authentication required.
- `POST /api/addproduct` - Create new product , token required.
- `PUT /api/updateproduct` - Update product, token required.
- `DELETE /api/deleteproduct` - Delete single product, token required.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
