import { usePage } from '@inertiajs/react';
import { Bell, Mail, Plus, Search, ShieldCheck } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const { auth } = usePage().props;
    const isCompany = auth.user.primary_account_type === 'company';

    return (
        <header className="border-sidebar-border/50 flex h-16 shrink-0 items-center justify-between gap-3 border-b bg-white px-4 transition-[width,height] ease-linear md:px-6 dark:bg-slate-950">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            {isCompany && (
                <div className="flex flex-1 items-center justify-end gap-1.5 sm:gap-2">
                    <label className="relative hidden max-w-sm flex-1 lg:block">
                        <span className="sr-only">Buscar na plataforma</span>
                        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="search"
                            placeholder="Buscar projetos, profissionais e contratos"
                            className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pr-3 pl-9 text-xs outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15 dark:border-slate-800 dark:bg-slate-900"
                        />
                    </label>
                    <span className="hidden items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-semibold tracking-wide text-emerald-800 uppercase xl:flex dark:bg-emerald-950 dark:text-emerald-300">
                        <ShieldCheck className="size-3.5" /> Empresa verificada
                    </span>
                    <Button variant="ghost" size="icon" aria-label="Mensagens">
                        <Mail className="size-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Notificações"
                        className="relative"
                    >
                        <Bell className="size-4" />
                        <span className="absolute top-2 right-2 size-1.5 rounded-full bg-red-600" />
                    </Button>
                    <Button
                        size="sm"
                        className="hidden bg-teal-700 text-white hover:bg-teal-800 sm:flex"
                    >
                        <Plus className="size-4" /> Publicar serviço
                    </Button>
                </div>
            )}
        </header>
    );
}
