import SignIn from "../pages/auth/SignIn";
import Home from "../pages/home/Home";
import ListTable from "../pages/home/ListTable";

export type HomeStackParamList = {
    Index: typeof Home;
    ListTable: typeof ListTable
    Dishes: undefined
    Confirmation: undefined
};

export type AuthStackParamList = {
    SignIn: typeof SignIn;
};