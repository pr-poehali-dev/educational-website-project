import { useState } from "react";
import Header from "@/components/Header";
import GradeSelector from "@/components/GradeSelector";
import SubjectSelector from "@/components/SubjectSelector";
import TaskList from "@/components/TaskList";
import AuthDialog from "@/components/AuthDialog";
import Dashboard from "@/components/Dashboard";
import ScrollToTop from "@/components/ScrollToTop";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

type View = 'grade' | 'subject' | 'tasks' | 'dashboard';

export default function Index() {
  const [view, setView] = useState<View>('grade');
  const [selectedGrade, setSelectedGrade] = useState<8 | 9>(8);
  const [selectedSubject, setSelectedSubject] = useState<'algebra' | 'geometry'>('algebra');
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'teacher' | 'student'>('student');
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleGradeSelect = (grade: 8 | 9) => {
    setSelectedGrade(grade);
    setView('subject');
  };

  const handleSubjectSelect = (subject: 'algebra' | 'geometry') => {
    setSelectedSubject(subject);
    setView('tasks');
  };

  const handleLogin = async (email: string, password: string, role: 'teacher' | 'student') => {
    try {
      const { user, token } = await api.auth.login(email, password);
      setIsAuthenticated(true);
      setUserRole(user.role);
      setUserId(user.id);
      setIsAuthDialogOpen(false);
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_id', user.id.toString());
      localStorage.setItem('user_role', user.role);
      toast({
        title: "Вход выполнен",
        description: `Добро пожаловать, ${user.role === 'teacher' ? 'учитель' : 'ученик'}!`,
      });
    } catch (error) {
      toast({
        title: "Ошибка входа",
        description: "Неверный email или пароль",
        variant: "destructive",
      });
    }
  };

  const handleAuthClick = () => {
    if (isAuthenticated) {
      setView('dashboard');
    } else {
      setIsAuthDialogOpen(true);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      toast({
        title: "Поиск",
        description: `Ищем задачи по запросу: "${query}"`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onSearch={handleSearch}
        onAuthClick={handleAuthClick}
        isAuthenticated={isAuthenticated}
        userRole={userRole}
      />

      {view === 'grade' && (
        <GradeSelector onGradeSelect={handleGradeSelect} />
      )}

      {view === 'subject' && (
        <SubjectSelector
          grade={selectedGrade}
          onSubjectSelect={handleSubjectSelect}
          onBack={() => setView('grade')}
        />
      )}

      {view === 'tasks' && (
        <TaskList
          grade={selectedGrade}
          subject={selectedSubject}
          onBack={() => setView('subject')}
          searchQuery={searchQuery}
          isTeacher={userRole === 'teacher'}
          userId={userId}
        />
      )}

      {view === 'dashboard' && isAuthenticated && (
        <Dashboard
          userRole={userRole}
          onClose={() => setView('grade')}
        />
      )}

      <AuthDialog
        open={isAuthDialogOpen}
        onOpenChange={setIsAuthDialogOpen}
        onLogin={handleLogin}
      />

      <ScrollToTop />
    </div>
  );
}