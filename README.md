# KitchenKeeper – Kitchen Products Shopping Mobile Application

**Student Name:** D.M.P.M. Kularathna\
**Student ID:** HS/2022/1085\
**University:** University of Kelaniya\
**Degree:** BSc (Hons) Computer Studies\
**Course:** Mobile Application Development

---

## 1. Project Introduction

KitchenKeeper is a mobile shopping application designed for customers who are interested in purchasing kitchen products and accessories.

The idea for this application is inspired by Kitchen Keeper Tools, a kitchen-related product page. The application demonstrates how a kitchen product business concept can be developed into a mobile shopping platform.

KitchenKeeper provides a convenient platform where customers can browse kitchen products, search for items, manage their favorites, add products to a shopping cart, and manage their orders.

This project is developed using React Native and Expo as part of the Mobile Application Development assignment.

## 2. Problem Statement

Customers interested in kitchen products may find it difficult to discover products and organize their shopping activities through different platforms.

KitchenKeeper aims to provide a simple mobile solution where customers can explore kitchen products and manage their shopping activities in one application.

## 3. Project Objectives

- Develop a user-friendly mobile shopping application.
- Display a collection of kitchen products.
- Allow users to search and filter products.
- Enable users to manage favorite products.
- Provide shopping cart and checkout functionality.
- Allow users to view their order history.
- Provide delivery address management.
- Implement mobile application navigation and state management.
- Demonstrate local notifications and application state detection.

## 4. Target Users

- People interested in purchasing kitchen accessories.
- Home cooks and cooking enthusiasts.
- Customers looking for kitchen storage and cooking tools.
- People who prefer browsing kitchen products using a mobile application.

## 5. Main Features

### 5.1 User Authentication

- User registration.
- User login.
- Password visibility control.
- Forgot password functionality.
- Logout functionality.

### 5.2 Product Browsing

- Display kitchen products.
- View product images, names, prices, and ratings.
- Search for products.
- Filter products by category.
- Sort products by price.

### 5.3 Product Details

- View individual product information.
- View product images.
- Add products to the shopping cart.

### 5.4 Favorites

- Add products to favorites.
- Remove products from favorites.
- View favorite products.

### 5.5 Shopping Cart

- Add products to the cart.
- Increase or decrease product quantities.
- Remove products.
- Calculate the subtotal and total.

### 5.6 Checkout

- Enter demo payment information.
- Confirm the order.
- Display payment confirmation.
- Clear the cart after successful demo checkout.

### 5.7 Order Management

- View previous orders.
- View order information.

### 5.8 Delivery Address Management

- Add delivery addresses.
- Edit existing addresses.
- Delete addresses.

### 5.9 Notifications

- Enable or disable the notification setting.
- Demonstrate local notifications using Expo Notifications.

### 5.10 Application State Detection

- Detect when the application moves into the background.
- Detect when the application returns to the foreground.
- Display a welcome-back message when the user returns.

## 6. Technologies and Tools Used

- React Native
- JavaScript
- Expo
- Expo Router
- React Context API
- AsyncStorage
- Expo Notifications
- React Native FlatList
- React Native Modal
- Visual Studio Code
- Expo Go

## 7. Application Navigation

The application uses Expo Router for file-based navigation.

Main application screens:

1. Login Screen
2. Sign Up Screen
3. Home Screen
4. Product Details Screen
5. Favorites Screen
6. Shopping Cart Screen
7. Checkout Screen
8. Orders Screen
9. Addresses Screen
10. Profile Screen

The application uses tab navigation for the main shopping sections and stack navigation for additional screens.

## 8. State Management

React Context API is used to share application data between different screens.

The shared state manages:

- Shopping cart items.
- Favorite products.
- Orders.
- Delivery addresses.

This allows changes made on one screen to be reflected on other relevant screens.

## 9. Local Data Storage

AsyncStorage is used to store application information locally on the device.

It helps preserve relevant information such as user session details, cart items, favorites, orders, and delivery addresses.

## 10. AppState Implementation

React Native AppState API is used to detect changes in the application's state.

When the application moves from the background to the foreground, a welcome-back message is displayed to the user.

## 11. Local Notification Implementation

Expo Notifications is used to demonstrate local notifications in the application.

This feature demonstrates how a mobile application can send notifications to users.

## 12. Payment Implementation

The checkout process uses fictional demo payment details to demonstrate the ordering process.

The application does not currently connect to a real payment gateway or process actual payments.

## 13. Project Folder Structure
```
kitchenKeeper/
│
├── app/
│   ├── (tabs)/
│   │   ├── _layout.js
│   │   ├── index.js
│   │   ├── cart.js
│   │   ├── favorites.js
│   │   └── profile.js
│   │
│   ├── product/
│   │   └── [id].js
│   │
│   ├── _layout.js
│   ├── index.js
│   ├── addresses.js
│   ├── checkout.js
│   ├── forgot-password.js
│   ├── login.js
│   ├── orders.js
│   └── signup.js
│
├── assets/
│   ├── images/
│   └── productImages.js
│
├── context/
│   ├── AppStateListener.js
│   ├── AuthContext.js
│   └── ShopContext.js
│
├── app.js
├── app.json
├── index.js
├── LICENSE
├── package-lock.json
├── package.json
└── README.md
```

## 14. Installation and Running Instructions

### Requirements

- Node.js
- npm
- Visual Studio Code
- Expo Go mobile application

### Installation

1. Clone or download the project from GitHub.
2. Open the project folder using Visual Studio Code.
3. Open the terminal.
4. Install project dependencies:
```
npm install
```

5. Start the Expo development server:
```
npx expo start
```

6. Scan the QR code using Expo Go to run the application on a mobile device.

## 15. Future Improvements

Possible future improvements include:

- Connect the application to a real backend database.
- Add secure user authentication.
- Integrate a real payment gateway.
- Connect the application with an online product inventory.
- Add customer reviews and ratings.
- Add order tracking.
- Connect the application with the Kitchen Keeper Tools business page.

## 16. Conclusion

KitchenKeeper demonstrates the development of a mobile shopping application for kitchen products using React Native and Expo.

The application provides product browsing, search, favorites, cart management, checkout, order management, local storage, navigation, and notification features.

This project also provides an opportunity to explore how a kitchen product business concept inspired by Kitchen Keeper Tools could be developed into a mobile application in the future.

## 17. Project Demonstration

**GitHub Repository:** https://github.com/priyani2003/KitchenKeeper 

**Demonstration Video:** https://drive.google.com/file/d/17zglkIUYmSyM9r-d_ccMZT47vqBwjzlo/view?usp=sharing