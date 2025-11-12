import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Calendar, MessageCircle, ThumbsUp, Share2, Send, Heart, Award, Lightbulb, Smile, X } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/auth-context';
import type { LucideIcon } from 'lucide-react';

export const Route = createFileRoute('/news')({
  component: News,
});

interface Comment {
  id: number
  author: string
  text: string
  date: string
}

interface Post {
  id: number
  author: string
  authorAvatar: string
  title: string
  date: string
  category: string
  content: string
  likes: number
  comments: number
  shares: number
  reactions: Record<string, number>
  commentsList: Comment[]
}

interface Reaction {
  id: string
  icon: LucideIcon
  label: string
  color: string
  animation: string
}

const reactions: Reaction[] = [
  { id: "like", icon: ThumbsUp, label: "Gostei", color: "text-blue-600", animation: "animate-bounce" },
  { id: "love", icon: Heart, label: "Amei", color: "text-red-600", animation: "animate-pulse" },
  { id: "celebrate", icon: Award, label: "Parabéns", color: "text-green-600", animation: "animate-bounce" },
  {
    id: "insightful",
    icon: Lightbulb,
    label: "Interessante",
    color: "text-yellow-600",
    animation: "animate-pulse",
  },
  { id: "funny", icon: Smile, label: "Engraçado", color: "text-purple-600", animation: "animate-bounce" },
]

const initialPosts: Post[] = [
  {
    id: 1,
    author: "Redação Alumni",
    authorAvatar: "RA",
    title: "Ex-aluno ganha prêmio internacional de inovação",
    date: "10 Out 2025",
    category: "Conquistas",
    content:
      "João Silva, formado em 2015, foi reconhecido com o prestigiado prêmio de inovação tecnológica pela sua contribuição no desenvolvimento de soluções sustentáveis.",
    likes: 245,
    comments: 32,
    shares: 18,
    reactions: {},
    commentsList: [],
  },
  {
    id: 2,
    author: "Departamento de Relações",
    authorAvatar: "DR",
    title: "Nova parceria estratégica com empresa líder em tecnologia",
    date: "5 Out 2025",
    category: "Parcerias",
    content:
      "A instituição estabeleceu uma parceria inovadora com uma das maiores empresas de tecnologia do país, criando novas oportunidades para ex-alunos.",
    likes: 189,
    comments: 24,
    shares: 15,
    reactions: {},
    commentsList: [],
  },
  {
    id: 3,
    author: "Comissão de Eventos",
    authorAvatar: "CE",
    title: "Reunião de turma de 2000 celebra 25 anos",
    date: "1 Out 2025",
    category: "Eventos",
    content:
      "A celebração dos 25 anos de formatura reuniu mais de 150 ex-alunos num evento memorável cheio de recordações e networking.",
    likes: 312,
    comments: 45,
    shares: 28,
    reactions: {},
    commentsList: [],
  },
]

