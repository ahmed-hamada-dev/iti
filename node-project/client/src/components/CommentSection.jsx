import { useState } from 'react';
import CommentForm from './CommentForm';
import { ConfirmDialog } from './ConfirmDialog';

const CommentSection = ({ user, comments, onCreateComment, onDeleteComment, isCreating, isDeleting }) => {
  const [commentToDelete, setCommentToDelete] = useState(null);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <h2 className="text-xl font-bold text-slate-800 mb-6">Discussion</h2>
      
      <CommentForm 
        user={user} 
        onSubmit={onCreateComment} 
        isPending={isCreating} 
      />
      
      {comments.length === 0 ? (
        <p className="text-slate-500 text-center py-8">No comments yet. Be the first to comment!</p>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment._id} className="flex gap-4 pb-6 border-b border-slate-100 last:border-0">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium text-slate-600">
                  {comment.userId?.name?.[0]?.toUpperCase() || '?'}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-medium text-slate-800">{comment.userId?.name}</span>
                    <span className="text-slate-400 text-sm ml-2">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {user?._id === comment.userId?._id && (
                    <button
                      onClick={() => setCommentToDelete(comment)}
                      disabled={isDeleting}
                      className="text-sm text-red-500 hover:text-red-700 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  )}
                </div>
                <p className="text-slate-600">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!commentToDelete}
        onClose={() => setCommentToDelete(null)}
        onConfirm={() => {
          onDeleteComment(commentToDelete._id);
          setCommentToDelete(null);
        }}
        title="Delete Comment"
        description="Are you sure you want to delete this comment? This action cannot be undone."
        isLoading={isDeleting}
      />
    </div>
  );
};

export default CommentSection;
