import ContextData from "../interface/ContextData";
import React from "react";

const context:React.Context<ContextData | object> = React.createContext({});

export default context;