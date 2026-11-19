export type QuizAnswers = Record<string, number>;

export function calculateScores(answers: QuizAnswers) {
  const faithKeys = Object.keys(answers).filter(k => k.startsWith('faith_'));
  const peaceKeys = Object.keys(answers).filter(k => k.startsWith('peace_'));

  const faithScore = faithKeys.reduce((sum, k) => sum + (answers[k] ?? 0), 0);
  const peaceScore = peaceKeys.reduce((sum, k) => sum + (answers[k] ?? 0), 0);

  const total = faithScore + peaceScore;
  const max = (faithKeys.length + peaceKeys.length) * 5;

  const normalized = max > 0 ? Math.round((total / max) * 100) : 0;
  const bucket = normalized >= 80 ? 'High' : normalized >= 50 ? 'Medium' : 'Low';

  return { faithScore, peaceScore, total: normalized, bucket };
}
