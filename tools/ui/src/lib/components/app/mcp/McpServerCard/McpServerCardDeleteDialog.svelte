<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { m } from '$lib/paraglide/messages.js';

	interface Props {
		open: boolean;
		displayName: string;
		onOpenChange: (open: boolean) => void;
		onConfirm: () => void;
	}

	let { open = $bindable(), displayName, onOpenChange, onConfirm }: Props = $props();
</script>

<AlertDialog.Root bind:open {onOpenChange}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>{m.mcp_server_delete_title()}</AlertDialog.Title>

			<AlertDialog.Description>
				{@html m.mcp_server_delete_description({ displayName })}
			</AlertDialog.Description>
		</AlertDialog.Header>

		<AlertDialog.Footer>
			<AlertDialog.Cancel>{m.mcp_server_delete_cancel()}</AlertDialog.Cancel>

			<AlertDialog.Action
				class="text-destructive-foreground bg-destructive hover:bg-destructive/90"
				onclick={onConfirm}
			>
				{m.mcp_server_delete_confirm()}
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
