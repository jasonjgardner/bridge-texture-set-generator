try {
	const { create } = await require('@bridge/sidebar')
	const { TextureSetGenerator } = await require('@bridge/ui')

	create({
		id: 'co.jasongardner.textureSetGenerator',
		displayName: '[Texture Set Generator]',
		icon: 'mdi-buffer ',
		component: TextureSetGenerator,
	})
} catch (err) {
	console.error('Can not create Texture Set Generator sidebar entry: %s', err)
}
