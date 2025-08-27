import { Form, useNavigation } from 'react-router';
import type { Route } from '../contact/+types/index';
import { p } from 'motion/react-client';

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
  const data = {
    name,
    email,
    subject,
    message,
  };

  return { message: 'Form submitted successfully!', data };
}
const ContactPage = ({ actionData }: Route.ComponentProps) => {
  const navigation = useNavigation(); // 👈 get navigation state
  const isSubmitting = navigation.state === 'submitting';
  const errors = actionData?.errors;
  return (
    <section className="max-w-3xl mx-auto mt-12 px-6 py-8 bg-gray-900">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">📬 Contact Me</h2>
      {actionData?.message ? (
        <p className="mb-6 p-4 bg-green-700 text-green-100 text-center rounded-lg border border-green-500 shadow-sm">
          {actionData.message}
        </p>
      ) : null}
      <Form method="post" className="space-y-6">
        {/* Full Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100"
          />
          {errors?.name && <p className="text-red-400 text-sm mt-1">{errors?.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100"
          />
          {errors?.email && <p className="text-red-400 text-sm mt-1">{errors?.email}</p>}
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-300">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100"
          />
          {errors?.subject && <p className="text-red-400 text-sm mt-1">{errors?.subject}</p>}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100"
          />
          {errors?.message && <p className="text-red-400 text-sm mt-1">{errors?.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting} // 👈 disable while submitting
          className={`w-full py-2 rounded-lg transition 
            ${isSubmitting ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} 
            text-white`}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </Form>
    </section>
  );
};

export default ContactPage;
