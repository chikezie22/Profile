import { Form, useNavigation } from 'react-router';
import type { Route } from '../contact/+types/index';
import { Resend } from 'resend';

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get('name');
  const email = formData.get('email') as string;
  const subject = formData.get('subject');
  const message = formData.get('message');
  const errors: Record<string, string> = {};
  if (!name) errors.name = 'name is required';
  if (!email) {
    errors.email = 'email is require';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'email is not valid';
  }
  if (!subject) errors.subject = 'subject is required';
  if (!message) errors.message = 'message is required';
  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  try {
    // Created per request so a missing key only breaks the form, not the whole site.
    const resend = new Resend(import.meta.env.VITE_API_RESEND);
    await resend.emails.send({
      from: `onboarding@resend.dev`,
      to: 'simonchikezie44@gmail.com',
      subject: `${subject}`,
      html: ` <h3>New message from ${name}</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message}</p>`,
    });

    //  send confirmation to user;
    await resend.emails.send({
      from: 'Chikezie Simon <onboarding@resend.dev>',
      to: email, // 👈 user’s email
      subject: '✅ Thanks for contacting me!',
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for reaching out! I received your message and will get back to you soon.</p>
        <hr/>
        <p><strong>Your Message:</strong></p>
        <p>${message}</p>
        <br/>
        <p>Cheers,</p>
        <p>Chikezie Simon</p>
      `,
    });
    return { message: 'Form submitted successfully!' };
  } catch (error) {
    console.error(error);
    return { errors: { general: 'Failed to send email.' } };
  }

  // const data = {
  //   name,
  //   email,
  //   subject,
  //   message,
  // };
}
const field =
  'mt-1.5 w-full rounded-lg border border-line bg-card px-3.5 py-2.5 text-sm text-fg placeholder:text-muted transition-colors focus:border-muted focus:outline-none';

const ContactPage = ({ actionData }: Route.ComponentProps) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const errors = actionData?.errors as Record<string, string> | undefined;
  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight">Get in touch</h1>
      <p className="mt-2 text-muted">
        Have a project, a question or just want to say hi? Send a message and I’ll get back to you.
      </p>
      {actionData && 'message' in actionData && actionData.message ? (
        <p className="mt-6 rounded-lg border border-accent/40 bg-accent/10 p-4 text-sm text-fg">
          {actionData.message}
        </p>
      ) : null}
      {errors?.general ? (
        <p className="mt-6 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-400">
          {errors.general}
        </p>
      ) : null}
      <Form
        method="post"
        className="mt-8 space-y-5"
        key={actionData && 'message' in actionData ? actionData.message : 'form'}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="label">
              Full name
            </label>
            <input type="text" id="name" name="name" className={field} />
            {errors?.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="label">
              Email
            </label>
            <input type="email" id="email" name="email" className={field} />
            {errors?.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="subject" className="label">
            Subject
          </label>
          <input type="text" id="subject" name="subject" className={field} />
          {errors?.subject && <p className="mt-1 text-sm text-red-400">{errors.subject}</p>}
        </div>
        <div>
          <label htmlFor="message" className="label">
            Message
          </label>
          <textarea id="message" name="message" rows={6} className={field} />
          {errors?.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-fg px-5 py-2.5 text-sm font-medium text-bg transition hover:opacity-85 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'Sending...' : 'Send message'}
        </button>
      </Form>
    </section>
  );
};

export default ContactPage;
