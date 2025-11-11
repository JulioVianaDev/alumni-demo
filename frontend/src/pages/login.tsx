import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/auth-context';
import { mockLogin, mockApiDelay } from '@/lib/mock-data';
import { toast } from 'sonner';

export const Route = createFileRoute('/login')({
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API delay
      await mockApiDelay(800);
      
      // Try to login with mocked data
      const user = mockLogin(email, password);
      
      if (user) {
        login(user);
        toast.success('Login realizado com sucesso!');
        navigate({ to: '/' });
      } else {
        setError('Email ou senha incorretos. Tente: joao@alumni.pt / 123456');
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Fazer login</CardTitle>
          <CardDescription>
            Entre com suas credenciais para acessar a plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Demo credentials */}
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg text-sm">
            <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Demo:</p>
            <p className="text-blue-700 dark:text-blue-300">Email: joao@alumni.pt</p>
            <p className="text-blue-700 dark:text-blue-300">Senha: 123456</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@exemplo.com"
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-muted-foreground">Lembrar-me</span>
              </label>
              <a href="#" className="text-sm text-primary hover:underline">
                Esqueceu a senha?
              </a>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Ainda não tem conta?{' '}
              <button
                type="button"
                onClick={() => navigate({ to: '/register' })}
                className="text-primary hover:underline"
              >
                Criar conta
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
