
import Link from "next/link";
import { useAppContext } from "../context/contextAPI";
import { Card } from "./card"
import Image from "next/image";


const categories =  [
  {
    id: 1,
    name: 'Beauty',
    image: '/categories/beauty.jpg',
    description: 'Explore a range of beauty products to enhance your look'
  },
  {
    id: 2,
    name: 'Fragrances',
    image: '/categories/fragrances.webp',
    description: 'Refreshing and exotic fragrances for every occasion'
  },
  {
    id: 3,
    name: 'Furniture',
    image: '/categories/furniture.webp',
    description: 'Comfortable and stylish furniture for your home'
  },
  {
    id: 4,
    name: 'Groceries',
    image: '/categories/groceries.jpg',
    description: 'Daily essentials and grocery items at your fingertips'
  },
  {
    id: 5,
    name: 'Home Decoration',
    image: '/categories/home-decoration.jpg',
    description: 'Decor pieces to beautify and personalize your space'
  },
  {
    id: 6,
    name: 'Kitchen Accessories',
    image: '/categories/kitchen-accessories.jpg',
    description: 'Essential tools and accessories for your kitchen'
  },
  {
    id: 7,
    name: 'Laptops',
    image: '/categories/laptops.webp',
    description: 'High-performance laptops for work and play'
  },
  {
    id: 8,
    name: 'Men\'s Shirts',
    image: '/categories/mens-shirts.webp',
    description: 'Trendy and comfortable shirts for men'
  },
  {
    id: 9,
    name: 'Men\'s Shoes',
    image: '/categories/mens-shoes.avif',
    description: 'Stylish and durable shoes for men'
  },
  {
    id: 10,
    name: 'Men\'s Watches',
    image: '/categories/mens-watches.avif',
    description: 'Elegant and sporty watches for men'
  },
  {
    id: 11,
    name: 'Mobile Accessories',
    image: '/categories/mobile-accessories.webp',
    description: 'Must-have accessories for your mobile devices'
  },
  {
    id: 12,
    name: 'Motorcycle',
    image: '/categories/motorcycle.avif',
    description: 'Gear and accessories for motorcycle enthusiasts'
  },
  {
    id: 13,
    name: 'Skin Care',
    image: '/categories/skin-care.webp',
    description: 'Nourishing skincare products for healthy skin'
  },
  {
    id: 14,
    name: 'Smartphones',
    image: '/categories/smartphones.jpg',
    description: 'Latest smartphones with cutting-edge features'
  },
  {
    id: 15,
    name: 'Sports Accessories',
    image: '/categories/sports-accessories.webp',
    description: 'Everything you need for your fitness and sports needs'
  },
  {
    id: 16,
    name: 'Sunglasses',
    image: '/categories/sunglasses.webp',
    description: 'Trendy and protective sunglasses for all styles'
  },
  {
    id: 17,
    name: 'Tablets',
    image: '/categories/tablets.webp',
    description: 'Portable and powerful tablets for all purposes'
  },
  {
    id: 18,
    name: 'Tops',
    image: '/categories/tops.jpg',
    description: 'Fashionable tops for every occasion'
  },
  {
    id: 19,
    name: 'Vehicle',
    image: '/categories/vehicle.jpg',
    description: 'Automotive parts and vehicle accessories'
  },
  {
    id: 20,
    name: 'Women\'s Bags',
    image: '/categories/womens-bags.webp',
    description: 'Chic and versatile bags for women'
  },
  {
    id: 21,
    name: 'Women\'s Dresses',
    image: '/categories/womens-dresses.avif',
    description: 'Stylish dresses for women to suit every mood'
  },
  {
    id: 22,
    name: 'Women\'s Jewellery',
    image: '/categories/womens-jewellery.webp',
    description: 'Elegant jewellery pieces for women'
  },
  {
    id: 23,
    name: 'Women\'s Shoes',
    image: '/categories/womens-shoes.jpg',
    description: 'Trendy and comfortable footwear for women'
  },
  {
    id: 24,
    name: 'Women\'s Watches',
    image: '/categories/womens-watches.webp',
    description: 'Stylish watches to complete your look'
  }
];


function MainContent() {
  const {isMenuOpen, setIsMenuOpen} = useAppContext();
  return (
    <>
      {/* Hero Section */}

      <section className={`bg-[#023047] text-white py-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Welcome to Our Store
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Discover amazing products across various categories
            </p>
            <Link href="/pages/Products">
              <button className="px-8 py-3 bg-white text-[#023047] rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/pages/Products/categories/${category.name.toLowerCase()}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform duration-200 group-hover:shadow-md group-hover:-translate-y-1">
                  <div className="relative h-48">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#023047] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Quality Products</h3>
              <p className="text-slate-600">Curated selection of the best products</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#023047] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Fast Delivery</h3>
              <p className="text-slate-600">Quick and reliable shipping</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#023047] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Secure Payment</h3>
              <p className="text-slate-600">Safe and secure transactions</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MainContent;