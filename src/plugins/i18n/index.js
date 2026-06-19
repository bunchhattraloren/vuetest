import { createI18n } from 'vue-i18n'
import en from '../../locales/en.json'
import zhCN from '../../locales/zh-CN.json'

const savedLocale = localStorage.getItem('locale')
const defaultLocale = savedLocale || (navigator.language.startsWith('zh') ? 'zh-CN' : 'en')

const i18n = createI18n({
    legacy: false,
    locale: defaultLocale,
    fallbackLocale: 'en',
    messages: {
        en,
        'zh-CN': zhCN,
    },
})

export default i18n
