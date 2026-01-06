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
 * Form field component
 */
interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

function FormField({ label, error, required, children }: FormFieldProps) {
  return (
    <div className="mb-4">
      <label className="mb-2 block text-sm font-medium text-white">
        {label}
        {required && <span className="ml-1 text-red-400">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 flex items-center gap-1 text-sm text-red-400">
          <AlertCircle className="h-4 w-4" />
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
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
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
              <h3 className="mb-2 text-xl font-semibold text-white">
                送信完了しました
              </h3>
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
                <FormField label="お名前" required error={errors.name?.message}>
                  <input
                    type="text"
                    placeholder="山田 太郎"
                    className={inputClass}
                    {...register('name')}
                  />
                </FormField>

                <FormField label="メールアドレス" required error={errors.email?.message}>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    className={inputClass}
                    {...register('email')}
                  />
                </FormField>
              </div>

              <FormField label="電話番号" error={errors.phone?.message}>
                <input
                  type="tel"
                  placeholder="03-1234-5678"
                  className={inputClass}
                  {...register('phone')}
                />
              </FormField>

              <FormField label="お問い合わせ内容" required error={errors.message?.message}>
                <textarea
                  rows={4}
                  placeholder="ご質問やご要望をお書きください"
                  className={cn(inputClass, 'resize-none')}
                  {...register('message')}
                />
              </FormField>

              <div className="mb-6">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-white/20 bg-white/10 text-primary-600 focus:ring-white/20"
                    {...register('privacy')}
                  />
                  <span className="text-sm text-white/80">
                    <a href="#privacy" className="underline hover:text-white">
                      プライバシーポリシー
                    </a>
                    に同意します
                  </span>
                </label>
                {errors.privacy && (
                  <p className="mt-1 flex items-center gap-1 text-sm text-red-400">
                    <AlertCircle className="h-4 w-4" />
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
