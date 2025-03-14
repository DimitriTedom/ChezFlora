// src/components/BlogCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt } from 'react-icons/fa';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface BlogCardProps {
  id: number;
  title: string;
  author: string;
  date: string;
  category: string;
  imageUrl: string;
  description: string;
  authorImageUrl?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  title,
  author,
  date,
  category,
  imageUrl,
  description,
  authorImageUrl,
}) => {
  return (
    <div className="bg-pink-100 rounded-lg overflow-hidden shadow-md transition-transform hover:scale-[1.01] border-black border">
      {/* Responsive Image Container */}
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 sm:h-56 md:h-64 object-cover"
        loading="lazy"
      />
      <div className="p-4 sm:p-5 space-y-4">
        {/* Responsive Author Info Section */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <Avatar className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-white shadow-sm">
            <AvatarImage
              src={authorImageUrl}
              alt={author}
              className="object-cover"
            />
            <AvatarFallback className="bg-purple-100 text-purple-600">
              {author
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h5 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
              {author}
            </h5>
            <span className="text-xs sm:text-sm text-gray-500 truncate">
              {category}
            </span>
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-xs sm:text-sm">
            <FaCalendarAlt className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{date}</span>
          </div>
        </div>

        {/* Responsive Title */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 hover:text-purple-600 transition-colors line-clamp-2">
          {title}
        </h2>

        {/* Responsive Description */}
        <p className="text-sm sm:text-base text-gray-700 line-clamp-3 md:line-clamp-4">
          {description}
        </p>

        {/* Responsive Read More Link */}
        <Link
          to={`/blog/${id}`}
          className="flex items-center gap-1 text-purple-500 hover:underline focus:outline-none focus:ring-2 focus:ring-purple-300 rounded"
        >
          <span className="text-xs sm:text-sm">Read More...</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-3 h-3 sm:w-4 sm:h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;