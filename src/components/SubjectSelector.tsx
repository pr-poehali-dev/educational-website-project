import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface SubjectSelectorProps {
  grade: 8 | 9;
  onSubjectSelect: (subject: 'algebra' | 'geometry') => void;
  onBack: () => void;
}

export default function SubjectSelector({ grade, onSubjectSelect, onBack }: SubjectSelectorProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6 bg-gradient-to-br from-background via-secondary/30 to-background">
      <div className="w-full max-w-4xl animate-fade-in">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6 gap-2"
        >
          <Icon name="ArrowLeft" size={18} />
          Назад к выбору класса
        </Button>

        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-foreground">
            {grade} класс
          </h2>
          <p className="text-lg text-muted-foreground">
            Выберите предмет для изучения
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card 
            className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 hover:border-primary/50"
            onClick={() => onSubjectSelect('algebra')}
          >
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Icon name="Calculator" size={36} className="text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-semibold mb-3 text-foreground">
                Алгебра
              </h3>
              <p className="text-muted-foreground mb-4">
                Уравнения, функции, неравенства и многое другое
              </p>
              <div className="flex items-center justify-center gap-2 text-primary font-medium">
                <span>Начать решать</span>
                <Icon name="ArrowRight" size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>

          <Card 
            className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 hover:border-primary/50"
            onClick={() => onSubjectSelect('geometry')}
          >
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Icon name="Triangle" size={36} className="text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-semibold mb-3 text-foreground">
                Геометрия
              </h3>
              <p className="text-muted-foreground mb-4">
                Фигуры, теоремы, построения и доказательства
              </p>
              <div className="flex items-center justify-center gap-2 text-primary font-medium">
                <span>Начать решать</span>
                <Icon name="ArrowRight" size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
