export const getModalTurnFunction: (arg0: Boolean) => () => void =
  (is) => () => { is = !is; console.log(is); console.log(11111); }
