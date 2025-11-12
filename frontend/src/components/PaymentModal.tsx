import { useState } from 'react';
import { X, CreditCard, Building2, Upload, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

interface PaymentModalProps {
  onClose: () => void;
  amount: number;
  type?: 'donation' | 'subscription';
  planName?: string;
  onSuccess?: () => void;
}

interface Receipt {
  name: string;
  file: File;
}

export default function PaymentModal({ 
  onClose, 
  amount, 
  type = 'donation',
  planName = '',
  onSuccess 
}: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'bank_transfer'>('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  // Credit Card Fields
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.replace(/\s/g, '').length <= 16) {
      setCardNumber(formatted);
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value);
    if (formatted.length <= 5) {
      setCardExpiry(formatted);
    }
  };

  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/gi, '');
    if (value.length <= 4) {
      setCardCVV(value);
    }
  };

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceipt({
        name: file.name,
        file,
      });
    }
  };

  const handleCreditCardPayment = async () => {
    // Validation
    if (!cardNumber || !cardName || !cardExpiry || !cardCVV) {
      toast.error('Por favor, preencha todos os campos do cartão');
      return;
    }

    if (cardNumber.replace(/\s/g, '').length !== 16) {
      toast.error('Número do cartão inválido');
      return;
    }

    if (cardExpiry.length !== 5) {
      toast.error('Data de validade inválida');
      return;
    }

    if (cardCVV.length < 3) {
      toast.error('CVV inválido');
      return;
    }

    setIsProcessing(true);

    // Payment processing simulation
    setTimeout(() => {
      setIsProcessing(false);
      // Success simulation (90% chance)
      const success = Math.random() > 0.1;
      
      if (success) {
        toast.success('Pagamento efetuado com sucesso!');
        setTimeout(() => {
          if (onSuccess) onSuccess();
          onClose();
        }, 1500);
      } else {
        toast.error('Falha no pagamento. Verifique os dados inseridos!');
      }
    }, 3000);
  };

  const handleBankTransferPayment = () => {
    if (!receipt) {
      toast.error('Por favor, anexe o comprovante de transferência');
      return;
    }

    const messageType = type === 'donation' ? 'Doações' : 'Pagamentos';
    const message = `${messageType} feitas via transferência bancária demoram até 3 dias úteis para compensar.`;
    
    toast.success(message, {
      description: 'Após a compensação, enviaremos o comprovante de recebimento por e-mail.',
    });
    
    setTimeout(() => {
      if (onSuccess) onSuccess();
      onClose();
    }, 2000);
  };

  const handleSubmit = () => {
    if (paymentMethod === 'credit_card') {
      handleCreditCardPayment();
    } else {
      handleBankTransferPayment();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
        {/* Header */}
        <div className="bg-background border-b px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-bold">
              {type === 'donation' ? 'Processar doação' : 'Processar pagamento'}
            </h2>
            {planName && (
              <p className="text-sm text-muted-foreground">Plano: {planName}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
            disabled={isProcessing}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Amount */}
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-muted-foreground mb-1">Valor total</p>
            <p className="text-3xl font-bold text-blue-600">R$ {amount.toFixed(2)}</p>
          </div>

          {/* Payment Method Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-3">
              Método de pagamento
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setPaymentMethod('credit_card')}
                disabled={isProcessing}
                className={`p-4 border-2 rounded-lg flex items-center gap-3 transition-all ${
                  paymentMethod === 'credit_card'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950'
                    : 'border-border hover:border-gray-400'
                }`}
              >
                <CreditCard className={`h-6 w-6 ${paymentMethod === 'credit_card' ? 'text-blue-600' : 'text-muted-foreground'}`} />
                <span className={`font-semibold ${paymentMethod === 'credit_card' ? 'text-blue-600' : ''}`}>
                  Cartão de crédito
                </span>
              </button>
              <button
                onClick={() => setPaymentMethod('bank_transfer')}
                disabled={isProcessing}
                className={`p-4 border-2 rounded-lg flex items-center gap-3 transition-all ${
                  paymentMethod === 'bank_transfer'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950'
                    : 'border-border hover:border-gray-400'
                }`}
              >
                <Building2 className={`h-6 w-6 ${paymentMethod === 'bank_transfer' ? 'text-blue-600' : 'text-muted-foreground'}`} />
                <span className={`font-semibold ${paymentMethod === 'bank_transfer' ? 'text-blue-600' : ''}`}>
                  Transferência bancária
                </span>
              </button>
            </div>
          </div>

          {/* Credit Card Form */}
          {paymentMethod === 'credit_card' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Número do cartão
                </label>
                <Input
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  className="text-lg"
                  disabled={isProcessing}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Nome no cartão
                </label>
                <Input
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value.toUpperCase())}
                  placeholder="NOME COMPLETO"
                  className="text-lg uppercase"
                  disabled={isProcessing}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Validade
                  </label>
                  <Input
                    value={cardExpiry}
                    onChange={handleExpiryChange}
                    placeholder="MM/AA"
                    className="text-lg"
                    disabled={isProcessing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    CVV
                  </label>
                  <Input
                    value={cardCVV}
                    onChange={handleCVVChange}
                    placeholder="123"
                    type="password"
                    className="text-lg"
                    disabled={isProcessing}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Bank Transfer Info */}
          {paymentMethod === 'bank_transfer' && (
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Building2 className="h-12 w-12 text-blue-600" />
                    <h3 className="text-lg font-bold">Banco Itaú</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Agência:</span>
                      <span className="font-semibold">0123</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Conta:</span>
                      <span className="font-semibold">45678-9</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Titular:</span>
                      <span className="font-semibold">Associação Alumni</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">CNPJ:</span>
                      <span className="font-semibold">12.345.678/0001-90</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Anexar comprovante
                </label>
                {receipt ? (
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Upload className="h-5 w-5 text-muted-foreground" />
                    <span className="flex-1 text-sm">{receipt.name}</span>
                    <button
                      onClick={() => setReceipt(null)}
                      className="text-red-600 hover:text-red-700"
                      disabled={isProcessing}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <label className="flex items-center gap-2 px-4 py-3 bg-background border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950 transition-all">
                    <Upload className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      Selecionar arquivo
                    </span>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleReceiptUpload}
                      className="hidden"
                      disabled={isProcessing}
                    />
                  </label>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-8">
            <Button variant="outline" onClick={onClose} disabled={isProcessing}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processando...
                </>
              ) : (
                'Confirmar pagamento'
              )}
            </Button>
          </div>
        </div>

        {/* Processing Overlay */}
        {isProcessing && (
          <div className="absolute inset-0 bg-background/90 flex items-center justify-center z-20 rounded-lg">
            <div className="text-center">
              <Loader2 className="h-16 w-16 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-lg font-semibold">Processando pagamento...</p>
              <p className="text-sm text-muted-foreground mt-2">Por favor, aguarde</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

