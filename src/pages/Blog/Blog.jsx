import React from "react";
import { FiClock, FiCalendar, FiUser, FiArrowRight, FiSearch } from "react-icons/fi";

const Blog = () => {
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Sample blog data
  const featuredPost = {
    id: 1,
    title: "The Future of Sustainable Fashion in 2023",
    excerpt:
      "Discover how eco-friendly materials and ethical production are shaping the future of the fashion industry.",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "June 15, 2023",
    readTime: "5 min read",
    author: "Sarah Johnson",
    category: "Fashion",
  };

  const blogPosts = [
    {
      id: 2,
      title: "Top 10 Home Decor Trends for Modern Living",
      excerpt:
        "Transform your living space with these innovative decor ideas that combine style and functionality.",
      image:
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
      date: "June 10, 2023",
      readTime: "4 min read",
      author: "Michael Chen",
      category: "Home Decor",
    },
    {
      id: 3,
      title: "Essential Tech Gadgets for Remote Workers",
      excerpt:
        "Boost your productivity with these must-have gadgets designed for the modern remote workforce.",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      date: "June 5, 2023",
      readTime: "6 min read",
      author: "David Wilson",
      category: "Technology",
    },
    {
      id: 4,
      title: "The Art of Minimalist Wardrobe: Less is More",
      excerpt:
        "Learn how to build a versatile capsule wardrobe that simplifies your daily routine.",
      image:
        "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      date: "May 28, 2023",
      readTime: "7 min read",
      author: "Emma Rodriguez",
      category: "Lifestyle",
    },
    {
      id: 5,
      title: "Sustainable Materials: What to Look for in Eco-Friendly Products",
      excerpt:
        "A guide to identifying truly sustainable materials when shopping for home and fashion items.",
      image:
        "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      date: "May 20, 2023",
      readTime: "8 min read",
      author: "James Peterson",
      category: "Sustainability",
    },
    {
      id: 6,
      title: "Smart Home Devices That Will Transform Your Daily Life",
      excerpt:
        "Discover how these innovative smart home technologies can automate and enhance your living space.",
      image:
        "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      date: "May 15, 2023",
      readTime: "5 min read",
      author: "Lisa Wong",
      category: "Technology",
    },
    {
      id: 7,
      title: "Seasonal Color Palettes for Your Home",
      excerpt:
        "How to refresh your interior design with colors that complement each season's mood and energy.",
      image:
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      date: "May 10, 2023",
      readTime: "6 min read",
      author: "Olivia Martinez",
      category: "Home Decor",
    },
  ];

  const categories = [
    { name: "All", count: 12 },
    { name: "Fashion", count: 4 },
    { name: "Technology", count: 3 },
    { name: "Home Decor", count: 3 },
    { name: "Lifestyle", count: 2 },
  ];

  const popularPosts = [
    {
      id: 1,
      title: "The Future of Sustainable Fashion in 2023",
      date: "June 15, 2023",
    },
    {
      id: 3,
      title: "Essential Tech Gadgets for Remote Workers",
      date: "June 5, 2023",
    },
    {
      id: 5,
      title: "Sustainable Materials: What to Look for in Eco-Friendly Products",
      date: "May 20, 2023",
    },
  ];

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-800 py-24 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">Capitl Blog</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-90">
            Discover the latest trends, tips, and insights in fashion,
            technology, and home decor
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Blog Posts */}
          <div className="w-full lg:w-2/3">
            {/* Featured Post */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-8 text-gray-800 relative inline-block after:absolute after:content-[''] after:w-1/2 after:h-1 after:bg-blue-600 after:-bottom-2 after:left-0">
                Featured Post
              </h2>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                <div className="relative overflow-hidden h-80">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <span className="inline-block px-3 py-1 bg-white text-blue-800 rounded-full text-sm font-medium mb-3">
                      {featuredPost.category}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                  <div className="flex flex-wrap items-center text-sm text-gray-500 gap-6 mb-6">
                    <span className="flex items-center">
                      <FiCalendar className="mr-2" /> {featuredPost.date}
                    </span>
                    <span className="flex items-center">
                      <FiClock className="mr-2" /> {featuredPost.readTime}
                    </span>
                    <span className="flex items-center">
                      <FiUser className="mr-2" /> {featuredPost.author}
                    </span>
                  </div>
                  <button
                    onClick={scrollToTop}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium group transition-colors duration-200"
                  >
                    Read more 
                    <FiArrowRight className="ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Posts */}
            <div>
              <h2 className="text-2xl font-bold mb-8 text-gray-800 relative inline-block after:absolute after:content-[''] after:w-1/2 after:h-1 after:bg-blue-600 after:-bottom-2 after:left-0">
                Recent Posts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl group"
                  >
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <span className="inline-block px-3 py-1 bg-white text-blue-800 rounded-full text-sm font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4 mb-4">
                        <span className="flex items-center">
                          <FiCalendar className="mr-2" /> {post.date}
                        </span>
                        <span className="flex items-center">
                          <FiClock className="mr-2" /> {post.readTime}
                        </span>
                      </div>
                      <button
                        onClick={scrollToTop}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium group transition-colors duration-200"
                      >
                        Read more 
                        <FiArrowRight className="ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-16">
                <nav className="flex items-center space-x-2">
                  <button 
                    onClick={scrollToTop}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                  >
                    Previous
                  </button>
                  <button 
                    onClick={scrollToTop}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 cursor-pointer shadow-md"
                  >
                    1
                  </button>
                  <button 
                    onClick={scrollToTop}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                  >
                    2
                  </button>
                  <button 
                    onClick={scrollToTop}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                  >
                    3
                  </button>
                  <button 
                    onClick={scrollToTop}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3 space-y-8">
            {/* Search */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 relative pb-2 after:absolute after:content-[''] after:w-10 after:h-0.5 after:bg-blue-600 after:bottom-0 after:left-0">
                Search
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 pl-10"
                />
                <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 relative pb-2 after:absolute after:content-[''] after:w-10 after:h-0.5 after:bg-blue-600 after:bottom-0 after:left-0">
                Categories
              </h3>
              <ul className="space-y-3">
                {categories.map((category, index) => (
                  <li key={index}>
                    <button
                      onClick={scrollToTop}
                      className="w-full text-left flex justify-between items-center py-2 px-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                    >
                      <span>{category.name}</span>
                      <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full text-xs font-medium">
                        {category.count}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Posts */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 relative pb-2 after:absolute after:content-[''] after:w-10 after:h-0.5 after:bg-blue-600 after:bottom-0 after:left-0">
                Popular Posts
              </h3>
              <ul className="space-y-4">
                {popularPosts.map((post) => (
                  <li key={post.id}>
                    <button 
                      onClick={scrollToTop}
                      className="w-full text-left group block p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                      <h4 className="text-md font-medium text-gray-800 group-hover:text-blue-600 mb-1 transition-colors duration-200">
                        {post.title}
                      </h4>
                      <p className="text-sm text-gray-500">{post.date}</p>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;