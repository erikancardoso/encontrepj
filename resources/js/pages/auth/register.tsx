import { Form, Head } from '@inertiajs/react';
import { BriefcaseBusiness, Building2, SearchCheck } from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';

type Props = {
    passwordRules: string;
};

export default function Register({ passwordRules }: Props) {
    const [accountType, setAccountType] = useState('professional');

    const accountOptions = [
        {
            value: 'professional',
            title: 'Quero prestar serviços',
            description:
                'Encontre projetos compatíveis com a sua especialidade.',
            icon: BriefcaseBusiness,
        },
        {
            value: 'company',
            title: 'Quero contratar',
            description:
                'Publique projetos e encontre profissionais verificados.',
            icon: Building2,
        },
        {
            value: 'recruiter',
            title: 'Trabalho com recrutamento',
            description: 'Apoie empresas na seleção de especialistas.',
            icon: SearchCheck,
        },
    ];

    return (
        <>
            <Head title="Criar conta" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <fieldset className="grid gap-3">
                                <legend className="mb-1 text-sm font-medium">
                                    Como você quer começar?
                                </legend>
                                <div className="grid gap-3">
                                    {accountOptions.map((option) => {
                                        const Icon = option.icon;
                                        const selected =
                                            accountType === option.value;

                                        return (
                                            <label
                                                key={option.value}
                                                className={`focus-within:ring-ring cursor-pointer rounded-xl border p-4 transition-colors focus-within:ring-2 focus-within:ring-offset-2 ${
                                                    selected
                                                        ? 'border-foreground bg-muted'
                                                        : 'border-border hover:bg-muted/50'
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="account_type"
                                                    value={option.value}
                                                    checked={selected}
                                                    onChange={() =>
                                                        setAccountType(
                                                            option.value,
                                                        )
                                                    }
                                                    className="sr-only"
                                                />
                                                <span className="flex items-start gap-3">
                                                    <Icon
                                                        className="mt-0.5 size-5 shrink-0"
                                                        aria-hidden="true"
                                                    />
                                                    <span>
                                                        <span className="block text-sm font-semibold">
                                                            {option.title}
                                                        </span>
                                                        <span className="text-muted-foreground mt-1 block text-xs leading-5">
                                                            {option.description}
                                                        </span>
                                                    </span>
                                                </span>
                                            </label>
                                        );
                                    })}
                                </div>
                                <InputError message={errors.account_type} />
                            </fieldset>

                            <div className="grid gap-2">
                                <Label htmlFor="name">Nome completo</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Seu nome completo"
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            {accountType === 'company' && (
                                <div className="grid gap-2">
                                    <Label htmlFor="company_name">
                                        Nome da empresa
                                    </Label>
                                    <Input
                                        id="company_name"
                                        type="text"
                                        required
                                        autoComplete="organization"
                                        name="company_name"
                                        placeholder="Nome fantasia ou razão social"
                                    />
                                    <InputError message={errors.company_name} />
                                    <p className="text-muted-foreground text-xs leading-5">
                                        O CNPJ e os poderes de representação
                                        serão verificados na próxima etapa.
                                    </p>
                                </div>
                            )}

                            <div className="grid gap-2">
                                <Label htmlFor="email">E-mail</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    name="email"
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Senha</Label>
                                <PasswordInput
                                    id="password"
                                    required
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Crie uma senha segura"
                                    passwordrules={passwordRules}
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">
                                    Confirme a senha
                                </Label>
                                <PasswordInput
                                    id="password_confirmation"
                                    required
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Repita a senha"
                                    passwordrules={passwordRules}
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full"
                                data-test="register-user-button"
                            >
                                {processing && <Spinner />}
                                Criar minha conta
                            </Button>
                        </div>

                        <div className="text-muted-foreground text-center text-sm">
                            Já possui uma conta?{' '}
                            <TextLink href={login()}>Entrar</TextLink>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

Register.layout = {
    title: 'Crie sua conta na EncontrePJ',
    description:
        'Escolha seu perfil inicial. Você poderá adicionar outras formas de atuação depois.',
};
