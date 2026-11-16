
import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ShopContext = createContext();

export const products = [
  {
    id: '4',
    name: 'Kitchen Knife Set',
    price: 3000,
    rating: 2.2,
    image: require('../assets/images/Classic-Stainless-Steel-Kitchen-Knife-Set/classic-Stainless-Steel-Kitchen-Knife-Set1.webp'),
    description: 'Prepare ingredients with this practical kitchen knife set. Suitable for cutting, slicing and chopping different ingredients, making it a useful addition to your everyday cooking activities.',
  },
  {
    id: '5',
    name: '5-Piece Stainless Steel Mixing Bowl Set',
    price: 3500,
    rating: 3.1,
    image: require('../assets/images/5-Piece Stainless Steel Mixing Bowl Set/5-Piece Stainless Steel Mixing Bowl Set.jpg'),
    description: 'Make food preparation easier with this 5-piece stainless steel mixing bowl set. Useful for mixing ingredients, preparing salads, storing food and completing different kitchen tasks.',
  },
  {
    id: '6',
    name: 'Food Storage Container Set',
    price: 3200,
    rating: 4.5,
    image: require('../assets/images/Food Storage Container Set/Food Storage Container Set1.webp'),
    description: 'Keep your kitchen organized with this practical food storage container set. Ideal for storing dry ingredients, snacks and everyday food items while helping maintain freshness.',
  },
  {
    id: '7',
    name: 'Garlic Press',
    price: 1200,
    rating: 3.8,
    image: require('../assets/images/Garlic Press/Garlic Press1.png'),
    description: 'Prepare garlic easily with this convenient garlic press. Its simple design helps crush garlic quickly with less effort, making everyday cooking faster and easier.',
  },
  {
    id: '8',
    name: 'Kitchen Sink Organizer',
    price: 1800,
    rating: 2.9,
    image: require('../assets/images/Kitchen Sink Organizer/Kitchen Sink Organizer.webp'),
    description: 'Keep your kitchen sink area clean and organized with this useful sink organizer. It provides convenient space for storing sponges, brushes and other dishwashing essentials.',
  },
  {
    id: '9',
    name: 'Kitchen Storage Set',
    price: 2500,
    rating: 4.2,
    image: require('../assets/images/Kitchen Storage Set/Kitchen Storage Set1.png'),
    description: 'A practical kitchen storage set designed to keep your kitchen items neatly organized. It helps save space and keeps your kitchen clean and tidy.',
  },
  {
    id: '10',
    name: 'cooking Utensil Set',
    price: 2200,
    rating: 3.4,
    image: require('../assets/images/Kitchen Utensil Set/Kitchen Utensil Set1.png'),
    description: 'Make everyday cooking easier with this practical kitchen utensil set. Designed for preparing, mixing, stirring and serving different dishes, it is a useful addition to any kitchen.',
  },
  {
    id: '11',
    name: 'Measuring Cup and Spoon Set',
    price: 1400,
    rating: 4.7,
    image: require('../assets/images/Measuring Cup and Spoon Set/Measuring Cup and Spoon Set1.png'),
    description: 'Measure ingredients accurately with this convenient measuring cup and spoon set. Ideal for baking, cooking and following recipes, helping you achieve consistent results.',
  },
  {
    id: '12',
    name: 'Mortar and Pestle',
    price: 1600,
    rating: 3.2,
    image: require('../assets/images/mortar-pestle/Mortar and Pestle2.jpg'),
    description: 'Prepare fresh spices and ingredients using this traditional mortar and pestle. Suitable for crushing, grinding and mixing herbs, spices and other cooking ingredients.',
  },
  {
    id: '13',
    name: 'Multi-Function Kitchen Grater',
    price: 1900,
    rating: 4.1,
    image: require('../assets/images/Multi-Function Kitchen Grater/Multi-Function Kitchen Grater.png'),
    description: 'Save preparation time with this multi-function kitchen grater. Useful for grating vegetables, cheese and other ingredients, making food preparation easier and more convenient.',
  },
  {
    id: '14',
    name: 'Oil Dispenser',
    price: 1200,
    rating: 2.5,
    image: require('../assets/images/Oil Dispenser/Oil Dispenser.webp'),
    description: 'Pour cooking oil neatly and conveniently with this practical oil dispenser. Its useful design helps control the amount of oil used while keeping your cooking area tidy.',
  },
  {
    id: '15',
    name: 'Plastic Measuring Jug',
    price: 900,
    rating: 3.6,
    image: require('../assets/images/Plastic Measuring Jug/Plastic Measuring Jug1.png'),
    description: 'Measure water, milk and other liquids easily with this practical plastic measuring jug. A useful kitchen essential for cooking, baking and preparing everyday recipes.',
  },
  {
    id: '16',
    name: 'Silicone Cooking Utensils Set',
    price: 2800,
    rating: 4.8,
    image: require('../assets/images/Silicone Cooking Utensils Set/Silicone Cooking Utensils Set1.png'),
    description: 'Enjoy convenient food preparation with this silicone cooking utensils set. Suitable for stirring, mixing, flipping and serving different dishes during everyday cooking.',
  },
  {
    id: '17',
    name: 'Silicone Dish Drying Mat',
    price: 1500,
    rating: 3.3,
    image: require('../assets/images/Silicone Dish Drying Mat/Silicone Dish Drying Mat.png'),
    description: 'Keep your kitchen countertop dry and organized with this silicone dish drying mat. Provides a convenient surface for placing washed dishes, glasses and kitchen utensils.',
  },
  {
    id: '18',
    name: 'Silicone Ice Cube Tray with Lid',
    price: 850,
    rating: 4.4,
    image: require('../assets/images/Silicone Ice Cube Tray with Lid/Silicone Ice Cube Tray with Lid.png'),
    description: 'Make and store ice cubes conveniently with this silicone ice cube tray with lid. Ideal for preparing ice for cold drinks while helping protect the ice during storage.',
  },
  {
    id: '19',
    name: 'Silicone Oven Mitt',
    price: 1100,
    rating: 2.7,
    image: require('../assets/images/Silicone Oven Mitt/Silicone Oven Mitt1.png'),
    description: 'Protect your hands while handling hot pots, pans and baking trays with this silicone oven mitt. A practical kitchen accessory for everyday cooking and baking activities.',
  },
  {
    id: '20',
    name: 'Stainless Steel Kitchen Colander',
    price: 1700,
    rating: 3.9,
    image: require('../assets/images/Stainless Steel Kitchen Colander/Stainless Steel Kitchen Colander1.png'),
    description: 'Drain washed vegetables, fruits and cooked pasta easily with this stainless steel kitchen colander. A useful kitchen essential designed for convenient food preparation.',
  },
  {
    id: '21',
    name: 'Stainless Steel Kitchen Food Tong',
    price: 1000,
    rating: 4.6,
    image: require('../assets/images/Stainless Steel Kitchen Food Tong/Stainless Steel Kitchen Food Tong1.png'),
    description: 'Handle, turn and serve food conveniently with these stainless steel kitchen food tongs. Useful for cooking, grilling, frying and serving different types of food.',
  },
  {
    id: '22',
    name: 'Stainless Steel Kitchen Strainer',
    price: 1300,
    rating: 3.0,
    image: require('../assets/images/Stainless Steel Kitchen Strainer/Stainless Steel Kitchen Strainer.png'),
    description: 'Strain liquids and separate unwanted particles from food with this practical stainless steel kitchen strainer. Suitable for washing ingredients and everyday cooking tasks.',
  },
  {
    id: '23',
    name: 'Stainless Steel Potato Masher',
    price: 1200,
    rating: 4.3,
    image: require('../assets/images/Stainless Steel Potato Masher/Stainless Steel Potato Masher1.png'),
    description: 'Mash boiled potatoes and other soft vegetables easily with this stainless steel potato masher. A convenient tool for preparing mashed potatoes and other homemade dishes.',
  },
  {
    id: '24',
    name: 'Stainless Steel Vegetable Peeler',
    price: 750,
    rating: 3.5,
    image: require('../assets/images/Stainless Steel Vegetable Peeler/Stainless Steel Vegetable Peeler1.png'),
    description: 'Peel potatoes, carrots and other vegetables easily with this stainless steel vegetable peeler. Its practical design helps make everyday food preparation quicker and easier.',
  },
  {
    id: '25',
    name: 'Stainless Steel Kitchen Utensil Set',
    price: 3000,
    rating: 4.9,
    image: require('../assets/images/Stainless Stell Kitchen Utensil Set/Stainless Steel Kitchen Utensil Set.webp'),
    description: 'Upgrade your kitchen with this stainless steel kitchen utensil set. Suitable for stirring, serving, mixing and preparing a variety of meals, making everyday cooking more convenient.',
  },
];

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load all saved data
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedCart = await AsyncStorage.getItem('cart');
        const savedFavorites = await AsyncStorage.getItem('favorites');
        const savedOrders = await AsyncStorage.getItem('orders');
        const savedAddresses = await AsyncStorage.getItem('addresses');

        if (savedCart !== null) {
          const parsedCart = JSON.parse(savedCart);

          const updatedCart = parsedCart.map((item) => ({
            ...item,
            quantity: Math.max(1, Number(item.quantity) || 1),
          }));

          setCart(updatedCart);
        }

        if (savedFavorites !== null) {
          setFavorites(JSON.parse(savedFavorites));
        }

        if (savedOrders !== null) {
          setOrders(JSON.parse(savedOrders));
        }

        if (savedAddresses !== null) {
          setAddresses(JSON.parse(savedAddresses));
        }
      } catch (error) {
        console.log('Error loading saved data:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadData();
  }, []);

  // Save all data
  useEffect(() => {
    if (!isLoaded) return;

    const saveData = async () => {
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(cart));
        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
        await AsyncStorage.setItem('orders', JSON.stringify(orders));
        await AsyncStorage.setItem('addresses', JSON.stringify(addresses));
      } catch (error) {
        console.log('Error saving data:', error);
      }
    };

    saveData();
  }, [cart, favorites, orders, addresses, isLoaded]);

  // Add or remove a favorite product
  const toggleFavorite = (product) => {
    setFavorites((previousFavorites) => {
      const alreadyFavorite = previousFavorites.some(
        (item) => String(item.id) === String(product.id)
      );

      if (alreadyFavorite) {
        return previousFavorites.filter(
          (item) => String(item.id) !== String(product.id)
        );
      }

      return [...previousFavorites, product];
    });
  };

  // Add selected quantity to cart
  const addToCart = (product, quantity = 1) => {
    const selectedQuantity = Math.floor(Number(quantity));

    if (!Number.isFinite(selectedQuantity) || selectedQuantity < 1) {
      return;
    }

    setCart((previousCart) => {
      const existingItem = previousCart.find(
        (item) => String(item.id) === String(product.id)
      );

      if (existingItem) {
        return previousCart.map((item) =>
          String(item.id) === String(product.id)
            ? {
                ...item,
                quantity:
                  (Number(item.quantity) || 0) + selectedQuantity,
              }
            : item
        );
      }

      return [
        ...previousCart,
        { ...product, quantity: selectedQuantity },
      ];
    });
  };

  // Decrease product quantity in cart
  const decreaseQuantity = (productId) => {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          String(item.id) === String(productId)
            ? {
                ...item,
                quantity: (Number(item.quantity) || 0) - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCart((previousCart) =>
      previousCart.filter(
        (item) => String(item.id) !== String(productId)
      )
    );
  };

  // Save a confirmed order
  const addOrder = (order) => {
    setOrders((previousOrders) => [
      order,
      ...previousOrders,
    ]);
  };

  // Add a delivery address
  const addAddress = (address) => {
    setAddresses((previousAddresses) => [
      ...previousAddresses,
      {
        ...address,
        id: Date.now().toString(),
      },
    ]);
  };

  // Update a delivery address
  const updateAddress = (updatedAddress) => {
    setAddresses((previousAddresses) =>
      previousAddresses.map((address) =>
        address.id === updatedAddress.id
          ? updatedAddress
          : address
      )
    );
  };

  // Delete a delivery address
  const deleteAddress = (addressId) => {
    setAddresses((previousAddresses) =>
      previousAddresses.filter(
        (address) => address.id !== addressId
      )
    );
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        favorites,
        orders,
        addresses,
        toggleFavorite,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        addOrder,
        addAddress,
        updateAddress,
        deleteAddress,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

