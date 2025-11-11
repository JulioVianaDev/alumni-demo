import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Briefcase, MapPin, Building, DollarSign, GraduationCap, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export const Route = createFileRoute('/careers')({
  component: Careers,
});

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  postedBy: string;
  posted: string;
  description: string;
  requirements: string[];
  fullDescription: string;
}

const jobListings: Job[] = [
  {
    id: 1,
    title: 'Engenheiro de software sénior',
    company: 'TechCorp Portugal',
    location: 'Lisboa (Híbrido)',
    type: 'Tempo Integral',
    salary: 'R$ 22.500 - R$ 32.500',
    postedBy: 'João Silva (Turma 2010)',
    posted: 'Há 2 dias',
    description: 'Procuramos um engenheiro de software experiente para liderar projetos de desenvolvimento de aplicações web.',
    requirements: ['5+ anos de experiência', 'React, Node.js', 'Liderança de equipa'],
    fullDescription: 'Estamos à procura de um Engenheiro de Software Sénior para se juntar à nossa equipa de desenvolvimento.',
  },
  {
    id: 2,
    title: 'Gestor de marketing digital',
    company: 'Marketing Solutions Lda',
    location: 'Porto (Remoto)',
    type: 'Tempo Integral',
    salary: 'R$ 17.500 - R$ 25.000',
    postedBy: 'Maria Santos (Turma 2012)',
    posted: 'Há 5 dias',
    description: 'Oportunidade para gerir campanhas de marketing digital para clientes nacionais e internacionais.',
    requirements: ['3+ anos de experiência', 'Google Ads, SEO', 'Gestão de equipas'],
    fullDescription: 'Procuramos um Gestor de Marketing Digital criativo e orientado para resultados.',
  },
];

const mentorshipProgram = {
  title: 'Programa de mentoria alumni',
  description: 'Conecte-se com ex-alunos experientes que podem orientar a sua carreira profissional.',
  stats: {
    mentors: 150,
    mentees: 320,
    matches: 280,
  },
};

const filters = ['Todas as vagas', 'Tempo Integral', 'Remoto', 'Estágios', 'Freelance'];

function Careers() {
  const [selectedFilter, setSelectedFilter] = useState('Todas as vagas');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const filteredJobs = selectedFilter === 'Todas as vagas'
    ? jobListings
    : jobListings.filter(job => {
        if (selectedFilter === 'Tempo Integral') return job.type === 'Tempo Integral';
        if (selectedFilter === 'Remoto') return job.location.includes('Remoto');
        return true;
      });

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    setModalType('details');
    setShowModal(true);
  };

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setModalType('apply');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJob(null);
    setModalType('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Oportunidades de carreira</h1>
          <p className="text-xl text-muted-foreground">
            Explore vagas de emprego e programas de mentoria exclusivos para ex-alunos
          </p>
        </div>

        <Card className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <CardTitle className="text-2xl">{mentorshipProgram.title}</CardTitle>
            </div>
            <CardDescription className="text-base">
              {mentorshipProgram.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {mentorshipProgram.stats.mentors}+
                </div>
                <div className="text-sm text-muted-foreground">Mentores disponíveis</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {mentorshipProgram.stats.mentees}+
                </div>
                <div className="text-sm text-muted-foreground">Mentorados ativos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {mentorshipProgram.stats.matches}+
                </div>
                <div className="text-sm text-muted-foreground">Pares formados</div>
              </div>
            </div>
            <Button className="w-full md:w-auto">Candidatar-me ao programa</Button>
          </CardContent>
        </Card>

        <div className="mb-8 flex flex-wrap gap-3">
          {filters.map((filter) => (
            <Badge
              key={filter}
              variant={filter === selectedFilter ? 'default' : 'outline'}
              className="cursor-pointer px-4 py-2"
              onClick={() => setSelectedFilter(filter)}
            >
              {filter}
            </Badge>
          ))}
        </div>

        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Building className="h-4 w-4" />
                      <span className="font-medium">{job.company}</span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        <span>{job.salary}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="self-start">
                    Publicado por alumni
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{job.description}</p>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Requisitos:</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.requirements.map((req, index) => (
                      <Badge key={index} variant="outline">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button onClick={() => handleApply(job)}>Candidatar-me</Button>
                  <Button variant="outline" onClick={() => handleViewDetails(job)}>Ver detalhes</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Nenhuma vaga encontrada com os filtros selecionados.
            </p>
          </div>
        )}
      </div>

      {showModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">{selectedJob.title}</h3>
                <button onClick={handleCloseModal} className="text-muted-foreground hover:text-foreground">
                  <X className="h-6 w-6" />
                </button>
              </div>

              {modalType === 'details' && (
                <>
                  <p className="mb-6">{selectedJob.fullDescription}</p>
                  <div className="flex gap-4">
                    <Button variant="outline" className="flex-1" onClick={handleCloseModal}>
                      Fechar
                    </Button>
                    <Button className="flex-1" onClick={() => setModalType('apply')}>
                      Candidatar-me
                    </Button>
                  </div>
                </>
              )}

              {modalType === 'apply' && (
                <>
                  <p className="text-muted-foreground mb-6">
                    Preencha os dados abaixo para se candidatar a esta vaga.
                  </p>
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nome completo</label>
                      <Input type="text" placeholder="João Silva" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input type="email" placeholder="joao.silva@email.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">CV (anexar ficheiro)</label>
                      <Input type="file" accept=".pdf,.doc,.docx" />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" className="flex-1" onClick={handleCloseModal}>
                      Cancelar
                    </Button>
                    <Button className="flex-1" onClick={handleCloseModal}>
                      Enviar candidatura
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
