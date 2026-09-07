import { Link, usePage } from '@inertiajs/react';
import {
    Building2,
    CirclePlus,
    FileSignature,
    FolderKanban,
    LayoutGrid,
    MessageSquare,
    SearchCheck,
    Users,
    WalletCards,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Início',
        href: dashboard(),
        icon: LayoutGrid,
    },
];

const footerNavItems: NavItem[] = [];

const companyNavItems: NavItem[] = [
    { title: 'Visão geral', href: dashboard(), icon: LayoutGrid },
    { title: 'Projetos', href: '#projetos', icon: FolderKanban },
    { title: 'Publicar serviço', href: '#publicar-servico', icon: CirclePlus },
    { title: 'Candidaturas', href: '#candidaturas', icon: Users },
    { title: 'Recrutamento', href: '#recrutamento', icon: SearchCheck },
    { title: 'Contratos', href: '/contratos', icon: FileSignature },
    { title: 'Pagamentos', href: '#pagamentos', icon: WalletCards },
    { title: 'Mensagens', href: '#mensagens', icon: MessageSquare },
    { title: 'Empresa', href: '/empresa', icon: Building2 },
];

export function AppSidebar() {
    const { auth } = usePage().props;
    const isCompany = auth.user.primary_account_type === 'company';

    return (
        <Sidebar collapsible="icon" variant="sidebar">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {isCompany && (
                    <div className="mx-3 mb-4 rounded-lg bg-slate-100 p-3 group-data-[collapsible=icon]:hidden dark:bg-slate-800">
                        <p className="truncate text-sm font-semibold">
                            Fornecedor Teste
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-500">
                            Empresa contratante
                        </p>
                        <p className="mt-2 flex items-center gap-1 text-[10px] font-semibold tracking-wide text-emerald-700 uppercase dark:text-emerald-400">
                            <span className="size-1.5 rounded-full bg-emerald-600" />
                            Empresa verificada
                        </p>
                    </div>
                )}
                <NavMain items={isCompany ? companyNavItems : mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
