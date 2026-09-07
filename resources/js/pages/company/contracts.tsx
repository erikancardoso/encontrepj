import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import {
    BellRing,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    ClipboardCheck,
    Download,
    Eye,
    FileDiff,
    FileSignature,
    FileText,
    Filter,
    History,
    PenLine,
    Plus,
    Search,
    Send,
    ShieldCheck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { dashboard } from '@/routes';

type Contract = {
    id: string;
    project: string;
    professional: string;
    company: string;
    taxId: string;
    start: string;
    end: string;
    frequency: string;
    value: string;
    signature: string;
    operation: 'Ativo' | 'Aguardando' | 'Em negociação' | 'Rascunho';
    label: string;
};

const contracts: Contract[] = [
    {
        id: '#CT-2024-089',
        project: 'Migração Cloud e Microsserviços AWS',
        professional: 'Lucas Berti',
        company: 'Berti Cloud Tech ME',
        taxId: '41.890.312/0001-90',
        start: '15 jan. 2024',
        end: '15 jan. 2025',
        frequency: 'Mensal',
        value: 'R$ 18.500,00',
        signature: 'ICP-Brasil válida',
        operation: 'Ativo',
        label: 'EncontrePJ Standard',
    },
    {
        id: '#CT-2024-094',
        project: 'Redesign Design System B2B',
        professional: 'Camila Duarte',
        company: 'Duarte Studios EIRELI',
        taxId: '35.120.444/0001-12',
        start: '01 mar. 2024',
        end: '31 out. 2024',
        frequency: 'Mensal',
        value: 'R$ 12.000,00',
        signature: 'Aditivo em análise',
        operation: 'Ativo',
        label: 'Aditivo ativo',
    },
    {
        id: '#CT-2024-102',
        project: 'Integração Gateway PIX',
        professional: 'Matheus Alencar',
        company: 'Alencar Soluções Digitais Ltda.',
        taxId: '48.920.101/0001-33',
        start: '01 mai. 2024',
        end: '30 abr. 2025',
        frequency: 'Mensal',
        value: 'R$ 14.500,00',
        signature: 'Pendente e-CPF',
        operation: 'Aguardando',
        label: 'EncontrePJ Standard',
    },
    {
        id: '#CT-2024-105',
        project: 'Auditoria de Compliance LGPD',
        professional: 'Dra. Valéria Moura',
        company: 'Moura & Associados DPO',
        taxId: '29.400.118/0001-75',
        start: '10 jun. 2024',
        end: '10 ago. 2024',
        frequency: 'Por marco',
        value: 'R$ 9.200,00',
        signature: 'Em ajuste de cláusula',
        operation: 'Em negociação',
        label: 'Cláusula específica',
    },
    {
        id: '#CT-2024-110',
        project: 'Aplicativo Mobile Flutter PJ',
        professional: 'Rafael Aragão',
        company: 'Mobile Craft Ltda.',
        taxId: '33.882.910/0001-04',
        start: '01 jul. 2024',
        end: '31 dez. 2024',
        frequency: 'Mensal',
        value: 'R$ 10.600,00',
        signature: 'Minuta preliminar',
        operation: 'Rascunho',
        label: 'Rascunho',
    },
];

const summary = [
    {
        label: 'Contratos ativos',
        value: '14',
        detail: 'vigentes',
        note: 'R$ 142.800/mês',
        icon: ClipboardCheck,
        tone: 'emerald',
    },
    {
        label: 'Aguardando revisão',
        value: '3',
        detail: 'em compliance',
        note: 'SLA máximo: 4h',
        icon: PenLine,
        tone: 'indigo',
    },
    {
        label: 'Aguardando assinatura',
        value: '4',
        detail: 'pendentes',
        note: 'Aviso de prazo: 48h',
        icon: FileSignature,
        tone: 'red',
    },
    {
        label: 'Encerrando em breve',
        value: '2',
        detail: 'próximos 30 dias',
        note: 'Alerta de renovação',
        icon: BellRing,
        tone: 'sky',
    },
];

const statusStyle: Record<Contract['operation'], string> = {
    Ativo: 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300',
    Aguardando:
        'border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-300',
    'Em negociação':
        'border-indigo-200 bg-indigo-50 text-indigo-800 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-300',
    Rascunho:
        'border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300',
};

const summaryTone: Record<string, string> = {
    emerald:
        'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
    indigo: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300',
    red: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300',
    sky: 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300',
};

export default function CompanyContracts() {
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('Todos');
    const [frequency, setFrequency] = useState('Todas');
    const [feedback, setFeedback] = useState('');

    const filteredContracts = useMemo(
        () =>
            contracts.filter((contract) => {
                const searchable =
                    `${contract.id} ${contract.project} ${contract.professional} ${contract.company} ${contract.taxId}`.toLocaleLowerCase(
                        'pt-BR',
                    );
                return (
                    searchable.includes(search.toLocaleLowerCase('pt-BR')) &&
                    (status === 'Todos' || contract.operation === status) &&
                    (frequency === 'Todas' || contract.frequency === frequency)
                );
            }),
        [search, status, frequency],
    );

    function demoAction(message: string) {
        setFeedback(message);
        window.setTimeout(() => setFeedback(''), 4000);
    }

    return (
        <>
            <Head title="Contratos" />
            <main className="min-h-full bg-slate-50/80 px-4 py-6 text-slate-950 lg:px-6 dark:bg-slate-950 dark:text-slate-50">
                <div className="mx-auto flex w-full max-w-[1380px] flex-col gap-5">
                    <header className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
                                    Gestão de contratos PJ
                                </h1>
                                <Badge variant="secondary">
                                    Governança B2B
                                </Badge>
                            </div>
                            <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                                Formalização jurídica, assinaturas digitais e
                                governança de contratos individuais com trilha
                                de auditoria.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button type="button" variant="outline">
                                <Filter className="size-4" />
                                Filtrar cláusulas
                            </Button>
                            <Button type="button" variant="outline">
                                <Download className="size-4" />
                                Exportar CSV
                            </Button>
                            <Button
                                type="button"
                                className="bg-teal-700 text-white hover:bg-teal-800"
                                onClick={() =>
                                    demoAction(
                                        'Novo contrato iniciado em modo rascunho.',
                                    )
                                }
                            >
                                <Plus className="size-4" />
                                Criar novo contrato
                            </Button>
                        </div>
                    </header>

                    {feedback && (
                        <div
                            role="status"
                            className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200"
                        >
                            {feedback}
                        </div>
                    )}

                    <section
                        aria-label="Resumo dos contratos"
                        className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
                    >
                        {summary.map(
                            ({
                                label,
                                value,
                                detail,
                                note,
                                icon: Icon,
                                tone,
                            }) => (
                                <article
                                    key={label}
                                    className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <div className="flex items-start justify-between">
                                        <p className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
                                            {label}
                                        </p>
                                        <span
                                            className={`flex size-9 items-center justify-center rounded-lg ${summaryTone[tone]}`}
                                        >
                                            <Icon className="size-4" />
                                        </span>
                                    </div>
                                    <div className="mt-3 flex items-baseline gap-1.5">
                                        <strong className="text-3xl font-semibold tracking-tight tabular-nums">
                                            {value}
                                        </strong>
                                        <span className="text-xs text-slate-500">
                                            {detail}
                                        </span>
                                    </div>
                                    <p className="mt-4 text-xs font-medium text-slate-600 dark:text-slate-300">
                                        {note}
                                    </p>
                                </article>
                            ),
                        )}
                    </section>

                    <section
                        aria-labelledby="urgent-title"
                        className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                    >
                        <div className="flex items-center justify-between">
                            <h2
                                id="urgent-title"
                                className="flex items-center gap-2 text-base font-semibold"
                            >
                                <span className="size-2 rounded-full bg-red-600" />
                                Urgências e ações de governança
                            </h2>
                            <span className="text-[10px] font-semibold tracking-wider text-red-700 uppercase">
                                Prioridade jurídica alta
                            </span>
                        </div>
                        <div className="mt-4 grid gap-3 lg:grid-cols-2">
                            <article className="rounded-lg bg-indigo-50 p-4 dark:bg-indigo-950">
                                <div className="flex justify-between gap-3">
                                    <Badge variant="secondary">
                                        Aditivo #AD-094
                                    </Badge>
                                    <span className="text-[10px] text-slate-500">
                                        Enviado ontem às 17:42
                                    </span>
                                </div>
                                <h3 className="mt-2 text-sm font-semibold">
                                    Camila Duarte — Redesign Design System B2B
                                </h3>
                                <p className="mt-1 text-xs leading-5 text-indigo-900 dark:text-indigo-200">
                                    Acréscimo de 15 horas técnicas mensais e
                                    cláusula de acessibilidade WCAG 2.1 AA.
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <Button
                                        size="sm"
                                        className="bg-teal-700 text-white hover:bg-teal-800"
                                        onClick={() =>
                                            demoAction(
                                                'Minuta aberta para revisão.',
                                            )
                                        }
                                    >
                                        Revisar minuta
                                    </Button>
                                    <Button size="sm" variant="outline">
                                        <FileDiff className="size-4" />
                                        Comparar versões
                                    </Button>
                                </div>
                            </article>
                            <article className="rounded-lg bg-red-50 p-4 dark:bg-red-950">
                                <div className="flex justify-between gap-3">
                                    <Badge className="border-red-200 bg-red-100 text-red-800 hover:bg-red-100">
                                        Assinatura expirando
                                    </Badge>
                                    <span className="text-[10px] font-semibold text-red-700 dark:text-red-300">
                                        28 horas restantes
                                    </span>
                                </div>
                                <h3 className="mt-2 text-sm font-semibold">
                                    Matheus Alencar — Backend Python e Gateway
                                    PIX
                                </h3>
                                <p className="mt-1 text-xs leading-5 text-red-900 dark:text-red-200">
                                    Minuta aprovada. Aguardando certificado
                                    e-CNPJ ou conta Gov.br Ouro.
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <Button
                                        size="sm"
                                        className="bg-teal-700 text-white hover:bg-teal-800"
                                        onClick={() =>
                                            demoAction(
                                                'Solicitação de assinatura reenviada ao profissional.',
                                            )
                                        }
                                    >
                                        <Send className="size-4" />
                                        Solicitar assinatura
                                    </Button>
                                    <Button size="sm" variant="outline">
                                        <Eye className="size-4" />
                                        Ver termos
                                    </Button>
                                </div>
                            </article>
                        </div>
                    </section>

                    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="space-y-4 p-4">
                            <div className="grid gap-2 lg:grid-cols-[minmax(260px,1fr)_180px_180px]">
                                <label className="relative">
                                    <span className="sr-only">
                                        Buscar contratos
                                    </span>
                                    <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                                    <input
                                        value={search}
                                        onChange={(event) =>
                                            setSearch(event.target.value)
                                        }
                                        type="search"
                                        placeholder="Buscar por profissional, razão social, CNPJ ou projeto"
                                        className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pr-3 pl-9 text-xs outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15 dark:border-slate-700 dark:bg-slate-950"
                                    />
                                </label>
                                <select
                                    value={frequency}
                                    onChange={(event) =>
                                        setFrequency(event.target.value)
                                    }
                                    aria-label="Filtrar periodicidade"
                                    className="h-10 rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs dark:border-slate-700 dark:bg-slate-950"
                                >
                                    <option>Todas</option>
                                    <option>Mensal</option>
                                    <option>Por marco</option>
                                </select>
                                <select
                                    aria-label="Filtrar ano"
                                    className="h-10 rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs dark:border-slate-700 dark:bg-slate-950"
                                >
                                    <option>Ano vigente (2026)</option>
                                    <option>2025</option>
                                    <option>2024</option>
                                </select>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {[
                                    'Todos',
                                    'Ativo',
                                    'Aguardando',
                                    'Em negociação',
                                    'Rascunho',
                                ].map((item) => (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => setStatus(item)}
                                        className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${status === item ? 'bg-teal-700 text-white' : 'bg-muted text-foreground/70 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1020px] text-left text-xs">
                                <thead className="bg-slate-50 text-[10px] tracking-wider text-slate-500 uppercase dark:bg-slate-950">
                                    <tr>
                                        <th className="px-4 py-3">
                                            Contrato e projeto
                                        </th>
                                        <th className="px-4 py-3">
                                            Profissional / empresa PJ
                                        </th>
                                        <th className="px-4 py-3">Vigência</th>
                                        <th className="px-4 py-3">
                                            Periodicidade
                                        </th>
                                        <th className="px-4 py-3">
                                            Valor contratual
                                        </th>
                                        <th className="px-4 py-3">
                                            Assinatura
                                        </th>
                                        <th className="px-4 py-3">Operação</th>
                                        <th className="px-4 py-3 text-right">
                                            Ações
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {filteredContracts.map((contract) => (
                                        <tr
                                            key={contract.id}
                                            className="transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                        >
                                            <td className="px-4 py-4">
                                                <div className="flex items-start gap-2">
                                                    <div>
                                                        <p className="font-semibold tabular-nums">
                                                            {contract.id}
                                                        </p>
                                                        <p className="mt-1 max-w-40 text-[11px] text-slate-500">
                                                            {contract.project}
                                                        </p>
                                                    </div>
                                                    <Badge
                                                        variant="secondary"
                                                        className="text-[9px]"
                                                    >
                                                        {contract.label}
                                                    </Badge>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <p className="font-semibold">
                                                    {contract.professional}
                                                </p>
                                                <p className="mt-0.5 text-[10px] text-slate-500">
                                                    {contract.company}
                                                </p>
                                                <p className="text-[10px] text-slate-500 tabular-nums">
                                                    {contract.taxId}
                                                </p>
                                            </td>
                                            <td className="px-4 py-4 tabular-nums">
                                                <p>{contract.start}</p>
                                                <p className="mt-1 text-slate-500">
                                                    {contract.end}
                                                </p>
                                            </td>
                                            <td className="px-4 py-4">
                                                <Badge variant="secondary">
                                                    {contract.frequency}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-4 font-semibold tabular-nums">
                                                {contract.value}
                                            </td>
                                            <td
                                                className={`px-4 py-4 font-medium ${contract.signature.includes('Pendente') ? 'text-red-700 dark:text-red-400' : ''}`}
                                            >
                                                {contract.signature}
                                            </td>
                                            <td className="px-4 py-4">
                                                <Badge
                                                    className={
                                                        statusStyle[
                                                            contract.operation
                                                        ]
                                                    }
                                                >
                                                    {contract.operation}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex justify-end gap-1">
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        aria-label={`Ver ${contract.id}`}
                                                        onClick={() =>
                                                            demoAction(
                                                                `${contract.id} aberto para consulta.`,
                                                            )
                                                        }
                                                    >
                                                        <FileText className="size-4" />
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        aria-label={`Abrir ${contract.id}`}
                                                    >
                                                        <ChevronRight className="size-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {filteredContracts.length === 0 && (
                                <div className="px-4 py-12 text-center">
                                    <Search className="mx-auto size-6 text-slate-400" />
                                    <h3 className="mt-3 text-sm font-semibold">
                                        Nenhum contrato encontrado
                                    </h3>
                                    <p className="mt-1 text-xs text-slate-500">
                                        Ajuste a pesquisa ou remova um dos
                                        filtros.
                                    </p>
                                </div>
                            )}
                        </div>
                        <footer className="flex flex-col justify-between gap-3 border-t border-slate-100 px-4 py-3 text-xs text-slate-500 sm:flex-row sm:items-center dark:border-slate-800">
                            <span>
                                Exibindo {filteredContracts.length} de 23
                                contratos formalizados
                            </span>
                            <div className="flex gap-1">
                                <Button variant="outline" size="sm" disabled>
                                    <ChevronLeft className="size-4" />
                                    Anterior
                                </Button>
                                <Button
                                    size="sm"
                                    className="bg-teal-700 text-white"
                                >
                                    1
                                </Button>
                                <Button variant="outline" size="sm">
                                    2
                                </Button>
                                <Button variant="outline" size="sm">
                                    3
                                </Button>
                                <Button variant="outline" size="sm">
                                    Próxima
                                    <ChevronRight className="size-4" />
                                </Button>
                            </div>
                        </footer>
                    </section>

                    <div className="grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
                        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <h2 className="flex items-center gap-2 text-sm font-semibold">
                                <ShieldCheck className="size-5 text-teal-700" />
                                Cláusulas obrigatórias EncontrePJ
                            </h2>
                            <p className="mt-3 text-xs leading-5 text-slate-600 dark:text-slate-300">
                                Cada profissional possui contrato individual com
                                cláusulas obrigatórias de retenção fiscal,
                                propriedade intelectual e conformidade.
                            </p>
                            <ul className="mt-4 space-y-2 text-xs">
                                {[
                                    'Cessão integral de direitos patrimoniais',
                                    'Validação automática de CNPJ ativo',
                                    'Declaração de autonomia e ausência de vínculo',
                                ].map((item) => (
                                    <li key={item} className="flex gap-2">
                                        <CheckCircle2 className="size-4 shrink-0 text-emerald-700" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </section>
                        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h2 className="flex items-center gap-2 text-sm font-semibold">
                                        <History className="size-5 text-indigo-700" />
                                        Trilha de auditoria e certificação
                                    </h2>
                                    <p className="mt-1 text-xs text-slate-500">
                                        Registros de assinatura, versões e
                                        notificações.
                                    </p>
                                </div>
                                <Button variant="outline" size="sm">
                                    <Eye className="size-4" />
                                    Ver log completo
                                </Button>
                            </div>
                            <div className="mt-4 divide-y divide-slate-100 rounded-lg bg-slate-50 px-3 dark:divide-slate-800 dark:bg-slate-950">
                                {[
                                    [
                                        '#CT-2024-089: assinatura eletrônica concluída',
                                        '15 jan. 2024 · 11:20 BRT',
                                    ],
                                    [
                                        '#CT-2024-102: notificação de prontidão entregue',
                                        'Hoje · 09:14 BRT',
                                    ],
                                    [
                                        '#CT-2024-094: minuta de aditivo gerada',
                                        'Ontem · 16:50 BRT',
                                    ],
                                ].map(([event, date]) => (
                                    <div
                                        key={event}
                                        className="flex flex-col justify-between gap-1 py-3 sm:flex-row"
                                    >
                                        <div>
                                            <p className="text-xs font-semibold">
                                                {event}
                                            </p>
                                            <p className="mt-0.5 text-[10px] text-slate-500">
                                                Registro criptográfico
                                                armazenado no audit trail
                                            </p>
                                        </div>
                                        <span className="shrink-0 text-[10px] text-slate-500">
                                            {date}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </>
    );
}

CompanyContracts.layout = {
    breadcrumbs: [
        { title: 'Visão geral', href: dashboard() },
        { title: 'Contratos', href: '/contratos' },
    ],
};
