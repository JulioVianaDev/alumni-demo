import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/auth-context';
import { Textarea } from '@/components/ui/textarea';

export const Route = createFileRoute('/support')({
  component: Support,
});

interface Ticket {
  id: number;
  text: string;
  date: string;
  status: string;
}

const initialTickets: Ticket[] = [
  {
    id: 1001,
    text: 'Não consigo acessar minha conta',
    date: '2025-11-10 14:30',
    status: 'open',
  },
  {
    id: 1002,
    text: 'Erro ao fazer doação',
    date: '2025-11-09 10:15',
    status: 'resolved',
  },
];

function Support() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('novo');
  const [ticketText, setTicketText] = useState('');
  const [tickets, setTickets] = useState(initialTickets);
  const [ticketCounter, setTicketCounter] = useState(1003);

  const MAX_CHARS = 3000;

  const handleSubmit = () => {
    if (!ticketText.trim()) {
      alert('Por favor, descreva o seu caso antes de enviar');
      return;
    }

    const ticketNumber = ticketCounter;
    const newTicket: Ticket = {
      id: ticketNumber,
      text: ticketText,
      date: new Date().toLocaleString('pt-BR'),
      status: 'open',
    };

    setTickets([newTicket, ...tickets]);
    setTicketCounter(ticketCounter + 1);
    setTicketText('');
    alert(`Ticket ${ticketNumber} aberto. Será contactado pelo nosso time assim que possível.`);
  };

  const handleCancel = () => {
    setTicketText('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Suporte</h1>
          <p className="text-xl text-muted-foreground">
            Precisa de ajuda? Estamos aqui para apoiá-lo
          </p>
        </div>

        <div className="flex gap-4 mb-8">
          <Button
            variant={activeTab === 'novo' ? 'default' : 'outline'}
            onClick={() => setActiveTab('novo')}
          >
            Novo Ticket
          </Button>
          <Button
            variant={activeTab === 'meus' ? 'default' : 'outline'}
            onClick={() => setActiveTab('meus')}
          >
            Meus Tickets
          </Button>
        </div>

        {activeTab === 'novo' && (
          <Card>
            <CardHeader>
              <CardTitle>Abrir novo ticket de suporte</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Descreva o seu problema
                  </label>
                  <Textarea
                    value={ticketText}
                    onChange={(e) => setTicketText(e.target.value)}
                    placeholder="Por favor, descreva detalhadamente o problema que está enfrentando..."
                    className="min-h-[200px]"
                    maxLength={MAX_CHARS}
                  />
                  <div className="text-sm text-muted-foreground mt-2">
                    {ticketText.length}/{MAX_CHARS} caracteres
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button onClick={handleSubmit} className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    Enviar Ticket
                  </Button>
                  <Button variant="outline" onClick={handleCancel} className="flex-1">
                    Cancelar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'meus' && (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <Card key={ticket.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Ticket #{ticket.id}</CardTitle>
                      <p className="text-sm text-muted-foreground">{ticket.date}</p>
                    </div>
                    <Badge variant={ticket.status === 'open' ? 'default' : 'secondary'}>
                      {ticket.status === 'open' ? (
                        <>
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Aberto
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Resolvido
                        </>
                      )}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap">{ticket.text}</p>
                </CardContent>
              </Card>
            ))}
            {tickets.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Você ainda não abriu nenhum ticket de suporte.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
