import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Clock, X, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/auth-context';
import { toast } from 'sonner';

export const Route = createFileRoute('/events')({
  component: Events,
});

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  maxAttendees: number | null;
  category: string;
  description: string;
  status: string;
  fullDescription: string;
}

const upcomingEvents: Event[] = [
  {
    id: 1,
    title: 'Gala anual de ex-alunos 2025',
    date: '15 Nov 2025',
    time: '19:00',
    location: 'Hotel Ritz, Lisboa',
    attendees: 250,
    maxAttendees: 300,
    category: 'Gala',
    description: 'Junte-se a nós para uma noite elegante de networking, jantar e celebração das conquistas da nossa comunidade.',
    status: 'open',
    fullDescription: 'A Gala Anual de Ex-Alunos é o evento mais prestigiado do nosso calendário. Uma noite de elegância, networking e celebração.',
  },
  {
    id: 2,
    title: 'Workshop: liderança no século XXI',
    date: '22 Nov 2025',
    time: '14:00',
    location: 'Campus Principal, Auditório A',
    attendees: 45,
    maxAttendees: 50,
    category: 'Workshop',
    description: 'Sessão interativa sobre competências de liderança moderna com palestrantes de renome internacional.',
    status: 'open',
    fullDescription: 'Workshop intensivo sobre liderança moderna, abordando temas como liderança adaptativa e gestão de equipas.',
  },
];

const categories = ['Todos', 'Gala', 'Workshop', 'Reunião', 'Carreira', 'Palestra', 'Social'];

const categoryColors: Record<string, string> = {
  'Gala': 'bg-purple-100 text-purple-800',
  'Workshop': 'bg-blue-100 text-blue-800',
  'Reunião': 'bg-green-100 text-green-800',
  'Carreira': 'bg-orange-100 text-orange-800',
  'Palestra': 'bg-pink-100 text-pink-800',
  'Social': 'bg-yellow-100 text-yellow-800',
};

