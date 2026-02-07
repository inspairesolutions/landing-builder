import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema, ContactFormData } from '../../lib/validation'
import { COMPANY } from '../../lib/constants'

const WEB3FORMS_ACCESS_KEY = '5580598e-1c94-46f2-bb39-ffaecb2e7ccc'

export default function ContactForm() {
  const { t } = useTranslation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: data.name,
          email: data.email,
          company: data.company || 'N/A',
          message: data.message,
          subject: `New inquiry from ${data.name} - InspAIre Solutions`,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        reset()
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="section-padding relative">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="relative p-8 md:p-10 rounded-2xl bg-white/50 dark:bg-white/[0.03] backdrop-blur-xl border border-slate-200 dark:border-white/[0.08]">
            <h3 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-2">
              {t('contact.title')}
            </h3>
            <p className="text-slate-600 dark:text-white/50 mb-8">
              {t('contact.subtitle')}
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700 dark:text-white/70 mb-2"
                >
                  {t('contact.form.name')}
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name')}
                  className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus:outline-none focus:border-neon-blue dark:focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-blue dark:focus:ring-neon-cyan/50 transition-all"
                  placeholder={t('contact.form.namePlaceholder')}
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-neon-pink">{t(errors.name.message!)}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 dark:text-white/70 mb-2"
                >
                  {t('contact.form.email')}
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus:outline-none focus:border-neon-blue dark:focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-blue dark:focus:ring-neon-cyan/50 transition-all"
                  placeholder={t('contact.form.emailPlaceholder')}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-neon-pink">{t(errors.email.message!)}</p>
                )}
              </div>

              {/* Company */}
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-slate-700 dark:text-white/70 mb-2"
                >
                  {t('contact.form.company')}
                </label>
                <input
                  id="company"
                  type="text"
                  {...register('company')}
                  className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus:outline-none focus:border-neon-blue dark:focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-blue dark:focus:ring-neon-cyan/50 transition-all"
                  placeholder={t('contact.form.companyPlaceholder')}
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-700 dark:text-white/70 mb-2"
                >
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register('message')}
                  className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus:outline-none focus:border-neon-blue dark:focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-blue dark:focus:ring-neon-cyan/50 transition-all resize-none"
                  placeholder={t('contact.form.messagePlaceholder')}
                />
                {errors.message && (
                  <p className="mt-2 text-sm text-neon-pink">{t(errors.message.message!)}</p>
                )}
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn-glow w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>
                  {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
                </span>
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm text-center">
                  {t('contact.form.success')}
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm text-center">
                  {t('contact.form.error')}
                </div>
              )}

              <p className="text-xs text-slate-400 dark:text-white/30 text-center">
                {t('contact.form.disclaimer')}
              </p>
            </form>
          </div>

          {/* Office Info & Map */}
          <div className="space-y-6">
            {/* Email Direct */}
            <div className="relative p-8 rounded-2xl bg-white/50 dark:bg-white/[0.03] backdrop-blur-xl border border-slate-200 dark:border-white/[0.08]">
              <h4 className="text-lg font-heading font-semibold text-slate-900 dark:text-white mb-4">
                {t('contact.emailDirect')}
              </h4>
              <a
                href={`mailto:${COMPANY.email}`}
                className="inline-flex items-center gap-2 text-neon-blue dark:text-neon-cyan hover:text-neon-blue/80 dark:hover:text-neon-cyan/80 transition-colors font-mono text-sm"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {COMPANY.email}
              </a>
            </div>

            {/* Office Address */}
            <div className="relative p-8 rounded-2xl bg-white/50 dark:bg-white/[0.03] backdrop-blur-xl border border-slate-200 dark:border-white/[0.08]">
              <h4 className="text-lg font-heading font-semibold text-slate-900 dark:text-white mb-4">
                {t('contact.office.title')}
              </h4>
              <div className="flex items-start gap-3 text-slate-600 dark:text-white/60 mb-6">
                <svg className="w-5 h-5 mt-0.5 text-neon-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p>{t('contact.office.address1')}</p>
                  <p>{t('contact.office.address2')}</p>
                </div>
              </div>

              {/* Map */}
              <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-200 dark:border-white/10">
                <iframe
                  src={COMPANY.maps.embedUrl}
                  width="100%"
                  height="100%"
                  className="dark:invert dark:grayscale dark:contrast-90"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl translate-x-1/2" />
    </section>
  )
}
