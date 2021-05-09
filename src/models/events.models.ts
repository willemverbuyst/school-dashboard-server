export type RadioEvent = (
  event: React.ChangeEvent<HTMLInputElement>,
  questionNumber: number,
  questionId: number
) => void;

export type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

export type PickEvent = {
  onChange: (event: React.MouseEvent<HTMLButtonElement>) => string;
};
