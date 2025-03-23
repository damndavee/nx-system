import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';
import { Ionicons } from "@expo/vector-icons"
import { ChangeEvent } from "react";
import { FormikErrors } from "formik";

const formControlVariants = tv({
    base: "",
    slots: {
        error: 'text-red-400',
        root: "flex flex-col space-y-2",
        label: "text-gray-600 text-sm",
        input: "flex-1 border px-4 py-2 rounded-md",
        icon: "text-gray-400 text-lg",
    },
    variants: {
        size: {
            sm: { input: "text-sm px-3 py-1", label: 'text-sm', error: 'text-sm', icon: 'text-2xl' },
            md: {
                input: "text-md px-4 py-2",
                label: 'text-md',
                error: 'text-md',
                icon: 'text-3xl',
            },
            lg: {
                input: "text-lg px-5 py-3",
                label: 'text-lg',
                error: 'text-lg',
                icon: 'text-4xl',
            }
        },
        variant: {
            filled: {
                input: 'rounded-md bg-[#B5AA94] border-[0]',
                error: '',
                icon: '',
                label: '',
            },
            outline: {
                input: 'rounded-md border border-[#6F4329]',
                error: '',
                icon: '',
                label: '',
            },
            underline: {
                input: 'rounded-0 border-[0] bg-[transparent] border-b border-[#6F4329]',
                error: '',
                icon: '',
                label: '',
            }
        }
    },
    defaultVariants: {
        size: "md",
        variant: "outline",
    },
})

type FormControlProps<T> = VariantProps<typeof formControlVariants> & {
    icon: keyof typeof Ionicons.glyphMap;
    type: 'text' | 'password';
    value: string;
    label: string;
    id: keyof T;
    placeholder: string;
    helperText?: string;
    error?: string | FormikErrors<any> | string[] | FormikErrors<any>[] | undefined;
    onChange: (e: string | ChangeEvent<any>) => void;
    onBlur?: (e: any) => void;
};

export { FormControlProps, formControlVariants }