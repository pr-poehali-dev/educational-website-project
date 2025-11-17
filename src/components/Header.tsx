import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { useState } from "react";

interface HeaderProps {
  onSearch: (query: string) => void;
  onAuthClick: () => void;
  isAuthenticated: boolean;
  userRole?: 'teacher' | 'student';
}

export default function Header({ onSearch, onAuthClick, isAuthenticated, userRole }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Icon name="GraduationCap" size={28} className="text-primary" />
          <h1 className="text-xl font-heading font-bold text-foreground">
            МатемПрактика
          </h1>
        </div>

        <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-8">
          <div className="relative flex-1">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Поиск по задачам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </form>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <Button onClick={onAuthClick} variant="outline" className="gap-2">
              <Icon name={userRole === 'teacher' ? 'User' : 'UserCircle'} size={18} />
              <span className="hidden sm:inline">
                {userRole === 'teacher' ? 'Кабинет учителя' : 'Мой профиль'}
              </span>
            </Button>
          ) : (
            <Button onClick={onAuthClick} className="gap-2">
              <Icon name="LogIn" size={18} />
              <span className="hidden sm:inline">Войти</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
