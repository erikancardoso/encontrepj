import { useState } from 'react';
import {
    ArrowRight,
    Bot,
    CheckCircle2,
    CircleAlert,
    FileCheck2,
    FileText,
    Flag,
    Headphones,
    MessageSquare,
    Mic,
    Paperclip,
    ReceiptText,
    SearchCheck,
    ShieldCheck,
    Sparkles,
    Users,
    WalletCards,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const metrics = [
    {
        label: 'Projetos ativos',
        value: '5',
        detail: 'em andamento',
        note: '+2 no mês',
        icon: FileText,
    },
    {
        label: 'Oportunidades',
        value: '3',
        detail: 'vagas PJ',
        note: '18 propostas recebidas',
        icon: SearchCheck,
    },
    {
        label: 'Candidaturas',
        value: '12',
        detail: 'pendentes',
        note: '4 perfis com match acima de 90%',
        icon: Users,
    },
    {
        label: 'Contratos e NFes',
        value: '8',
        detail: 'ativos',
        note: '2 notas a aprovar',
        icon: ReceiptText,
    },
    {
        label: 'Faturamento do mês',
        value: 'R$ 64.800',
        detail: '',
        note: 'Ciclo encerra em 5 dias',
        icon: WalletCards,
    },
    {
        label: 'Marcos e sprints',
        value: '14',
        detail: 'entregas',
        note: '92% dentro do prazo',
        icon: Flag,
    },
];

const projects = [
    {
        name: 'Migração Cloud e Microsserviços',
        area: 'DevOps e Arquitetura AWS',
        professional: 'Lucas Berti',
        company: 'Berti Cloud Tech ME',
        progress: 75,
        sprint: 'Sprint 6',
        value: 'R$ 18.500,00',
        billing: 'NFe a aprovar',
        deadline: '15 nov. 2026',
        status: 'Revisão',
    },
    {
        name: 'Redesign Design System B2B',
        area: 'UI/UX Design e Protótipo',
        professional: 'Camila Duarte',
        company: 'Duarte Studio EIRELI',
        progress: 90,
        sprint: 'Sprint 4',
        value: 'R$ 12.000,00',
        billing: 'Faturamento em dia',
        deadline: '30 out. 2026',
        status: 'Fase final',
    },
    {
        name: 'Integração Gateway PIX',
        area: 'Backend Python e FastAPI',
        professional: 'Matheus Alencar',
        company: 'Alencar Soluções Digitais',
        progress: 40,
        sprint: 'Sprint 2',
        value: 'R$ 14.500,00',
        billing: 'NFe a aprovar',
        deadline: '10 dez. 2026',
        status: 'Em andamento',
    },
    {
        name: 'Aplicativo Mobile Flutter',
        area: 'Engenharia Mobile iOS/Android',
        professional: 'Rafael Aragão',
        company: 'Mobile Craft Ltda.',
        progress: 60,
        sprint: 'Sprint 3',
        value: 'R$ 10.600,00',
        billing: 'Faturamento em dia',
        deadline: '22 nov. 2026',
        status: 'Em andamento',
    },
    {
        name: 'Auditoria de Compliance LGPD',
        area: 'Jurídico e DPO as a Service',
        professional: 'Valéria Moura',
        company: 'Moura & Associados',
        progress: 15,
        sprint: 'Fase 1',
        value: 'R$ 9.200,00',
        billing: 'Faturamento em dia',
        deadline: '18 jan. 2027',
        status: 'Início',
    },
];

const pendingActions = [
    {
        icon: ReceiptText,
        title: 'Aprovar nota fiscal (NFe #1042)',
        description:
            'Emitida por Matheus Alencar Consultoria ME — R$ 18.500,00',
        meta: 'Sprint 5 · Entrega Microsserviços API',
        action: 'Aprovar e programar PIX',
    },
    {
        icon: FileCheck2,
        title: 'Validar entrega de marco técnico',
        description: 'Protótipo de alta fidelidade enviado por Camila Duarte.',
        meta: 'A aprovação libera o próximo lote de pagamento.',
        action: 'Validar marco',
    },
    {
        icon: Users,
        title: 'Revisar 4 candidaturas com alta aderência',
        description:
            'Vaga: DevOps Engineer AWS Sênior · perfis com CNPJ ativo.',
        meta: 'Candidatos pré-qualificados pelo matching EncontrePJ.',
        action: 'Abrir triagem',
    },
];

const templates = [
    'Desenvolvedor PJ',
    'Designer UI/UX',
    'Especialista fiscal',
    'Arquiteto Cloud AWS',
];

export function CompanyDashboard() {
    const [briefing, setBriefing] = useState('');
    const [recording, setRecording] = useState(false);
    const [feedback, setFeedback] = useState('');

    function useTemplate(template: string) {
        setBriefing(
            `Preciso contratar ${template} para um projeto por prazo determinado, com entregas organizadas por marcos e emissão de nota fiscal.`,
        );
        setFeedback(`Modelo de ${template} aplicado ao briefing.`);
    }

    return (
        <main className="min-h-full bg-slate-50/80 px-4 py-6 text-slate-950 lg:px-6 dark:bg-slate-950 dark:text-slate-50">
            <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-5">
                <header className="flex flex-col justify-between gap-3 xl:flex-row xl:items-end">
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
                                Olá, Fornecedor!
                            </h1>
                            <Badge className="border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
                                PRO
                            </Badge>
                        </div>
                        <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                            Acompanhe suas operações PJ.{' '}
                            <span className="font-medium text-red-700 dark:text-red-400">
                                3 ações aguardam sua validação.
                            </span>
                        </p>
                    </div>
                    <div className="flex w-fit items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <span
                            className="size-2 rounded-full bg-emerald-600"
                            aria-hidden="true"
                        />
                        <div>
                            <p className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
                                Gateway PJ integrado
                            </p>
                            <p className="text-xs font-medium">
                                Liquidação via PIX ativa
                            </p>
                        </div>
                    </div>
                </header>

                <section
                    id="publicar-servico"
                    aria-labelledby="publish-title"
                    className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 dark:border-slate-800 dark:bg-slate-900"
                >
                    <div className="flex items-start gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-teal-700 text-white">
                            <Sparkles className="size-4" />
                        </div>
                        <div>
                            <h2 id="publish-title" className="font-semibold">
                                Publicar novo serviço PJ
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Descreva por texto ou grave um áudio para
                                transcrição.
                            </p>
                        </div>
                    </div>
                    <label htmlFor="briefing" className="sr-only">
                        Descrição do novo serviço
                    </label>
                    <textarea
                        id="briefing"
                        value={briefing}
                        onChange={(event) => setBriefing(event.target.value)}
                        rows={3}
                        className="mt-4 w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm leading-6 transition outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15 dark:border-slate-700 dark:bg-slate-950"
                        placeholder="Ex.: Preciso de um Desenvolvedor Full Stack Sênior PJ por 6 meses, com início imediato e emissão de NFe mensal..."
                    />
                    <div className="mt-3 flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
                        <div className="flex flex-wrap gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setRecording(!recording)}
                                className={
                                    recording
                                        ? 'border-red-300 text-red-700'
                                        : ''
                                }
                            >
                                <Mic className="size-4" />
                                {recording
                                    ? 'Parar gravação'
                                    : 'Gravar briefing'}
                            </Button>
                            <Button type="button" variant="outline" size="sm">
                                <Paperclip className="size-4" />
                                Anexar TR / PDF
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    setFeedback(
                                        'Rascunho de escopo gerado para revisão.',
                                    )
                                }
                            >
                                <Bot className="size-4" />
                                Gerar escopo com IA
                            </Button>
                            <Button
                                type="button"
                                size="sm"
                                className="bg-teal-700 text-white hover:bg-teal-800"
                                onClick={() =>
                                    setFeedback(
                                        'Briefing salvo. Complete os requisitos antes da publicação.',
                                    )
                                }
                                disabled={!briefing.trim()}
                            >
                                Continuar publicação
                                <ArrowRight className="size-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
                        <span className="text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                            Sugestões rápidas
                        </span>
                        {templates.map((template) => (
                            <button
                                key={template}
                                type="button"
                                onClick={() => useTemplate(template)}
                                className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600 transition hover:bg-slate-200 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
                            >
                                + {template}
                            </button>
                        ))}
                    </div>
                    {feedback && (
                        <p
                            role="status"
                            className="mt-3 text-xs font-medium text-teal-800 dark:text-teal-300"
                        >
                            {feedback}
                        </p>
                    )}
                </section>

                <section
                    id="pagamentos"
                    aria-label="Resumo operacional"
                    className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6"
                >
                    {metrics.map(
                        ({ label, value, detail, note, icon: Icon }) => (
                            <div
                                key={label}
                                className="min-h-28 rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <p className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
                                        {label}
                                    </p>
                                    <Icon className="size-4 text-teal-700 dark:text-teal-400" />
                                </div>
                                <div className="mt-3 flex flex-wrap items-baseline gap-1">
                                    <strong className="text-xl font-semibold tracking-tight tabular-nums">
                                        {value}
                                    </strong>
                                    {detail && (
                                        <span className="text-xs text-slate-500">
                                            {detail}
                                        </span>
                                    )}
                                </div>
                                <p className="mt-2 text-[11px] leading-4 text-slate-500 dark:text-slate-400">
                                    {note}
                                </p>
                            </div>
                        ),
                    )}
                </section>

                <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
                    <div className="flex min-w-0 flex-col gap-5">
                        <section
                            id="projetos"
                            aria-labelledby="projects-title"
                            className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
                        >
                            <div className="flex flex-col justify-between gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center dark:border-slate-800">
                                <div>
                                    <h2
                                        id="projects-title"
                                        className="text-lg font-semibold tracking-tight"
                                    >
                                        Projetos em andamento
                                    </h2>
                                    <p className="text-xs text-slate-500">
                                        Contratos ativos, marcos e faturamento.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    <Badge className="bg-teal-700 text-white">
                                        Todos (5)
                                    </Badge>
                                    {[
                                        'Dev (2)',
                                        'Design (1)',
                                        'Infra (1)',
                                        'Consultoria (1)',
                                    ].map((filter) => (
                                        <Badge key={filter} variant="secondary">
                                            {filter}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[850px] text-left text-xs">
                                    <thead className="bg-slate-50 text-[10px] tracking-wider text-slate-500 uppercase dark:bg-slate-950">
                                        <tr>
                                            <th className="px-4 py-3">
                                                Projeto e área
                                            </th>
                                            <th className="px-4 py-3">
                                                Profissional PJ
                                            </th>
                                            <th className="px-4 py-3">
                                                Progresso
                                            </th>
                                            <th className="px-4 py-3">
                                                Valor mensal
                                            </th>
                                            <th className="px-4 py-3">Prazo</th>
                                            <th className="px-4 py-3">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {projects.map((project) => (
                                            <tr
                                                key={project.name}
                                                className="transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                            >
                                                <td className="px-4 py-3">
                                                    <p className="font-semibold">
                                                        {project.name}
                                                    </p>
                                                    <p className="mt-0.5 text-[11px] text-slate-500">
                                                        {project.area}
                                                    </p>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <span className="flex size-7 items-center justify-center rounded-full bg-teal-100 font-semibold text-teal-800">
                                                            {project.professional
                                                                .split(' ')
                                                                .map(
                                                                    (part) =>
                                                                        part[0],
                                                                )
                                                                .join('')
                                                                .slice(0, 2)}
                                                        </span>
                                                        <div>
                                                            <p className="font-medium">
                                                                {
                                                                    project.professional
                                                                }
                                                            </p>
                                                            <p className="text-[10px] text-slate-500">
                                                                {
                                                                    project.company
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="mb-1 flex justify-between text-[10px] tabular-nums">
                                                        <span>
                                                            {project.progress}%
                                                        </span>
                                                        <span className="text-slate-500">
                                                            {project.sprint}
                                                        </span>
                                                    </div>
                                                    <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                                        <div
                                                            className="h-full rounded-full bg-teal-700"
                                                            style={{
                                                                width: `${project.progress}%`,
                                                            }}
                                                        />
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <p className="font-semibold tabular-nums">
                                                        {project.value}
                                                    </p>
                                                    <p
                                                        className={
                                                            project.billing.includes(
                                                                'aprovar',
                                                            )
                                                                ? 'text-[10px] text-red-700 dark:text-red-400'
                                                                : 'text-[10px] text-emerald-700 dark:text-emerald-400'
                                                        }
                                                    >
                                                        {project.billing}
                                                    </p>
                                                </td>
                                                <td className="px-4 py-3 tabular-nums">
                                                    {project.deadline}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <Badge
                                                        variant="secondary"
                                                        className="font-medium"
                                                    >
                                                        {project.status}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-2.5 text-[11px] text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
                                <span className="flex items-center gap-1">
                                    <ShieldCheck className="size-3.5 text-teal-700" />
                                    Contratos individuais e ambientes privados
                                    por profissional
                                </span>
                                <button
                                    type="button"
                                    className="font-medium text-teal-800 hover:underline dark:text-teal-300"
                                >
                                    Ver todos os projetos
                                </button>
                            </div>
                        </section>

                        <section
                            id="candidaturas"
                            aria-labelledby="actions-title"
                            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                        >
                            <div className="flex items-center justify-between gap-3">
                                <h2
                                    id="actions-title"
                                    className="flex items-center gap-2 text-lg font-semibold tracking-tight"
                                >
                                    <CircleAlert className="size-5 text-red-700" />
                                    Ações pendentes
                                </h2>
                                <Badge className="border-red-200 bg-red-50 text-red-700 hover:bg-red-50">
                                    3 exigem resposta
                                </Badge>
                            </div>
                            <div className="mt-4 divide-y divide-slate-200 rounded-lg border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
                                {pendingActions.map(
                                    ({
                                        icon: Icon,
                                        title,
                                        description,
                                        meta,
                                        action,
                                    }) => (
                                        <article
                                            key={title}
                                            className="flex flex-col gap-3 p-4 lg:flex-row lg:items-center"
                                        >
                                            <div className="flex min-w-0 flex-1 gap-3">
                                                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                                                    <Icon className="size-4" />
                                                </span>
                                                <div>
                                                    <h3 className="text-sm font-semibold">
                                                        {title}
                                                    </h3>
                                                    <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-300">
                                                        {description}
                                                    </p>
                                                    <p className="mt-1 text-[11px] text-slate-500">
                                                        {meta}
                                                    </p>
                                                </div>
                                            </div>
                                            <Button
                                                type="button"
                                                size="sm"
                                                className="self-start bg-teal-700 text-white hover:bg-teal-800 lg:self-auto"
                                                onClick={() =>
                                                    setFeedback(
                                                        `${action}: ação registrada para demonstração.`,
                                                    )
                                                }
                                            >
                                                {action}
                                            </Button>
                                        </article>
                                    ),
                                )}
                            </div>
                        </section>
                    </div>

                    <aside className="flex flex-col gap-5">
                        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <span id="empresa" className="sr-only">
                                Dados da empresa
                            </span>
                            <div className="flex items-center justify-between">
                                <h2 className="flex items-center gap-2 text-sm font-semibold">
                                    <ShieldCheck className="size-5 text-teal-700" />
                                    Verificação cadastral
                                </h2>
                                <Badge variant="secondary">80%</Badge>
                            </div>
                            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                <div className="h-full w-4/5 bg-teal-700" />
                            </div>
                            <ul className="mt-4 space-y-3 text-xs">
                                {[
                                    'CNPJ e QSA verificados',
                                    'CND Federal válida',
                                    'Contrato social digital',
                                ].map((item) => (
                                    <li key={item} className="flex gap-2">
                                        <CheckCircle2 className="size-4 shrink-0 text-emerald-700" />
                                        {item}
                                    </li>
                                ))}
                                <li className="flex gap-2 text-red-700 dark:text-red-400">
                                    <CircleAlert className="size-4 shrink-0" />
                                    Comprovante da conta bancária pendente
                                </li>
                            </ul>
                            <Button
                                type="button"
                                className="mt-4 w-full bg-teal-700 text-white hover:bg-teal-800"
                            >
                                Completar verificação
                            </Button>
                        </section>
                        <section
                            id="recrutamento"
                            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                        >
                            <h2 className="flex items-center gap-2 text-sm font-semibold">
                                <Headphones className="size-5 text-sky-700" />
                                Recrutamento especializado
                            </h2>
                            <p className="mt-3 text-xs leading-5 text-slate-600 dark:text-slate-300">
                                Receba apoio para avaliar experiência,
                                documentação e aderência dos melhores
                                profissionais PJ.
                            </p>
                            <Button
                                type="button"
                                variant="outline"
                                className="mt-4 w-full"
                            >
                                <MessageSquare className="size-4" />
                                Falar com recrutador
                            </Button>
                        </section>
                        <section
                            id="mensagens"
                            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                        >
                            <div className="flex items-center justify-between">
                                <h2 className="flex items-center gap-2 text-sm font-semibold">
                                    <MessageSquare className="size-5 text-sky-700" />
                                    Mensagens recentes
                                </h2>
                                <Badge variant="secondary">2 novas</Badge>
                            </div>
                            <div className="mt-3 divide-y divide-slate-100 dark:divide-slate-800">
                                {[
                                    [
                                        'Camila Duarte',
                                        'Enviei os componentes atualizados.',
                                        '14:20',
                                    ],
                                    [
                                        'Matheus Alencar',
                                        'Subi a branch de staging.',
                                        '11:05',
                                    ],
                                    [
                                        'Felipe Prado',
                                        'Tenho disponibilidade imediata.',
                                        'Ontem',
                                    ],
                                ].map(([name, message, time]) => (
                                    <div key={name} className="py-3">
                                        <div className="flex justify-between gap-2">
                                            <p className="text-xs font-semibold">
                                                {name}
                                            </p>
                                            <span className="text-[10px] text-slate-500">
                                                {time}
                                            </span>
                                        </div>
                                        <p className="mt-1 truncate text-[11px] text-slate-500">
                                            {message}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <button
                                type="button"
                                className="mt-2 text-xs font-medium text-teal-800 hover:underline dark:text-teal-300"
                            >
                                Ver todas as mensagens
                            </button>
                        </section>
                    </aside>
                </div>
            </div>
        </main>
    );
}
