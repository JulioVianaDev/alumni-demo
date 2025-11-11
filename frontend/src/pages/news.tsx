import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Calendar, MessageCircle, ThumbsUp, Share2, Send, Heart, Award, Lightbulb, Smile } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/auth-context';

export const Route = createFileRoute('/news')({
  component: News,
});

const reactions = [
  { id: 'like', icon: ThumbsUp, label: 'Gostei', color: 'text-blue-600' },
  { id: 'love', icon: Heart, label: 'Amei', color: 'text-red-600' },
  { id: 'celebrate', icon: Award, label: 'Parabéns', color: 'text-green-600' },
  { id: 'insightful', icon: Lightbulb, label: 'Interessante', color: 'text-yellow-600' },
  { id: 'funny', icon: Smile, label: 'Engraçado', color: 'text-purple-600' },
];

const initialPosts = [
  {
    id: 1,
    author: 'Redação Alumni',
    authorAvatar: 'RA',
    title: 'Ex-aluno ganha prêmio internacional de inovação',
    date: '10 Out 2025',
    category: 'Conquistas',
    content: 'João Silva, formado em 2015, foi reconhecido com o prestigiado prêmio de inovação tecnológica pela sua contribuição no desenvolvimento de soluções sustentáveis.',
    likes: 245,
    comments: 32,
    shares: 18,
    reactions: {},
    commentsList: [],
  },
  {
    id: 2,
    author: 'Departamento de Relações',
    authorAvatar: 'DR',
    title: 'Nova parceria estratégica com empresa líder em tecnologia',
    date: '5 Out 2025',
    category: 'Parcerias',
    content: 'A instituição estabeleceu uma parceria inovadora com uma das maiores empresas de tecnologia do país, criando novas oportunidades para ex-alunos.',
    likes: 189,
    comments: 24,
    shares: 15,
    reactions: {},
    commentsList: [],
  },
  {
    id: 3,
    author: 'Comissão de Eventos',
    authorAvatar: 'CE',
    title: 'Reunião de turma de 2000 celebra 25 anos',
    date: '1 Out 2025',
    category: 'Eventos',
    content: 'A celebração dos 25 anos de formatura reuniu mais de 150 ex-alunos num evento memorável cheio de recordações e networking.',
    likes: 312,
    comments: 45,
    shares: 28,
    reactions: {},
    commentsList: [],
  },
];

function News() {
  const { currentUser } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [posts, setPosts] = useState(initialPosts);
  const [newPostText, setNewPostText] = useState('');
  const [showReactions, setShowReactions] = useState<number | null>(null);
  const [userReactions, setUserReactions] = useState<Record<number, string>>({});
  const [showComments, setShowComments] = useState<Record<number, boolean>>({});
  const [commentText, setCommentText] = useState<Record<number, string>>({});

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
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1"
                      onClick={() => setShowReactions(showReactions === post.id ? null : post.id)}
                    >
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Reagir
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1"
                      onClick={() => toggleComments(post.id)}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Comentar
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Share2 className="h-4 w-4 mr-2" />
                      Compartilhar
                    </Button>
                  </div>
                </div>

                {showComments[post.id] && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex gap-3">
                      <Input
                        value={commentText[post.id] || ''}
                        onChange={(e) => setCommentText({ ...commentText, [post.id]: e.target.value })}
                        placeholder="Escreva um comentário..."
                        onKeyPress={(e) => e.key === 'Enter' && handleComment(post.id)}
                      />
                      <Button size="sm" onClick={() => handleComment(post.id)}>
                        Enviar
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Nenhuma publicação encontrada nesta categoria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
