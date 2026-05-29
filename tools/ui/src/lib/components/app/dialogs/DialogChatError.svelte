<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { AlertTriangle, TimerOff } from '@lucide/svelte';
	import { ErrorDialogType } from '$lib/enums';
	import { m } from '$lib/paraglide/messages.js';

	interface Props {
		open: boolean;
		type: ErrorDialogType;
		message: string;
		contextInfo?: { n_prompt_tokens: number; n_ctx: number };
		onOpenChange?: (open: boolean) => void;
	}

	let { open = $bindable(), type, message, contextInfo, onOpenChange }: Props = $props();

	const isTimeout = $derived(type === ErrorDialogType.TIMEOUT);
	const title = $derived(isTimeout ? m.dialog_error_timeout_title() : m.dialog_error_server_error_title());
	const description = $derived(
		isTimeout
			? m.dialog_error_timeout_description()
			: m.dialog_error_server_description()
	);
	const iconClass = $derived(isTimeout ? 'text-destructive' : 'text-amber-500');
	const badgeClass = $derived(
		isTimeout
			? 'border-destructive/40 bg-destructive/10 text-destructive'
			: 'border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400'
	);

	function handleOpenChange(newOpen: boolean) {
		open = newOpen;
		onOpenChange?.(newOpen);
	}
</script>

<AlertDialog.Root {open} onOpenChange={handleOpenChange}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title class="flex items-center gap-2">
				{#if isTimeout}
					<TimerOff class={`h-5 w-5 ${iconClass}`} />
				{:else}
					<AlertTriangle class={`h-5 w-5 ${iconClass}`} />
				{/if}

				{title}
			</AlertDialog.Title>

			<AlertDialog.Description>
				{description}
			</AlertDialog.Description>
		</AlertDialog.Header>

		<div class={`rounded-lg border px-4 py-3 text-sm ${badgeClass}`}>
			<p class="font-medium">{message}</p>

			{#if contextInfo}
				<div class="mt-2 space-y-1 text-xs opacity-80">
					<p>
						<span class="font-medium">{m.dialog_error_prompt_tokens()}</span>

						{contextInfo.n_prompt_tokens.toLocaleString()}
					</p>

					{#if contextInfo.n_ctx}
						<p>
							<span class="font-medium">{m.dialog_error_context_size()}</span>

							{contextInfo.n_ctx.toLocaleString()}
						</p>
					{/if}
				</div>
			{/if}
		</div>

		<AlertDialog.Footer>
			<AlertDialog.Action onclick={() => handleOpenChange(false)}>{m.dialog_error_close()}</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
