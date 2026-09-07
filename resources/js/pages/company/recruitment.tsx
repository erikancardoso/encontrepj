import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import {
    BadgeCheck,
    BriefcaseBusiness,
    CheckCircle2,
    CircleHelp,
    Download,
    FileSearch,
    Gauge,
    Paperclip,
    Plus,
    Search,
    Send,
    ShieldCheck,
    Star,
    Target,
    Video,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { dashboard } from '@/routes';

const metrics = [
    [
        'Processos ativos',
        '04',
        '4 processos em andamento',
        '100% dos SLAs no prazo',
        BriefcaseBusiness,
    ],
    [
        'Triagem e avaliação',
        '28',
        'profissionais pré-selecionados',
        'CNPJ validado',
        FileSearch,
    ],
    [
        'Entrevistas agendadas',
        '06',
        'reuniões técnicas nesta semana',
        'Próxima hoje às 15:30',
        Video,
    ],
    [
        'Posições concluídas',
        '12',
        'fechamentos com sucesso',
        'Tempo médio: 6 dias úteis',
        CheckCircle2,
    ],
] as const;

const funnel = [
    ['1. Inscritos', 42, 'Inscrições recebidas', 'slate'],
    ['2. Pré-selecionados', 18, 'CNPJ e histórico aderentes', 'sky'],
    ['3. Entrevista técnica', 6, 'Live coding e arquitetura', 'teal'],
    ['4. Recomendados', 4, 'Parecer acima de 9,0', 'emerald'],
    ['5. Decisão diretoria', 2, 'Aguardando aprovação', 'primary'],
] as const;

const processes = [
    {
        title: 'Arquiteto Cloud AWS Sênior',
        stack: 'Terraform · EKS · FinOps',
        code: '#REC-4091',
        recruiter: 'Mariana Lopes',
        rating: '4,9/5 · Sênior',
        candidates: 8,
        detail: '3 avaliados hoje',
        phase: 'Entrevistas',
        category: 'Cloud',
    },
    {
        title: 'Tech Lead Backend Python',
        stack: 'FastAPI · Microsserviços · Kafka',
        code: '#REC-3982',
        recruiter: 'Bruno Vasconcelos',
        rating: '5,0/5 · Fintech Lead',
        candidates: 6,
        detail: '2 finalistas recomendados',
        phase: 'Recomendados',
        category: 'Backend',
    },
    {
        title: 'Engenheiro de Dados Snowflake / dbt',
        stack: 'Data Mesh · Airflow · BigQuery',
        code: '#REC-4105',
        recruiter: 'Mariana Lopes',
        rating: '4,9/5 · Sênior',
        candidates: 11,
        detail: '5 sob análise cadastral',
        phase: 'Triagem',
        category: 'Dados',
    },
    {
        title: 'Product Designer B2B',
        stack: 'Research · Figma · Design Systems',
        code: '#REC-4110',
        recruiter: 'Mariana Lopes',
        rating: '4,9/5 · Sênior',
        candidates: 9,
        detail: '4 portfólios avaliados',
        phase: 'Pré-seleção',
        category: 'Design',
    },
];

const phaseStyles: Record<string, string> = {
    Entrevistas:
        'border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-300',
    Recomendados:
        'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300',
    Triagem:
        'border-indigo-200 bg-indigo-50 text-indigo-800 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-300',
    'Pré-seleção':
        'border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300',
};

const funnelStyles: Record<string, string> = {
    slate: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200',
    sky: 'bg-sky-50 text-sky-900 dark:bg-sky-950 dark:text-sky-200',
    teal: 'bg-teal-50 text-teal-900 dark:bg-teal-950 dark:text-teal-200',
    emerald:
        'bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200',
    primary: 'bg-teal-700 text-white',
};

export default function CompanyRecruitment() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('Todas');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        {
            from: 'Mariana Lopes',
            body: 'Concluí as entrevistas técnicas para Arquiteto Cloud AWS. Lucas obteve nota 9,6 e o parecer está disponível.',
            mine: false,
        },
        {
            from: 'Você',
            body: 'Ótimo. Ele consegue iniciar o onboarding na próxima segunda-feira?',
            mine: true,
        },
        {
            from: 'Mariana Lopes',
            body: 'Sim. Ele confirmou disponibilidade integral e enviou o comprovante de CNPJ ativo.',
            mine: false,
        },
    ]);
    const [feedback, setFeedback] = useState('');

    const filtered = useMemo(
        () =>
            processes.filter((process) => {
                const text =
                    `${process.title} ${process.stack} ${process.recruiter} ${process.code}`.toLocaleLowerCase(
                        'pt-BR',
                    );
                return (
                    text.includes(search.toLocaleLowerCase('pt-BR')) &&
                    (category === 'Todas' || process.category === category)
                );
            }),
        [search, category],
    );

    function sendMessage() {
        if (!message.trim()) return;
        setMessages((current) => [
            ...current,
            { from: 'Você', body: message.trim(), mine: true },
        ]);
        setMessage('');
    }

    function demoAction(text: string) {
        setFeedback(text);
        window.setTimeout(() => setFeedback(''), 4000);
    }

    return (
        <>
            <Head title="Recrutamento" />
            <main className="min-h-full bg-slate-50/80 px-4 py-6 text-slate-950 lg:px-6 dark:bg-slate-950 dark:text-slate-50">
                <div className="mx-auto flex w-full max-w-[1380px] flex-col gap-5">
                    <header className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                        <div>
                            <Badge variant="secondary">
                                Módulo corporativo B2B
                            </Badge>
                            <h1 className="mt-2 text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
                                Recrutamento e hunting especializado PJ
                            </h1>
                            <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                                Seleção ágil de especialistas PJ com Tech
                                Recruiters seniores e triagem técnica auditada.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button type="button" variant="outline">
                                <Gauge className="size-4" />
                                Ajustar SLA
                            </Button>
                            <Button
                                type="button"
                                className="bg-teal-700 text-white hover:bg-teal-800"
                                onClick={() =>
                                    demoAction(
                                        'Solicitação de novo recrutador iniciada.',
                                    )
                                }
                            >
                                <Plus className="size-4" />
                                Solicitar recrutador
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
                                            Transparência contratual e isenção
                                            de custos fixos
                                        </h2>
                                        <Badge className="border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-50">
                                            Auditoria conforme
                                        </Badge>
                                    </div>
                                    <p className="mt-1 max-w-4xl text-xs leading-5 text-slate-600 dark:text-slate-300">
                                        Serviço consultivo opcional, cobrado sob
                                        demanda. O contrato de hunting é
                                        juridicamente separado do contrato
                                        firmado com o profissional escolhido.
                                    </p>
                                </div>
                            </div>
                            <Badge
                                variant="secondary"
                                className="self-start whitespace-nowrap lg:self-auto"
                            >
                                Taxa de êxito: 15%
                            </Badge>
                        </div>
                    </section>

                    <section
                        aria-label="Resumo do recrutamento"
                        className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
                    >
                        {metrics.map(([label, value, detail, note, Icon]) => (
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
                                <strong className="mt-4 block text-3xl font-semibold tabular-nums">
                                    {value}
                                </strong>
                                <p className="mt-1 text-xs text-slate-500">
                                    {detail}
                                </p>
                                <p className="mt-4 text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
                                    {note}
                                </p>
                            </article>
                        ))}
                    </section>

                    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                            <div>
                                <h2 className="text-xl font-semibold tracking-tight">
                                    Funil geral de hunting PJ
                                </h2>
                                <p className="text-xs text-slate-500">
                                    Candidatos qualificados atualizados em tempo
                                    real.
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Badge className="border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-50">
                                    CNPJ regular
                                </Badge>
                                <Badge className="border-sky-200 bg-sky-50 text-sky-800 hover:bg-sky-50">
                                    Portfólio verificado
                                </Badge>
                            </div>
                        </div>
                        <div className="mt-5 grid gap-2 md:grid-cols-5">
                            {funnel.map(([label, count, detail, tone]) => (
                                <article
                                    key={label}
                                    className={`rounded-lg p-3 ${funnelStyles[tone]}`}
                                >
                                    <div className="flex items-center justify-between gap-2">
                                        <h3 className="text-[10px] font-semibold tracking-wide uppercase">
                                            {label}
                                        </h3>
                                        <span className="rounded-full bg-white/80 px-2 py-0.5 text-sm font-semibold text-teal-800 tabular-nums">
                                            {count}
                                        </span>
                                    </div>
                                    <div className="my-3 h-1 rounded-full bg-current opacity-50" />
                                    <p className="text-[11px] leading-4 opacity-80">
                                        {detail}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </section>

                    <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
                        <div className="flex min-w-0 flex-col gap-5">
                            <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                                <div className="flex flex-col justify-between gap-4 p-5 lg:flex-row lg:items-end">
                                    <div>
                                        <h2 className="text-lg font-semibold">
                                            Processos seletivos em execução
                                        </h2>
                                        <p className="text-xs text-slate-500">
                                            Projetos alocados com recrutadores
                                            dedicados.
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <label className="relative">
                                            <span className="sr-only">
                                                Buscar processos
                                            </span>
                                            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                                            <input
                                                value={search}
                                                onChange={(event) =>
                                                    setSearch(
                                                        event.target.value,
                                                    )
                                                }
                                                placeholder="Buscar processo"
                                                className="h-9 rounded-md border border-slate-200 bg-slate-50 pr-3 pl-9 text-xs outline-none focus:border-teal-700 dark:border-slate-700 dark:bg-slate-950"
                                            />
                                        </label>
                                        <select
                                            value={category}
                                            onChange={(event) =>
                                                setCategory(event.target.value)
                                            }
                                            aria-label="Filtrar área"
                                            className="h-9 rounded-md border border-slate-200 bg-slate-50 px-3 text-xs dark:border-slate-700 dark:bg-slate-950"
                                        >
                                            <option>Todas</option>
                                            <option>Cloud</option>
                                            <option>Backend</option>
                                            <option>Dados</option>
                                            <option>Design</option>
                                        </select>
                                        <Button variant="outline" size="sm">
                                            <Download className="size-4" />
                                            Relatório
                                        </Button>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[760px] text-left text-xs">
                                        <thead className="bg-slate-50 text-[10px] tracking-wider text-slate-500 uppercase dark:bg-slate-950">
                                            <tr>
                                                <th className="px-5 py-3">
                                                    Projeto / vaga PJ
                                                </th>
                                                <th className="px-5 py-3">
                                                    Tech Recruiter
                                                </th>
                                                <th className="px-5 py-3">
                                                    Funil
                                                </th>
                                                <th className="px-5 py-3">
                                                    Fase atual
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                            {filtered.map((process) => (
                                                <tr key={process.code}>
                                                    <td className="px-5 py-4">
                                                        <p className="font-semibold">
                                                            {process.title}
                                                        </p>
                                                        <p className="mt-1 text-[11px] text-slate-500">
                                                            {process.stack}
                                                        </p>
                                                        <div className="mt-1 flex gap-2">
                                                            <Badge variant="secondary">
                                                                PJ{' '}
                                                                {
                                                                    process.category
                                                                }
                                                            </Badge>
                                                            <span className="text-[10px] text-slate-500">
                                                                {process.code}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <p className="font-semibold">
                                                            {process.recruiter}
                                                        </p>
                                                        <p className="mt-1 text-[11px] text-emerald-700">
                                                            <Star className="mr-1 inline size-3" />
                                                            {process.rating}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <p className="font-semibold tabular-nums">
                                                            {process.candidates}{' '}
                                                            candidatos
                                                        </p>
                                                        <p className="mt-1 text-[11px] text-slate-500">
                                                            {process.detail}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <Badge
                                                            className={
                                                                phaseStyles[
                                                                    process
                                                                        .phase
                                                                ]
                                                            }
                                                        >
                                                            {process.phase}
                                                        </Badge>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {filtered.length === 0 && (
                                        <div className="py-10 text-center">
                                            <Search className="mx-auto size-6 text-slate-400" />
                                            <p className="mt-2 text-sm font-semibold">
                                                Nenhum processo encontrado
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <footer className="flex justify-between border-t border-slate-100 px-5 py-3 text-xs text-slate-500 dark:border-slate-800">
                                    <span>
                                        Mostrando {filtered.length} de 4
                                        processos
                                    </span>
                                    <button
                                        type="button"
                                        className="font-medium text-teal-800 hover:underline dark:text-teal-300"
                                    >
                                        Ver histórico de vagas
                                    </button>
                                </footer>
                            </section>

                            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                                    <div>
                                        <h2 className="flex items-center gap-2 text-lg font-semibold">
                                            <FileSearch className="size-5 text-teal-700" />
                                            Parecer técnico em destaque
                                        </h2>
                                        <p className="mt-1 text-xs text-slate-500">
                                            Finalista pré-aprovado para Tech
                                            Lead Backend.
                                        </p>
                                    </div>
                                    <Badge className="border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-50">
                                        Score técnico: 9,6 / 10
                                    </Badge>
                                </div>
                                <div className="mt-4 flex flex-col gap-4 rounded-lg bg-slate-50 p-4 sm:flex-row sm:items-center dark:bg-slate-950">
                                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-teal-100 font-semibold text-teal-800">
                                        LM
                                    </span>
                                    <div className="flex-1">
                                        <h3 className="font-semibold">
                                            Lucas Meneses da Costa
                                        </h3>
                                        <p className="text-xs text-slate-500">
                                            Meneses Cloud Tech Ltda. · CNPJ
                                            ativo · disponibilidade imediata
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline">
                                            <FileSearch className="size-4" />
                                            Portfólio
                                        </Button>
                                        <Button
                                            className="bg-teal-700 text-white hover:bg-teal-800"
                                            onClick={() =>
                                                demoAction(
                                                    'Fluxo de contratação de Lucas Meneses iniciado.',
                                                )
                                            }
                                        >
                                            <BadgeCheck className="size-4" />
                                            Contratar PJ
                                        </Button>
                                    </div>
                                </div>
                                <div className="mt-3 grid gap-3 md:grid-cols-2">
                                    <article className="rounded-lg bg-emerald-50 p-4 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-100">
                                        <h3 className="flex items-center gap-2 text-sm font-semibold">
                                            <CheckCircle2 className="size-4" />
                                            Pontos fortes validados
                                        </h3>
                                        <p className="mt-2 text-xs leading-5">
                                            Nove anos em microsserviços Python,
                                            comunicação executiva e experiência
                                            com sistemas de alta
                                            disponibilidade.
                                        </p>
                                    </article>
                                    <article className="rounded-lg bg-amber-50 p-4 text-amber-950 dark:bg-amber-950 dark:text-amber-100">
                                        <h3 className="flex items-center gap-2 text-sm font-semibold">
                                            <Target className="size-4" />
                                            Atenção operacional
                                        </h3>
                                        <p className="mt-2 text-xs leading-5">
                                            Experiência reduzida com GCP.
                                            Recomenda-se alinhamento sobre a
                                            futura estratégia multicloud.
                                        </p>
                                    </article>
                                </div>
                            </section>
                        </div>

                        <aside className="flex flex-col gap-5">
                            <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                                <div className="flex justify-between">
                                    <p className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
                                        Recrutadora designada
                                    </p>
                                    <Badge className="border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-50">
                                        Atribuída
                                    </Badge>
                                </div>
                                <div className="mt-4 flex items-center gap-3">
                                    <span className="flex size-12 items-center justify-center rounded-full bg-teal-100 font-semibold text-teal-800">
                                        ML
                                    </span>
                                    <div>
                                        <h2 className="font-semibold">
                                            Mariana Lopes
                                        </h2>
                                        <p className="text-xs text-slate-500">
                                            Tech Recruiter Sênior B2B
                                        </p>
                                        <p className="mt-1 text-xs font-medium text-emerald-700">
                                            <Star className="mr-1 inline size-3" />
                                            4,9 · 18 anos
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4 grid grid-cols-2 gap-2">
                                    <div className="rounded-md bg-slate-50 p-3 dark:bg-slate-950">
                                        <p className="text-[10px] font-semibold text-slate-500 uppercase">
                                            Retenção PJ
                                        </p>
                                        <p className="mt-1 text-xl font-semibold">
                                            98%
                                        </p>
                                    </div>
                                    <div className="rounded-md bg-slate-50 p-3 dark:bg-slate-950">
                                        <p className="text-[10px] font-semibold text-slate-500 uppercase">
                                            Resposta
                                        </p>
                                        <p className="mt-1 text-xl font-semibold text-teal-700">
                                            &lt; 20 min
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                                <header className="flex items-center gap-3 border-b border-slate-100 p-4 dark:border-slate-800">
                                    <span className="flex size-9 items-center justify-center rounded-full bg-teal-700 font-semibold text-white">
                                        ML
                                    </span>
                                    <div>
                                        <h2 className="text-sm font-semibold">
                                            Chat com Mariana
                                        </h2>
                                        <p className="text-[10px] text-emerald-700">
                                            Online agora
                                        </p>
                                    </div>
                                </header>
                                <div className="max-h-96 space-y-3 overflow-y-auto bg-slate-50 p-3 dark:bg-slate-950">
                                    {messages.map((item, index) => (
                                        <div
                                            key={`${item.body}-${index}`}
                                            className={`max-w-[92%] rounded-lg p-3 text-xs leading-5 ${item.mine ? 'ml-auto bg-teal-700 text-white' : 'bg-indigo-50 text-indigo-950 dark:bg-indigo-950 dark:text-indigo-100'}`}
                                        >
                                            <p className="mb-1 text-[10px] font-semibold opacity-75">
                                                {item.from}
                                            </p>
                                            {item.body}
                                        </div>
                                    ))}
                                </div>
                                <form
                                    className="flex items-center gap-1 border-t border-slate-100 p-2 dark:border-slate-800"
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                        sendMessage();
                                    }}
                                >
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        aria-label="Anexar arquivo"
                                    >
                                        <Paperclip className="size-4" />
                                    </Button>
                                    <label className="flex-1">
                                        <span className="sr-only">
                                            Mensagem para Mariana
                                        </span>
                                        <input
                                            value={message}
                                            onChange={(event) =>
                                                setMessage(event.target.value)
                                            }
                                            placeholder="Mensagem para Mariana"
                                            className="h-9 w-full rounded-md bg-slate-50 px-3 text-xs outline-none focus:ring-2 focus:ring-teal-700/20 dark:bg-slate-950"
                                        />
                                    </label>
                                    <Button
                                        type="submit"
                                        size="icon"
                                        aria-label="Enviar mensagem"
                                        className="bg-teal-700 text-white hover:bg-teal-800"
                                        disabled={!message.trim()}
                                    >
                                        <Send className="size-4" />
                                    </Button>
                                </form>
                            </section>

                            <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                                <h2 className="flex items-center gap-2 text-sm font-semibold">
                                    <CircleHelp className="size-4 text-teal-700" />
                                    Dúvidas sobre hunting
                                </h2>
                                <p className="mt-2 text-xs leading-5 text-slate-500">
                                    Se o profissional não concluir o primeiro
                                    mês, a garantia de substituição permite
                                    repor o candidato sem nova taxa em até 10
                                    dias úteis.
                                </p>
                            </section>
                        </aside>
                    </div>
                </div>
            </main>
        </>
    );
}

CompanyRecruitment.layout = {
    breadcrumbs: [
        { title: 'Visão geral', href: dashboard() },
        { title: 'Recrutamento', href: '/recrutamento' },
    ],
};
