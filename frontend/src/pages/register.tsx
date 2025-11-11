import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { User, Mail, Lock, Phone, GraduationCap, Building, Briefcase, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/auth-context';
import { mockRegister, mockApiDelay } from '@/lib/mock-data';
import { toast } from 'sonner';

export const Route = createFileRoute('/register')({
  component: Register,
});

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  graduationYear: string;
  course: string;
  company: string;
  position: string;
}

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    graduationYear: '',
    course: '',
    company: '',
    position: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName || !formData.email || !formData.password) {
      setError('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('As palavras-passe não coincidem');
      return;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API delay
      await mockApiDelay(1000);

      // Register with mocked data
      const newUser = mockRegister({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        graduationYear: formData.graduationYear,
        course: formData.course,
        company: formData.company,
        position: formData.position,
      });

      register(newUser);
      toast.success('Conta criada com sucesso!');
      navigate({ to: '/' });
    } catch (err) {
      setError('Erro ao criar conta. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Criar conta</CardTitle>
          <CardDescription>
            Preencha seus dados para se juntar à comunidade de ex-alunos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Nome completo <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    placeholder="João Silva"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Email <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="joao.silva@email.com"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Senha <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    placeholder="••••••••"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Confirmar senha <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    placeholder="••••••••"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Telefone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+351 912 345 678"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Ano de formatura</label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    value={formData.graduationYear}
                    onChange={(e) => handleChange('graduationYear', e.target.value)}
                    placeholder="2015"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Curso</label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    value={formData.course}
                    onChange={(e) => handleChange('course', e.target.value)}
                    placeholder="Engenharia Informática"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Empresa atual</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    placeholder="Nome da empresa"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Cargo atual</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    value={formData.position}
                    onChange={(e) => handleChange('position', e.target.value)}
                    placeholder="Senior Software Engineer"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando conta...
                </>
              ) : (
                'Criar conta'
              )}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Já tem uma conta?{' '}
              <button
                type="button"
                onClick={() => navigate({ to: '/login' })}
                className="text-primary hover:underline"
              >
                Fazer login
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
