import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useTheme } from "./theme-provider";
import {
    BadgeCheck,
    Bell,
    CreditCard,
    LogOut,
    ChevronDown,
    Moon,
    Sun,
    Menu,
    X,
    Crown,
    MessageSquare,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import MembershipModal from "./MembershipModal";
import MessagesPanel from "./MessagesPanel";
import { Badge } from "./ui/badge";

export default function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showDirectorySubmenu, setShowDirectorySubmenu] = useState(false);
    const [showMembershipModal, setShowMembershipModal] = useState(false);
    const [showMessagesPanel, setShowMessagesPanel] = useState(false);
    const [unreadMessagesCount, setUnreadMessagesCount] = useState(3);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { theme, setTheme } = useTheme();
    const { isAuthenticated, currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const displayName = currentUser?.name || "Usuário";
    const displayEmail = currentUser?.email || "user@example.com";
    const displayImage = currentUser?.avatar || "";
    const userInitials = displayName.substring(0, 2).toUpperCase();

    const handleLogout = () => {
        logout();
        navigate({ to: "/" });
    };

    const menuItems = [
        { path: '/', label: 'Início' },
        { path: '/news', label: 'Feed' },
        { path: '/events', label: 'Eventos' },
        { path: '/careers', label: 'Carreira' },
        { path: '/donations', label: 'Doações' },
        { path: '/support', label: 'Suporte' },
        { 
            path: '/directory', 
            label: 'Diretoria',
            hasSubmenu: true,
            submenu: [
                { path: '/directory', label: 'Ex-alunos' },
                { path: '/dashboards', label: 'Dashboards' },
                { path: '/reports', label: 'Relatórios' },
            ]
        },
    ];

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const isActiveMenuItem = (item: typeof menuItems[0]) => {
        if (item.hasSubmenu && item.submenu) {
            return item.submenu.some(sub => isActive(sub.path));
        }
        return isActive(item.path);
    };

    return (
        <header
            className={`sticky top-0 z-50 bg-background flex justify-between h-20 w-full items-center px-4 md:px-6 border-b-2 ${theme === "dark" ? "border-secondary-foreground" : "border-primary"}`}
        >
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-primary">Alumni</h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
                {menuItems.map((item) => (
                    <div
                        key={item.path}
                        className="relative"
                        onMouseEnter={() => item.hasSubmenu && setShowDirectorySubmenu(true)}
                        onMouseLeave={() => item.hasSubmenu && setShowDirectorySubmenu(false)}
                    >
                        <Link
                            to={item.path}
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                                isActiveMenuItem(item)
                                    ? 'bg-primary text-white'
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                        >
                            {item.label}
                            {item.hasSubmenu && <ChevronDown className="h-4 w-4" />}
                        </Link>

                        {/* Submenu */}
                        {item.hasSubmenu && showDirectorySubmenu && item.submenu && (
                            <div
                                className="absolute top-full left-0 mt-1 bg-background border rounded-lg shadow-lg py-2 min-w-[180px] z-50"
                                onMouseEnter={() => setShowDirectorySubmenu(true)}
                                onMouseLeave={() => setShowDirectorySubmenu(false)}
                            >
                                {item.submenu.map((subItem) => (
                                    <Link
                                        key={subItem.path}
                                        to={subItem.path}
                                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${
                                            isActive(subItem.path)
                                                ? 'bg-blue-50 text-primary font-medium dark:bg-blue-950'
                                                : ''
                                        }`}
                                    >
                                        {subItem.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center gap-4">
                {/* Membership Button */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowMembershipModal(true)}
                    className="flex items-center gap-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950"
                >
                    <Crown className="h-4 w-4" />
                    Seja membro
                </Button>

                {/* Messages Button - Only when authenticated */}
                {isAuthenticated && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowMessagesPanel(true)}
                        className="relative hover:bg-gray-100 dark:hover:bg-gray-800"
                        title="Mensagens"
                    >
                        <MessageSquare className="h-5 w-5" />
                        {unreadMessagesCount > 0 && (
                            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-600 hover:bg-red-600">
                                {unreadMessagesCount}
                            </Badge>
                        )}
                    </Button>
                )}

                {/* Theme Toggle Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="hover:bg-gray-100 dark:hover:bg-gray-800"
                    title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                    {theme === "dark" ? (
                        <Sun className="h-5 w-5" />
                    ) : (
                        <Moon className="h-5 w-5" />
                    )}
                </Button>

                {isAuthenticated ? (
                    <div className="relative" ref={dropdownRef}>
                        <Button
                            variant="ghost"
                            className="flex hover:bg-pink-200 dark:hover:bg-secondary-foreground/10 dark:hover:text-white items-center gap-3 h-auto p-2"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={displayImage} alt={displayName} />
                                <AvatarFallback>{userInitials}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-start text-left">
                                <span className="text-sm font-medium truncate max-w-32">
                                    {displayName}
                                </span>
                                <span className="text-xs text-muted-foreground truncate max-w-32">
                                    {displayEmail}
                                </span>
                            </div>
                            <ChevronDown className="h-4 w-4 ml-2" />
                        </Button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-64 bg-background border rounded-md shadow-lg z-50">
                                <div className="p-0 font-normal">
                                    <div className="flex items-center gap-3 px-2 py-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={displayImage} alt={displayName} />
                                            <AvatarFallback>{userInitials}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="font-semibold">{displayName}</span>
                                            <span className="text-sm text-muted-foreground">
                                                {displayEmail}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <Link
                                        to="/profile"
                                        className="cursor-pointer flex items-center p-2 hover:bg-muted"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        <BadgeCheck className="mr-2 h-4 w-4" />
                                        Account Settings
                                    </Link>
                                    <div
                                        className="cursor-pointer flex items-center p-2 hover:bg-muted"
                                        onClick={() => console.log("Notifications clicked")}
                                    >
                                        <Bell className="mr-2 h-4 w-4" />
                                        Notifications
                                    </div>
                                </div>
                                <hr />
                                <div
                                    className="cursor-pointer flex items-center p-2 hover:bg-muted"
                                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                >
                                    {theme === "dark" ? (
                                        <Sun className="mr-2 h-4 w-4" />
                                    ) : (
                                        <Moon className="mr-2 h-4 w-4" />
                                    )}
                                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                                </div>
                                <hr />
                                <div
                                    className="cursor-pointer flex items-center p-2 text-destructive hover:bg-destructive/10"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log out
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => navigate({ to: '/login' })}>
                            Entrar
                        </Button>
                        <Button size="sm" onClick={() => navigate({ to: '/register' })}>
                            Criar conta
                        </Button>
                    </div>
                )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-foreground hover:text-muted-foreground"
                >
                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="absolute top-20 left-0 right-0 bg-background border-b shadow-lg z-50 md:hidden">
                    <nav className="flex flex-col p-4 space-y-2">
                        {menuItems.map((item) => (
                            <div key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        isActiveMenuItem(item)
                                            ? 'bg-primary text-white'
                                            : 'hover:bg-muted'
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                                {item.hasSubmenu && item.submenu && (
                                    <div className="ml-4 mt-1 space-y-1">
                                        {item.submenu.map((subItem) => (
                                            <Link
                                                key={subItem.path}
                                                to={subItem.path}
                                                className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                                                    isActive(subItem.path)
                                                        ? 'bg-blue-50 text-primary font-medium dark:bg-blue-950'
                                                        : 'text-muted-foreground hover:bg-muted'
                                                }`}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {subItem.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )                        )}

                        {/* Mobile Actions */}
                        <div className="pt-4 border-t space-y-2">
                            {/* Membership Button */}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setShowMembershipModal(true);
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full flex items-center justify-center gap-2 border-blue-600 text-blue-600"
                            >
                                <Crown className="h-4 w-4" />
                                Seja membro
                            </Button>

                            {/* Messages Button - Only when authenticated */}
                            {isAuthenticated && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setShowMessagesPanel(true);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="w-full flex items-center justify-center gap-2"
                                >
                                    <MessageSquare className="h-4 w-4" />
                                    <span>Mensagens</span>
                                    {unreadMessagesCount > 0 && (
                                        <Badge className="bg-red-600 hover:bg-red-600">
                                            {unreadMessagesCount}
                                        </Badge>
                                    )}
                                </Button>
                            )}

                            {/* Theme Toggle */}
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium w-full hover:bg-muted transition-colors"
                            >
                                {theme === "dark" ? (
                                    <>
                                        <Sun className="h-5 w-5" />
                                        <span>Light Mode</span>
                                    </>
                                ) : (
                                    <>
                                        <Moon className="h-5 w-5" />
                                        <span>Dark Mode</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {!isAuthenticated && (
                            <div className="pt-2 space-y-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                    onClick={() => {
                                        navigate({ to: '/login' });
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    Entrar
                                </Button>
                                <Button
                                    size="sm"
                                    className="w-full"
                                    onClick={() => {
                                        navigate({ to: '/register' });
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    Criar conta
                                </Button>
                            </div>
                        )}
                    </nav>
                </div>
            )}

            {/* Membership Modal */}
            {showMembershipModal && (
                <MembershipModal onClose={() => setShowMembershipModal(false)} />
            )}

            {/* Messages Panel */}
            {showMessagesPanel && (
                <MessagesPanel
                    onClose={() => setShowMessagesPanel(false)}
                    currentUser={currentUser ?? undefined}
                    onUnreadCountChange={setUnreadMessagesCount}
                />
            )}
        </header>
    );
}
