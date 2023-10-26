enum CountActionKind {
  INCREASE = "INCREASE",
  DECREASE = "DECREASE",
}

interface CountAction {
  type: CountActionKind;
  payload: number;
}

interface CountState {
  count: number;
}

export { CountActionKind };
export type { CountAction, CountState };
