import type { Component } from 'svelte';
import { MessageSquare, Zap, FolderOpen } from '@lucide/svelte';
import { FILE_TYPE_ICONS } from '$lib/constants/icons';
import {
	AttachmentAction,
	AttachmentItemEnabledWhen,
	AttachmentItemVisibleWhen,
	AttachmentMenuItemId
} from '$lib/enums';
import { m } from '$lib/paraglide/messages.js';

export interface AttachmentMenuItem {
	/** Unique identifier for the item */
	id: AttachmentMenuItemId;
	/** Display label */
	label: () => string;
	/** Lucide icon component */
	icon: Component;
	/** Extra CSS class applied to the item (e.g. for test selectors) */
	class?: string;
	/** Whether the item requires a specific modality to be enabled */
	enabledWhen?: AttachmentItemEnabledWhen;
	/** Tooltip shown when the item is disabled */
	disabledTooltip?: () => string;
	/** Callback key on the Props interface to invoke when clicked */
	action: AttachmentAction;
	/** Whether the item is only shown when a specific capability is present */
	visibleWhen?: AttachmentItemVisibleWhen;
	/** Whether this item has a tooltip even when enabled (uses dynamic text) */
	hasEnabledTooltip?: boolean;
}

/**
 * File attachment menu items shown in both the desktop dropdown and mobile sheet.
 * The "Tools" submenu is handled separately by each component.
 */
export const ATTACHMENT_FILE_ITEMS: AttachmentMenuItem[] = [
	{
		id: AttachmentMenuItemId.IMAGES,
		label: () => m.attachment_images(),
		icon: FILE_TYPE_ICONS.image,
		class: 'images-button',
		enabledWhen: AttachmentItemEnabledWhen.HAS_VISION_MODALITY,
		disabledTooltip: () => m.attachment_images_disabled_tooltip(),
		action: AttachmentAction.FILE_UPLOAD
	},
	{
		id: AttachmentMenuItemId.AUDIO,
		label: () => m.attachment_audio_files(),
		icon: FILE_TYPE_ICONS.audio,
		class: 'audio-button',
		enabledWhen: AttachmentItemEnabledWhen.HAS_AUDIO_MODALITY,
		disabledTooltip: () => m.attachment_audio_disabled_tooltip(),
		action: AttachmentAction.FILE_UPLOAD
	},
	{
		id: AttachmentMenuItemId.VIDEO,
		label: () => m.attachment_video_files(),
		icon: FILE_TYPE_ICONS.video,
		class: 'video-button',
		enabledWhen: AttachmentItemEnabledWhen.HAS_VIDEO_MODALITY,
		disabledTooltip: () => m.attachment_video_disabled_tooltip(),
		action: AttachmentAction.FILE_UPLOAD
	},
	{
		id: AttachmentMenuItemId.TEXT,
		label: () => m.attachment_text_files(),
		icon: FILE_TYPE_ICONS.text,
		enabledWhen: AttachmentItemEnabledWhen.ALWAYS,
		action: AttachmentAction.FILE_UPLOAD
	},
	{
		id: AttachmentMenuItemId.PDF,
		label: () => m.attachment_pdf_files(),
		icon: FILE_TYPE_ICONS.pdf,
		enabledWhen: AttachmentItemEnabledWhen.ALWAYS,
		disabledTooltip: () => m.attachment_pdf_disabled_tooltip(),
		hasEnabledTooltip: true,
		action: AttachmentAction.FILE_UPLOAD
	}
];

export const ATTACHMENT_EXTRA_ITEMS: AttachmentMenuItem[] = [
	{
		id: AttachmentMenuItemId.SYSTEM_MESSAGE,
		label: () => m.attachment_system_message(),
		icon: MessageSquare,
		enabledWhen: AttachmentItemEnabledWhen.ALWAYS,
		hasEnabledTooltip: true,
		action: AttachmentAction.SYSTEM_PROMPT_CLICK
	}
];

export const ATTACHMENT_MCP_ITEMS: AttachmentMenuItem[] = [
	{
		id: AttachmentMenuItemId.MCP_PROMPT,
		label: () => m.attachment_mcp_prompt(),
		icon: Zap,
		enabledWhen: AttachmentItemEnabledWhen.ALWAYS,
		action: AttachmentAction.MCP_PROMPT_CLICK,
		visibleWhen: AttachmentItemVisibleWhen.HAS_MCP_PROMPTS_SUPPORT
	},
	{
		id: AttachmentMenuItemId.MCP_RESOURCES,
		label: () => m.attachment_mcp_resources(),
		icon: FolderOpen,
		enabledWhen: AttachmentItemEnabledWhen.ALWAYS,
		action: AttachmentAction.MCP_RESOURCES_CLICK,
		visibleWhen: AttachmentItemVisibleWhen.HAS_MCP_RESOURCES_SUPPORT
	}
];

export const ATTACHMENT_TOOLTIP_TEXT = () => m.attachment_tooltip_text();