function News() {
  const { currentUser } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [posts, setPosts] = useState(initialPosts);
  const [newPostText, setNewPostText] = useState('');
  const [showReactions, setShowReactions] = useState<number | null>(null);
  const [userReactions, setUserReactions] = useState<Record<number, string>>({});
  const [animatingReaction, setAnimatingReaction] = useState<{ postId: number; reactionId: string } | null>(null);
  const [showComments, setShowComments] = useState<Record<number, boolean>>({});
  const [commentText, setCommentText] = useState<Record<number, string>>({});
  const [showMessageModal, setShowMessageModal] = useState<Post | null>(null);

  const categories = ['Todas', 'Conquistas', 'Parcerias', 'Eventos', 'Programas', 'Doações', 'Geral'];

  const filteredPosts = selectedCategory === 'Todas' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const handleCreatePost = () => {
    if (!newPostText.trim()) return;

    const newPost = {
      id: Date.now(),
      author: currentUser?.name || 'Usuário',
      authorAvatar: currentUser?.name?.split(' ').map(n => n[0]).join('').substring(0, 2) || 'U',
      title: '',
      date: 'Agora',
      category: 'Geral',
      content: newPostText,
      likes: 0,
      comments: 0,
      shares: 0,
      reactions: {},
      commentsList: [],
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
  };

  const handleReaction = (postId: number, reactionId: string) => {
    const previousReaction = userReactions[postId];
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newReactions = { ...post.reactions };
        
        if (previousReaction && newReactions[previousReaction]) {
          newReactions[previousReaction] = Math.max(0, (newReactions[previousReaction] || 0) - 1);
        }
        
        newReactions[reactionId] = (newReactions[reactionId] || 0) + 1;
        
        return {
          ...post,
          reactions: newReactions,
          likes: Object.values(newReactions).reduce((a: number, b: number) => a + b, 0),
        };
      }
      return post;
    }));

    setUserReactions({ ...userReactions, [postId]: reactionId });
    
    // Trigger animation
    setAnimatingReaction({ postId, reactionId });
    setTimeout(() => setAnimatingReaction(null), 1500);
    setShowReactions(null);
  };

  const handleComment = (postId: number) => {
    const text = commentText[postId];
    if (!text?.trim()) return;

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          commentsList: [
            ...(post.commentsList || []),
            {
              id: Date.now(),
              author: currentUser?.name || 'Usuário',
              text,
              date: 'Agora',
            },
          ],
          comments: (post.comments || 0) + 1,
        };
      }
      return post;
    }));

    setCommentText({ ...commentText, [postId]: '' });
  };

  const toggleComments = (postId: number) => {
    setShowComments({ ...showComments, [postId]: !showComments[postId] });
  };

  const ReactionIcon = ({ reaction, animated = false }: { reaction: Reaction; animated?: boolean }) => {
    const Icon = reaction.icon;
    return (
      <Icon 
        className={`${animated ? 'h-12 w-12' : 'h-6 w-6'} ${reaction.color} ${animated ? reaction.animation : ''}`} 
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Feed</h1>
          <p className="text-xl text-muted-foreground">
            Fique por dentro das últimas novidades da nossa comunidade de ex-alunos
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                {currentUser?.name?.split(' ').map(n => n[0]).join('').substring(0, 2) || 'U'}
              </div>
              <div className="flex-1">
                <textarea
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  placeholder="Compartilhe uma atualização..."
                  className="w-full border rounded-lg px-4 py-3 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-end mt-3">
                  <Button onClick={handleCreatePost} disabled={!newPostText.trim()}>
                    Publicar
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-8 flex flex-wrap gap-2 bg-background p-4 rounded-lg shadow">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={category === selectedCategory ? 'default' : 'outline'}
              className="cursor-pointer hover:bg-primary hover:text-white transition-colors px-4 py-2"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {post.authorAvatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{post.author}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{post.date}</span>
                          {post.category !== 'Geral' && (
                            <>
                              <span>•</span>
                              <Badge variant="secondary" className="text-xs">
                                {post.category}
                              </Badge>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {post.title && (
                  <h2 className="text-xl font-bold mb-3">{post.title}</h2>
                )}
                <p className="mb-4 leading-relaxed whitespace-pre-wrap">{post.content}</p>

                <div className="border-t pt-4 mt-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <span>{post.likes} reações</span>
                    <div className="flex gap-3">
                      <span>{post.comments} comentários</span>
                      <span>{post.shares} compartilhamentos</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 relative">
                    <div className="relative flex-1">
                      {(() => {
                        const userReaction = userReactions[post.id];
                        const selectedReaction = reactions.find(r => r.id === userReaction);
                        const ReactionButtonIcon = selectedReaction ? selectedReaction.icon : ThumbsUp;
                        const buttonColor = selectedReaction ? selectedReaction.color : '';
                        const buttonText = selectedReaction ? selectedReaction.label : 'Reagir';
                        
                        return (
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`w-full flex items-center gap-2 justify-center ${buttonColor}`}
                            onClick={() => setShowReactions(showReactions === post.id ? null : post.id)}
                          >
                            <ReactionButtonIcon className="h-4 w-4" />
                            {buttonText}
                          </Button>
                        );
                      })()}
                      
                      {/* Reactions Popup */}
                      {showReactions === post.id && (
                        <div
                          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-background rounded-lg shadow-2xl border px-3 py-3 flex gap-2 z-10"
                          onMouseEnter={() => setShowReactions(post.id)}
                          onMouseLeave={() => setShowReactions(null)}
                        >
                          {reactions.map((reaction) => (
                            <button
                              key={reaction.id}
                              onClick={() => handleReaction(post.id, reaction.id)}
                              className="flex flex-col items-center gap-1 p-2 hover:scale-110 transition-transform rounded-lg hover:bg-muted"
                              title={reaction.label}
                            >
                              <ReactionIcon reaction={reaction} />
                              <span className="text-xs font-medium">{reaction.label}</span>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Animated Reaction */}
                      {animatingReaction?.postId === post.id && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 pointer-events-none">
                          <ReactionIcon 
                            reaction={reactions.find(r => r.id === animatingReaction.reactionId)!} 
                            animated={true}
                          />
                        </div>
                      )}
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 flex items-center gap-2 justify-center"
                      onClick={() => toggleComments(post.id)}
                    >
                      <MessageCircle className="h-4 w-4" />
                      Comentar
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 flex items-center gap-2 justify-center"
                      onClick={() => setShowMessageModal(post)}
                    >
                      <Send className="h-4 w-4" />
                      Enviar
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="flex-1 flex items-center gap-2 justify-center">
                      <Share2 className="h-4 w-4" />
                      Compartilhar
                    </Button>
                  </div>
                </div>

                {/* Comments Section */}
                {showComments[post.id] && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="space-y-4 mb-4">
                      {post.commentsList?.map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {comment.author.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </div>
                          <div className="flex-1 bg-muted rounded-lg px-3 py-2">
                            <div className="font-semibold text-sm">{comment.author}</div>
                            <div className="text-sm">{comment.text}</div>
                            <div className="text-xs text-muted-foreground mt-1">{comment.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {currentUser?.name?.split(' ').map(n => n[0]).join('').substring(0, 2) || 'U'}
                      </div>
                      <div className="flex-1 flex gap-2">
                        <Input
                          value={commentText[post.id] || ''}
                          onChange={(e) => setCommentText({ ...commentText, [post.id]: e.target.value })}
                          placeholder="Escreva um comentário..."
                          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleComment(post.id)}
                        />
                        <Button size="sm" onClick={() => handleComment(post.id)}>
                          Enviar
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        {filteredPosts.length > 0 && (
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              Carregar mais publicações
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Nenhuma publicação encontrada nesta categoria.
            </p>
          </div>
        )}
      </div>

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg max-w-md w-full shadow-xl">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">Enviar mensagem</h3>
                <button
                  onClick={() => setShowMessageModal(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Enviar esta publicação para: <strong>{showMessageModal.author}</strong>
              </p>
              <textarea
                className="w-full border rounded-lg px-3 py-2 min-h-[100px] bg-background"
                placeholder="Adicione uma mensagem (opcional)..."
              />
              <div className="flex gap-3 mt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowMessageModal(null)}>
                  Cancelar
                </Button>
                <Button className="flex-1" onClick={() => {
                  alert('Mensagem enviada!');
                  setShowMessageModal(null);
                }}>
                  Enviar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
