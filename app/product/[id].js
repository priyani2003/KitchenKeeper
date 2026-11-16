
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  Modal,
  StyleSheet,
  ScrollView,
  Share,
  Alert,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ShopContext } from '../../context/ShopContext';
import { productImages } from '../../assets/productImages';

// Different sample reviews for each product
const productReviews = {
  '4': [
    { id: '4-1', name: 'Nimali Perera', rating: 5, date: 'November 10, 2026', comment: 'The knives are sharp and comfortable to use.', helpful: 12 },
    { id: '4-2', name: 'Tharushi Silva', rating: 4, date: 'November 08, 2026', comment: 'Good quality set for everyday kitchen use.', helpful: 6 },
  ],
  '5': [
    { id: '5-1', name: 'Amaya Fernando', rating: 5, date: 'November 11, 2026', comment: 'The bowls are useful and easy to clean.', helpful: 9 },
    { id: '5-2', name: 'Ishara Perera', rating: 3, date: 'November 07, 2026', comment: 'Nice set, but I expected the bowls to be a little bigger.', helpful: 4 },
  ],
  '6': [
    { id: '6-1', name: 'Dinithi Jayasuriya', rating: 5, date: 'November 12, 2026', comment: 'Very useful containers for storing food in the refrigerator.', helpful: 10 },
    { id: '6-2', name: 'Sewmi Perera', rating: 4, date: 'November 06, 2026', comment: 'Good storage set and the lids fit well.', helpful: 5 },
  ],
  '7': [
    { id: '7-1', name: 'Sachini Silva', rating: 4, date: 'November 09, 2026', comment: 'Makes crushing garlic much easier.', helpful: 7 },
    { id: '7-2', name: 'Hashini Fernando', rating: 3, date: 'November 05, 2026', comment: 'Useful kitchen tool, but cleaning takes some effort.', helpful: 3 },
  ],
  '8': [
    { id: '8-1', name: 'Kavindi Perera', rating: 5, date: 'November 10, 2026', comment: 'Helps keep my kitchen sink area organised.', helpful: 8 },
    { id: '8-2', name: 'Nethmi Silva', rating: 4, date: 'November 04, 2026', comment: 'Good design and saves space near the sink.', helpful: 4 },
  ],
  '9': [
    { id: '9-1', name: 'Piumi Fernando', rating: 5, date: 'November 12, 2026', comment: 'A useful set for keeping kitchen items organised.', helpful: 11 },
    { id: '9-2', name: 'Dinuka Perera', rating: 4, date: 'November 06, 2026', comment: 'Good storage options for a small kitchen.', helpful: 5 },
  ],
  '10': [
    { id: '10-1', name: 'Thilini Silva', rating: 4, date: 'November 11, 2026', comment: 'The utensils are comfortable to hold and use.', helpful: 6 },
    { id: '10-2', name: 'Sashika Perera', rating: 5, date: 'November 03, 2026', comment: 'A practical set for daily cooking.', helpful: 9 },
  ],
  '11': [
    { id: '11-1', name: 'Madhavi Fernando', rating: 5, date: 'November 09, 2026', comment: 'Accurate measurements and very helpful for baking.', helpful: 10 },
    { id: '11-2', name: 'Rashmi Silva', rating: 4, date: 'November 02, 2026', comment: 'Good measuring set and easy to store.', helpful: 4 },
  ],
  '12': [
    { id: '12-1', name: 'Anushka Perera', rating: 4, date: 'November 10, 2026', comment: 'Useful for grinding spices and making pastes.', helpful: 7 },
    { id: '12-2', name: 'Nadeesha Silva', rating: 3, date: 'November 01, 2026', comment: 'Works well, although it is a little heavy.', helpful: 3 },
  ],
  '13': [
    { id: '13-1', name: 'Shenali Fernando', rating: 5, date: 'November 12, 2026', comment: 'Makes preparing vegetables much faster.', helpful: 8 },
    { id: '13-2', name: 'Amashi Perera', rating: 4, date: 'November 05, 2026', comment: 'Useful grater with different cutting options.', helpful: 5 },
  ],
  '14': [
    { id: '14-1', name: 'Sewmini Silva', rating: 4, date: 'November 08, 2026', comment: 'Easy to pour oil without making a mess.', helpful: 6 },
    { id: '14-2', name: 'Kavisha Perera', rating: 3, date: 'November 02, 2026', comment: 'Nice dispenser, but I would prefer a larger capacity.', helpful: 2 },
  ],
  '15': [
    { id: '15-1', name: 'Hiruni Fernando', rating: 4, date: 'November 11, 2026', comment: 'Lightweight jug and useful for measuring liquids.', helpful: 5 },
    { id: '15-2', name: 'Pavithra Silva', rating: 5, date: 'November 04, 2026', comment: 'Good size and easy to handle.', helpful: 7 },
  ],
  '16': [
    { id: '16-1', name: 'Chathuri Perera', rating: 5, date: 'November 12, 2026', comment: 'The silicone utensils are great for everyday cooking.', helpful: 13 },
    { id: '16-2', name: 'Dulani Fernando', rating: 4, date: 'November 06, 2026', comment: 'Good quality and easy to clean.', helpful: 6 },
  ],
  '17': [
    { id: '17-1', name: 'Ruwani Silva', rating: 4, date: 'November 09, 2026', comment: 'Useful mat for drying dishes beside the sink.', helpful: 5 },
    { id: '17-2', name: 'Maneesha Perera', rating: 3, date: 'November 03, 2026', comment: 'Works well, but needs regular cleaning.', helpful: 3 },
  ],
  '18': [
    { id: '18-1', name: 'Tharushi Fernando', rating: 5, date: 'November 10, 2026', comment: 'The lid is useful and the ice cubes come out easily.', helpful: 9 },
    { id: '18-2', name: 'Sithumi Silva', rating: 4, date: 'November 01, 2026', comment: 'A convenient ice tray for everyday use.', helpful: 4 },
  ],
  '19': [
    { id: '19-1', name: 'Nethmi Perera', rating: 4, date: 'November 08, 2026', comment: 'Comfortable to use when handling hot dishes.', helpful: 6 },
    { id: '19-2', name: 'Ishani Fernando', rating: 3, date: 'November 02, 2026', comment: 'Useful oven mitt, but I expected a thicker material.', helpful: 2 },
  ],
  '20': [
    { id: '20-1', name: 'Sajini Silva', rating: 5, date: 'November 11, 2026', comment: 'Strong colander and easy to wash.', helpful: 8 },
    { id: '20-2', name: 'Dinithi Perera', rating: 4, date: 'November 05, 2026', comment: 'Good for washing vegetables and draining pasta.', helpful: 5 },
  ],
  '21': [
    { id: '21-1', name: 'Amali Fernando', rating: 5, date: 'November 12, 2026', comment: 'Strong tongs and easy to grip.', helpful: 10 },
    { id: '21-2', name: 'Kavindi Silva', rating: 4, date: 'November 04, 2026', comment: 'Very useful for cooking and serving food.', helpful: 4 },
  ],
  '22': [
    { id: '22-1', name: 'Piumi Silva', rating: 4, date: 'November 09, 2026', comment: 'Good strainer for everyday kitchen tasks.', helpful: 5 },
    { id: '22-2', name: 'Hasini Perera', rating: 3, date: 'November 03, 2026', comment: 'Does the job, but I would prefer a bigger size.', helpful: 3 },
  ],
  '23': [
    { id: '23-1', name: 'Shashini Fernando', rating: 5, date: 'November 10, 2026', comment: 'Makes mashing potatoes quick and easy.', helpful: 9 },
    { id: '23-2', name: 'Thilini Perera', rating: 4, date: 'November 06, 2026', comment: 'Good quality masher and comfortable handle.', helpful: 5 },
  ],
  '24': [
    { id: '24-1', name: 'Nimali Silva', rating: 4, date: 'November 11, 2026', comment: 'Peels vegetables easily and feels comfortable to hold.', helpful: 7 },
    { id: '24-2', name: 'Amaya Perera', rating: 5, date: 'November 05, 2026', comment: 'A simple and useful tool for food preparation.', helpful: 6 },
  ],
  '25': [
    { id: '25-1', name: 'Rashmi Fernando', rating: 5, date: 'November 12, 2026', comment: 'A great utensil set with useful tools for cooking.', helpful: 12 },
    { id: '25-2', name: 'Sewmi Silva', rating: 4, date: 'November 07, 2026', comment: 'Good variety of utensils and easy to clean.', helpful: 5 },
  ],
};

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { products, addToCart } = useContext(ShopContext);

  const product = products.find(
    (item) => String(item.id) === String(id)
  );

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [cartModalVisible, setCartModalVisible] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [helpfulReviews, setHelpfulReviews] = useState([]);
  const [blockedReviews, setBlockedReviews] = useState([]);

  if (!product) {
    return (
      <View style={styles.notFoundContainer}>
        <Ionicons name="alert-circle-outline" size={50} color="#777" />
        <Text style={styles.notFoundText}>Product not found.</Text>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const gallery = productImages[String(product.id)] || [];

  const images = gallery.length > 0
    ? gallery
    : product.image
      ? [product.image]
      : [];

  const price = Number(product.price) || 0;
  const totalPrice = price * quantity;

  const reviews = productReviews[String(product.id)] || [];

  const visibleReviews = reviews.filter(
    (review) => !blockedReviews.includes(review.id)
  );

  const handleShareProduct = async () => {
    try {
      await Share.share({
        message: `Check out ${product.name} on KitchenKeeper!\n\nPrice: Rs. ${price.toFixed(2)}\n\n${product.description || ''}`,
      });
    } catch (error) {
      Alert.alert('Error', 'Unable to share this product.');
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setCartModalVisible(true);
  };

  const handleShareReview = async (review) => {
    try {
      await Share.share({
        message: `Review by ${review.name}\n\n${review.comment}`,
      });
    } catch (error) {
      Alert.alert('Error', 'Unable to share this review.');
    }
  };

  const handleHelpful = (reviewId) => {
    setHelpfulReviews((previous) =>
      previous.includes(reviewId)
        ? previous.filter((item) => item !== reviewId)
        : [...previous, reviewId]
    );
  };

  const handleReport = (review) => {
    setSelectedReview(review);
    setReportModalVisible(true);
  };

  const confirmReport = () => {
    setReportModalVisible(false);

    Alert.alert(
      'Report submitted',
      'Thank you. This report has been recorded in this demo.'
    );

    setSelectedReview(null);
  };

  const handleBlock = (review) => {
    Alert.alert(
      'Block reviewer',
      `Do you want to hide reviews from ${review.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Block',
          style: 'destructive',
          onPress: () => {
            setBlockedReviews((previous) => [...previous, review.id]);
          },
        },
      ]
    );
  };

  const renderStars = (rating) => (
    <Text style={styles.stars}>
      {'★'.repeat(rating)}
      {'☆'.repeat(5 - rating)}
    </Text>
  );

  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top navigation */}
        <View
          style={[
            styles.topBar,
            {
              paddingTop: insets.top,
              height: 60 + insets.top,
            },
          ]}
        >
          <Pressable
            style={styles.topIconButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={23} color="#234B35" />
          </Pressable>

          <Text style={styles.topTitle}>Product Details</Text>

          <Pressable
            style={styles.topIconButton}
            onPress={handleShareProduct}
          >
            <Ionicons name="share-social-outline" size={23} color="#234B35" />
          </Pressable>
        </View>

        {/* Product image */}
        <View style={styles.imageContainer}>
          {images.length > 0 ? (
            <Image
              source={images[selectedImage]}
              style={styles.mainImage}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="image-outline" size={65} color="#999" />
              <Text style={styles.placeholderText}>No image available</Text>
            </View>
          )}

          <Pressable
            style={styles.imageShareButton}
            onPress={handleShareProduct}
          >
            <Ionicons name="share-social-outline" size={23} color="#234B35" />
          </Pressable>
        </View>

        {/* Image thumbnails */}
        {images.length > 1 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.thumbnailContainer}
          >
            {images.map((image, index) => (
              <Pressable
                key={index}
                onPress={() => setSelectedImage(index)}
                style={[
                  styles.thumbnailButton,
                  selectedImage === index && styles.selectedThumbnail,
                ]}
              >
                <Image
                  source={image}
                  style={styles.thumbnailImage}
                  resizeMode="contain"
                />
              </Pressable>
            ))}
          </ScrollView>
        )}

        {/* Product information */}
        <View style={styles.detailsContainer}>
          <Text style={styles.productName}>{product.name}</Text>

          <View style={styles.ratingRow}>
            {renderStars(
              Math.max(0, Math.min(5, Math.round(Number(product.rating) || 0)))
            )}

            <Text style={styles.ratingNumber}>
              {Number(product.rating || 0).toFixed(1)} / 5
            </Text>
          </View>

          <Text style={styles.price}>Rs. {price.toFixed(2)}</Text>

          <View style={styles.sectionDivider} />

          <Text style={styles.sectionTitle}>Description</Text>

          <Text style={styles.description}>
            {product.description || 'No description available.'}
          </Text>

          {/* Quantity */}
          <Text style={styles.sectionTitle}>Quantity</Text>

          <View style={styles.quantityRow}>
            <Pressable
              style={styles.quantityButton}
              onPress={() =>
                setQuantity((previous) => Math.max(1, previous - 1))
              }
            >
              <Ionicons name="remove" size={21} color="#234B35" />
            </Pressable>

            <Text style={styles.quantityText}>{quantity}</Text>

            <Pressable
              style={styles.quantityButton}
              onPress={() => setQuantity((previous) => previous + 1)}
            >
              <Ionicons name="add" size={21} color="#234B35" />
            </Pressable>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Price</Text>
            <Text style={styles.totalPrice}>Rs. {totalPrice.toFixed(2)}</Text>
          </View>

          <Pressable
            style={styles.addToCartButton}
            onPress={handleAddToCart}
          >
            <Ionicons name="cart-outline" size={21} color="#FFFFFF" />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </Pressable>
        </View>

        {/* Product reviews */}
        <View style={styles.reviewsContainer}>
          <View style={styles.reviewsHeadingRow}>
            <Text style={styles.reviewsTitle}>Customer Reviews</Text>
            <Text style={styles.reviewCount}>
              {visibleReviews.length} Reviews
            </Text>
          </View>

          {visibleReviews.map((review) => {
            const isHelpful = helpfulReviews.includes(review.id);

            return (
              <View style={styles.reviewCard} key={review.id}>
                <Text style={styles.reviewerName}>{review.name}</Text>
                <Text style={styles.reviewDate}>{review.date}</Text>

                <View style={styles.reviewRatingRow}>
                  {renderStars(review.rating)}
                </View>

                <Text style={styles.reviewComment}>{review.comment}</Text>

                <View style={styles.reviewDivider} />

                <View style={styles.reviewActions}>
                  <Pressable
                    style={styles.reviewAction}
                    onPress={() => handleHelpful(review.id)}
                  >
                    <Ionicons
                      name={isHelpful ? 'thumbs-up' : 'thumbs-up-outline'}
                      size={19}
                      color={isHelpful ? '#26834A' : '#555'}
                    />

                    <Text
                      style={[
                        styles.actionText,
                        isHelpful && styles.activeActionText,
                      ]}
                    >
                      Helpful ({review.helpful + (isHelpful ? 1 : 0)})
                    </Text>
                  </Pressable>

                  <Pressable
                    style={styles.reviewAction}
                    onPress={() => handleShareReview(review)}
                  >
                    <Ionicons
                      name="share-social-outline"
                      size={19}
                      color="#555"
                    />
                    <Text style={styles.actionText}>Share</Text>
                  </Pressable>
                </View>

                <View style={styles.reviewActions}>
                  <Pressable
                    style={styles.reviewAction}
                    onPress={() => handleReport(review)}
                  >
                    <Ionicons name="flag-outline" size={19} color="#B66B36" />
                    <Text style={styles.reportText}>Report</Text>
                  </Pressable>

                  <Pressable
                    style={styles.reviewAction}
                    onPress={() => handleBlock(review)}
                  >
                    <Ionicons
                      name="person-remove-outline"
                      size={19}
                      color="#C04444"
                    />
                    <Text style={styles.blockText}>Block</Text>
                  </Pressable>
                </View>
              </View>
            );
          })}

          {visibleReviews.length === 0 && (
            <Text style={styles.noReviewsText}>
              No reviews to display.
            </Text>
          )}

          <Text style={styles.sampleNote}>
            Note: Reviews are sample data for demonstration purposes.
          </Text>
        </View>
      </ScrollView>

      {/* Add to cart confirmation */}
      <Modal
        visible={cartModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setCartModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Ionicons name="checkmark-circle" size={55} color="#26834A" />

            <Text style={styles.modalTitle}>Added to Cart!</Text>

            <Text style={styles.modalMessage}>
              {product.name} has been added to your cart.
            </Text>

            <Text style={styles.modalDetails}>Quantity: {quantity}</Text>

            <Text style={styles.modalDetails}>
              Total: Rs. {totalPrice.toFixed(2)}
            </Text>

            <Pressable
              style={styles.modalPrimaryButton}
              onPress={() => {
                setCartModalVisible(false);
                router.push('/(tabs)/cart');
              }}
            >
              <Text style={styles.modalPrimaryText}>View Cart</Text>
            </Pressable>

            <Pressable
              style={styles.modalSecondaryButton}
              onPress={() => setCartModalVisible(false)}
            >
              <Text style={styles.modalSecondaryText}>Continue Shopping</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Report confirmation */}
      <Modal
        visible={reportModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setReportModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Ionicons name="flag-outline" size={45} color="#B66B36" />

            <Text style={styles.modalTitle}>Report Review</Text>

            <Text style={styles.modalMessage}>
              Are you sure you want to report this review?
            </Text>

            <Pressable
              style={styles.modalPrimaryButton}
              onPress={confirmReport}
            >
              <Text style={styles.modalPrimaryText}>Yes, Report</Text>
            </Pressable>

            <Pressable
              style={styles.modalSecondaryButton}
              onPress={() => setReportModalVisible(false)}
            >
              <Text style={styles.modalSecondaryText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8F8F3',
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },

  topIconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F4EF',
  },

  topTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#234B35',
  },

  imageContainer: {
    height: 280,
    margin: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  mainImage: {
    width: '90%',
    height: '90%',
  },

  imageShareButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },

  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  placeholderText: {
    color: '#999999',
    marginTop: 8,
  },

  thumbnailContainer: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },

  thumbnailButton: {
    width: 65,
    height: 65,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    alignItems: 'center',
    justifyContent: 'center',
  },

  selectedThumbnail: {
    borderColor: '#26834A',
    borderWidth: 2,
  },

  thumbnailImage: {
    width: '90%',
    height: '90%',
  },

  detailsContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginTop: 5,
    padding: 18,
    borderRadius: 16,
  },

  productName: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#234B35',
    marginBottom: 10,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  stars: {
    color: '#F4B400',
    fontSize: 18,
    letterSpacing: 1,
  },

  ratingNumber: {
    color: '#666666',
    marginLeft: 8,
    fontSize: 13,
  },

  price: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#26834A',
    marginBottom: 15,
  },

  sectionDivider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 12,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#234B35',
    marginTop: 12,
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#666666',
  },

  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  quantityButton: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#EAF2EA',
    alignItems: 'center',
    justifyContent: 'center',
  },

  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#234B35',
    marginHorizontal: 22,
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },

  totalLabel: {
    fontSize: 16,
    color: '#555555',
  },

  totalPrice: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#26834A',
  },

  addToCartButton: {
    height: 52,
    borderRadius: 12,
    backgroundColor: '#234B35',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },

  addToCartText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 9,
  },

  reviewsContainer: {
    margin: 15,
    marginTop: 20,
  },

  reviewsHeadingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  reviewsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#234B35',
  },

  reviewCount: {
    fontSize: 13,
    color: '#777777',
  },

  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 13,
  },

  reviewerName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#234B35',
  },

  reviewDate: {
    fontSize: 12,
    color: '#888888',
    marginTop: 4,
  },

  reviewRatingRow: {
    marginTop: 10,
  },

  reviewComment: {
    fontSize: 14,
    lineHeight: 21,
    color: '#555555',
    marginTop: 8,
  },

  reviewDivider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 12,
  },

  reviewActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  reviewAction: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 105,
  },

  actionText: {
    fontSize: 12,
    color: '#555555',
    marginLeft: 6,
  },

  activeActionText: {
    color: '#26834A',
    fontWeight: 'bold',
  },

  reportText: {
    fontSize: 12,
    color: '#B66B36',
    marginLeft: 6,
  },

  blockText: {
    fontSize: 12,
    color: '#C04444',
    marginLeft: 6,
  },

  sampleNote: {
    color: '#888888',
    fontSize: 11,
    lineHeight: 17,
    marginTop: 5,
    marginBottom: 20,
  },

  noReviewsText: {
    color: '#777777',
    textAlign: 'center',
    marginVertical: 20,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  modalBox: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
  },

  modalTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#234B35',
    marginTop: 12,
    marginBottom: 10,
  },

  modalMessage: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 12,
  },

  modalDetails: {
    fontSize: 15,
    color: '#234B35',
    fontWeight: '600',
    marginTop: 5,
  },

  modalPrimaryButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#234B35',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  modalPrimaryText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  modalSecondaryButton: {
    width: '100%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },

  modalSecondaryText: {
    color: '#234B35',
    fontSize: 14,
    fontWeight: '600',
  },

  notFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F8F3',
  },

  notFoundText: {
    fontSize: 18,
    color: '#555555',
    marginTop: 12,
  },

  backButton: {
    backgroundColor: '#234B35',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
  },

  backButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

