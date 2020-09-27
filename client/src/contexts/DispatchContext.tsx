import { createContext } from "react";

import { AppActions } from "../reducers";

const DispatchContext = createContext<React.Dispatch<AppActions>>(() => {});

export default DispatchContext;
