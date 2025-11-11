import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Edit, Save } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/auth-context';

export const Route = createFileRoute('/profile')({
  component: Profile,
});

const profileData = {
  name: 'João Silva',
  email: 'joao.silva@email.com',
  phone: '+351 912 345 678',
  location: 'Lisboa, Portugal',
  graduationYear: 2015,
  course: 'Engenharia Informática',
  currentPosition: 'Senior Software Engineer',
  company: 'TechCorp Portugal',
  industry: 'Tecnologia',
  bio: 'Engenheiro de software apaixonado por tecnologia e inovação.',
};

const activities = [
  { type: 'event', title: 'Participou no Workshop de Liderança', date: '22 Nov 2025' },
  { type: 'donation', title: 'Contribuiu para Bolsas de Estudo', date: '15 Nov 2025' },
  { type: 'job', title: 'Publicou vaga: Engenheiro de Software', date: '10 Nov 2025' },
  { type: 'network', title: 'Conectou-se com Maria Santos', date: '5 Nov 2025' },
];

const connections = [
  { name: 'Maria Santos', position: 'Marketing Director', avatar: 'MS' },
  { name: 'Pedro Costa', position: 'Financial Analyst', avatar: 'PC' },
  { name: 'Ana Rodrigues', position: 'UX/UI Designer', avatar: 'AR' },
  { name: 'Carlos Mendes', position: 'HR Consultant', avatar: 'CM' },
];

function Profile() {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader className="text-center">
                <div className="w-32 h-32 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold mx-auto mb-4">
                  JS
                </div>
                <CardTitle className="text-2xl">{profileData.name}</CardTitle>
                <CardDescription className="text-base">
                  {profileData.currentPosition}
                </CardDescription>
                <Badge variant="secondary" className="mt-2">
                  Turma {profileData.graduationYear}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span>{profileData.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span>{profileData.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span>{profileData.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-4 w-4 text-blue-600" />
                    <span>{profileData.company}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-4 w-4 text-blue-600" />
                    <span>{profileData.course}</span>
                  </div>
                </div>
                <Button className="w-full mt-6" onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Guardar Alterações
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar Perfil
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conexões</CardTitle>
                <CardDescription>{connections.length} conexões</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {connections.map((connection, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center text-sm font-bold">
                        {connection.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{connection.name}</div>
                        <div className="text-xs text-muted-foreground truncate">
                          {connection.position}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sobre</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <textarea
                    className="w-full border rounded-md px-3 py-2 min-h-[100px]"
                    defaultValue={profileData.bio}
                  />
                ) : (
                  <p>{profileData.bio}</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex gap-4 pb-4 border-b last:border-0">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-2"></div>
                      <div className="flex-1">
                        <div className="font-medium">{activity.title}</div>
                        <div className="text-sm text-muted-foreground">{activity.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
