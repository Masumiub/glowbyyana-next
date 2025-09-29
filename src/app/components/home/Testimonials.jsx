// components/home/Testimonials.jsx
'use client';
import React, { useState } from 'react';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    location: 'New York, NY',
    rating: 5,
    text: 'Glow by Yana transformed my skincare routine completely. My skin has never felt so hydrated and radiant! The products are worth every penny.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    skinType: 'Dry Skin'
  },
  {
    id: 2,
    name: 'Marcus Rodriguez',
    location: 'Los Angeles, CA',
    rating: 5,
    text: 'As someone with sensitive skin, I was hesitant to try new products. But these are incredibly gentle and effective. No more redness or irritation!',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    skinType: 'Sensitive Skin'
  },
  {
    id: 3,
    name: 'Emily Johnson',
    location: 'Chicago, IL',
    rating: 5,
    text: 'The trial kit helped me discover which products work best for my combination skin. Customer service was amazing throughout the process!',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    skinType: 'Combination Skin'
  },
  {
    id: 4,
    name: 'David Kim',
    location: 'Seattle, WA',
    rating: 5,
    text: 'Finally found a sunscreen that doesn\'t feel greasy or leave a white cast. This has become my daily essential for sun protection.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    skinType: 'Oily Skin'
  },
  {
    id: 5,
    name: 'Priya Patel',
    location: 'Austin, TX',
    rating: 5,
    text: 'The soothing gel saved my skin after a bad reaction to another product. It calmed the inflammation overnight. Miracle worker!',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    skinType: 'Damaged Skin'
  },
  {
    id: 6,
    name: 'Jessica Williams',
    location: 'Miami, FL',
    rating: 5,
    text: 'Love how all the products work together seamlessly. My skincare routine is now a luxurious self-care moment I look forward to every day.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    skinType: 'Normal Skin'
  }
];

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Real results from real people who have transformed their skin with our products
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="relative max-w-4xl mx-auto">
          {/* Quote Icon */}
          <div className="absolute -top-4 -left-4 z-10">
            <div className="bg-[#F6DFC4] rounded-full p-4 shadow-lg">
              <Quote size={24} className="text-black" />
            </div>
          </div>

          {/* Testimonial Card */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 relative">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <Image width={50} height={50}
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-[#F6DFC4]"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-black text-white text-xs px-3 py-1 rounded-full">
                    {testimonials[currentTestimonial].skinType}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                {/* Stars */}
                <div className="flex justify-center lg:justify-start gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={`${
                        i < testimonials[currentTestimonial].rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-xl  text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>

                {/* Customer Info */}
                <div>
                  <p className="font-bold text-black text-lg">
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-gray-600">
                    {testimonials[currentTestimonial].location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-black text-white hover:bg-gray-800 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ArrowLeft size={24} />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-black text-white hover:bg-gray-800 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ArrowRight size={24} />
          </button>
        </div>

        {/* Testimonial Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial
                  ? 'bg-[#F6DFC4] scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Additional Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-[#F6DFC4]"
            >
              <div className="flex items-center gap-3 mb-4">
                <Image width={50} height={50}
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-black">{testimonial.name}</p>
                  <p className="text-xs text-gray-500">{testimonial.skinType}</p>
                </div>
              </div>
              
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${
                      i < testimonial.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}