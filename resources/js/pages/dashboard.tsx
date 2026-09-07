import { Head, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    BadgeCheck,
    Building2,
    FileCheck2,
    UserRoundCheck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CompanyDashboard } from '@/components/company-dashboard';
import { dashboard } from '@/routes';
import type { AccountType } from '@/types';

const accountLabels: Record<AccountType, string> = {
    professional: 'Prestador de serviços',
    company: 'Empresa contratante',
    recruiter: 'Recrutador',
    administrator: 'Administrador',
};

export default function Dashboard() {
    const { auth } = usePage().props;
    const accountType = auth.user.primary_account_type ?? 'professional';

    if (accountType === 'company') {
        return (
            <>
                <Head title="Visão geral" />
                <CompanyDashboard />
            </>
        );
    }
    const stepsByAccount: Record<
        AccountType,
        Array<{
            title: string;
            description: string;
            icon: typeof Building2;
        }>
    > = {
        company: [
            {
                title: 'Complete os dados da empresa',
                description:
                    'Informe o CNPJ e os dados cadastrais para iniciar a verificação.',
                icon: Building2,
            },
            {
                title: 'Comprove sua representação',
                description:
                    'Envie o documento que demonstra seus poderes na organização.',
                icon: UserRoundCheck,
            },
            {
                title: 'Prepare seu primeiro serviço',
                description:
                    'Defina escopo, período, habilidades e disponibilidade necessária.',
                icon: FileCheck2,
            },
        ],
        professional: [
            {
                title: 'Complete seu perfil profissional',
                description:
                    'Inclua sua especialidade, experiência e apresentação.',
                icon: UserRoundCheck,
            },
            {
                title: 'Adicione suas comprovações',
                description:
                    'Organize portfólio, formação e certificados relevantes.',
                icon: BadgeCheck,
            },
            {
                title: 'Defina sua disponibilidade',
                description:
                    'Informe os períodos em que deseja receber oportunidades.',
                icon: FileCheck2,
            },
        ],
        recruiter: [
            {
                title: 'Apresente sua experiência em seleção',
                description:
                    'Informe as áreas e os perfis profissionais que você domina.',
                icon: UserRoundCheck,
            },
            {
                title: 'Comprove suas qualificações',
                description:
                    'Adicione certificados e experiências relevantes em recrutamento.',
                icon: BadgeCheck,
            },
            {
                title: 'Defina sua disponibilidade',
                description:
                    'Indique quando poderá conduzir triagens e entrevistas.',
                icon: FileCheck2,
            },
        ],
        administrator: [
            {
                title: 'Acompanhe as verificações',
                description:
                    'Revise as contas de profissionais, recrutadores e empresas.',
                icon: BadgeCheck,
            },
            {
                title: 'Monitore a operação',
                description:
                    'Acompanhe projetos, contratos e ocorrências da plataforma.',
                icon: Building2,
            },
            {
                title: 'Gerencie regras da plataforma',
                description:
                    'Mantenha cláusulas obrigatórias e políticas operacionais.',
                icon: FileCheck2,
            },
        ],
    };
    const steps = stepsByAccount[accountType];

    return (
        <>
            <Head title="Início" />
            <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-4 py-8 md:px-8 md:py-12">
                <header className="max-w-2xl space-y-4">
                    <Badge variant="secondary">
                        {accountLabels[accountType]}
                    </Badge>
                    <div className="space-y-2">
                        <h1 className="text-3xl font-semibold tracking-tight text-balance">
                            Olá, {auth.user.name.split(' ')[0]}. Vamos preparar
                            sua conta.
                        </h1>
                        <p className="text-muted-foreground max-w-xl leading-7">
                            Complete as etapas essenciais para usar a EncontrePJ
                            com segurança e receber recomendações compatíveis.
                        </p>
                    </div>
                </header>

                <section
                    aria-labelledby="next-steps-title"
                    className="space-y-5"
                >
                    <div className="flex items-end justify-between gap-4">
                        <div>
                            <h2
                                id="next-steps-title"
                                className="text-lg font-semibold"
                            >
                                Próximas etapas
                            </h2>
                            <p className="text-muted-foreground mt-1 text-sm">
                                Sua conta foi criada. Agora vamos validar as
                                informações principais.
                            </p>
                        </div>
                        <span className="text-muted-foreground text-sm tabular-nums">
                            0 de 3 concluídas
                        </span>
                    </div>

                    <div className="divide-y rounded-xl border">
                        {steps.map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <div
                                    key={step.title}
                                    className="flex items-center gap-4 p-5"
                                >
                                    <div className="bg-muted flex size-10 shrink-0 items-center justify-center rounded-xl">
                                        <Icon
                                            className="size-5"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="font-medium">
                                            {step.title}
                                        </h3>
                                        <p className="text-muted-foreground mt-1 text-sm leading-6">
                                            {step.description}
                                        </p>
                                    </div>
                                    <span className="text-muted-foreground hidden text-xs tabular-nums sm:block">
                                        Etapa {index + 1}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    <Button disabled className="gap-2">
                        Continuar configuração
                        <ArrowRight className="size-4" aria-hidden="true" />
                    </Button>
                    <p className="text-muted-foreground text-xs">
                        O formulário de configuração será habilitado na próxima
                        entrega.
                    </p>
                </section>

                <section className="border-t pt-8">
                    <h2 className="font-medium">Privacidade desde o início</h2>
                    <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-6">
                        Seus documentos de verificação, contratos e informações
                        financeiras nunca serão exibidos publicamente. Você
                        controla o que aparece no seu perfil profissional.
                    </p>
                </section>
            </main>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Início',
            href: dashboard(),
        },
    ],
};
