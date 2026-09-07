import { Head } from '@inertiajs/react';
import { useState } from 'react';
import {
    BadgeCheck,
    Building2,
    Check,
    CheckCircle2,
    ChevronRight,
    Clock3,
    Download,
    FileCheck2,
    FileText,
    History,
    Landmark,
    LockKeyhole,
    Pencil,
    Plus,
    ReceiptText,
    Save,
    ShieldCheck,
    Trash2,
    Upload,
    UserCog,
    Users,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { dashboard } from '@/routes';

const navigation = [
    { id: 'dados', label: 'Dados e marca', icon: Building2 },
    {
        id: 'fiscal',
        label: 'Fiscal e bancário',
        icon: ReceiptText,
        alert: true,
    },
    {
        id: 'representantes',
        label: 'Representantes e acessos',
        icon: Users,
        count: 4,
    },
    { id: 'documentos', label: 'Documentos e compliance', icon: FileCheck2 },
    { id: 'seguranca', label: 'Segurança e 2FA', icon: LockKeyhole },
    { id: 'auditoria', label: 'Histórico de auditoria', icon: History },
];

const representatives = [
    [
        'RS',
        'Rodrigo Silveira',
        'Diretor de Operações',
        'Administrador geral',
        'Signatário ICP-Brasil e CNPJ',
    ],
    [
        'BM',
        'Beatriz Melena',
        'Head de Engenharia',
        'Gestora técnica',
        'Aprovar marcos técnicos',
    ],
    [
        'CP',
        'Carlos Eduardo Paiva',
        'CFO e Controller',
        'Financeiro e fiscal',
        'Liberar pagamentos PJ',
    ],
    [
        'ML',
        'Mariana Lopes',
        'Tech Recruiter Sênior',
        'Recrutamento PJ',
        'Publicar vagas e triar',
    ],
];

const documents = [
    ['Cartão CNPJ atualizado', 'PDF · 1,2 MB', 'Válido'],
    ['Contrato social consolidado', 'PDF com selo digital', 'Auditado'],
    ['Certidão Negativa Federal', 'Autenticação RFB', 'Em dia'],
    ['Comprovante da sede PJ', 'Conta concessionária pública', 'Validado'],
];

const auditItems = [
    [
        'Rodrigo Silveira aprovou a NFe #1042 de Matheus Alencar',
        'Hoje às 14:22',
        'IP: 187.54.12.98',
    ],
    [
        'Beatriz Melena validou a entrega do Marco Técnico Sprint 4',
        'Ontem às 16:30',
        'IP: 177.34.88.102',
    ],
    [
        'Rodrigo Silveira atualizou as permissões de Mariana Lopes',
        '22/10/2026 às 14:15',
        'IP: 187.54.12.98',
    ],
    [
        'Carlos Eduardo Paiva adicionou nova conta bancária PJ',
        '20/10/2026 às 09:10',
        'IP: 201.82.45.19',
    ],
    [
        'Login corporativo validado via 2FA',
        '19/10/2026 às 08:00',
        'IP: 185.54.12.93',
    ],
];

type SectionHeaderProps = {
    icon: typeof Building2;
    title: string;
    description: string;
    status?: string;
};

function SectionHeader({
    icon: Icon,
    title,
    description,
    status,
}: SectionHeaderProps) {
    return (
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
            <div className="flex gap-3">
                <Icon className="mt-0.5 size-5 shrink-0 text-teal-700 dark:text-teal-400" />
                <div>
                    <h2 className="text-base font-semibold tracking-tight">
                        {title}
                    </h2>
                    <p className="mt-0.5 text-xs leading-5 text-slate-500 dark:text-slate-400">
                        {description}
                    </p>
                </div>
            </div>
            {status && (
                <Badge className="self-start border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
                    <Check className="size-3" />
                    {status}
                </Badge>
            )}
        </div>
    );
}

function Field({
    label,
    value,
    readOnly = false,
    className = '',
}: {
    label: string;
    value: string;
    readOnly?: boolean;
    className?: string;
}) {
    return (
        <label className={`block ${className}`}>
            <span className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                {label}
            </span>
            <input
                defaultValue={value}
                readOnly={readOnly}
                className="h-10 w-full rounded-md border border-slate-200 bg-slate-50 px-3 text-sm transition outline-none read-only:cursor-not-allowed read-only:bg-slate-100 read-only:text-slate-500 focus:border-teal-700 focus:bg-white focus:ring-2 focus:ring-teal-700/15 dark:border-slate-700 dark:bg-slate-950 dark:read-only:bg-slate-800"
            />
        </label>
    );
}

const sectionClass =
    'scroll-mt-20 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900';

export default function CompanySettings() {
    const [saved, setSaved] = useState(false);
    const [twoFactor, setTwoFactor] = useState(true);
    const [signature, setSignature] = useState(true);

    return (
        <>
            <Head title="Empresa" />
            <main className="min-h-full bg-slate-50/80 px-4 py-6 text-slate-950 lg:px-6 dark:bg-slate-950 dark:text-slate-50">
                <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-5">
                    <header className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <div className="relative flex size-16 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-xl font-bold text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                                    NX
                                    <button
                                        type="button"
                                        aria-label="Alterar logotipo"
                                        className="absolute -right-1 -bottom-1 flex size-6 items-center justify-center rounded-full bg-teal-700 text-white shadow-sm"
                                    >
                                        <Pencil className="size-3" />
                                    </button>
                                </div>
                                <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h1 className="text-2xl font-semibold tracking-[-0.025em]">
                                            Nexus Soluções Digitais Ltda.
                                        </h1>
                                        <Badge className="border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-50">
                                            CNPJ ativo e auditado
                                        </Badge>
                                        <Badge
                                            variant="secondary"
                                            className="tabular-nums"
                                        >
                                            38.192.401/0001-85
                                        </Badge>
                                    </div>
                                    <p className="mt-1 flex max-w-2xl items-start gap-1.5 text-xs leading-5 text-slate-500">
                                        <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-emerald-700" />
                                        Sincronizado com a base cadastral da
                                        Receita Federal do Brasil.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setSaved(false)}
                                >
                                    Descartar
                                </Button>
                                <Button
                                    type="button"
                                    className="bg-teal-700 text-white hover:bg-teal-800"
                                    onClick={() => setSaved(true)}
                                >
                                    <Save className="size-4" />
                                    Salvar alterações
                                </Button>
                            </div>
                        </div>
                        {saved && (
                            <p
                                role="status"
                                className="mt-4 border-t border-slate-100 pt-3 text-xs font-medium text-emerald-700 dark:border-slate-800 dark:text-emerald-400"
                            >
                                Alterações salvas neste ambiente de
                                demonstração.
                            </p>
                        )}
                    </header>

                    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                            <div className="flex gap-3">
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                                    <ShieldCheck className="size-5" />
                                </span>
                                <div>
                                    <h2 className="text-sm font-semibold">
                                        Conformidade cadastral B2B:{' '}
                                        <span className="text-emerald-700 dark:text-emerald-400">
                                            Nível Ouro (85%)
                                        </span>
                                    </h2>
                                    <p className="mt-1 text-xs text-slate-500">
                                        Pendente: comprovante bancário da conta
                                        de liquidação PIX PJ.
                                    </p>
                                </div>
                            </div>
                            <div className="flex min-w-64 items-center gap-3">
                                <div className="flex-1">
                                    <div className="mb-1 flex justify-between text-[10px] font-semibold uppercase">
                                        <span>Score institucional</span>
                                        <span>85 / 100</span>
                                    </div>
                                    <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                        <div className="h-full w-[85%] bg-teal-700" />
                                    </div>
                                </div>
                                <a
                                    href="#fiscal"
                                    className="rounded-md bg-slate-100 px-3 py-2 text-xs font-medium text-teal-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-teal-300"
                                >
                                    Resolver
                                </a>
                            </div>
                        </div>
                    </section>

                    <div className="grid items-start gap-5 lg:grid-cols-[230px_minmax(0,1fr)]">
                        <nav
                            aria-label="Seções da empresa"
                            className="sticky top-20 hidden rounded-xl border border-slate-200 bg-white p-3 shadow-sm lg:block dark:border-slate-800 dark:bg-slate-900"
                        >
                            <p className="px-2 pb-2 text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
                                Navegação cadastral
                            </p>
                            {navigation.map(
                                (
                                    { id, label, icon: Icon, alert, count },
                                    index,
                                ) => (
                                    <a
                                        key={id}
                                        href={`#${id}`}
                                        className={`flex items-center gap-2 rounded-md px-2 py-2 text-xs font-medium transition hover:bg-slate-100 dark:hover:bg-slate-800 ${index === 0 ? 'bg-teal-50 text-teal-900 dark:bg-teal-950 dark:text-teal-200' : 'text-foreground/70'}`}
                                    >
                                        <Icon className="size-4" />
                                        <span className="flex-1">{label}</span>
                                        {alert && (
                                            <span className="size-1.5 rounded-full bg-red-600" />
                                        )}
                                        {count && (
                                            <Badge variant="secondary">
                                                {count}
                                            </Badge>
                                        )}
                                        <ChevronRight className="size-3" />
                                    </a>
                                ),
                            )}
                            <div className="mt-4 rounded-lg bg-slate-50 p-3 dark:bg-slate-950">
                                <p className="flex items-center gap-1 text-[10px] font-semibold tracking-wide text-emerald-700 uppercase">
                                    <BadgeCheck className="size-3.5" />
                                    Certificação ICP-Brasil
                                </p>
                                <p className="mt-2 text-[11px] leading-4 text-slate-500">
                                    Dados protegidos e tratados conforme a LGPD.
                                </p>
                            </div>
                        </nav>

                        <div className="flex min-w-0 flex-col gap-5">
                            <section id="dados" className={sectionClass}>
                                <SectionHeader
                                    icon={Building2}
                                    title="Dados cadastrais e marca"
                                    description="Informações oficiais registradas na Junta Comercial e Receita Federal."
                                    status="Verificado"
                                />
                                <div className="mt-5 flex flex-col items-center gap-4 rounded-lg bg-slate-50 p-4 sm:flex-row dark:bg-slate-950">
                                    <div className="flex size-20 shrink-0 items-center justify-center rounded-lg bg-white text-2xl font-bold text-teal-800 shadow-sm dark:bg-slate-900 dark:text-teal-300">
                                        NX
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-semibold">
                                            Identidade visual da empresa
                                        </h3>
                                        <p className="mt-1 text-xs leading-5 text-slate-500">
                                            Exibida nos contratos, ordens de
                                            faturamento e publicações.
                                        </p>
                                        <p className="mt-1 text-[10px] text-slate-400">
                                            SVG, PNG ou WEBP · mínimo 400 × 400
                                            px
                                        </p>
                                    </div>
                                    <div className="flex gap-1">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                        >
                                            Substituir
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            aria-label="Remover logotipo"
                                            className="text-red-700"
                                        >
                                            <Trash2 className="size-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="mt-5 grid gap-4 md:grid-cols-2">
                                    <Field
                                        label="Razão social"
                                        value="Nexus Soluções Digitais Ltda."
                                    />
                                    <Field
                                        label="Nome fantasia"
                                        value="Nexus Tech"
                                    />
                                    <Field
                                        label="CNPJ — bloqueado para edição"
                                        value="38.192.401/0001-85"
                                        readOnly
                                    />
                                    <div className="grid grid-cols-2 gap-3">
                                        <Field
                                            label="Inscrição estadual"
                                            value="148.920.312.110"
                                        />
                                        <Field
                                            label="Inscrição municipal"
                                            value="4.892.103-9"
                                        />
                                    </div>
                                    <Field
                                        label="CNAE principal"
                                        value="62.01-5-01 — Desenvolvimento de sistemas"
                                        className="md:col-span-2"
                                    />
                                    <Field
                                        label="Endereço da sede"
                                        value="Av. das Nações Unidas, 12901 — São Paulo/SP"
                                    />
                                    <Field
                                        label="E-mail institucional"
                                        value="contato@nexustech.com.br"
                                    />
                                </div>
                            </section>

                            <section id="fiscal" className={sectionClass}>
                                <SectionHeader
                                    icon={Landmark}
                                    title="Informações fiscais e faturamento PJ"
                                    description="Configurações para recepção de notas e repasse aos prestadores."
                                />
                                <div className="mt-5 grid gap-4 md:grid-cols-2">
                                    <Field
                                        label="Regime de tributação"
                                        value="Lucro Presumido"
                                    />
                                    <Field
                                        label="Caixa postal automática para NFe"
                                        value="financeiro@nexustech.com.br"
                                    />
                                </div>
                                <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950">
                                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                                        <div className="flex gap-3">
                                            <Landmark className="size-5 shrink-0 text-amber-800 dark:text-amber-300" />
                                            <div>
                                                <h3 className="text-sm font-semibold text-amber-950 dark:text-amber-100">
                                                    Banco Itaú — conta final
                                                    8793
                                                </h3>
                                                <p className="mt-1 text-xs text-amber-800 dark:text-amber-300">
                                                    Validação pendente do
                                                    domicílio bancário para
                                                    liquidação PIX.
                                                </p>
                                            </div>
                                        </div>
                                        <Button
                                            type="button"
                                            size="sm"
                                            className="bg-teal-700 text-white hover:bg-teal-800"
                                        >
                                            <Upload className="size-4" />
                                            Enviar comprovante
                                        </Button>
                                    </div>
                                </div>
                            </section>

                            <section
                                id="representantes"
                                className="scroll-mt-20 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
                            >
                                <div className="p-5">
                                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                                        <SectionHeader
                                            icon={UserCog}
                                            title="Representantes e gestão de acessos"
                                            description="Quem assina contratos, publica vagas e libera repasses."
                                        />
                                        <Button
                                            type="button"
                                            size="sm"
                                            className="bg-teal-700 text-white hover:bg-teal-800"
                                        >
                                            <Plus className="size-4" />
                                            Convidar representante
                                        </Button>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[760px] text-left text-xs">
                                        <thead className="bg-slate-50 text-[10px] tracking-wider text-slate-500 uppercase dark:bg-slate-950">
                                            <tr>
                                                <th className="px-5 py-3">
                                                    Membro e cargo
                                                </th>
                                                <th className="px-5 py-3">
                                                    Perfil
                                                </th>
                                                <th className="px-5 py-3">
                                                    Poder de assinatura
                                                </th>
                                                <th className="px-5 py-3">
                                                    Status
                                                </th>
                                                <th className="px-5 py-3 text-right">
                                                    Ações
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                            {representatives.map(
                                                ([
                                                    initials,
                                                    name,
                                                    role,
                                                    access,
                                                    power,
                                                ]) => (
                                                    <tr key={name}>
                                                        <td className="px-5 py-3">
                                                            <div className="flex items-center gap-2">
                                                                <span className="flex size-7 items-center justify-center rounded-full bg-sky-100 text-[10px] font-semibold text-sky-800">
                                                                    {initials}
                                                                </span>
                                                                <div>
                                                                    <p className="font-semibold">
                                                                        {name}
                                                                    </p>
                                                                    <p className="text-[10px] text-slate-500">
                                                                        {role}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-5 py-3">
                                                            <Badge variant="secondary">
                                                                {access}
                                                            </Badge>
                                                        </td>
                                                        <td className="px-5 py-3 text-slate-600 dark:text-slate-300">
                                                            {power}
                                                        </td>
                                                        <td className="px-5 py-3">
                                                            <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700">
                                                                <span className="size-1.5 rounded-full bg-emerald-600" />
                                                                Ativo
                                                            </span>
                                                        </td>
                                                        <td className="px-5 py-3 text-right">
                                                            <button
                                                                type="button"
                                                                className="font-medium text-teal-800 hover:underline dark:text-teal-300"
                                                            >
                                                                Gerenciar
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ),
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="grid gap-2 border-t border-slate-100 bg-slate-50 p-4 sm:grid-cols-2 xl:grid-cols-4 dark:border-slate-800 dark:bg-slate-950">
                                    {[
                                        ['Publicar demandas', '4 usuários'],
                                        ['Aprovar entregas', '2 gestores'],
                                        [
                                            'Assinar contratos',
                                            '1 signatário legal',
                                        ],
                                        [
                                            'Liberar pagamentos',
                                            '2 usuários com 2FA',
                                        ],
                                    ].map(([power, members]) => (
                                        <div
                                            key={power}
                                            className="rounded-md bg-white p-3 dark:bg-slate-900"
                                        >
                                            <p className="text-[10px] text-slate-500">
                                                {power}
                                            </p>
                                            <p className="mt-1 text-xs font-semibold">
                                                {members}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section id="documentos" className={sectionClass}>
                                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                                    <SectionHeader
                                        icon={FileCheck2}
                                        title="Documentos e compliance B2B"
                                        description="Documentos societários válidos para auditoria."
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                    >
                                        <Plus className="size-4" />
                                        Novo documento
                                    </Button>
                                </div>
                                <div className="mt-5 grid gap-3 md:grid-cols-2">
                                    {documents.map(([title, meta, status]) => (
                                        <article
                                            key={title}
                                            className="rounded-lg border border-slate-200 p-4 dark:border-slate-800"
                                        >
                                            <div className="flex items-start gap-3">
                                                <FileText className="size-5 shrink-0 text-teal-700" />
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex flex-wrap justify-between gap-2">
                                                        <h3 className="text-sm font-semibold">
                                                            {title}
                                                        </h3>
                                                        <Badge className="border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-50">
                                                            {status}
                                                        </Badge>
                                                    </div>
                                                    <p className="mt-1 text-[10px] text-slate-500">
                                                        {meta}
                                                    </p>
                                                    <div className="mt-3 flex gap-2">
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                        >
                                                            Visualizar
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                        >
                                                            Substituir
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </section>

                            <section id="seguranca" className={sectionClass}>
                                <SectionHeader
                                    icon={ShieldCheck}
                                    title="Segurança e políticas de notificação"
                                    description="Proteção da conta, assinaturas e avisos operacionais."
                                />
                                <div className="mt-5 divide-y divide-slate-100 rounded-lg border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
                                    {[
                                        [
                                            twoFactor,
                                            setTwoFactor,
                                            'Autenticação em dois fatores (2FA)',
                                            'Obrigatória para administradores e aprovadores financeiros.',
                                        ],
                                        [
                                            signature,
                                            setSignature,
                                            'Assinatura digital ICP-Brasil / Gov.br Ouro',
                                            'Exigida para formalização de novos contratos.',
                                        ],
                                    ].map(
                                        ([
                                            enabled,
                                            setter,
                                            title,
                                            description,
                                        ]) => (
                                            <div
                                                key={String(title)}
                                                className="flex items-center justify-between gap-4 p-4"
                                            >
                                                <div className="flex gap-3">
                                                    <LockKeyhole className="size-5 shrink-0 text-teal-700" />
                                                    <div>
                                                        <h3 className="text-sm font-semibold">
                                                            {String(title)}
                                                        </h3>
                                                        <p className="mt-1 text-xs text-slate-500">
                                                            {String(
                                                                description,
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    role="switch"
                                                    aria-checked={Boolean(
                                                        enabled,
                                                    )}
                                                    onClick={() =>
                                                        (
                                                            setter as (
                                                                value: boolean,
                                                            ) => void
                                                        )(!enabled)
                                                    }
                                                    className={`relative h-6 w-11 shrink-0 rounded-full transition ${enabled ? 'bg-teal-700' : 'bg-slate-300'}`}
                                                >
                                                    <span
                                                        className={`absolute top-1 size-4 rounded-full bg-white transition ${enabled ? 'left-6' : 'left-1'}`}
                                                    />
                                                </button>
                                            </div>
                                        ),
                                    )}
                                </div>
                                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                                    {[
                                        'Novas NFes emitidas',
                                        'Prazos de entregas PJ',
                                        'Novas propostas B2B',
                                    ].map((item) => (
                                        <label
                                            key={item}
                                            className="flex items-center justify-between rounded-md bg-slate-50 p-3 text-xs dark:bg-slate-950"
                                        >
                                            {item}
                                            <input
                                                type="checkbox"
                                                defaultChecked
                                                className="accent-teal-700"
                                            />
                                        </label>
                                    ))}
                                </div>
                            </section>

                            <section id="auditoria" className={sectionClass}>
                                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                                    <SectionHeader
                                        icon={History}
                                        title="Histórico imutável de auditoria"
                                        description="Registro de IP e carimbo de tempo das ações administrativas."
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                    >
                                        <Download className="size-4" />
                                        Exportar CSV
                                    </Button>
                                </div>
                                <div className="mt-5 divide-y divide-slate-100 dark:divide-slate-800">
                                    {auditItems.map(([action, date, ip]) => (
                                        <div
                                            key={action}
                                            className="flex flex-col justify-between gap-2 py-3 sm:flex-row sm:items-start"
                                        >
                                            <div className="flex gap-3">
                                                <Clock3 className="mt-0.5 size-4 shrink-0 text-teal-700" />
                                                <p className="text-xs font-medium">
                                                    {action}
                                                </p>
                                            </div>
                                            <div className="shrink-0 text-left text-[10px] text-slate-500 sm:text-right">
                                                <p>{date}</p>
                                                <p>{ip}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

CompanySettings.layout = {
    breadcrumbs: [
        { title: 'Visão geral', href: dashboard() },
        { title: 'Empresa', href: '/empresa' },
    ],
};
