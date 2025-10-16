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
  { text: 'пр_дать (друга)', correct: 'Е', hint: 'предать' },
  { text: 'пр_дать (значение, смысл)', correct: 'И', hint: 'придать' },
  { text: 'пр_творить (мечту в жизнь)', correct: 'Е', hint: 'претворить' },
  { text: 'пр_творить (дверь)', correct: 'И', hint: 'притворить' },
  { text: 'пр_клоняться (перед кем-либо)', correct: 'Е', hint: 'преклоняться' },
  { text: 'пр_клонить (ветки к земле)', correct: 'И', hint: 'приклонить' },
  { text: 'пр_ступать (закон)', correct: 'Е', hint: 'преступать' },
  { text: 'пр_ступать (к делу)', correct: 'И', hint: 'приступать' },
  { text: 'пр_бывать (находиться где-либо)', correct: 'Е', hint: 'пребывать' },
  { text: 'пр_бывать (куда-либо)', correct: 'И', hint: 'прибывать' },
  { text: 'пр_емник (последователь)', correct: 'Е', hint: 'преемник' },
  { text: 'пр_ёмник (аппарат)', correct: 'И', hint: 'приёмник' },
  { text: 'пр_ходящий (временный)', correct: 'Е', hint: 'преходящий' },
  { text: 'пр_ходящий (кто приходит)', correct: 'И', hint: 'приходящий' },
  { text: 'пр_зирать (не уважать)', correct: 'Е', hint: 'презирать' },
  { text: 'пр_зирать (давать приют)', correct: 'И', hint: 'призирать' },
  { text: 'пр_дел (конец)', correct: 'Е', hint: 'предел' },
  { text: 'пр_дел (пристройка)', correct: 'И', hint: 'придел' },
  { text: 'пр_терпеть (пережить)', correct: 'Е', hint: 'претерпеть' },
  { text: 'пр_терпеться (привыкнуть)', correct: 'И', hint: 'притерпеться' },
  { text: 'пр_вратный (изменчивый)', correct: 'Е', hint: 'превратный' },
  { text: 'пр_грешение', correct: 'Е', hint: 'прегрешение' },
  { text: 'пр_зидент', correct: 'Е', hint: 'президент' },
  { text: 'пр_зидиум', correct: 'Е', hint: 'президиум' },
  { text: 'пр_имущество', correct: 'Е', hint: 'преимущество' },
  { text: 'пр_льщать', correct: 'Е', hint: 'прельщать' },
  { text: 'пр_мьера', correct: 'Е', hint: 'премьера' },
  { text: 'пр_небрежение (неуважение)', correct: 'Е', hint: 'пренебрежение' },
  { text: 'пр_облодать', correct: 'Е', hint: 'преоблодать' },
  { text: 'пр_парат', correct: 'Е', hint: 'препарат' },
  { text: 'пр_пинания', correct: 'Е', hint: 'препинания' },
  { text: 'пр_поднести', correct: 'Е', hint: 'преподнести' },
  { text: 'пр_пятствие', correct: 'Е', hint: 'препятствие' },
  { text: 'пр_слодовать', correct: 'Е', hint: 'преслодовать' },
  { text: 'пр_смыкающийся', correct: 'Е', hint: 'пресмыкающийся' },
  { text: 'пр_тензия', correct: 'Е', hint: 'претензия' },
  { text: 'пр_зидент', correct: 'Е', hint: 'президент' },
  { text: 'пр_тендент', correct: 'Е', hint: 'претендент' },
  { text: 'пр_тковения', correct: 'Е', hint: 'преткновения' },
  { text: 'пр_бор', correct: 'И', hint: 'прибор' },
  { text: 'пр_вередливый', correct: 'И', hint: 'привередливый' },
  { text: 'пр_верженец', correct: 'И', hint: 'приверженец' },
  { text: 'пр_вилегия', correct: 'И', hint: 'привилегия' },
  { text: 'пр_вычка', correct: 'И', hint: 'привычка' },
  { text: 'пр_тягом', correct: 'И', hint: 'притягом' },
  { text: 'пр_дирчивый', correct: 'И', hint: 'придирчивый' },
  { text: 'пр_личный', correct: 'И', hint: 'приличный' },
  { text: 'пр_каз', correct: 'И', hint: 'приказ' },
  { text: 'пр_ключение', correct: 'И', hint: 'приключение' },
  { text: 'пр_лежный', correct: 'И', hint: 'прилежный' },
  { text: 'пр_митивный', correct: 'И', hint: 'примитивный' },
  { text: 'пр_оритет', correct: 'И', hint: 'приоритет' },
  { text: 'пр_рода', correct: 'И', hint: 'природа' },
  { text: 'пр_страстный', correct: 'И', hint: 'пристрастный' },
  { text: 'пр_сутствие', correct: 'И', hint: 'присутствие' },
  { text: 'пр_сяга', correct: 'И', hint: 'присяга' },
  { text: 'пр_чёска', correct: 'И', hint: 'причёска' },
  { text: 'пр_чина', correct: 'И', hint: 'причина' },
  { text: 'пр_чудливый', correct: 'И', hint: 'причудливый' },
  { text: 'пр_ятный', correct: 'И', hint: 'приятный' },
];

type Mode = 'menu' | 'test' | 'results' | 'training';

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Index() {
  const [mode, setMode] = useState<Mode>('menu');
  const [shuffledWords, setShuffledWords] = useState<Word[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<('Е' | 'И' | null)[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<'Е' | 'И' | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const startTest = () => {
    const shuffled = shuffleArray(words);
    setShuffledWords(shuffled);
    setMode('test');
    setCurrentQuestion(0);
    setAnswers(new Array(shuffled.length).fill(null));
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const startTraining = () => {
    const shuffled = shuffleArray(words);
    setShuffledWords(shuffled);
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
        if (currentQuestion < shuffledWords.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setShowFeedback(false);
        } else {
          setMode('results');
        }
      }, 800);
    }
  };

  const nextTraining = () => {
    if (currentQuestion < shuffledWords.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      const shuffled = shuffleArray(words);
      setShuffledWords(shuffled);
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const activeWords = mode === 'menu' ? words : shuffledWords;
  const correctAnswers = answers.filter((ans, idx) => ans === activeWords[idx]?.correct).length;
  const percentage = Math.round((correctAnswers / activeWords.length) * 100);

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
                    Пройдите тест из {words.length} вопросов в случайном порядке
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
                Правильных ответов: {correctAnswers} из {activeWords.length}
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {activeWords.map((word, idx) => {
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

  const currentWord = activeWords[currentQuestion];
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
            Вопрос {currentQuestion + 1} из {activeWords.length}
          </div>
        </div>

        {mode === 'test' && (
          <div className="mb-6">
            <Progress value={((currentQuestion + 1) / activeWords.length) * 100} className="h-2" />
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