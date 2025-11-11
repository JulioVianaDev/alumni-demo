import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { FileText, Download, DollarSign, Calendar, Users, Building2, MapPin, Briefcase } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/reports')({
  component: Reports,
});

interface ReportType {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
}

const reportTypes: ReportType[] = [
  {
    id: 'financial',
    title: 'Relatório financeiro',
    description: 'Análise detalhada de doações, contribuições e histórico financeiro',
    icon: DollarSign,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    id: 'event_frequency',
    title: 'Frequência aos eventos',
    description: 'Participação e presença dos ex-alunos nos eventos organizados',
    icon: Calendar,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    id: 'partners',
    title: 'Quantidade de parceiros',
    description: 'Empresas e organizações parceiras da comunidade',
    icon: Building2,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    id: 'demographic',
    title: 'Dados demográficos',
    description: 'Distribuição por idade, gênero, localização e formação',
    icon: MapPin,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
  {
    id: 'professional',
    title: 'Dados profissionais',
    description: 'Áreas de atuação, cargos, empresas e trajetórias de carreira',
    icon: Briefcase,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
  },
];

function Reports() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Relatórios</h1>
          <p className="text-xl text-muted-foreground">
            Gere relatórios detalhados sobre a comunidade de ex-alunos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportTypes.map((report) => (
            <Card
              key={report.id}
              className="hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => setSelectedReport(report.id)}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${report.bgColor} dark:bg-opacity-20 flex items-center justify-center mb-4`}>
                  <report.icon className={`h-6 w-6 ${report.color}`} />
                </div>
                <CardTitle className="text-xl">{report.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-6">
                  {report.description}
                </CardDescription>
                <div className="flex gap-3">
                  <Button className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    Gerar
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
