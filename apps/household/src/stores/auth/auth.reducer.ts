import { createAppSlice } from "../utils";
import { UserProfile } from "./auth.types";

type AuthState = {
    hasBooted: boolean;
    screen: string;
    userProfile: UserProfile | null;
    initialPin: string,
}

type SliceState = {
    selectScreen: (state: AuthState) => AuthState['screen'];
    selectUserProfile: (state: AuthState) => AuthState['userProfile'];
    selectInitialPin: (state: AuthState) => AuthState['initialPin'];
}

const initialState: AuthState = {
    hasBooted: false,
    screen: '/',
    userProfile: null,
    initialPin: '',
};

const slice = createAppSlice({
    name: 'authReducer',
    initialState,
    reducers: {
        appStartup: (state) => {
            state.hasBooted = true;
        },
        setScreen: (state, action) => {
            state.screen = action.payload;
        },
        setUserProfile: (state, action) => {
            state.userProfile = action.payload;
        },
        setInitialPin: (state, action) => {
            state.initialPin = action.payload;
        }
    },
    selectors: {
        selectScreen: ({screen}) => screen,
        selectUserProfile: ({ userProfile }) => userProfile,
        selectInitialPin: ({ initialPin }) => initialPin,
    } as SliceState
})

export const { appStartup, setScreen, setUserProfile, setInitialPin } = slice.actions;
export const { selectScreen, selectUserProfile, selectInitialPin } = slice.selectors;
export default slice.reducer;