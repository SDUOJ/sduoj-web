export const getModalTurnFunction: (arg0: Boolean) => () => void =
  (is) => () => { is = !is; }
