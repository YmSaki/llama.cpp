<script lang="ts">
	import { Server } from '@lucide/svelte';
	import { ServerStatus } from '$lib/components/app';
	import { fade } from 'svelte/transition';
	import { m } from '$lib/paraglide/messages.js';

	interface Props {
		class?: string;
		message?: string;
	}

	let { class: className = '', message }: Props = $props();
	let effectiveMessage = $derived(message ?? m.server_loading_initializing());
</script>

<div class="flex h-full items-center justify-center {className}">
	<div class="text-center">
		<div class="mb-4" in:fade={{ duration: 300 }}>
			<div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
				<Server class="h-8 w-8 animate-pulse text-muted-foreground" />
			</div>

			<h2 class="mb-2 text-xl font-semibold">{m.server_loading_connecting()}</h2>

			<p class="text-sm text-muted-foreground">
				{effectiveMessage}
			</p>
		</div>

		<div class="mt-4">
			<ServerStatus class="justify-center" />
		</div>
	</div>
</div>
