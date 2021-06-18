<template>
	<div class="d-flex flex-column">
		<div class="d-flex align-center">
			<v-combobox
				v-model="blockName"
				:items="blockList"
				label="Generate texture set for block"
				clearable
				auto-select-first
				solo
			></v-combobox>
		</div>

		<TextureSetOutput v-if="blockName" :block="blockName" />
	</div>
</template>

<script>
const { readJSON } = await require('@bridge/fs')
const { getCurrentRP } = await require('@bridge/env')
const { TextureSetOutput } = await require('@bridge/ui')

export default {
	name: 'TextureSetGenerator',
	components: {
		TextureSetOutput,
	},
	data: () => ({
		blockName: '',
		blockList: [],
	}),
	mounted() {
		this.updateBlocksList()
	},
	methods: {
		async updateBlocksList() {
			const blocksPath = `${getCurrentRP()}/blocks.json`
			const blocksData = await readJSON(blocksPath)
			const textures = []

			const blocks = Object.entries(blocksData)

			for (const block of blocks) {
				if (!block[1].textures) {
					continue
				}

				textures.push(
					...(typeof block[1].textures === 'string'
						? [block[1].textures]
						: Object.values(block[1].textures))
				)
			}

			const collection = [
				...new Set(textures, ...Object.keys(blocksData)),
			]
			collection.sort()

			this.blockList = collection
		},
	},
}
</script>