function Events() {
  const { currentUser } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [registeredEvents, setRegisteredEvents] = useState<Set<number>>(new Set());
  const [events, setEvents] = useState<Event[]>(upcomingEvents);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    if (currentUser?.name) {
      setFormData({
        name: currentUser.name,
        email: currentUser.email || '',
      });
    }
  }, [currentUser]);

  const filteredEvents = selectedCategory === 'Todos'
    ? events
    : events.filter(event => event.category === selectedCategory);

  const handleViewDetails = (event: Event) => {
    setSelectedEvent(event);
    setModalType('details');
    setShowModal(true);
  };

  const handleRegister = (event: Event) => {
    setSelectedEvent(event);
    setModalType('register');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
    setModalType('');
  };

  const handleConfirmRegistration = () => {
    if (!selectedEvent) return;

    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    // Add to registered events
    setRegisteredEvents(new Set([...registeredEvents, selectedEvent.id]));

    // Update event attendees count
    setEvents(events.map(event => {
      if (event.id === selectedEvent.id) {
        return {
          ...event,
          attendees: event.attendees + 1,
          status: event.maxAttendees && event.attendees + 1 >= event.maxAttendees ? 'full' : event.status,
        };
      }
      return event;
    }));

    toast.success('Inscrição confirmada!', {
      description: `Você está inscrito no evento "${selectedEvent.title}"`,
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
    });

    handleCloseModal();
  };

  const handleUnregister = (event: Event) => {
    // Remove from registered events
    const newRegisteredEvents = new Set(registeredEvents);
    newRegisteredEvents.delete(event.id);
    setRegisteredEvents(newRegisteredEvents);

    // Update event attendees count
    setEvents(events.map(e => {
      if (e.id === event.id) {
        return {
          ...e,
          attendees: Math.max(0, e.attendees - 1),
          status: 'open',
        };
      }
      return e;
    }));

    toast.info('Inscrição cancelada', {
      description: `Você não está mais inscrito no evento "${event.title}"`,
      icon: <XCircle className="h-5 w-5 text-blue-600" />,
    });
  };

  const isRegistered = (eventId: number) => {
    return registeredEvents.has(eventId);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Eventos da comunidade</h1>
          <p className="text-xl text-muted-foreground">
            Participe nos nossos eventos e fortaleça a sua rede de contactos
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
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

        {/* Registered Events Summary */}
        {registeredEvents.size > 0 && (
          <div className="mb-8 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <h2 className="text-xl font-bold text-green-900 dark:text-green-100">
                Minhas Inscrições
              </h2>
            </div>
            <p className="text-green-700 dark:text-green-300 mb-2">
              Você está inscrito em <strong>{registeredEvents.size}</strong> {registeredEvents.size === 1 ? 'evento' : 'eventos'}
            </p>
            <div className="flex flex-wrap gap-2">
              {events
                .filter(e => registeredEvents.has(e.id))
                .map(event => (
                  <Badge key={event.id} variant="secondary" className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100">
                    {event.title}
                  </Badge>
                ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge className={categoryColors[event.category]}>
                    {event.category}
                  </Badge>
                  <div className="flex gap-2">
                    {isRegistered(event.id) && (
                      <Badge variant="default" className="bg-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Inscrito
                      </Badge>
                    )}
                    {event.status === 'full' && (
                      <Badge variant="destructive">Esgotado</Badge>
                    )}
                  </div>
                </div>
                <CardTitle className="text-2xl">{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-6">
                  {event.description}
                </CardDescription>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span>
                      {event.attendees} inscritos
                      {event.maxAttendees && ` / ${event.maxAttendees} vagas`}
                    </span>
                  </div>
                </div>

                {event.maxAttendees && (
                  <div className="mb-6">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  {isRegistered(event.id) ? (
                    <>
                      <Button
                        variant="destructive"
                        className="flex-1"
                        onClick={() => handleUnregister(event)}
                      >
                        Desinscrever-me
                      </Button>
                      <Button variant="outline" onClick={() => handleViewDetails(event)}>
                        Ver detalhes
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        className="flex-1"
                        disabled={event.status === 'full'}
                        onClick={() => handleRegister(event)}
                      >
                        {event.status === 'full' ? 'Esgotado' : 'Inscrever-me'}
                      </Button>
                      <Button variant="outline" onClick={() => handleViewDetails(event)}>
                        Ver detalhes
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Nenhum evento encontrado nesta categoria.
            </p>
          </div>
        )}
      </div>

      {showModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">{selectedEvent.title}</h3>
                <button onClick={handleCloseModal} className="text-muted-foreground hover:text-foreground">
                  <X className="h-6 w-6" />
                </button>
              </div>

              {modalType === 'details' && (
                <>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">{selectedEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <span>{selectedEvent.location}</span>
                    </div>
                  </div>
                  <p className="mb-6">{selectedEvent.fullDescription}</p>
                  <div className="flex gap-4">
                    <Button variant="outline" className="flex-1" onClick={handleCloseModal}>
                      Fechar
                    </Button>
                    <Button className="flex-1" onClick={() => setModalType('register')}>
                      Inscrever-me
                    </Button>
                  </div>
                </>
              )}

              {modalType === 'register' && (
                <>
                  <p className="text-muted-foreground mb-6">
                    Preencha os dados abaixo para confirmar a sua inscrição no evento.
                  </p>
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nome completo *</label>
                      <Input 
                        type="text" 
                        placeholder="João Silva" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <Input 
                        type="email" 
                        placeholder="joao.silva@email.com" 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                    <div className="flex gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                          Confirmação de inscrição
                        </p>
                        <p className="text-blue-700 dark:text-blue-300">
                          Você receberá um email de confirmação com todos os detalhes do evento.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" className="flex-1" onClick={handleCloseModal}>
                      Cancelar
                    </Button>
                    <Button className="flex-1" onClick={handleConfirmRegistration}>
                      Confirmar inscrição
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
