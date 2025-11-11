import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Search, MapPin, Briefcase, GraduationCap, Mail, Linkedin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export const Route = createFileRoute('/directory')({
  component: Directory,
});

interface Alumni {
  id: number;
  name: string;
  graduationYear: number;
  course: string;
  currentPosition: string;
  company: string;
  location: string;
  industry: string;
  avatar: string;
}

const alumni: Alumni[] = [
  {
    id: 1,
    name: 'João Silva',
    graduationYear: 2015,
    course: 'Engenharia Informática',
    currentPosition: 'Senior Software Engineer',
    company: 'TechCorp Portugal',
    location: 'Lisboa, Portugal',
    industry: 'Tecnologia',
    avatar: 'JS',
  },
  {
    id: 2,
    name: 'Maria Santos',
    graduationYear: 2012,
    course: 'Marketing',
    currentPosition: 'Marketing Director',
    company: 'Marketing Solutions Lda',
    location: 'Porto, Portugal',
    industry: 'Marketing',
    avatar: 'MS',
  },
  {
    id: 3,
    name: 'Pedro Costa',
    graduationYear: 2008,
    course: 'Gestão',
    currentPosition: 'Financial Analyst',
    company: 'Banco Investimentos SA',
    location: 'Lisboa, Portugal',
    industry: 'Finanças',
    avatar: 'PC',
  },
];

function Directory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('Todas');
  const [selectedLocation, setSelectedLocation] = useState('Todas');

  const industries = ['Todas', 'Tecnologia', 'Marketing', 'Finanças', 'Design', 'Consultoria'];
  const locations = ['Todas', 'Lisboa', 'Porto', 'Coimbra', 'Remoto'];

  const filteredAlumni = alumni.filter((person) => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.currentPosition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === 'Todas' || person.industry === selectedIndustry;
    const matchesLocation = selectedLocation === 'Todas' || person.location.includes(selectedLocation);
    
    return matchesSearch && matchesIndustry && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Diretoria de ex alunos</h1>
          <p className="text-xl text-muted-foreground">
            Encontre e conecte-se com mais de 12.500 ex alunos em todo o mundo
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Pesquisa avançada</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Pesquisar por nome, empresa, cargo..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Indústria</label>
                  <select
                    className="w-full border rounded-md px-3 py-2"
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                  >
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Localização</label>
                  <select
                    className="w-full border rounded-md px-3 py-2"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-4">
          <p className="text-muted-foreground">{filteredAlumni.length} resultados encontrados</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlumni.map((person) => (
            <Card key={person.id} className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold flex-shrink-0">
                    {person.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg mb-1">{person.name}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      Turma {person.graduationYear}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-2 text-sm">
                    <Briefcase className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">{person.currentPosition}</div>
                      <div className="text-muted-foreground">{person.company}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <span className="text-muted-foreground">{person.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <GraduationCap className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <span className="text-muted-foreground">{person.course}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <Mail className="h-3 w-3 mr-1" />
                    Contactar
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Linkedin className="h-3 w-3 mr-1" />
                    LinkedIn
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAlumni.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Nenhum resultado encontrado com os critérios selecionados.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
