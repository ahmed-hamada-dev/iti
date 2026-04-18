import { useState } from 'react';

const CommentForm = ({ user, onSubmit, isPending }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onSubmit(newComment, () => setNewComment(''));
  };

  if (!user) return null;

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-medium text-slate-600">
            {user.name?.[0]?.toUpperCase() || '?'}
          </span>
        </div>
        <div className="flex-1">
          <textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
          />
          <div className="flex justify-end mt-3">
            <button 
              type="submit" 
              disabled={isPending || !newComment.trim()}
              className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-slate-900 font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              {isPending ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
