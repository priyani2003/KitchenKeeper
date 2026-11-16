
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  Pressable,
  Modal,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ShopContext } from '../../context/ShopContext';
import { productImages } from '../../assets/productImages';

const categories = [
  'All',
  'Preparation',
  'Storage',
  'Cooking',
  'Tools',
];

const getCategory = (name = '') => {
  const value = name.toLowerCase();

  if (
    value.includes('storage') ||
    value.includes('container') ||
    value.includes('organizer')
  ) return 'Storage';

  if (
    value.includes('chopper') ||
    value.includes('knife') ||
    value.includes('grater') ||
    value.includes('peeler') ||
    value.includes('masher') ||
    value.includes('measuring')
  ) return 'Preparation';

  if (
    value.includes('utensil') ||
    value.includes('spoon') ||
    value.includes('tong') ||
    value.includes('mitt') ||
    value.includes('oven') ||
    value.includes('dispenser')
  ) return 'Cooking';

  return 'Tools';
};

const formatPrice = (price) =>
  `Rs. ${Number(price).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { products, favorites, toggleFavorite } =
    useContext(ShopContext);

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filterVisible, setFilterVisible] = useState(false);
  const [sortType, setSortType] = useState('Default');
  const [failedImages, setFailedImages] = useState([]);

  let filteredProducts = products.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      getCategory(item.name) === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (sortType === 'Low Price') {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.price - b.price
    );
  }

  if (sortType === 'High Price') {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.price - a.price
    );
  }

  const renderProduct = ({ item }) => {
    const isFavorite = favorites.some(
      (product) => String(product.id) === String(item.id)
    );

    const galleryImages = productImages[String(item.id)] || [];
    const firstImage = galleryImages[0] || item.image;
    const imageKey = String(item.id);
    const imageFailed = failedImages.includes(imageKey);

    const imageSource = firstImage
      ? typeof firstImage === 'string'
        ? { uri: firstImage }
        : firstImage
      : null;

    return (
      <Pressable
        style={styles.productCard}
        onPress={() => router.push(`/product/${item.id}`)}
      >
        <View style={styles.imageContainer}>
          {imageSource && !imageFailed ? (
            <Image
              source={imageSource}
              style={styles.productImage}
              resizeMode="contain"
              onError={() =>
                setFailedImages((previous) =>
                  previous.includes(imageKey)
                    ? previous
                    : [...previous, imageKey]
                )
              }
            />
          ) : (
            <View style={styles.imageFallback}>
              <Text style={styles.fallbackEmoji}>🍳</Text>
              <Text style={styles.fallbackText}>
                Image unavailable
              </Text>
            </View>
          )}

          <Pressable
            style={styles.heartButton}
            onPress={(event) => {
              event.stopPropagation();
              toggleFavorite(item);
            }}
          >
            <Text style={styles.heart}>
              {isFavorite ? '❤️' : '♡'}
            </Text>
          </Pressable>
        </View>

        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={2}>
            {item.name}
          </Text>

          <Text style={styles.productPrice}>
            {formatPrice(item.price)}
          </Text>

          <Text style={styles.productCategory}>
            {getCategory(item.name)}
          </Text>

          <Text style={styles.rating}>
            {'★'.repeat(Math.floor(item.rating || 0))}
            {item.rating % 1 >= 0.5 ? '½' : ''}
            {'☆'.repeat(5 - Math.ceil(item.rating || 0))}
            {'  '}
            {Number(item.rating || 0).toFixed(1)}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        key="two-column-grid"
        data={filteredProducts}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderProduct}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View
              style={[
                styles.header,
                { paddingTop: insets.top + 8 },
              ]}
            >
              <View>
                <Text style={styles.logo}>KitchenKeeper</Text>
                <Text style={styles.tagline}>
                  Everything for your kitchen
                </Text>
              </View>

              <Text style={styles.headerIcon}>🛍️</Text>
            </View>

            <View style={styles.searchRow}>
              <Text style={styles.searchIcon}>🔍</Text>

              <TextInput
                style={styles.searchInput}
                placeholder="Search kitchen products..."
                value={search}
                onChangeText={setSearch}
              />

              <Pressable
                style={styles.filterButton}
                onPress={() => setFilterVisible(true)}
              >
                <Text style={styles.filterIcon}>☰</Text>
              </Pressable>
            </View>

            {/* KitchenKeeper Kitchen Banner */}
            <Image
              source={require('../../assets/images/kitchenkeeper-banner.png')}
              style={styles.bannerImage}
              resizeMode="cover"
            />

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Shop by Category
              </Text>
            </View>

            <FlatList
              horizontal
              data={categories}
              keyExtractor={(item) => item}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryList}
              renderItem={({ item }) => (
                <Pressable
                  style={[
                    styles.categoryButton,
                    selectedCategory === item &&
                      styles.selectedCategory,
                  ]}
                  onPress={() => setSelectedCategory(item)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory === item &&
                        styles.selectedCategoryText,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              )}
            />

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Popular Products
              </Text>

              <Text style={styles.productCount}>
                {filteredProducts.length} items
              </Text>
            </View>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No products found. Try another search.
          </Text>
        }
      />

      <Modal
        visible={filterVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>
              Sort Products
            </Text>

            {['Default', 'Low Price', 'High Price'].map(
              (option) => (
                <Pressable
                  key={option}
                  style={styles.sortOption}
                  onPress={() => {
                    setSortType(option);
                    setFilterVisible(false);
                  }}
                >
                  <Text style={styles.sortText}>
                    {sortType === option ? '✓  ' : ''}
                    {option}
                  </Text>
                </Pressable>
              )
            )}

            <Pressable
              style={styles.closeButton}
              onPress={() => setFilterVisible(false)}
            >
              <Text style={styles.closeButtonText}>
                Close
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F0',
  },

  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 25,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
  },

  logo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#386641',
  },

  tagline: {
    fontSize: 12,
    color: '#777',
    marginTop: 3,
  },

  headerIcon: {
    fontSize: 30,
  },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },

  searchIcon: {
    fontSize: 18,
  },

  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 13,
  },

  filterButton: {
    padding: 7,
  },

  filterIcon: {
    fontSize: 22,
    color: '#386641',
  },

  bannerImage: {
  width: '100%',
  height: 180,
  borderRadius: 16,
  marginBottom: 22,

  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#263D2A',
  },

  productCount: {
    color: '#777',
    fontSize: 12,
  },

  categoryList: {
    paddingBottom: 22,
  },

  categoryButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 17,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 9,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  selectedCategory: {
    backgroundColor: '#386641',
    borderColor: '#386641',
  },

  categoryText: {
    color: '#444',
    fontSize: 12,
    fontWeight: '600',
  },

  selectedCategoryText: {
    color: '#FFFFFF',
  },

  productRow: {
    justifyContent: 'space-between',
  },

  productCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    marginBottom: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },

  imageContainer: {
    height: 145,
    backgroundColor: '#FFFFFF',
  },

  productImage: {
    width: '100%',
    height: '100%',
  },

  imageFallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },

  fallbackEmoji: {
    fontSize: 35,
  },

  fallbackText: {
    fontSize: 10,
    color: '#888',
    marginTop: 5,
  },

  heartButton: {
    position: 'absolute',
    right: 9,
    top: 9,
    backgroundColor: '#FFFFFF',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },

  heart: {
    fontSize: 19,
  },

  productInfo: {
    padding: 11,
  },

  productName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    minHeight: 34,
  },

  productPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#386641',
    marginTop: 6,
  },

  productCategory: {
    fontSize: 11,
    color: '#888',
    marginTop: 4,
  },

  rating: {
    fontSize: 11,
    color: '#E6A700',
    marginTop: 5,
  },

  emptyText: {
    textAlign: 'center',
    color: '#777',
    marginTop: 30,
  },

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },

  modalBox: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#263D2A',
    marginBottom: 15,
  },

  sortOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  sortText: {
    fontSize: 15,
    color: '#333',
  },

  closeButton: {
    backgroundColor: '#386641',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },

  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

