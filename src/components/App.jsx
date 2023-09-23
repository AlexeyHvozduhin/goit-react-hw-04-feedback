import { useState } from 'react';
import { Section, Notification } from './Section/Section.styled';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const chengeStatistic = newLevel => {
    // [newLevel]: 3,
    // Временное решение, но так и не смог "распаковать" название без создания отдельного объекта со всеми состояниями. А это гемор
    switch (newLevel) {
      case 'good':
        setGood(prevGood => prevGood + 1);
        break;
      case 'neutral':
        setNeutral(prevNeutral => prevNeutral + 1);
        break;
      case 'bad':
        setBad(prevBad => prevBad + 1);
        break;
      default:
    }
  };

  const resetStatistic = () => {
    // this.setState({ good: 0, neutral: 0, bad: 0 });
    setGood(0);
    setNeutral(0);
    setBad(0);
  };

  const countTotalFeedback = () => {
    // const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    // const { good, neutral, bad } = this.state;
    const positiveFeedback = (100 / (good + neutral + bad)) * good;
    if (isNaN(positiveFeedback)) return '?';
    else return `${Math.round(positiveFeedback)}%`;
  };

  // render() {
  // const { good, neutral, bad } = this.state;
  const totalFeedback = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  return (
    <div style={{ textAlign: 'center' }}>
      <Section title="Feedback">
        <FeedbackOptions
          options={Object.keys({ good, neutral, bad })}
          onLeaveFeedback={chengeStatistic}
          resetStatistic={resetStatistic}
        />
      </Section>
      <Section title="Statistics">
        {totalFeedback > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedback}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="There is no feedback">
            There is no feedback
          </Notification>
        )}
      </Section>
    </div>
  );
  // }
};
