// components/home/FAQs.jsx
'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Mail, Phone, MessageCircle } from 'lucide-react';

const faqs = [
  {
    id: 1,
    question: 'What makes Glow by Yana products different?',
    answer: 'Our products are formulated with premium, skin-loving ingredients and are rigorously tested for effectiveness. We focus on creating multi-benefit solutions that deliver visible results while being gentle on your skin. All our products are cruelty-free and developed with dermatological expertise.'
  },
  {
    id: 2,
    question: 'How do I choose the right products for my skin type?',
    answer: 'We recommend starting with our Skin Type Quiz on our website or consulting with our skincare experts. You can also try our Trial Kit which includes mini versions of our best-selling products suitable for different skin types. Our customer service team is always available to provide personalized recommendations.'
  },
  {
    id: 3,
    question: 'Are your products suitable for sensitive skin?',
    answer: 'Yes! We have a dedicated line for sensitive skin that is free from common irritants like fragrance, alcohol, and harsh chemicals. All our products undergo rigorous testing for gentleness. However, we always recommend doing a patch test before full application, especially if you have known sensitivities.'
  },
  {
    id: 4,
    question: 'What is your return policy?',
    answer: 'We offer a 30-day satisfaction guarantee. If you\'re not completely happy with your purchase, you can return unused products within 30 days for a full refund or exchange. Shipping costs are non-refundable. Please contact our customer service team to initiate a return.'
  },
  {
    id: 5,
    question: 'Do you offer international shipping?',
    answer: 'Currently, we ship within the United States with plans to expand internationally soon. We offer free shipping on orders over $50 and expedited shipping options are available for an additional fee.'
  },
  {
    id: 6,
    question: 'How should I store my skincare products?',
    answer: 'Store your products in a cool, dry place away from direct sunlight and humidity. Avoid storing in bathrooms where temperature and humidity fluctuate. Keep lids tightly closed and use clean hands or applicators to maintain product integrity.'
  },
  {
    id: 7,
    question: 'Can I use multiple products together?',
    answer: 'Absolutely! Our products are designed to work synergistically. We recommend starting with a simple routine and gradually adding products. A typical routine would be: cleanser → toner → serum → moisturizer → sunscreen (AM). Always patch test new combinations and introduce one new product at a time.'
  },
  {
    id: 8,
    question: 'Are your products cruelty-free and vegan?',
    answer: 'Yes, all Glow by Yana products are cruelty-free and never tested on animals. Most of our products are vegan, and we clearly mark which ones contain animal-derived ingredients. We\'re committed to ethical sourcing and sustainable practices throughout our supply chain.'
  }
];

export default function FAQs() {
  const [openItems, setOpenItems] = useState([1]); // Start with first item open

  const toggleItem = (id) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="py-20 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Find answers to common questions about our products, shipping, and skincare routine
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-gray-100 hover:border-[#F6DFC4] transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="font-semibold text-lg text-black flex-1">
                    {faq.question}
                  </span>
                  {openItems.includes(faq.id) ? (
                    <ChevronUp size={24} className="text-[#F6DFC4] flex-shrink-0" />
                  ) : (
                    <ChevronDown size={24} className="text-gray-400 flex-shrink-0" />
                  )}
                </button>
                
                {openItems.includes(faq.id) && (
                  <div className="px-6 pb-6">
                    <div className="w-12 h-1 bg-[#F6DFC4] rounded-full mb-4"></div>
                    <p className="text-gray-700 leading-8 text-lg">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-16 bg-gradient-to-r from-[#F6DFC4] to-[#f0d2b0] rounded-3xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-800 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Our skincare experts are here to help you find the perfect products for your unique needs
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:help@glowbyyana.com"
                className="inline-flex items-center gap-3 bg-black text-white hover:bg-gray-800 px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <Mail size={20} />
                Email Us
              </a>
              
              <a
                href="tel:+1-555-HELP-NOW"
                className="inline-flex items-center gap-3 bg-white text-black hover:bg-gray-100 px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 border border-gray-200"
              >
                <Phone size={20} />
                Call Us
              </a>
              
              <button className="inline-flex items-center gap-3 bg-white text-black hover:bg-gray-100 px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 border border-gray-200">
                <MessageCircle size={20} />
                Live Chat
              </button>
            </div>
            
            <p className="text-gray-700 mt-6 text-sm">
              Typically replies within 2 hours • Available 7 days a week
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}