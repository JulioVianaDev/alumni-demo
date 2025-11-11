import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Calendar, Users, Briefcase, Heart, TrendingUp, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const features = [
    {
      icon: Users,
      title: 'Rede de contactos',
      description: 'Conecte-se com milhares de ex-alunos em todo o mundo.',
      link: '/directory',
    },
    {
      icon: Calendar,
      title: 'Eventos exclusivos',
      description: 'Participe em eventos, reuniões e celebrações da comunidade.',
      link: '/events',
    },
    {
      icon: Briefcase,
      title: 'Oportunidades de carreira',
      description: 'Aceda a vagas de emprego e programas de mentoria.',
      link: '/careers',
    },
    {
      icon: Heart,
      title: 'Apoie a instituição',
      description: 'Contribua para o crescimento e desenvolvimento da nossa escola.',
      link: '/donations',
    },
  ];

  const stats = [
    { label: 'Ex-alunos registados', value: '12.500+', icon: Users },
    { label: 'Eventos por ano', value: '150+', icon: Calendar },
    { label: 'Vagas de emprego', value: '500+', icon: Briefcase },
    { label: 'Taxa de empregabilidade', value: '95%', icon: TrendingUp },
  ];

  const recentNews = [
    {
      title: 'Ex-aluno ganha prémio internacional',
      date: '10 Out 2025',
      excerpt: 'João Silva foi reconhecido com o prémio de inovação tecnológica...',
    },
    {
      title: 'Nova parceria com empresa líder',
      date: '5 Out 2025',
      excerpt: 'A instituição estabeleceu parceria com empresa de tecnologia...',
    },
    {
      title: 'Reunião de turma de 2000',
      date: '1 Out 2025',
      excerpt: 'Celebração dos 25 anos de formatura com grande participação...',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Bem vindo a comunidade de ex alunos
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Conecte-se, cresça e contribua para o futuro da nossa instituição
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate({ to: '/register' })}
                className="text-lg"
              >
                Criar conta
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate({ to: '/login' })}
                className="text-lg bg-transparent text-white border-white hover:bg-white hover:text-blue-800"
              >
                Fazer login
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <stat.icon className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Por que juntar-se a nossa comunidade?
            </h2>
            <p className="text-xl text-muted-foreground">
              Descubra os benefícios de fazer parte da nossa rede de ex-alunos
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate({ to: feature.link })}
              >
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-blue-600 mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent News Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Notícias recentes</h2>
            <Button variant="outline" onClick={() => navigate({ to: '/news' })}>
              Ver todas
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentNews.map((news, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate({ to: '/news' })}
              >
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>{news.date}</span>
                  </div>
                  <CardTitle className="text-xl">{news.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{news.excerpt}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Award className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para fazer a diferença?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Junte-se a nós e ajude a construir o futuro da nossa instituição
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate({ to: '/donations' })}
            className="text-lg"
          >
            Fazer uma doação
          </Button>
        </div>
      </section>
    </div>
  );
}
