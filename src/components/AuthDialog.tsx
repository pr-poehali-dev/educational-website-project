import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import Icon from "@/components/ui/icon";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: (email: string, password: string, role: 'teacher' | 'student') => void;
}

export default function AuthDialog({ open, onOpenChange, onLogin }: AuthDialogProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<'teacher' | 'student'>('student');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password, role);
    setEmail("");
    setPassword("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">Вход в систему</DialogTitle>
          <DialogDescription>
            Войдите как учитель или ученик для доступа к функциям платформы
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4 mt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Я зашёл как</Label>
                <RadioGroup value={role} onValueChange={(value) => setRole(value as 'teacher' | 'student')}>
                  <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="student" id="student" />
                    <Label htmlFor="student" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Icon name="UserCircle" size={20} className="text-primary" />
                      <div>
                        <div className="font-medium">Ученик</div>
                        <div className="text-xs text-muted-foreground">Решать задачи и отслеживать прогресс</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="teacher" id="teacher" />
                    <Label htmlFor="teacher" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Icon name="User" size={20} className="text-primary" />
                      <div>
                        <div className="font-medium">Учитель</div>
                        <div className="text-xs text-muted-foreground">Управлять задачами и просматривать результаты</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full gap-2">
                <Icon name="LogIn" size={18} />
                Войти
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register" className="space-y-4 mt-4">
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="UserPlus" size={48} className="mx-auto mb-3 opacity-40" />
              <p className="text-sm">Регистрация будет добавлена позже</p>
              <p className="text-xs mt-1">Пока используйте вкладку "Вход"</p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
