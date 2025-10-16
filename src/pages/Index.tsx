import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

type Word = {
  text: string;
  correct: 'Е' | 'И';
  hint: string;
};

const words: Word[] = [
  { text: 'пр_дать', correct: 'Е', hint: 'значение "очень"' },
  { text: 'пр_дать', correct: 'И', hint: 'значение "передать"' },
  { text: 'пр_творить', correct: 'Е', hint: 'значение "очень"' },
  { text: 'пр_творить', correct: 'И', hint: 'приближение' },
  { text: 'пр_клоняться', correct: 'Е', hint: 'перед кем-либо' },
  { text: 'пр_клонить', correct: 'И', hint: 'ветки к земле' },
  { text: 'пр_ступать', correct: 'Е', hint: 'закон' },
  { text: 'пр_ступать', correct: 'И', hint: 'к делу' },
  { text: 'пр_бывать', correct: 'Е', hint: 'находиться где-либо' },
  { text: 'пр_бывать', correct: 'И', hint: 'куда-либо' },
  { text: 'пр_емник', correct: 'Е', hint: 'последователь' },
  { text: 'пр_ёмник', correct: 'И', hint: 'аппарат' },
  { text: 'пр_ходящий', correct: 'Е', hint: 'временный' },
  { text: 'пр_ходящий', correct: 'И', hint: 'кто приходит' },
  { text: 'пр_зирать', correct: 'Е', hint: 'не уважать' },
  { text: 'пр_зирать', correct: 'И', hint: 'давать приют' },
];

type Mode = 'menu' | 'test' | 'results' | 'training';

export default function Index() {
  const [mode, setMode] = useState<Mode>('menu');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<('Е' | 'И' | null)[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<'Е' | 'И' | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const startTest = () => {
    setMode('test');
    setCurrentQuestion(0);
    setAnswers(new Array(words.length).fill(null));
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const startTraining = () => {
    setMode('training');
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleAnswer = (answer: 'Е' | 'И') => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    if (mode === 'test') {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = answer;
      setAnswers(newAnswers);

      setTimeout(() => {
        if (currentQuestion < words.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setShowFeedback(false);
        } else {
          setMode('results');
        }
      }, 1500);
    }
  };

  const nextTraining = () => {
    if (currentQuestion < words.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const correctAnswers = answers.filter((ans, idx) => ans === words[idx].correct).length;
  const percentage = Math.round((correctAnswers / words.length) * 100);

  if (mode === 'menu') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="w-full max-w-2xl animate-fade-in">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6">
              <Icon name="BookOpen" size={40} className="text-primary" />
            </div>
            <h1 className="text-5xl font-bold mb-4 tracking-tight">ПРЕ- или ПРИ-?</h1>
            <p className="text-lg text-muted-foreground">
              Тест на различение приставок в русском языке
            </p>
          </div>

          <div className="grid gap-4">
            <Card className="p-8 hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer border-2" onClick={startTest}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Target" size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Тестирование</h3>
                  <p className="text-muted-foreground">
                    Пройдите тест из {words.length} вопросов и узнайте свой результат
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer border-2" onClick={startTraining}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="Dumbbell" size={24} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Тренировка</h3>
                  <p className="text-muted-foreground">
                    Отработайте навык с подсказками и объяснениями
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'results') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="w-full max-w-2xl animate-scale-in">
          <Card className="p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-primary/10 mb-6">
                {percentage >= 80 ? (
                  <Icon name="Trophy" size={48} className="text-primary" />
                ) : percentage >= 60 ? (
                  <Icon name="Star" size={48} className="text-accent" />
                ) : (
                  <Icon name="Target" size={48} className="text-muted-foreground" />
                )}
              </div>
              <h2 className="text-4xl font-bold mb-4">Результаты теста</h2>
              <div className="text-6xl font-bold text-primary mb-2">{percentage}%</div>
              <p className="text-lg text-muted-foreground">
                Правильных ответов: {correctAnswers} из {words.length}
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {words.map((word, idx) => {
                const userAnswer = answers[idx];
                const isCorrect = userAnswer === word.correct;
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border-2 flex items-center justify-between ${
                      isCorrect
                        ? 'bg-accent/10 border-accent'
                        : 'bg-destructive/10 border-destructive'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        name={isCorrect ? 'CheckCircle2' : 'XCircle'}
                        size={20}
                        className={isCorrect ? 'text-accent' : 'text-destructive'}
                      />
                      <span className="font-medium">
                        {word.text.replace('_', word.correct)}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">{word.hint}</div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" size="lg" onClick={() => setMode('menu')}>
                <Icon name="Home" size={20} className="mr-2" />
                В меню
              </Button>
              <Button size="lg" onClick={startTest}>
                <Icon name="RotateCcw" size={20} className="mr-2" />
                Пройти снова
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const currentWord = words[currentQuestion];
  const isCorrect = selectedAnswer === currentWord.correct;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="w-full max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => setMode('menu')}>
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Выход
          </Button>
          <div className="text-sm font-medium text-muted-foreground">
            Вопрос {currentQuestion + 1} из {words.length}
          </div>
        </div>

        {mode === 'test' && (
          <div className="mb-6">
            <Progress value={((currentQuestion + 1) / words.length) * 100} className="h-2" />
          </div>
        )}

        <Card className="p-8 md:p-12 animate-fade-in">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-muted-foreground mb-4">
              Выберите правильную букву
            </h2>
            <div className="text-6xl md:text-7xl font-bold tracking-wide">
              {currentWord.text.split('_')[0]}
              <span className="text-primary">_</span>
              {currentWord.text.split('_')[1]}
            </div>
            {mode === 'training' && !showFeedback && (
              <p className="text-lg text-muted-foreground mt-6">
                Подсказка: {currentWord.hint}
              </p>
            )}
          </div>

          {!showFeedback ? (
            <div className="grid grid-cols-2 gap-6">
              <Button
                size="lg"
                variant="outline"
                className="h-32 text-5xl font-bold hover:scale-105 transition-transform hover:border-primary hover:text-primary"
                onClick={() => handleAnswer('Е')}
              >
                Е
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-32 text-5xl font-bold hover:scale-105 transition-transform hover:border-primary hover:text-primary"
                onClick={() => handleAnswer('И')}
              >
                И
              </Button>
            </div>
          ) : (
            <div className="animate-scale-in">
              <div
                className={`p-8 rounded-2xl text-center ${
                  isCorrect ? 'bg-accent/20' : 'bg-destructive/20'
                }`}
              >
                <Icon
                  name={isCorrect ? 'CheckCircle2' : 'XCircle'}
                  size={64}
                  className={`mx-auto mb-4 ${
                    isCorrect ? 'text-accent' : 'text-destructive'
                  }`}
                />
                <h3 className="text-3xl font-bold mb-3">
                  {isCorrect ? 'Правильно!' : 'Неправильно'}
                </h3>
                <p className="text-xl mb-2">
                  Правильный ответ:{' '}
                  <span className="font-bold">
                    {currentWord.text.replace('_', currentWord.correct)}
                  </span>
                </p>
                <p className="text-lg text-muted-foreground">{currentWord.hint}</p>
              </div>

              {mode === 'training' && (
                <div className="mt-6">
                  <Button size="lg" className="w-full" onClick={nextTraining}>
                    {currentQuestion < words.length - 1 ? 'Следующее слово' : 'Начать сначала'}
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
