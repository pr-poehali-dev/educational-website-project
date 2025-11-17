import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface GradeSelectorProps {
  onGradeSelect: (grade: 8 | 9) => void;
}

export default function GradeSelector({ onGradeSelect }: GradeSelectorProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6 bg-gradient-to-br from-background via-secondary/30 to-background">
      <div className="w-full max-w-4xl animate-fade-in">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-foreground">
            Выберите класс
          </h2>
          <p className="text-lg text-muted-foreground">
            Практические задачи по математике для 8 и 9 классов
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card 
            className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 hover:border-primary/50"
            onClick={() => onGradeSelect(8)}
          >
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <span className="text-4xl font-heading font-bold text-primary">8</span>
              </div>
              <h3 className="text-2xl font-heading font-semibold mb-3 text-foreground">
                8 класс
              </h3>
              <p className="text-muted-foreground mb-4">
                Алгебра и геометрия для восьмиклассников
              </p>
              <div className="flex items-center justify-center gap-2 text-primary font-medium">
                <span>Перейти к задачам</span>
                <Icon name="ArrowRight" size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>

          <Card 
            className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 hover:border-primary/50"
            onClick={() => onGradeSelect(9)}
          >
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <span className="text-4xl font-heading font-bold text-primary">9</span>
              </div>
              <h3 className="text-2xl font-heading font-semibold mb-3 text-foreground">
                9 класс
              </h3>
              <p className="text-muted-foreground mb-4">
                Алгебра и геометрия для девятиклассников
              </p>
              <div className="flex items-center justify-center gap-2 text-primary font-medium">
                <span>Перейти к задачам</span>
                <Icon name="ArrowRight" size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
