import { redirect } from 'react-router';

// The about section now lives on the home page.
export function loader() {
  return redirect('/#about');
}

export default function AboutPage() {
  return null;
}
