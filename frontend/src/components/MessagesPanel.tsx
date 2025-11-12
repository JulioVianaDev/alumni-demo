import { useState, useEffect } from 'react';
import { X, Search, Send, MoreVertical, Mail, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
  isMine: boolean;
}

interface Conversation {
  id: number;
  name: string;
  role: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  messages: Message[];
}

interface MessagesPanelProps {
  onClose: () => void;
  currentUser?: { name?: string; email?: string };
  onUnreadCountChange?: (count: number) => void;
}

const initialConversations: Conversation[] = [
  {
    id: 1,
    name: 'Maria Santos',
    role: 'Recrutadora - TechCorp',
    avatar: 'MS',
    lastMessage: 'Olá! Vi o seu perfil e gostaria de discutir uma oportunidade...',
    time: 'Há 2h',
    unread: 2,
    messages: [
      { id: 1, sender: 'Maria Santos', text: 'Olá! Vi o seu perfil e gostaria de discutir uma oportunidade de emprego.', time: '14:30', isMine: false },
      { id: 2, sender: 'Você', text: 'Olá Maria! Obrigado pelo contato. Estou interessado em saber mais.', time: '14:35', isMine: true },
      { id: 3, sender: 'Maria Santos', text: 'Ótimo! Temos uma vaga para Engenheiro de Software Sênior. Pode falar amanhã às 15h?', time: '14:40', isMine: false },
    ],
  },
  {
    id: 2,
    name: 'Pedro Costa',
    role: 'Administrador Alumni',
    avatar: 'PC',
    lastMessage: 'Bem-vindo à plataforma! Se tiver alguma dúvida, estou aqui.',
    time: 'Ontem',
    unread: 0,
    messages: [
      { id: 1, sender: 'Pedro Costa', text: 'Bem-vindo à plataforma Alumni! Se tiver alguma dúvida, estou aqui para ajudar.', time: 'Ontem 10:00', isMine: false },
      { id: 2, sender: 'Você', text: 'Obrigado Pedro! Estou explorando a plataforma.', time: 'Ontem 10:15', isMine: true },
    ],
  },
  {
    id: 3,
    name: 'Ana Rodrigues',
    role: 'Recrutadora - Creative Studio',
    avatar: 'AR',
    lastMessage: 'Temos um projeto freelance que pode interessar-lhe.',
    time: 'Há 3 dias',
    unread: 1,
    messages: [
      { id: 1, sender: 'Ana Rodrigues', text: 'Olá! Temos um projeto freelance de design UX/UI que pode interessar-lhe.', time: 'Há 3 dias', isMine: false },
    ],
  },
  {
    id: 4,
    name: 'Carlos Mendes',
    role: 'Mentor Alumni',
    avatar: 'CM',
    lastMessage: 'Gostaria de agendar nossa próxima sessão de mentoria?',
    time: 'Há 1 semana',
    unread: 0,
    messages: [
      { id: 1, sender: 'Carlos Mendes', text: 'Olá! Como está indo o seu projeto?', time: 'Há 1 semana', isMine: false },
      { id: 2, sender: 'Você', text: 'Está indo bem! Implementei as sugestões que me deu.', time: 'Há 1 semana', isMine: true },
      { id: 3, sender: 'Carlos Mendes', text: 'Excelente! Gostaria de agendar nossa próxima sessão de mentoria?', time: 'Há 1 semana', isMine: false },
    ],
  },
];

export default function MessagesPanel({ onClose, currentUser, onUnreadCountChange }: MessagesPanelProps) {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  // Notify unread count changes
  useEffect(() => {
    const totalUnread = conversations.reduce((sum, conv) => sum + conv.unread, 0);
    if (onUnreadCountChange) {
      onUnreadCountChange(totalUnread);
    }
  }, [conversations, onUnreadCountChange]);

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    // Mark messages as read
    setConversations(conversations.map(conv => 
      conv.id === conversation.id ? { ...conv, unread: 0 } : conv
    ));
  };

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: 'Você',
      text: messageText,
      time: 'Agora',
      isMine: true,
    };

    // Update selected conversation with new message
    setConversations(conversations.map(conv => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: messageText,
          time: 'Agora',
        };
      }
      return conv;
    }));

    // Update selected conversation to show new message
    setSelectedConversation({
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage],
    });

    setMessageText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unread, 0);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-background rounded-lg w-full max-w-5xl h-[80vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-background border-b px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Mensagens</h2>
            {totalUnread > 0 && (
              <p className="text-sm text-muted-foreground">{totalUnread} mensagem(ns) não lida(s)</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Conversations List */}
          <div className="w-1/3 border-r flex flex-col">
            {/* Search */}
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Pesquisar conversas..."
                  className="pl-10"
                />
              </div>
            </div>

            {/* Conversations */}
            <ScrollArea className="flex-1">
              {filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => handleSelectConversation(conversation)}
                  className={`w-full p-4 border-b hover:bg-muted transition-colors text-left ${
                    selectedConversation?.id === conversation.id ? 'bg-blue-50 dark:bg-blue-950' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-blue-600 text-white font-bold">
                        {conversation.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold truncate">
                          {conversation.name}
                        </h3>
                        <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                          {conversation.time}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{conversation.role}</p>
                      <p className="text-sm truncate">
                        {conversation.lastMessage}
                      </p>
                      {conversation.unread > 0 && (
                        <Badge className="mt-2 bg-blue-600">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </ScrollArea>
          </div>

          {/* Messages Area */}
          <div className="flex-1 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Conversation Header */}
                <div className="bg-background border-b px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-blue-600 text-white font-bold">
                        {selectedConversation.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">
                        {selectedConversation.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">{selectedConversation.role}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-6 bg-muted/20">
                  <div className="space-y-4">
                    {selectedConversation.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg px-4 py-2 ${
                            message.isMine
                              ? 'bg-blue-600 text-white'
                              : 'bg-background border'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.isMine ? 'text-blue-100' : 'text-muted-foreground'
                            }`}
                          >
                            {message.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="bg-background border-t px-6 py-4">
                  <div className="flex gap-3">
                    <Input
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Escreva uma mensagem..."
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} disabled={!messageText.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-muted/20">
                <div className="text-center">
                  <Mail className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg">
                    Selecione uma conversa para começar
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

