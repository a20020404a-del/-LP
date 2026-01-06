import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button, Container } from '@/components/common';
import { cn } from '@/utils/cn';

/**
 * Contact form validation schema
 */
const contactSchema = z.object({
  name: z.string().min(1, '名前を入力してください'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  phone: z.string().optional(),
  message: z.string().min(10, '10文字以上入力してください'),
  privacy: z.boolean().refine((v) => v, '同意が必要です'),
});

type ContactFormData = z.infer<typeof contactSchema>;

/**
 * Form field component with accessibility support
 */
interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

function FormField({ id, label, error, required, children }: FormFieldProps) {
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-white">
        {label}
        {required && (
          <span className="ml-1 text-red-400" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={errorId} role="alert" className="mt-1 flex items-center gap-1 text-sm text-red-400">
          <AlertCircle className="h-4 w-4" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Contact section with form
 *
 * Features:
 * - Form validation with React Hook Form + Zod
 * - Loading state on submit
 * - Success/Error messages
 * - Privacy policy checkbox
 * - Gradient background
 * - Framer Motion animations
 *
 * @example
 * ```tsx
 * <Contact />
 * ```
 */
export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    console.log('Form submitted:', data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();
  };

  const inputClass = cn(
    'w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3',
    'text-white placeholder-white/50',
    'focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20',
    'transition-colors duration-200'
  );

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600 py-20"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 id="contact-heading" className="mb-4 text-3xl font-bold text-white md:text-4xl">
            今すぐ始めよう
          </h2>
          <p className="mb-10 text-lg text-blue-100">
            無料トライアルで、その効果を実感してください
          </p>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl bg-white/10 p-8 backdrop-blur-sm"
            >
              <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-400" />
              <h3 className="mb-2 text-xl font-semibold text-white">送信完了しました</h3>
              <p className="text-blue-100">
                お問い合わせありがとうございます。担当者より2営業日以内にご連絡いたします。
              </p>
              <Button
                variant="outline"
                className="mt-6 border-white text-white hover:bg-white/10"
                onClick={() => setIsSubmitted(false)}
              >
                新しいお問い合わせ
              </Button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-2xl bg-white/10 p-8 backdrop-blur-sm"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <FormField id="contact-name" label="お名前" required error={errors.name?.message}>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="山田 太郎"
                    autoComplete="name"
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    className={inputClass}
                    {...register('name')}
                  />
                </FormField>

                <FormField
                  id="contact-email"
                  label="メールアドレス"
                  required
                  error={errors.email?.message}
                >
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="example@email.com"
                    autoComplete="email"
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    className={inputClass}
                    {...register('email')}
                  />
                </FormField>
              </div>

              <FormField id="contact-phone" label="電話番号" error={errors.phone?.message}>
                <input
                  id="contact-phone"
                  type="tel"
                  placeholder="03-1234-5678"
                  autoComplete="tel"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                  className={inputClass}
                  {...register('phone')}
                />
              </FormField>

              <FormField
                id="contact-message"
                label="お問い合わせ内容"
                required
                error={errors.message?.message}
              >
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="ご質問やご要望をお書きください"
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  className={cn(inputClass, 'resize-none')}
                  {...register('message')}
                />
              </FormField>

              <div className="mb-6">
                <label htmlFor="contact-privacy" className="flex items-start gap-3">
                  <input
                    id="contact-privacy"
                    type="checkbox"
                    aria-required="true"
                    aria-invalid={!!errors.privacy}
                    aria-describedby={errors.privacy ? 'contact-privacy-error' : undefined}
                    className="mt-1 h-4 w-4 rounded border-white/20 bg-white/10 text-primary-600 focus:ring-white/20"
                    {...register('privacy')}
                  />
                  <span className="text-sm text-white/80">
                    <a href="#privacy" className="underline hover:text-white">
                      プライバシーポリシー
                    </a>
                    に同意します
                    <span className="sr-only">（必須）</span>
                  </span>
                </label>
                {errors.privacy && (
                  <p
                    id="contact-privacy-error"
                    role="alert"
                    className="mt-1 flex items-center gap-1 text-sm text-red-400"
                  >
                    <AlertCircle className="h-4 w-4" aria-hidden="true" />
                    {errors.privacy.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                fullWidth
                disabled={isSubmitting}
                className="bg-white text-blue-600 hover:bg-blue-50"
                rightIcon={isSubmitting ? undefined : <Send className="h-5 w-5" />}
              >
                {isSubmitting ? '送信中...' : '送信する'}
              </Button>
            </motion.form>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
