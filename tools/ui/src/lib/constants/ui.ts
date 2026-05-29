import { m } from '$lib/paraglide/messages.js';
import { Settings, Search, SquarePen } from '@lucide/svelte';
import McpLogo from '$lib/components/app/mcp/McpLogo.svelte';
import type { Component } from 'svelte';
import { ROUTES } from './routes';

export const FORK_TREE_DEPTH_PADDING = 8;
export const SYSTEM_MESSAGE_PLACEHOLDER = 'System message';
export const APP_NAME = import.meta.env.VITE_PUBLIC_APP_NAME || 'llama-ui';

export const ICON_STRIP_TRANSITION_DURATION = 150;
export const ICON_STRIP_TRANSITION_DELAY_MULTIPLIER = 50;

export interface DesktopIconStripItem {
	icon: Component;
	tooltip: () => string;
	route?: string;
	activeRouteId?: string;
	activeRoutePrefix?: string;
	keys?: string[];
}

export const SIDEBAR_ACTIONS_ITEMS: DesktopIconStripItem[] = [
	{ icon: SquarePen, tooltip: () => m.sidebar_new_chat(), route: ROUTES.NEW_CHAT, keys: ['shift', 'cmd', 'o'] },
	{ icon: Search, tooltip: () => m.sidebar_search(), keys: ['cmd', 'k'] },
	{
		icon: McpLogo,
		tooltip: () => m.sidebar_mcp_servers(),
		route: ROUTES.MCP_SERVERS,
		activeRouteId: '/mcp-servers'
	},
	{
		icon: Settings,
		tooltip: () => m.sidebar_settings(),
		route: ROUTES.SETTINGS,
		activeRoutePrefix: '/settings'
	}
];
