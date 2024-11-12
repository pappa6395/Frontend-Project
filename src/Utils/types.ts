
export interface TransactionProps {
    id: number;
    type: 'income' | 'expense' | 'saving' | 'emergency';
    description: string;
    amount: number;
    goal?: number;
    currentSavings?: number;
    date: string;
}

export interface FormDataProps {
    name:string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginProps {
    showLoginForm: boolean;
    handleToggleLogin: () => void;
    setShowLoginForm: (value: boolean) => void;
    errors: {
        name:string;
        email: string;
        password: string;
        confirmPassword: string;
    }
    setErrors: (
        errors: {
            name:string;
            email: string;
            password: string;
            confirmPassword: string;
        }
    ) => void
}

export interface LoginFormProps {
    setShowLoginForm: (show: boolean) => void;
    handleToggle: () => void;
    handleSubmit: (data: {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
    }) => void;
    isSignup: boolean;
    errors: {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
    }
}