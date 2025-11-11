import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { DollarSign, Users, Award, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
  { name: 'Patrono', amount: 2500, benefits: ['Todos os benefícios anteriores', 'Reconhecimento no website'] },
  { name: 'Benemérito', amount: 5000, benefits: ['Todos os benefícios anteriores', 'Placa comemorativa'] },
];

function Donations() {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

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
                  <Button className="w-full" onClick={() => setSelectedCampaign(campaign)}>
                    Fazer doação
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Níveis de doação</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {donationLevels.map((level) => (
              <Card key={level.name} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{level.name}</CardTitle>
                  <div className="text-3xl font-bold text-blue-600">
                    R$ {level.amount.toLocaleString('pt-BR')}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {level.benefits.map((benefit, index) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant="outline">
                    Doar {level.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
