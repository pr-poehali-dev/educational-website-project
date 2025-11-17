import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface DashboardProps {
  userRole: 'teacher' | 'student';
  onClose: () => void;
}

export default function Dashboard({ userRole, onClose }: DashboardProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)] p-6 bg-gradient-to-br from-background via-secondary/30 to-background">
      <div className="container max-w-6xl mx-auto animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
              {userRole === 'teacher' ? 'Кабинет учителя' : 'Личный кабинет'}
            </h2>
            <p className="text-muted-foreground">
              {userRole === 'teacher' 
                ? 'Управление задачами и просмотр результатов учеников' 
                : 'Ваш прогресс и достижения'}
            </p>
          </div>
          <Button variant="outline" onClick={onClose} className="gap-2">
            <Icon name="ArrowLeft" size={18} />
            К задачам
          </Button>
        </div>

        {userRole === 'teacher' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon name="Users" size={20} className="text-primary" />
                  Ученики
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-heading font-bold mb-2">0</div>
                <p className="text-sm text-muted-foreground">Зарегистрировано учеников</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon name="FileText" size={20} className="text-primary" />
                  Задачи
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-heading font-bold mb-2">0</div>
                <p className="text-sm text-muted-foreground">Добавлено задач</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon name="CheckCircle2" size={20} className="text-primary" />
                  Решения
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-heading font-bold mb-2">0</div>
                <p className="text-sm text-muted-foreground">Проверено решений</p>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="ClipboardList" size={20} className="text-primary" />
                  Последние результаты учеников
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Icon name="Inbox" size={48} className="mx-auto mb-3 opacity-40" />
                  <p className="text-sm">Результаты учеников появятся здесь</p>
                  <p className="text-xs mt-1">Когда ученики начнут решать задачи, их результаты будут отображаться в этом разделе</p>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 lg:col-span-3 bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Icon name="Mail" size={24} className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-heading font-semibold mb-2">Уведомления на почту</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Вы можете настроить получение результатов учеников на вашу электронную почту
                    </p>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Icon name="Settings" size={16} />
                      Настроить уведомления
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon name="Target" size={20} className="text-primary" />
                  Решено задач
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-heading font-bold mb-2">0</div>
                <p className="text-sm text-muted-foreground">из доступных</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon name="TrendingUp" size={20} className="text-primary" />
                  Прогресс
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-heading font-bold mb-2">0%</div>
                <p className="text-sm text-muted-foreground">Общий прогресс</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon name="Award" size={20} className="text-primary" />
                  Достижения
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-heading font-bold mb-2">0</div>
                <p className="text-sm text-muted-foreground">Получено наград</p>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Clock" size={20} className="text-primary" />
                  Недавняя активность
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Icon name="Activity" size={48} className="mx-auto mb-3 opacity-40" />
                  <p className="text-sm">Начните решать задачи</p>
                  <p className="text-xs mt-1">Ваша активность и прогресс будут отображаться здесь</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
