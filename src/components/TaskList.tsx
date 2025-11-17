import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface TaskListProps {
  grade: 8 | 9;
  subject: 'algebra' | 'geometry';
  onBack: () => void;
  searchQuery?: string;
}

const chapters = {
  8: {
    algebra: [
      { id: 1, title: 'Рациональные дроби', tasksCount: 0 },
      { id: 2, title: 'Квадратные корни', tasksCount: 0 },
      { id: 3, title: 'Квадратные уравнения', tasksCount: 0 },
      { id: 4, title: 'Неравенства', tasksCount: 0 },
      { id: 5, title: 'Степень с целым показателем', tasksCount: 0 },
    ],
    geometry: [
      { id: 1, title: 'Четырёхугольники', tasksCount: 0 },
      { id: 2, title: 'Площадь', tasksCount: 0 },
      { id: 3, title: 'Подобные треугольники', tasksCount: 0 },
      { id: 4, title: 'Окружность', tasksCount: 0 },
      { id: 5, title: 'Векторы', tasksCount: 0 },
    ],
  },
  9: {
    algebra: [
      { id: 1, title: 'Квадратичная функция', tasksCount: 0 },
      { id: 2, title: 'Уравнения и неравенства с одной переменной', tasksCount: 0 },
      { id: 3, title: 'Уравнения и неравенства с двумя переменными', tasksCount: 0 },
      { id: 4, title: 'Арифметическая и геометрическая прогрессии', tasksCount: 0 },
      { id: 5, title: 'Элементы комбинаторики и теории вероятностей', tasksCount: 0 },
    ],
    geometry: [
      { id: 1, title: 'Метод координат', tasksCount: 0 },
      { id: 2, title: 'Соотношения между сторонами и углами треугольника', tasksCount: 0 },
      { id: 3, title: 'Длина окружности и площадь круга', tasksCount: 0 },
      { id: 4, title: 'Движения', tasksCount: 0 },
      { id: 5, title: 'Начальные сведения из стереометрии', tasksCount: 0 },
    ],
  },
};

export default function TaskList({ grade, subject, onBack, searchQuery }: TaskListProps) {
  const currentChapters = chapters[grade][subject];
  const subjectTitle = subject === 'algebra' ? 'Алгебра' : 'Геометрия';

  return (
    <div className="min-h-[calc(100vh-4rem)] p-6 bg-gradient-to-br from-background via-secondary/30 to-background">
      <div className="container max-w-5xl mx-auto animate-fade-in">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6 gap-2"
        >
          <Icon name="ArrowLeft" size={18} />
          Назад к выбору предмета
        </Button>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="outline" className="text-sm px-3 py-1">
              {grade} класс
            </Badge>
            <Badge className="text-sm px-3 py-1">
              {subjectTitle}
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            {subjectTitle}, {grade} класс
          </h2>
          {searchQuery && (
            <p className="text-muted-foreground mt-2">
              Результаты поиска: "{searchQuery}"
            </p>
          )}
        </div>

        <div className="mb-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 flex items-start gap-3">
              <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-foreground">
                Задачи будут добавлены администратором. Пока разделы пусты, но структура готова для наполнения практическими заданиями по каждой главе учебника.
              </p>
            </CardContent>
          </Card>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {currentChapters.map((chapter) => (
            <AccordionItem key={chapter.id} value={`chapter-${chapter.id}`} className="border rounded-lg bg-white shadow-sm">
              <AccordionTrigger className="px-6 hover:no-underline group">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <span className="font-heading font-semibold text-primary">
                        {chapter.id}
                      </span>
                    </div>
                    <span className="font-heading font-semibold text-left">
                      {chapter.title}
                    </span>
                  </div>
                  <Badge variant="secondary" className="ml-4">
                    {chapter.tasksCount} задач
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="pt-4 border-t">
                  <div className="text-center py-8 text-muted-foreground">
                    <Icon name="FileText" size={48} className="mx-auto mb-3 opacity-40" />
                    <p className="text-sm">
                      Задачи для этой главы пока не добавлены
                    </p>
                    <p className="text-xs mt-1">
                      Вы сможете добавить их через панель администратора
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
