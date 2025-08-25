import type { ReactNode } from 'react';

export type ISelectOption = { value: string; label: string }[];
export type ISelect = {
    icon?: ReactNode;
    defaultValue: string;
    options: ISelectOption;
};
