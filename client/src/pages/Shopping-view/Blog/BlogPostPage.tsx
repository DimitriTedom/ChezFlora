// src/pages/BlogPostPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { FaCalendarAlt, FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import axios from 'axios';

interface Article {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: {
    name: string;
    email: string;
  };
  category: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

//   useEffect(() => {
//     const fetchArticle = async () => {
//       try {
//         const response = await axios.get(`/api/articles/${id}`);
//         setArticle(response.data);
//       } catch (error) {
//         console.error('Error fetching article:', error);
//       }
//     };

//     const fetchComments = async () => {
//       try {
//         const response = await axios.get(`/api/comments?articleId=${id}`);
//         setComments(response.data);
//       } catch (error) {
//         console.error('Error fetching comments:', error);
//       }
//     };

//     fetchArticle();
//     fetchComments();
//   }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    try {
      await axios.post('/api/comments', {
        content: newComment,
        articleId: id,
      });

      setComments([...comments, { content: newComment }]);
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  if (!article) return <div className='mt-32'><p>Loading...</p></div>;

  return (
    <div className="bg-gray-100 min-h-screen mt-32">
      {/* Hero Section */}
      <div className="relative">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col items-start justify-center p-8 text-white">
          <div className="flex items-center gap-4">
            <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
              <AvatarImage src={`https://i.pravatar.cc/150?u=${article.author.email}`} alt={article.author.name} />
              <AvatarFallback className="bg-purple-100 text-purple-600">{article.author.name.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h5 className="text-xl font-semibold">{article.author.name}</h5>
              <span className="text-sm">{article.category}</span>
            </div>
            <div className="ml-auto flex items-center gap-1 text-sm">
              <FaCalendarAlt />
              <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold mt-4">{article.title}</h1>
          <p className="text-lg mt-2">{article.content.slice(0, 150)}...</p>
          <div className="mt-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
              <FaFacebookF />
            </button>
            <button className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded mr-2">
              <FaTwitter />
            </button>
            <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded mr-2">
              <FaInstagram />
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              <FaYoutube />
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto p-8">
        <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
      </div>

      {/* Tags Section */}
      <div className="container mx-auto p-8">
        <div className="flex space-x-2">
          {['Life styles', 'Gym', 'Technology', 'Food', 'Flower'].map((tag) => (
            <span key={tag} className="bg-gray-200 px-3 py-1 rounded text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Author Section */}
      <div className="container mx-auto p-8">
        <hr className="my-4" />
        <div className="flex items-center mb-4">
          <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
            <AvatarImage src={`https://i.pravatar.cc/150?u=${article.author.email}`} alt={article.author.name} />
            <AvatarFallback className="bg-purple-100 text-purple-600">{article.author.name.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <h5 className="text-xl font-semibold">WRITTEN BY</h5>
            <h5 className="text-xl font-semibold">{article.author.name}</h5>
            <p className="text-sm">There's no stopping the tech giant. Apple now opens its 100th store in China. There's no stopping the tech giant. <a href="#" className="text-blue-500">Read more</a></p>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="container mx-auto p-8">
        <h2 className="text-2xl font-bold mb-4">Responses ({comments.length})</h2>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add to discussion"
            className="w-full p-2 border rounded mb-4"
          ></textarea>
          <button type="submit" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
            Post comment
          </button>
        </form>
        <div className="mt-8">
          {comments.map((comment, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded mb-4">
              <div className="flex items-center mb-2">
                <Avatar className="w-8 h-8 border-2 border-white shadow-sm">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=user${index}`} alt={`User ${index}`} />
                  <AvatarFallback className="bg-purple-100 text-purple-600">U{index}</AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <h5 className="text-lg font-semibold">John Davide</h5>
                  <span className="text-sm text-gray-400">May 20, 2021</span>
                </div>
              </div>
              <p className="text-gray-300">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
// Get Article by Id
// app.get('/api/articles/:id', async (req, res) => {
//     const { id } = req.params;
//     // Fetch article from MongoDB using Prisma
//     const article = await prisma.article.findUnique({
//       where: { id },
//       include: { author: true },
//     });
//     res.json(article);
//   });

//Get Comments by Article ID

// app.get('/api/comments', async (req, res) => {
//     const { articleId } = req.query;
//     // Fetch comments from MongoDB using Prisma
//     const comments = await prisma.comment.findMany({
//       where: { articleId },
//     });
//     res.json(comments);
//   });

//   Post Comment


//   app.post('/api/comments', async (req, res) => {
//     const { content, articleId } = req.body;
//     // Create comment in MongoDB using Prisma
//     const comment = await prisma.comment.create({
//       data: {
//         content,
//         articleId,
//       },
//     });
//     res.json(comment);
//   });