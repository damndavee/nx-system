import { Ionicons } from "@expo/vector-icons";

export type Handlers = 'biometrics' | 'backspace' | 'insert';
export type Icon = keyof typeof Ionicons.glyphMap;

export interface PinButtonProps {
    label: string;
    onPress: () => void;
    event: Handlers;
    value?: string;
    className?: string;
}