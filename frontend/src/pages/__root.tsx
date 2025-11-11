import {
    createRootRoute,
    Outlet,
} from "@tanstack/react-router";
import Navbar from "../components/navbar"
import { AuthProvider, useAuth } from "../contexts/auth-context";
import { Mail, Facebook, Twitter, Linkedin, Instagram, MapPin, Phone } from "lucide-react";
import { useState } from "react";

export const Route = createRootRoute({
    component: Root,
    context: (ctx) => ({
        hideLayout: false,
    }),
});

function Root() {
    return (
      <AuthProvider>
        <main className="w-full min-h-screen flex justify-between flex-col">
          <div>
            <Navbar />
            <Outlet />
          </div>
          <Footer />
        </main>
        <FloatingMessagesButton />
      </AuthProvider>
    )
}

function FloatingMessagesButton() {
    const { isAuthenticated, unreadMessagesCount } = useAuth();
    const [showMessagesPanel, setShowMessagesPanel] = useState(false);

    if (!isAuthenticated) return null;

    return (
        <>
            <button
                onClick={() => setShowMessagesPanel(true)}
                className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-all hover:scale-110 z-40"
                title="Mensagens"
            >
                <Mail className="h-6 w-6" />
                {unreadMessagesCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                        {unreadMessagesCount}
                    </span>
                )}
            </button>
            {/* TODO: Add MessagesPanel component */}
        </>
    );
}

function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Sobre Nós</h3>
                        <p className="text-sm">
                            Conectando ex-alunos, promovendo networking e apoiando o crescimento profissional da nossa comunidade.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Links Rápidos</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Política de Privacidade
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Termos de Uso
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Contato
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Suporte
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Contato</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                <span>alumni@instituicao.pt</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <span>+351 21 123 4567</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>Lisboa, Portugal</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Redes Sociais</h3>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="hover:text-white transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="hover:text-white transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="hover:text-white transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="hover:text-white transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
                    <p>&copy; 2025 Sistema de Gestão de Ex-Alunos. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
