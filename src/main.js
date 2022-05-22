import './app.css'
import App from './App.svelte'
import mockup from './assets/mockup.svg'

const imageTemplates = [{ name: 'mockup', source: mockup }]
const languages = [
	{ key: 'de-DE', name: 'deutsch', checked: true },
	{ key: 'en-US', name: 'englisch', checked: false },
	{ key: 'es-ES', name: 'spanisch', checked: false },
	{ key: 'fr-FR', name: 'französisch', checked: false },
	{ key: 'ru-RU', name: 'russisch', checked: false },
]

const app = new App({
	target: document.getElementById('app'),
	props: {
		imageTemplates,
		languages,
	}
})

export default app
