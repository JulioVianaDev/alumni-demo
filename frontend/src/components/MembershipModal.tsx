import { useState, useEffect } from 'react';
import { X, Check, Star, CreditCard, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PaymentModal from './PaymentModal';
import { toast } from 'sonner';

interface MembershipModalProps {
  onClose: () => void;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  discount: number;
  originalPrice: number | null;
  features: string[];
  popular: boolean;
}

export default function MembershipModal({ onClose }: MembershipModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const plans: Plan[] = [
    {
      id: 'monthly',
      name: 'Plano mensal',
      price: 100,
      period: 'mês',
      discount: 0,
      originalPrice: null,
      features: [
        'Acesso ao diretório de ex-alunos',
        'Participação em eventos exclusivos',
        'Newsletter mensal',
        'Acesso ao programa de mentoria',
        'Descontos em cursos e workshops',
      ],
      popular: false,
    },
    {
      id: 'semester',
      name: 'Plano semestral',
      price: 500,
      period: '6 meses',
      discount: 17,
      originalPrice: 600,
      features: [
        'Todos os benefícios do plano mensal',
        'Acesso prioritário a vagas de emprego',
        'Convite para eventos VIP',
        'Certificado de membro premium',
        'Suporte prioritário',
        '17% de desconto',
      ],
      popular: true,
    },
    {
      id: 'annual',
      name: 'Plano anual',
      price: 1000,
      period: 'ano',
      discount: 17,
      originalPrice: 1200,
      features: [
        'Todos os benefícios do plano semestral',
        'Acesso vitalício ao networking exclusivo',
        'Participação em comité consultivo',
        'Reconhecimento especial no website',
        'Sessões de coaching individual',
        '17% de desconto',
      ],
      popular: false,
    },
  ];

  const handleSubscribe = (plan: Plan) => {
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-background rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Seja membro
                </h2>
                <p className="text-muted-foreground">
                  Escolha o plano que melhor se adapta às suas necessidades e aproveite todos os benefícios
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-lg"
              aria-label="Fechar modal"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative hover:shadow-2xl transition-all duration-300 hover:scale-105 ${
                  plan.popular 
                    ? 'border-2 border-blue-600 shadow-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30' 
                    : 'hover:border-primary/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 shadow-lg">
                      <Star className="h-3 w-3 inline mr-1 fill-white" />
                      Mais popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <div className="mb-4">
                    {plan.originalPrice && (
                      <div className="text-sm text-muted-foreground line-through">
                        R$ {plan.originalPrice}
                      </div>
                    )}
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        R$ {plan.price}
                      </span>
                      <span className="text-muted-foreground">/ {plan.period}</span>
                    </div>
                    {plan.discount > 0 && (
                      <Badge variant="secondary" className="mt-2">
                        Economize {plan.discount}%
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    className={`w-full transition-all duration-300 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl' 
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                    size="lg"
                    onClick={() => handleSubscribe(plan)}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Assinar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Benefits */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl p-6 mb-6 border border-blue-200 dark:border-blue-800">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Crown className="h-6 w-6 text-blue-600" />
              Benefícios exclusivos para todos os membros
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Check className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Networking global</h4>
                  <p className="text-sm text-muted-foreground">
                    Conecte-se com mais de 12.500 ex-alunos em todo o mundo
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Check className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Oportunidades de carreira</h4>
                  <p className="text-sm text-muted-foreground">
                    Acesso exclusivo a vagas de emprego e programas de mentoria
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Check className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Eventos exclusivos</h4>
                  <p className="text-sm text-muted-foreground">
                    Participe em galas, workshops e reuniões especiais
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Check className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Desenvolvimento contínuo</h4>
                  <p className="text-sm text-muted-foreground">
                    Acesso a cursos, workshops e recursos educacionais
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="border-t pt-6">
            <h3 className="text-xl font-bold mb-4">Perguntas frequentes</h3>
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-1">
                  Posso cancelar a minha assinatura a qualquer momento?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Sim, pode cancelar a sua assinatura a qualquer momento sem custos adicionais.
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-1">
                  Como funciona o programa de mentoria?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Conectamos membros com mentores experientes da nossa comunidade para sessões individuais de orientação profissional.
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-1">
                  Os preços incluem IVA?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Sim, todos os preços apresentados já incluem IVA.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button variant="ghost" onClick={onClose}>
              Fechar
            </Button>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedPlan && (
        <PaymentModal
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedPlan(null);
          }}
          amount={selectedPlan.price}
          type="subscription"
          planName={selectedPlan.name}
          onSuccess={() => {
            setShowPaymentModal(false);
            toast.success('Assinatura confirmada!', {
              description: `Você agora é membro ${selectedPlan.name}`,
            });
            setTimeout(() => onClose(), 1500);
          }}
        />
      )}
    </div>
  );
}

