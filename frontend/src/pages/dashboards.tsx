import { createFileRoute } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, DollarSign, TrendingUp } from 'lucide-react';

export const Route = createFileRoute('/dashboards')({
  component: Dashboards,
});

const keyMetrics = {
  totalMembers: '1.890',
  change: '+8.2%',
  activeMembers: '1.245',
  activeChange: '+12.5%',
  events: '58',
  eventsChange: '-3.4%',
  donations: 'R$ 98.000',
  donationsChange: '+15.8%',
};

function Dashboards() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
          <p className="text-xl text-muted-foreground">
            Visão geral da comunidade de ex-alunos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total de Membros</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{keyMetrics.totalMembers}</div>
              <p className="text-xs text-green-600">{keyMetrics.change} vs mês anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Membros Ativos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{keyMetrics.activeMembers}</div>
              <p className="text-xs text-green-600">{keyMetrics.activeChange} vs mês anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Eventos</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{keyMetrics.events}</div>
              <p className="text-xs text-red-600">{keyMetrics.eventsChange} vs mês anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Doações</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{keyMetrics.donations}</div>
              <p className="text-xs text-green-600">{keyMetrics.donationsChange} vs mês anterior</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Crescimento de Membros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Gráfico de crescimento
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Eventos por Mês</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Gráfico de eventos
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
