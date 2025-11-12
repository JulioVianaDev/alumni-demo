import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { DollarSign, Users, Award, TrendingUp, Heart, X, CreditCard, Building2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import PaymentModal from '@/components/PaymentModal';

export const Route = createFileRoute('/donations')({
  component: Donations,
});

interface Campaign {
  id: number;
  title: string;
  description: string;
  goal: number;
  raised: number;
  donors: number;
  daysLeft: number;
  category: string;
}

const campaigns: Campaign[] = [
  {
    id: 1,
    title: 'Bolsas de estudo 2025',
    description: 'Apoie estudantes talentosos com dificuldades financeiras a realizarem os seus sonhos académicos.',
    goal: 500000,
    raised: 375000,
    donors: 245,
    daysLeft: 30,
    category: 'Educação',
  },
  {
    id: 2,
    title: 'Modernização da biblioteca',
    description: 'Ajude-nos a renovar e digitalizar a biblioteca, criando um espaço de aprendizagem moderno.',
    goal: 250000,
    raised: 192500,
    donors: 156,
    daysLeft: 45,
    category: 'Infraestrutura',
  },
  {
    id: 3,
    title: 'Laboratório de inovação',
    description: 'Contribua para a criação de um laboratório de última geração para pesquisa e inovação.',
    goal: 750000,
    raised: 460000,
    donors: 312,
    daysLeft: 60,
    category: 'Investigação',
  },
];

const impactStats = [
  { label: 'Total arrecadado (2024)', value: 'R$ 4.250.000', icon: DollarSign },
  { label: 'Doadores ativos', value: '1.250+', icon: Users },
  { label: 'Bolsas concedidas', value: '180', icon: Award },
  { label: 'Taxa de crescimento', value: '+35%', icon: TrendingUp },
];

const donationLevels = [
  { name: 'Amigo', amount: 250, benefits: ['Certificado digital', 'Newsletter exclusiva'] },
  { name: 'Apoiante', amount: 500, benefits: ['Todos os benefícios anteriores', 'Convite para evento anual'] },
  { name: 'Patrono', amount: 2500, benefits: ['Todos os benefícios anteriores', 'Reconhecimento no website', 'Reunião com direção'] },
  { name: 'Benemérito', amount: 5000, benefits: ['Todos os benefícios anteriores', 'Placa comemorativa', 'Participação em comité consultivo'] },
];

function Donations() {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [donationFrequency, setDonationFrequency] = useState<'once' | 'monthly'>('once');
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'bank_transfer'>('credit_card');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState(0);
  const [customDonationAmount, setCustomDonationAmount] = useState(500);
  const [selectedDestination, setSelectedDestination] = useState('Onde for mais necessário');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Faça a diferença</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            O seu apoio transforma vidas e constrói o futuro da nossa instituição
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {impactStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6 text-center">
                <stat.icon className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Campanhas ativas</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{campaign.category}</Badge>
                    <div className="text-sm text-muted-foreground">{campaign.daysLeft} dias restantes</div>
                  </div>
                  <CardTitle className="text-2xl mb-2">{campaign.title}</CardTitle>
                  <CardDescription className="text-base">{campaign.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-semibold">
                        R$ {campaign.raised.toLocaleString('pt-BR')}
                      </span>
                      <span className="text-muted-foreground">
                        Meta: R$ {campaign.goal.toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full transition-all"
                        style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      {Math.round((campaign.raised / campaign.goal) * 100)}% alcançado
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Users className="h-4 w-4" />
                    <span>{campaign.donors} doadores</span>
                  </div>
                  <Button className="w-full" onClick={() => {
                    setDonationAmount(100);
                    setShowPaymentModal(true);
                  }}>
                    Doar agora
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Níveis de doação</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {donationLevels.map((level, index) => (
              <Card 
                key={level.name} 
                className={`hover:shadow-xl transition-shadow ${
                  index === 3 ? 'border-2 border-blue-600' : ''
                }`}
              >
                <CardHeader>
                  <CardTitle className="text-2xl text-center">{level.name}</CardTitle>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      R$ {level.amount}
                    </div>
                    <div className="text-sm text-muted-foreground">por ano</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {level.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Heart className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={index === 3 ? 'default' : 'outline'}
                    onClick={() => {
                      setDonationAmount(level.amount);
                      setShowPaymentModal(true);
                    }}
                  >
                    Doar agora
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Custom Donation Form */}
        <Card className="max-w-2xl mx-auto mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Faça uma doação personalizada</CardTitle>
            <CardDescription className="text-center text-base">
              Escolha o valor que deseja contribuir
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Valor da doação (R$)
                </label>
                <Input 
                  type="number" 
                  placeholder="500" 
                  className="text-lg"
                  value={customDonationAmount}
                  onChange={(e) => setCustomDonationAmount(Number(e.target.value))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Destino da doação
                </label>
                <select 
                  className="w-full border rounded-md px-3 py-2 bg-background"
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                >
                  <option>Onde for mais necessário</option>
                  <option>Bolsas de estudo</option>
                  <option>Infraestrutura</option>
                  <option>Investigação</option>
                  <option>Programas de ex-alunos</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Frequência
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant={donationFrequency === 'once' ? 'default' : 'outline'}
                    onClick={() => setDonationFrequency('once')}
                  >
                    Uma vez
                  </Button>
                  <Button 
                    variant={donationFrequency === 'monthly' ? 'default' : 'outline'}
                    onClick={() => setDonationFrequency('monthly')}
                  >
                    Mensal
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Método de pagamento
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant={paymentMethod === 'credit_card' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('credit_card')}
                    className="flex items-center gap-2"
                  >
                    <CreditCard className="h-4 w-4" />
                    Cartão de crédito
                  </Button>
                  <Button 
                    variant={paymentMethod === 'bank_transfer' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('bank_transfer')}
                    className="flex items-center gap-2"
                  >
                    <Building2 className="h-4 w-4" />
                    Transferência bancária
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="anonymous" className="rounded" />
                <label htmlFor="anonymous" className="text-sm">
                  Fazer doação anónima
                </label>
              </div>

              <Button 
                className="w-full" 
                size="lg"
                onClick={() => {
                  setDonationAmount(customDonationAmount);
                  setShowPaymentModal(true);
                }}
              >
                Processar doação
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Todas as doações são seguras e processadas através de gateway de pagamento certificado.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recognition Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Reconhecimento aos nossos doadores</h2>
          <Card className="max-w-4xl mx-auto">
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-4">
                Agradecemos profundamente a todos os ex-alunos que contribuíram para o crescimento da nossa instituição.
              </p>
              <Button variant="outline">Ver lista de doadores</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Donation Modal for Campaigns */}
      {selectedCampaign && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">{selectedCampaign.title}</h3>
                <button
                  onClick={() => setSelectedCampaign(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <p className="text-muted-foreground mb-6">{selectedCampaign.description}</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Valor da doação (R$)
                  </label>
                  <Input type="number" placeholder="500" className="text-lg" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Frequência
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant={donationFrequency === 'once' ? 'default' : 'outline'}
                      onClick={() => setDonationFrequency('once')}
                    >
                      Uma vez
                    </Button>
                    <Button 
                      variant={donationFrequency === 'monthly' ? 'default' : 'outline'}
                      onClick={() => setDonationFrequency('monthly')}
                    >
                      Mensal
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Método de pagamento
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant={paymentMethod === 'credit_card' ? 'default' : 'outline'}
                      onClick={() => setPaymentMethod('credit_card')}
                      className="flex items-center gap-2"
                    >
                      <CreditCard className="h-4 w-4" />
                      Cartão de crédito
                    </Button>
                    <Button 
                      variant={paymentMethod === 'bank_transfer' ? 'default' : 'outline'}
                      onClick={() => setPaymentMethod('bank_transfer')}
                      className="flex items-center gap-2"
                    >
                      <Building2 className="h-4 w-4" />
                      Transferência bancária
                    </Button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1" onClick={() => setSelectedCampaign(null)}>
                    Cancelar
                  </Button>
                  <Button className="flex-1" onClick={() => {
                    setDonationAmount(100);
                    setShowPaymentModal(true);
                    setSelectedCampaign(null);
                  }}>
                    Confirmar doação
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          onClose={() => setShowPaymentModal(false)}
          amount={donationAmount}
          type="donation"
          onSuccess={() => {
            setShowPaymentModal(false);
          }}
        />
      )}
    </div>
  );
}
