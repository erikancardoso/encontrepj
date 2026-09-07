import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import {
    BadgeCheck,
    Banknote,
    CalendarDays,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Download,
    FileArchive,
    FileText,
    History,
    Landmark,
    Plus,
    ReceiptText,
    Search,
    ShieldCheck,
    WalletCards,
    Zap,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { dashboard } from '@/routes';

type Payment = {
    project: string;
    milestone: string;
    provider: string;
    taxId: string;
    amount: string;
    frequency: string;
    invoice: string;
    release: string;
    forecast: string;
    method: string;
};

const payments: Payment[] = [
    {
        project: 'Migração Cloud AWS',
        milestone: 'Sprint 6 · Entrega aprovada',
        provider: 'Berti Cloud Tech ME',
        taxId: '27.914.882/0001-44',
        amount: 'R$ 18.500,00',
        frequency: 'Mensal',
        invoice: 'NFe #1042 aprovada',
        release: 'Programado',
        forecast: 'Hoje, 17h00',
        method: 'PIX PJ · chave CNPJ',
    },
    {
        project: 'Redesign Design System B2B',
        milestone: 'Sprint 4 · Componentização',
        provider: 'Duarte Studios EIRELI',
        taxId: '41.209.118/0001-39',
        amount: 'R$ 12.000,00',
        frequency: 'Mensal',
        invoice: 'NFe #891 paga',
        release: 'Pago',
        forecast: '20 out. 2026',
        method: 'PIX PJ · chave CNPJ',
    },
    {
        project: 'Integração Gateway PIX',
        milestone: 'Sprint 2 · Marco aprovado',
        provider: 'Alencar Soluções Digitais',
        taxId: '19.824.502/0001-90',
        amount: 'R$ 14.500,00',
        frequency: 'Mensal',
        invoice: 'Pendente de emissão',
        release: 'Aguardando NFe',
        forecast: '28 out. 2026',
        method: 'PIX PJ · chave CNPJ',
    },
    {
        project: 'Auditoria Compliance LGPD',
        milestone: 'Fase 1 · Mapeamento de risco',
        provider: 'Moura & Associados DPO',
        taxId: '33.109.482/0001-05',
        amount: 'R$ 9.200,00',
        frequency: 'Por marco',
        invoice: 'XML em auditoria',
        release: 'Em validação',
        forecast: '30 out. 2026',
        method: 'TED institucional',
    },
    {
        project: 'Aplicativo Mobile Flutter PJ',
        milestone: 'Ciclo 12 · Módulo de checkout',
        provider: 'Mobile Craft Ltda.',
        taxId: '48.330.129/0001-02',
        amount: 'R$ 10.600,00',
        frequency: 'Quinzenal',
        invoice: 'Aguardando entrega',
        release: 'Aguardando entrega',
        forecast: '05 nov. 2026',
        method: 'PIX PJ · chave CNPJ',
    },
];

const releaseStyle: Record<string, string> = {
    Programado:
        'border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-300',
    Pago: 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300',
    'Aguardando NFe':
        'border-indigo-200 bg-indigo-50 text-indigo-800 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-300',
    'Em validação':
        'border-violet-200 bg-violet-50 text-violet-800 dark:border-violet-900 dark:bg-violet-950 dark:text-violet-300',
    'Aguardando entrega':
        'border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300',
};

const totals = [
    [
        'Programado no mês',
        'R$ 64.800,00',
        'Ciclo 25 a 30 de outubro',
        CalendarDays,
    ],
    [
        'Aguardando NFe',
        'R$ 14.500,00',
        '2 profissionais pendentes',
        ReceiptText,
    ],
    [
        'Aguardando aprovação',
        'R$ 9.200,00',
        '1 entrega técnica em análise',
        FileText,
    ],
    ['Pago neste mês', 'R$ 72.300,00', '100% conciliado', CheckCircle2],
] as const;

export default function CompanyPayments() {
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('Todos');
    const [frequency, setFrequency] = useState('Todas');
    const [feedback, setFeedback] = useState('');

    const filtered = useMemo(
        () =>
            payments.filter((payment) => {
                const text =
                    `${payment.project} ${payment.provider} ${payment.taxId} ${payment.invoice}`.toLocaleLowerCase(
                        'pt-BR',
                    );
                return (
                    text.includes(search.toLocaleLowerCase('pt-BR')) &&
                    (status === 'Todos' || payment.release === status) &&
                    (frequency === 'Todas' || payment.frequency === frequency)
                );
            }),
        [search, status, frequency],
    );

    function demoAction(message: string) {
        setFeedback(message);
        window.setTimeout(() => setFeedback(''), 4500);
    }

    return (
        <>
            <Head title="Pagamentos" />
            <main className="min-h-full bg-slate-50/80 px-4 py-6 text-slate-950 lg:px-6 dark:bg-slate-950 dark:text-slate-50">
                <div className="mx-auto flex w-full max-w-[1380px] flex-col gap-5">
                    <header className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                        <div>
                            <Badge variant="secondary">
                                Módulo de tesouraria B2B
                            </Badge>
                            <h1 className="mt-2 text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
                                Operações financeiras e pagamentos PJ
                            </h1>
                            <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                                Conciliação de NFe, liberação após aprovação de
                                marcos e liquidação bancária via PIX PJ.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline">
                                <Download className="size-4" />
                                Exportar OFX / XLS
                            </Button>
                            <Button variant="outline">
                                <FileArchive className="size-4" />
                                Comprovantes
                            </Button>
                            <Button
                                className="bg-teal-700 text-white hover:bg-teal-800"
                                onClick={() =>
                                    demoAction(
                                        'Cadastro de meio de pagamento iniciado.',
                                    )
                                }
                            >
                                <Plus className="size-4" />
                                Adicionar meio de pagamento
                            </Button>
                        </div>
                    </header>

                    {feedback && (
                        <p
                            role="status"
                            className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200"
                        >
                            {feedback}
                        </p>
                    )}

                    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                            <div className="flex gap-3">
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                                    <ShieldCheck className="size-5" />
                                </span>
                                <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h2 className="text-sm font-semibold">
                                            Diretriz de conformidade e liberação
                                            fiscal
                                        </h2>
                                        <Badge className="border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-50">
                                            Auditável
                                        </Badge>
                                    </div>
                                    <p className="mt-1 max-w-4xl text-xs leading-5 text-slate-600 dark:text-slate-300">
                                        Valores somente são liberados após dupla
                                        validação: entrega aprovada e NFe
                                        compatível com o CNPJ, CNAE e valor
                                        contratado.
                                    </p>
                                </div>
                            </div>
                            <Badge
                                variant="secondary"
                                className="self-start whitespace-nowrap lg:self-auto"
                            >
                                Lei 13.429 · Compliance PJ
                            </Badge>
                        </div>
                    </section>

                    <section
                        aria-label="Resumo financeiro"
                        className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5"
                    >
                        {totals.map(([label, value, detail, Icon]) => (
                            <article
                                key={label}
                                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                            >
                                <div className="flex justify-between">
                                    <p className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
                                        {label}
                                    </p>
                                    <Icon className="size-4 text-teal-700" />
                                </div>
                                <strong className="mt-4 block text-xl font-semibold tracking-tight tabular-nums">
                                    {value}
                                </strong>
                                <p className="mt-2 text-[11px] text-slate-500">
                                    {detail}
                                </p>
                                <div className="mt-4 h-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                    <div className="h-full w-4/5 bg-teal-700" />
                                </div>
                            </article>
                        ))}
                        <article className="rounded-xl bg-teal-700 p-4 text-white shadow-sm">
                            <div className="flex justify-between">
                                <p className="text-[10px] font-semibold tracking-wider uppercase opacity-80">
                                    Próxima liquidação PIX
                                </p>
                                <Zap className="size-4" />
                            </div>
                            <strong className="mt-4 block text-xl font-semibold">
                                Hoje às 17h00
                            </strong>
                            <p className="mt-2 text-[11px] opacity-80">
                                Lote de R$ 18.500,00
                            </p>
                            <p className="mt-4 flex items-center gap-1 text-[10px] font-semibold uppercase">
                                <span className="size-1.5 rounded-full bg-emerald-300" />
                                Gateway Itaú ativo
                            </p>
                        </article>
                    </section>

                    <div className="grid items-stretch gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
                        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <div className="flex items-start gap-3">
                                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                                    <BadgeCheck className="size-4" />
                                </span>
                                <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h2 className="text-sm font-semibold">
                                            Validação imediata de NFe e
                                            liberação PIX
                                        </h2>
                                        <Badge className="border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-50">
                                            Ação prioritária
                                        </Badge>
                                    </div>
                                    <p className="mt-1 text-xs text-slate-500">
                                        Documento pronto para liquidação
                                        automática às 17h00.
                                    </p>
                                </div>
                            </div>
                            <strong className="mt-4 block text-xl font-semibold text-teal-800 dark:text-teal-300">
                                R$ 18.500,00
                            </strong>
                            <div className="mt-4 grid gap-3 rounded-lg bg-indigo-50 p-4 sm:grid-cols-3 dark:bg-indigo-950">
                                <div>
                                    <p className="text-[10px] font-semibold uppercase opacity-60">
                                        Prestador PJ
                                    </p>
                                    <p className="mt-1 text-xs font-semibold">
                                        Berti Cloud Tech ME
                                    </p>
                                    <p className="text-[10px] opacity-70">
                                        CNPJ 27.914.882/0001-44
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-semibold uppercase opacity-60">
                                        Projeto vinculado
                                    </p>
                                    <p className="mt-1 text-xs font-semibold">
                                        Migração Cloud AWS
                                    </p>
                                    <p className="text-[10px] opacity-70">
                                        Sprint 6 · Marco validado
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-semibold uppercase opacity-60">
                                        Documento fiscal
                                    </p>
                                    <p className="mt-1 text-xs font-semibold">
                                        NFe #1042
                                    </p>
                                    <p className="text-[10px] opacity-70">
                                        CNAE 62.04-0 validado
                                    </p>
                                </div>
                            </div>
                            <p className="mt-3 flex items-start gap-2 text-[11px] text-slate-500">
                                <CheckCircle2 className="size-3.5 shrink-0 text-emerald-700" />
                                Aprovação técnica assinada digitalmente por
                                Rodrigo Silveira em 24/10/2026 às 11:32.
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                <Button variant="outline" size="sm">
                                    <FileText className="size-4" />
                                    Visualizar PDF
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Download className="size-4" />
                                    Baixar XML
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-700"
                                    onClick={() =>
                                        demoAction(
                                            'Contestação aberta. Informe o motivo da recusa.',
                                        )
                                    }
                                >
                                    Contestar / recusar
                                </Button>
                                <Button
                                    size="sm"
                                    className="bg-teal-700 text-white hover:bg-teal-800"
                                    onClick={() =>
                                        demoAction(
                                            'NFe aprovada. PIX programado para hoje às 17h00.',
                                        )
                                    }
                                >
                                    <BadgeCheck className="size-4" />
                                    Aprovar e programar PIX
                                </Button>
                            </div>
                        </section>

                        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <div className="flex items-center justify-between">
                                <h2 className="flex items-center gap-2 text-sm font-semibold">
                                    <Landmark className="size-5 text-teal-700" />
                                    Conta PJ liquidante
                                </h2>
                                <Badge className="border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-50">
                                    Homologada
                                </Badge>
                            </div>
                            <div className="mt-4 rounded-lg bg-slate-50 p-4 dark:bg-slate-950">
                                <h3 className="text-sm font-semibold">
                                    Banco Itaú BBA S.A. (479)
                                </h3>
                                <p className="mt-1 text-xs text-slate-500">
                                    Agência 0912 · Conta PJ final 8920-1
                                </p>
                                <p className="mt-3 text-[10px] font-semibold text-slate-500 uppercase">
                                    Chave PIX e-CNPJ
                                </p>
                                <p className="mt-1 text-xs tabular-nums">
                                    38.192.401/0001-85
                                </p>
                            </div>
                            <dl className="mt-4 space-y-2 text-xs">
                                <div className="flex justify-between">
                                    <dt className="text-slate-500">
                                        Saldo em custódia
                                    </dt>
                                    <dd className="font-semibold tabular-nums">
                                        R$ 145.000,00
                                    </dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-slate-500">
                                        Lote liberado hoje
                                    </dt>
                                    <dd className="font-semibold text-emerald-700 tabular-nums">
                                        R$ 18.500,00
                                    </dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-slate-500">
                                        Limite emergencial
                                    </dt>
                                    <dd className="font-semibold tabular-nums">
                                        R$ 300.000,00
                                    </dd>
                                </div>
                            </dl>
                            <Button variant="outline" className="mt-5 w-full">
                                <FileText className="size-4" />
                                Extrato financeiro
                            </Button>
                        </section>
                    </div>

                    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="space-y-3 p-4">
                            <div className="grid gap-2 lg:grid-cols-[minmax(280px,1fr)_170px_210px_160px]">
                                <label className="relative">
                                    <span className="sr-only">
                                        Buscar pagamentos
                                    </span>
                                    <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                                    <input
                                        value={search}
                                        onChange={(event) =>
                                            setSearch(event.target.value)
                                        }
                                        placeholder="Buscar projeto, prestador, CNPJ ou NFe"
                                        className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pr-3 pl-9 text-xs outline-none focus:border-teal-700 dark:border-slate-700 dark:bg-slate-950"
                                    />
                                </label>
                                <select
                                    value={frequency}
                                    onChange={(event) =>
                                        setFrequency(event.target.value)
                                    }
                                    aria-label="Periodicidade"
                                    className="h-10 rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs dark:border-slate-700 dark:bg-slate-950"
                                >
                                    <option>Todas</option>
                                    <option>Mensal</option>
                                    <option>Quinzenal</option>
                                    <option>Por marco</option>
                                </select>
                                <select
                                    aria-label="Meio bancário"
                                    className="h-10 rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs dark:border-slate-700 dark:bg-slate-950"
                                >
                                    <option>Todos os meios</option>
                                    <option>PIX PJ</option>
                                    <option>TED institucional</option>
                                </select>
                                <select
                                    aria-label="Período"
                                    className="h-10 rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs dark:border-slate-700 dark:bg-slate-950"
                                >
                                    <option>Outubro de 2026</option>
                                    <option>Novembro de 2026</option>
                                </select>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {[
                                    'Todos',
                                    'Aguardando entrega',
                                    'Aguardando NFe',
                                    'Em validação',
                                    'Programado',
                                    'Pago',
                                ].map((item) => (
                                    <button
                                        type="button"
                                        key={item}
                                        onClick={() => setStatus(item)}
                                        className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${status === item ? 'bg-teal-700 text-white' : 'bg-muted text-foreground/70 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1100px] text-left text-xs">
                                <thead className="bg-slate-50 text-[10px] tracking-wider text-slate-500 uppercase dark:bg-slate-950">
                                    <tr>
                                        <th className="px-4 py-3">
                                            Projeto e marco
                                        </th>
                                        <th className="px-4 py-3">
                                            Prestador PJ
                                        </th>
                                        <th className="px-4 py-3">
                                            Valor bruto
                                        </th>
                                        <th className="px-4 py-3">
                                            Periodicidade
                                        </th>
                                        <th className="px-4 py-3">
                                            Status NFe
                                        </th>
                                        <th className="px-4 py-3">Liberação</th>
                                        <th className="px-4 py-3">Previsão</th>
                                        <th className="px-4 py-3">
                                            Meio bancário
                                        </th>
                                        <th className="px-4 py-3 text-right">
                                            Ações
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {filtered.map((payment) => (
                                        <tr
                                            key={payment.project}
                                            className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                        >
                                            <td className="px-4 py-4">
                                                <p className="font-semibold">
                                                    {payment.project}
                                                </p>
                                                <p className="mt-1 text-[10px] text-slate-500">
                                                    {payment.milestone}
                                                </p>
                                            </td>
                                            <td className="px-4 py-4">
                                                <p className="font-semibold">
                                                    {payment.provider}
                                                </p>
                                                <p className="mt-1 text-[10px] text-slate-500 tabular-nums">
                                                    {payment.taxId}
                                                </p>
                                            </td>
                                            <td className="px-4 py-4 font-semibold tabular-nums">
                                                {payment.amount}
                                            </td>
                                            <td className="px-4 py-4">
                                                {payment.frequency}
                                            </td>
                                            <td className="px-4 py-4">
                                                <p className="text-[11px]">
                                                    {payment.invoice}
                                                </p>
                                            </td>
                                            <td className="px-4 py-4">
                                                <Badge
                                                    className={
                                                        releaseStyle[
                                                            payment.release
                                                        ]
                                                    }
                                                >
                                                    {payment.release}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-4 tabular-nums">
                                                {payment.forecast}
                                            </td>
                                            <td className="px-4 py-4">
                                                <p className="flex items-center gap-1">
                                                    <Zap className="size-3 text-teal-700" />
                                                    {payment.method}
                                                </p>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex justify-end gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        aria-label={`Ver documento de ${payment.project}`}
                                                    >
                                                        <FileText className="size-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        aria-label={`Ver histórico de ${payment.project}`}
                                                    >
                                                        <History className="size-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {filtered.length === 0 && (
                                <div className="py-12 text-center">
                                    <Search className="mx-auto size-6 text-slate-400" />
                                    <h3 className="mt-2 text-sm font-semibold">
                                        Nenhum pagamento encontrado
                                    </h3>
                                    <p className="mt-1 text-xs text-slate-500">
                                        Ajuste a pesquisa ou os filtros.
                                    </p>
                                </div>
                            )}
                        </div>
                        <footer className="flex flex-col justify-between gap-3 border-t border-slate-100 px-4 py-3 text-xs text-slate-500 sm:flex-row sm:items-center dark:border-slate-800">
                            <span>
                                Mostrando {filtered.length} de 18 pagamentos
                                operacionais
                            </span>
                            <div className="flex gap-1">
                                <Button size="sm" variant="outline" disabled>
                                    <ChevronLeft className="size-4" />
                                    Anterior
                                </Button>
                                <Button
                                    size="sm"
                                    className="bg-teal-700 text-white"
                                >
                                    1
                                </Button>
                                <Button size="sm" variant="outline">
                                    2
                                </Button>
                                <Button size="sm" variant="outline">
                                    3
                                </Button>
                                <Button size="sm" variant="outline">
                                    Próxima
                                    <ChevronRight className="size-4" />
                                </Button>
                            </div>
                        </footer>
                    </section>

                    <div className="grid gap-3 md:grid-cols-3">
                        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <h2 className="flex items-center gap-2 text-sm font-semibold">
                                <WalletCards className="size-5 text-teal-700" />
                                Chave PIX e-CNPJ primária
                            </h2>
                            <p className="mt-3 text-xs font-semibold">
                                Nexus Soluções Digitais Ltda.
                            </p>
                            <p className="mt-1 text-[11px] text-slate-500 tabular-nums">
                                38.192.401/0001-85 · Banco Itaú
                            </p>
                            <p className="mt-4 text-[10px] font-semibold text-emerald-700 uppercase">
                                Certificado A1 válido até 11/2027
                            </p>
                        </section>
                        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <h2 className="flex items-center gap-2 text-sm font-semibold">
                                <Banknote className="size-5 text-sky-700" />
                                Cartão corporativo B2B
                            </h2>
                            <p className="mt-3 text-xs font-semibold">
                                Mastercard Black Corporate · final 9924
                            </p>
                            <p className="mt-1 text-[11px] leading-5 text-slate-500">
                                Reserva para retenção de custódia e projetos de
                                longa duração.
                            </p>
                        </section>
                        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <h2 className="flex items-center gap-2 text-sm font-semibold">
                                <ShieldCheck className="size-5 text-emerald-700" />
                                Garantia e custódia PJ
                            </h2>
                            <p className="mt-3 text-xs leading-5 text-slate-500">
                                Liquidações registradas com hash criptográfico,
                                sem caracterizar vínculo empregatício ou
                                subordinação.
                            </p>
                            <button
                                type="button"
                                className="mt-4 text-xs font-medium text-teal-800 hover:underline dark:text-teal-300"
                            >
                                Baixar certificado mensal
                            </button>
                        </section>
                    </div>
                </div>
            </main>
        </>
    );
}

CompanyPayments.layout = {
    breadcrumbs: [
        { title: 'Visão geral', href: dashboard() },
        { title: 'Pagamentos', href: '/pagamentos' },
    ],
};
